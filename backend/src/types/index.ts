export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Site {
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

export interface SiteColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface SiteFonts {
  heading: string;
  body: string;
}

export interface Section {
  id: number;
  site_id: number;
  type: string;
  title: string | null;
  content: Record<string, any>;
  sort_order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: number;
  site_id: number;
  url: string;
  r2_key: string;
  filename: string;
  size: number;
  mime_type: string;
  created_at: string;
}

export interface Lead {
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
