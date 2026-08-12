import bcrypt from "bcrypt";
import { pool } from "../db/client.js";
import { signAccessToken, signRefreshToken, decodeToken, verifyRefreshToken } from "../lib/jwt.js";
import type { User, JwtPayload } from "../types/index.js";

const SALT_ROUNDS = 12;

export async function signup(name: string, email: string, password: string) {
  // Emails are stored lowercased — normalise first so the existence check and
  // the insert agree (otherwise "A@x.com" slips past and hits the unique index).
  const normalizedEmail = email.toLowerCase().trim();

  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [normalizedEmail]);
  if (existing.rows.length > 0) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  let result;
  try {
    result = await pool.query<User>(
      `INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)
       RETURNING id, email, name, created_at`,
      [normalizedEmail, passwordHash, name.trim()]
    );
  } catch (err: any) {
    // Unique violation — another request registered the same email in between
    if (err?.code === "23505") throw new Error("Email already registered");
    throw err;
  }

  const user = result.rows[0];
  return generateAuthResponse(user);
}

export async function login(email: string, password: string) {
  const result = await pool.query<User>(
    "SELECT id, email, password_hash, name, created_at FROM users WHERE email = $1",
    [email.toLowerCase().trim()]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new Error("Invalid email or password");
  }

  return generateAuthResponse(user);
}

export async function refreshTokens(oldRefreshToken: string) {
  // Decode without verifying to get userId
  const decoded = decodeToken(oldRefreshToken);
  if (!decoded) throw new Error("Invalid refresh token");

  // Verify the token is actually valid
  try {
    verifyRefreshToken(oldRefreshToken);
  } catch {
    throw new Error("Expired or invalid refresh token");
  }

  // Find matching token hash in DB
  const tokens = await pool.query(
    "SELECT id, token_hash FROM refresh_tokens WHERE user_id = $1",
    [decoded.userId]
  );

  let matchedTokenId: number | null = null;
  for (const row of tokens.rows) {
    const match = await bcrypt.compare(oldRefreshToken, row.token_hash);
    if (match) {
      matchedTokenId = row.id;
      break;
    }
  }

  if (!matchedTokenId) {
    throw new Error("Refresh token not found or already used");
  }

  // Delete the used token
  await pool.query("DELETE FROM refresh_tokens WHERE id = $1", [matchedTokenId]);

  // Get user
  const userResult = await pool.query<User>(
    "SELECT id, email, name, created_at FROM users WHERE id = $1",
    [decoded.userId]
  );
  if (userResult.rows.length === 0) throw new Error("User not found");

  return generateAuthResponse(userResult.rows[0]);
}

export async function getProfile(userId: number) {
  const result = await pool.query(
    "SELECT id, email, name, created_at FROM users WHERE id = $1",
    [userId]
  );
  if (result.rows.length === 0) throw new Error("User not found");
  return result.rows[0];
}

async function generateAuthResponse(user: User) {
  const payload: JwtPayload = { userId: user.id, email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // Store refresh token hash
  const tokenHash = await bcrypt.hash(refreshToken, SALT_ROUNDS);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  await pool.query(
    "INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
    [user.id, tokenHash, expiresAt]
  );

  // Clean up expired tokens
  await pool.query("DELETE FROM refresh_tokens WHERE expires_at < NOW()");

  return {
    user: { id: user.id, email: user.email, name: user.name, created_at: user.created_at },
    accessToken,
    refreshToken,
  };
}
