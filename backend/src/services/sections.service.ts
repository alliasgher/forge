import { pool } from "../db/client.js";
import type { Section } from "../types/index.js";

const DEFAULT_SECTIONS: Record<string, Array<{ type: string; title: string; content: Record<string, any>; sort_order: number }>> = {
  _base: [
    {
      type: "hero",
      title: "Hero",
      content: {
        heading: "Welcome to Our Business",
        subheading: "We provide exceptional services tailored to your needs.",
        ctaText: "Get in Touch",
        ctaLink: "#contact",
      },
      sort_order: 0,
    },
    {
      type: "about",
      title: "About Us",
      content: {
        title: "About Us",
        body: "We are passionate about what we do. With years of experience and a dedicated team, we deliver results that exceed expectations.",
        imagePosition: "right",
      },
      sort_order: 1,
    },
    {
      type: "services",
      title: "Services",
      content: {
        items: [
          { id: "s1", name: "Service One", description: "A brief description of this service.", price: "" },
          { id: "s2", name: "Service Two", description: "A brief description of this service.", price: "" },
          { id: "s3", name: "Service Three", description: "A brief description of this service.", price: "" },
        ],
      },
      sort_order: 2,
    },
    {
      type: "gallery",
      title: "Gallery",
      content: { images: [], columns: 3 },
      sort_order: 3,
    },
    {
      type: "testimonials",
      title: "Testimonials",
      content: {
        items: [
          { id: "t1", name: "Happy Customer", text: "Amazing experience! Highly recommended.", rating: 5, role: "Customer" },
        ],
      },
      sort_order: 4,
    },
    {
      type: "contact",
      title: "Contact",
      content: {
        heading: "Get in Touch",
        subheading: "We'd love to hear from you.",
        recipientEmail: "",
        showPhone: true,
        showAddress: true,
        showMap: false,
        fields: ["name", "email", "phone", "message"],
      },
      sort_order: 5,
    },
  ],
  gym: [
    {
      type: "hero",
      title: "Hero",
      content: {
        heading: "Transform Your Body",
        subheading: "Join our community and start your fitness journey today.",
        ctaText: "Start Free Trial",
        ctaLink: "#contact",
      },
      sort_order: 0,
    },
    {
      type: "about",
      title: "About",
      content: {
        title: "Why Choose Us",
        body: "State-of-the-art equipment, expert trainers, and a motivating community. We're here to help you reach your fitness goals.",
        imagePosition: "right",
      },
      sort_order: 1,
    },
    {
      type: "services",
      title: "Classes",
      content: {
        items: [
          { id: "s1", name: "HIIT Training", description: "High-intensity interval training for maximum results.", price: "" },
          { id: "s2", name: "Yoga", description: "Find your balance and flexibility.", price: "" },
          { id: "s3", name: "Strength Training", description: "Build muscle and increase power.", price: "" },
          { id: "s4", name: "CrossFit", description: "Functional fitness at high intensity.", price: "" },
        ],
      },
      sort_order: 2,
    },
    {
      type: "gallery",
      title: "Our Facility",
      content: { images: [], columns: 3 },
      sort_order: 3,
    },
    {
      type: "testimonials",
      title: "Member Stories",
      content: {
        items: [
          { id: "t1", name: "Sarah M.", text: "Lost 30 pounds in 3 months. The trainers are incredible!", rating: 5, role: "Member since 2024" },
          { id: "t2", name: "James K.", text: "Best gym I've ever been to. Great community.", rating: 5, role: "Member since 2023" },
        ],
      },
      sort_order: 4,
    },
    {
      type: "contact",
      title: "Contact",
      content: {
        heading: "Start Your Journey",
        subheading: "Book a free trial session today.",
        recipientEmail: "",
        showPhone: true,
        showAddress: true,
        showMap: true,
        fields: ["name", "email", "phone", "message"],
      },
      sort_order: 5,
    },
  ],
  retail: [
    {
      type: "hero",
      title: "Hero",
      content: {
        heading: "Discover Our Collection",
        subheading: "Handcrafted products made with passion and quality.",
        ctaText: "Shop Now",
        ctaLink: "#services",
      },
      sort_order: 0,
    },
    {
      type: "about",
      title: "Our Story",
      content: {
        title: "Our Story",
        body: "Founded with a passion for quality and craftsmanship, every product tells a story. We believe in creating experiences, not just products.",
        imagePosition: "left",
      },
      sort_order: 1,
    },
    {
      type: "services",
      title: "Products",
      content: {
        items: [
          { id: "s1", name: "Signature Collection", description: "Our bestselling products.", price: "From $49" },
          { id: "s2", name: "Premium Line", description: "Luxury crafted for the discerning.", price: "From $99" },
          { id: "s3", name: "Gift Sets", description: "Perfect for any occasion.", price: "From $75" },
        ],
      },
      sort_order: 2,
    },
    {
      type: "gallery",
      title: "Gallery",
      content: { images: [], columns: 3 },
      sort_order: 3,
    },
    {
      type: "testimonials",
      title: "Reviews",
      content: {
        items: [
          { id: "t1", name: "Emily R.", text: "Absolutely love the quality. Will buy again!", rating: 5, role: "Verified Buyer" },
          { id: "t2", name: "David L.", text: "Best gift I've ever given. Beautiful packaging too.", rating: 5, role: "Verified Buyer" },
        ],
      },
      sort_order: 4,
    },
    {
      type: "contact",
      title: "Contact",
      content: {
        heading: "Visit Our Store",
        subheading: "Come see our collection in person or reach out online.",
        recipientEmail: "",
        showPhone: true,
        showAddress: true,
        showMap: true,
        fields: ["name", "email", "message"],
      },
      sort_order: 5,
    },
  ],
  cleaning: [
    {
      type: "hero",
      title: "Hero",
      content: {
        heading: "Spotless Homes, Happy Families",
        subheading: "Professional cleaning services you can trust.",
        ctaText: "Get a Free Quote",
        ctaLink: "#contact",
      },
      sort_order: 0,
    },
    {
      type: "about",
      title: "About",
      content: {
        title: "Why Choose Us",
        body: "Licensed, insured, and background-checked cleaners. We use eco-friendly products and guarantee your satisfaction.",
        imagePosition: "right",
      },
      sort_order: 1,
    },
    {
      type: "services",
      title: "Services",
      content: {
        items: [
          { id: "s1", name: "Regular Cleaning", description: "Weekly or bi-weekly home maintenance.", price: "From $120" },
          { id: "s2", name: "Deep Cleaning", description: "Top-to-bottom thorough clean.", price: "From $250" },
          { id: "s3", name: "Move-In/Out Cleaning", description: "Get your deposit back.", price: "From $300" },
          { id: "s4", name: "Office Cleaning", description: "Keep your workspace spotless.", price: "Custom quote" },
        ],
      },
      sort_order: 2,
    },
    {
      type: "gallery",
      title: "Before & After",
      content: { images: [], columns: 2 },
      sort_order: 3,
    },
    {
      type: "testimonials",
      title: "Happy Clients",
      content: {
        items: [
          { id: "t1", name: "Maria G.", text: "They transformed my apartment! So thorough and professional.", rating: 5, role: "Regular Client" },
          { id: "t2", name: "Tom W.", text: "Got my full deposit back after the move-out clean. Worth every penny.", rating: 5, role: "One-time Client" },
        ],
      },
      sort_order: 4,
    },
    {
      type: "contact",
      title: "Contact",
      content: {
        heading: "Get a Free Quote",
        subheading: "Tell us about your space and we'll give you an instant estimate.",
        recipientEmail: "",
        showPhone: true,
        showAddress: false,
        showMap: false,
        fields: ["name", "email", "phone", "message"],
      },
      sort_order: 5,
    },
  ],
};

