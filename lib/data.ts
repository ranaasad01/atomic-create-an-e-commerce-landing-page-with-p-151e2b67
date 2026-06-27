export type NavLink = {
  label: string;
  href: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  badge?: string;
  description: string;
};

export const APP_NAME = "Lumio";
export const APP_TAGLINE = "Modern Goods for Modern Living";
export const APP_CTA = "Shop Now";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Bestsellers", href: "#bestsellers" },
  { label: "About", href: "#about" },
  { label: "Newsletter", href: "#newsletter" },
];

export const NAV_CTA: NavLink = {
  label: "View Cart",
  href: "#cart",
};