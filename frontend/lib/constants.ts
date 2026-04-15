export const BUSINESS_TYPES = [
  { value: "restaurant", label: "Restaurant / Cafe", icon: "UtensilsCrossed" },
  { value: "gym", label: "Gym / Fitness", icon: "Dumbbell" },
  { value: "salon", label: "Salon / Spa", icon: "Scissors" },
  { value: "cleaning", label: "Cleaning Service", icon: "Sparkles" },
  { value: "agency", label: "Agency / Consulting", icon: "Briefcase" },
  { value: "retail", label: "Retail / Brand", icon: "ShoppingBag" },
  { value: "other", label: "Other", icon: "Building2" },
] as const;

export const TEMPLATES = [
  { value: "modern", label: "Modern", description: "Clean lines, lots of whitespace, full-width sections" },
  { value: "classic", label: "Classic", description: "Traditional header, boxed content, timeless feel" },
  { value: "bold", label: "Bold", description: "Dark hero, large typography, asymmetric grids" },
] as const;

export const SECTION_TYPES = [
  { value: "hero", label: "Hero", icon: "Image" },
  { value: "about", label: "About", icon: "Info" },
  { value: "services", label: "Services", icon: "Layers" },
  { value: "gallery", label: "Gallery", icon: "Grid3x3" },
  { value: "testimonials", label: "Testimonials", icon: "MessageSquareQuote" },
  { value: "contact", label: "Contact", icon: "Mail" },
  { value: "faq", label: "FAQ", icon: "HelpCircle" },
  { value: "pricing", label: "Pricing", icon: "CreditCard" },
] as const;

export const DEFAULT_COLORS = {
  primary: "#1E3A5F",
  secondary: "#00C9A7",
  accent: "#FF6B4A",
  background: "#FFFFFF",
  text: "#0D1B2A",
};

export const COLOR_PRESETS = [
  { name: "Navy & Mint", primary: "#1E3A5F", secondary: "#00C9A7", accent: "#FF6B4A", background: "#FFFFFF", text: "#0D1B2A" },
  { name: "Forest", primary: "#2D5016", secondary: "#86B049", accent: "#E8A838", background: "#FAFDF6", text: "#1A2E0A" },
  { name: "Royal", primary: "#4A1A8A", secondary: "#9B59B6", accent: "#F39C12", background: "#FDFBFF", text: "#2C0B53" },
  { name: "Ocean", primary: "#0369A1", secondary: "#38BDF8", accent: "#FB923C", background: "#F8FDFF", text: "#082F49" },
  { name: "Charcoal", primary: "#1F2937", secondary: "#6B7280", accent: "#EF4444", background: "#FFFFFF", text: "#111827" },
  { name: "Rose", primary: "#9F1239", secondary: "#FB7185", accent: "#A855F7", background: "#FFF1F2", text: "#4C0519" },
];

export const DEFAULT_FONTS = {
  heading: "Sora",
  body: "Figtree",
};

export const FONT_OPTIONS = [
  { heading: "Sora", body: "Figtree" },
  { heading: "Inter", body: "Inter" },
  { heading: "Playfair Display", body: "Lato" },
  { heading: "Montserrat", body: "Open Sans" },
  { heading: "Poppins", body: "Nunito" },
];
