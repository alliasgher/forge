import "server-only";
import jwt from "jsonwebtoken";
import { config } from "./config";
import type { JwtPayload } from "./types";

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.accessTokenSecret, { expiresIn: "15m" });
}

export function signRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.refreshTokenSecret, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, config.accessTokenSecret) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, config.refreshTokenSecret) as JwtPayload;
}

export function decodeToken(token: string): JwtPayload | null {
  return jwt.decode(token) as JwtPayload | null;
}