export async function createDefaultSections(siteId: number, businessType: string): Promise<Section[]> {
  const defaults = DEFAULT_SECTIONS[businessType] || DEFAULT_SECTIONS._base;

  const sections: Section[] = [];
  for (const section of defaults) {
    const result = await pool.query<Section>(
      `INSERT INTO site_sections (site_id, type, title, content, sort_order)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [siteId, section.type, section.title, JSON.stringify(section.content), section.sort_order]
    );
    sections.push(result.rows[0]);
  }

  return sections;
}

export async function getSections(siteId: number): Promise<Section[]> {
  const result = await pool.query<Section>(
    "SELECT * FROM site_sections WHERE site_id = $1 ORDER BY sort_order ASC",
    [siteId]
  );
  return result.rows;
}

export async function getSection(sectionId: number): Promise<Section | null> {
  const result = await pool.query<Section>("SELECT * FROM site_sections WHERE id = $1", [sectionId]);
  return result.rows[0] || null;
}

export async function updateSection(sectionId: number, updates: { title?: string; content?: Record<string, any>; visible?: boolean }): Promise<Section> {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (updates.title !== undefined) { fields.push(`title = $${idx++}`); values.push(updates.title); }
  if (updates.content !== undefined) { fields.push(`content = $${idx++}`); values.push(JSON.stringify(updates.content)); }
  if (updates.visible !== undefined) { fields.push(`visible = $${idx++}`); values.push(updates.visible); }

  fields.push("updated_at = NOW()");
  values.push(sectionId);

  const result = await pool.query<Section>(
    `UPDATE site_sections SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`,
    values
  );

  if (result.rows.length === 0) throw new Error("Section not found");
  return result.rows[0];
}

export async function reorderSections(siteId: number, order: Array<{ id: number; sort_order: number }>): Promise<Section[]> {
  for (const item of order) {
    await pool.query(
      "UPDATE site_sections SET sort_order = $1, updated_at = NOW() WHERE id = $2 AND site_id = $3",
      [item.sort_order, item.id, siteId]
    );
  }
  return getSections(siteId);
}
