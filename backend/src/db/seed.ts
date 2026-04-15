import "dotenv/config";
import { pool } from "./client.js";
import { createDefaultSections } from "../services/sections.service.js";

const DEMO_SITES = [
  {
    slug: "demo-perfume",
    business_name: "Aura Luxe Perfumery",
    business_type: "retail",
    tagline: "Handcrafted fragrances for every mood",
    phone: "(555) 234-5678",
    email: "hello@auraluxe.com",
    address: "12 Fragrance Lane, New York, NY 10001",
    template: "bold",
    colors: {
      primary: "#2C1654",
      secondary: "#C9A84C",
      accent: "#E8C4A0",
      background: "#0D0A12",
      text: "#F5F0E8",
    },
    fonts: { heading: "Playfair Display", body: "Lato" },
  },
  {
    slug: "demo-gym",
    business_name: "Iron Forge Fitness",
    business_type: "gym",
    tagline: "Transform your body, transform your life",
    phone: "(555) 345-6789",
    email: "train@ironforge.com",
    address: "88 Strength Ave, Los Angeles, CA 90001",
    template: "modern",
    colors: {
      primary: "#C0392B",
      secondary: "#E74C3C",
      accent: "#F39C12",
      background: "#FFFFFF",
      text: "#1A1A1A",
    },
    fonts: { heading: "Montserrat", body: "Open Sans" },
  },
  {
    slug: "demo-cleaning",
    business_name: "Sparkle Pro Cleaning",
    business_type: "cleaning",
    tagline: "Spotless homes, happy families",
    phone: "(555) 456-7890",
    email: "book@sparklepro.com",
    address: "55 Clean St, Chicago, IL 60601",
    template: "classic",
    colors: {
      primary: "#0369A1",
      secondary: "#38BDF8",
      accent: "#10B981",
      background: "#F8FDFF",
      text: "#082F49",
    },
    fonts: { heading: "Sora", body: "Figtree" },
  },
];

async function seed() {
  console.log("Seeding demo sites...");

  for (const demo of DEMO_SITES) {
    // Check if already seeded
    const existing = await pool.query("SELECT id FROM sites WHERE slug = $1", [demo.slug]);
    if (existing.rows.length > 0) {
      console.log(`  ✓ ${demo.slug} already exists, skipping`);
      continue;
    }

    // Insert the demo site (no owner — use id 0 or a system user)
    // We'll use a special demo user or just insert without FK constraint for demos
    // Actually we need a valid user — let's create a demo user first
    let demoUserId: number;
    const demoUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      ["demo@forge.app"]
    );
    if (demoUser.rows.length > 0) {
      demoUserId = demoUser.rows[0].id;
    } else {
      const newUser = await pool.query(
        "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id",
        ["demo@forge.app", "not-a-real-hash", "Forge Demo"]
      );
      demoUserId = newUser.rows[0].id;
    }

    const site = await pool.query(
      `INSERT INTO sites (owner_id, slug, business_name, business_type, tagline, phone, email, address, template, colors, fonts, is_published, is_demo)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true, true) RETURNING *`,
      [
        demoUserId,
        demo.slug,
        demo.business_name,
        demo.business_type,
        demo.tagline,
        demo.phone,
        demo.email,
        demo.address,
        demo.template,
        JSON.stringify(demo.colors),
        JSON.stringify(demo.fonts),
      ]
    );

    await createDefaultSections(site.rows[0].id, demo.business_type);
    console.log(`  ✓ Seeded ${demo.slug}`);
  }

  console.log("Done!");
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
