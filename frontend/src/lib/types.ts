// ─── Site Config ──────────────────────────────────────────────────────────────
export interface SiteConfig {
  site_name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postal_code: string;
  region: string;
  google_maps_embed_url?: string;
  logo?: string;
  favicon?: string;
  opening_hours?: string;
}

export interface SocialLink {
  id: number;
  platform: string; // instagram | facebook | youtube | twitter | tiktok | spotify | soundcloud
  url: string;
  icon: string;
  order: number;
}

// ─── Events ───────────────────────────────────────────────────────────────────
export interface EventCategory {
  id: number;
  name: string;
  slug: string;
  color: string;
  icon: string;
  description?: string;
}

export interface Event {
  id: number;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  short_description?: string;
  date: string; // YYYY-MM-DD
  start_time?: string; // HH:MM:SS
  end_time?: string;
  doors_open?: string;
  category?: EventCategory;
  image?: string;
  thumbnail?: string;
  price?: string;
  is_free: boolean;
  ticket_url?: string;
  artist_name?: string;
  artist_bio?: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  is_featured: boolean;
  is_weekly_highlight: boolean;
}

// ─── Menu ─────────────────────────────────────────────────────────────────────
export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: string;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_spicy: boolean;
  image?: string;
  is_available: boolean;
  is_featured: boolean;
  allergens?: string;
}

export interface MenuCategory {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  order: number;
  items: MenuItem[];
}

export interface DrinkItem {
  id: number;
  name: string;
  description?: string;
  price: string;
  volume?: string;
  region?: string;
  year?: string;
  is_available: boolean;
  is_featured: boolean;
}

export interface DrinkCategory {
  id: number;
  name: string;
  slug: string;
  order: number;
  drinks: DrinkItem[];
}

export interface SpecialMenu {
  id: number;
  name: string;
  description?: string;
  price: string;
  content: string;
  available_days?: string;
  available_hours?: string;
  image?: string;
  order: number;
}

export interface FullMenu {
  food_categories: MenuCategory[];
  drink_categories: DrinkCategory[];
  special_menus: SpecialMenu[];
}

// ─── Media ───────────────────────────────────────────────────────────────────
export interface CarouselSlide {
  id: number;
  title?: string;
  subtitle?: string;
  image: string;
  link_url?: string;
  link_text?: string;
  order: number;
  interval: number; // ms
}

export interface HeroBanner {
  id: number;
  title: string;
  subtitle?: string;
  background_image?: string;
  cta_text?: string;
  cta_url?: string;
}

// ─── Pages / CMS ─────────────────────────────────────────────────────────────
export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  cover_image?: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
  order: number;
}
