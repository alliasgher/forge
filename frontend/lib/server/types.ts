import type { SiteColors, SiteFonts } from "@/lib/types";

export interface DbUser {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface DbSite {
  id: number;
  owner_id: number;
  slug: string;
  business_name: string;
  business_type: string;
  tagline: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  hours: Record<string, string>;
  template: string;
  colors: SiteColors;
  fonts: SiteFonts;
  logo_url: string | null;
  is_published: boolean;
  is_demo: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbSection {
  id: number;
  site_id: number;
  type: string;
  title: string | null;
  content: Record<string, unknown>;
  sort_order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbMedia {
  id: number;
  site_id: number;
  url: string;
  r2_key: string;
  filename: string;
  size: number;
  mime_type: string;
  created_at: string;
}

export interface DbLead {
  id: number;
  site_id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface JwtPayload {
  userId: number;
  email: string;
}
