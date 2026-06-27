"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Camera as Instagram, MessageCircle as Twitter, Code2 as Github, Mail, ArrowRight } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, navLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "#products" },
      { label: "Bestsellers", href: "#bestsellers" },
      { label: "New Arrivals", href: "#products" },
      { label: "Sale", href: "#products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Sustainability", href: "#about" },
      { label: "Careers", href: "#about" },
      { label: "Press", href: "#about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#newsletter" },
      { label: "Shipping & Returns", href: "#newsletter" },
      { label: "Track Order", href: "#newsletter" },
      { label: "Contact Us", href: "#newsletter" },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Mail, label: "Email", href: "#newsletter" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
          >
            {/* Brand column */}
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
                <span className="w-8 h-8 rounded-full bg-[#f4a261] flex items-center justify-center text-white font-bold text-sm transition-transform duration-300 group-hover:scale-110">
                  L
                </span>
                <span className="font-display font-bold text-xl tracking-tight">
                  {APP_NAME}
                </span>
              </Link>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                {APP_TAGLINE}. Thoughtfully designed products that bring joy to
                everyday moments.
              </p>
              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={(e) =>
                      handleAnchorClick(
                        e as React.MouseEvent<HTMLAnchorElement>,
                        href
                      )
                    }
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#f4a261] flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Link columns */}
            {footerSections.map((section) => (
              <motion.div key={section.title} variants={fadeInUp}>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={getLinkHref(link.href)}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                        className="text-sm text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/60 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/60 transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white/60 transition-colors duration-200">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}