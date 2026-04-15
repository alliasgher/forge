export interface HeroContent {
  heading: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  overlayOpacity?: number;
}

export interface AboutContent {
  title: string;
  body: string;
  image?: string;
  imagePosition?: "left" | "right";
}

export interface ServicesContent {
  items: Array<{
    id: string;
    name: string;
    description: string;
    price?: string;
    image?: string;
  }>;
}

export interface GalleryContent {
  images: Array<{
    id: string;
    url: string;
    caption?: string;
    alt?: string;
  }>;
  columns?: 2 | 3 | 4;
}

export interface TestimonialsContent {
  items: Array<{
    id: string;
    name: string;
    text: string;
    rating: number;
    photo?: string;
    role?: string;
  }>;
}

export interface ContactContent {
  heading: string;
  subheading?: string;
  recipientEmail: string;
  showPhone: boolean;
  showAddress: boolean;
  showMap: boolean;
  fields: Array<"name" | "email" | "phone" | "message">;
}
