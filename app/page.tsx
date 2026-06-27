"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingBag, ArrowRight, Check, Truck, RefreshCw, Shield, Heart, ChevronRight, Sparkles } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, APP_CTA } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

const featuredProducts = [
  {
    id: "p1",
    name: "Ceramic Pour-Over Set",
    price: 68,
    originalPrice: 89,
    rating: 4.9,
    reviewCount: 214,
    image: "https://m.media-amazon.com/images/I/71bpA9vU4hL._AC_UF894,1000_QL80_.jpg",
    category: "Kitchen",
    badge: "Bestseller",
    description:
      "Hand-thrown stoneware with a matte glaze finish. Brews a clean, nuanced cup every morning.",
  },
  {
    id: "p2",
    name: "Linen Throw Blanket",
    price: 95,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 178,
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L.jpg",
    category: "Home",
    badge: "New",
    description:
      "Woven from 100% European flax. Breathable, durable, and impossibly soft after the first wash.",
  },
  {
    id: "p3",
    name: "Walnut Desk Organizer",
    price: 54,
    originalPrice: undefined,
    rating: 4.7,
    reviewCount: 132,
    image: "https://i.etsystatic.com/18396026/r/il/269bc5/2056444760/il_fullxfull.2056444760_4tcv.jpg",
    category: "Office",
    badge: undefined,
    description:
      "Solid American walnut with a natural oil finish. Keeps your workspace calm and considered.",
  },
  {
    id: "p4",
    name: "Matte Black Candle Trio",
    price: 42,
    originalPrice: 55,
    rating: 4.9,
    reviewCount: 301,
    image: "http://corpusnaturals.com/cdn/shop/files/Corpus_PDPAltImages_MiniCandleTrio_02.jpg?v=1727899357",
    category: "Lifestyle",
    badge: "Sale",
    description:
      "Three hand-poured soy candles: Cedar + Smoke, Fig + Vetiver, and Sea Salt + Driftwood.",
  },
  {
    id: "p5",
    name: "Merino Wool Beanie",
    price: 38,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 89,
    image: "https://www.gigipip.com/cdn/shop/files/beanies-gigi-merino-wool-beanie-41548091457667.jpg?v=1760644226&width=1000",
    category: "Apparel",
    badge: undefined,
    description:
      "Extra-fine 18.5-micron merino. Warm without bulk, soft against skin, naturally odor-resistant.",
  },
  {
    id: "p6",
    name: "Brass Bookend Pair",
    price: 76,
    originalPrice: undefined,
    rating: 4.6,
    reviewCount: 67,
    image: "https://www.jeffersonbrass.com/cdn/shop/products/Virginia_State_Bookends_-_11140_-_JBC.jpg?v=1600100787&width=1946",
    category: "Home",
    badge: "New",
    description:
      "Solid cast brass with a brushed finish. Heavy enough to hold your entire shelf in place.",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Mara Jensen",
    location: "Portland, OR",
    avatar: "https://www.ageist.com/wp-content/uploads/2024/05/IMG_5448-683x1024.jpg",
    rating: 5,
    text: "The pour-over set completely changed my morning routine. The quality is exceptional — it feels like something you'd find in a boutique in Copenhagen.",
    product: "Ceramic Pour-Over Set",
  },
  {
    id: "t2",
    name: "Daniel Osei",
    location: "Brooklyn, NY",
    avatar: "https://www.hss.edu/globalassets/images/profiles/daniel-osei-headshot",
    rating: 5,
    text: "I've bought three linen blankets as gifts now. Every single person has asked where it's from. Lumio is the answer I give every time.",
    product: "Linen Throw Blanket",
  },
  {
    id: "t3",
    name: "Sofia Reyes",
    location: "Austin, TX",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/78/Sof%C3%ADa_Reyes_2016.jpg",
    rating: 5,
    text: "The desk organizer sits on my table every day. It's one of those objects that just makes you feel good about your space. Worth every penny.",
    product: "Walnut Desk Organizer",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping Over $75",
    description:
      "Complimentary delivery on all domestic orders above $75. Tracked from our studio to your door.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description:
      "Not in love? Return anything within 30 days, no questions asked. We make it effortless.",
  },
  {
    icon: Shield,
    title: "Lifetime Guarantee",
    description:
      "Every Lumio product is built to last. If something fails, we repair or replace it. Always.",
  },
  {
    icon: Heart,
    title: "Ethically Made",
    description:
      "Sourced from certified artisan workshops. Fair wages, sustainable materials, zero compromise.",
  },
];

const categories = [
  {
    label: "Kitchen",
    count: 24,
    image: "https://img.buzzfeed.com/buzzfeed-static/static/2023-06/10/2/asset/761c2df15880/sub-buzz-721-1686365389-1.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
    accent: "#f4a261",
  },
  {
    label: "Home",
    count: 38,
    image: "https://hips.hearstapps.com/hmg-prod/images/bcacfded-198f-4492-899c-da0e4457a247.jpg",
    accent: "#e9c46a",
  },
  {
    label: "Office",
    count: 17,
    image: "https://hips.hearstapps.com/hmg-prod/images/bcacfded-198f-4492-899c-da0e4457a247.jpg",
    accent: "#2a9d8f",
  },
  {
    label: "Apparel",
    count: 21,
    image: "https://static.newhomeinc.com/newhomeinc/images/newhomeinc_og.jpg",
    accent: "#e76f51",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i <= Math.round(rating)
                ? "fill-[#f4a261] text-[#f4a261]"
                : "fill-transparent text-[#1a1a1a]/20"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-[#1a1a1a]/50 font-medium">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof featuredProducts)[0];
  index: number;
}) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: index * 0.07 },
    },
  };

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.16)] transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f8f5f0]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
              product.badge === "Sale"
                ? "bg-[#e76f51] text-white"
                : product.badge === "Bestseller"
                ? "bg-[#1a1a1a] text-white"
                : "bg-[#f4a261] text-white"
            }`}
          >
            {product.badge}
          </span>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wished ? "fill-[#e76f51] text-[#e76f51]" : "text-[#1a1a1a]/60"
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-medium text-[#f4a261] uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-[#1a1a1a] text-base leading-snug mb-1.5">
          {product.name}
        </h3>
        <p className="text-sm text-[#1a1a1a]/55 leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>
        <StarRating rating={product.rating} count={product.reviewCount} />

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#1a1a1a]">
              ${product.price}
            </span>
            {product.originalPrice != null && (
              <span className="text-sm text-[#1a1a1a]/40 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              added
                ? "bg-[#2a9d8f] text-white"
                : "bg-[#1a1a1a] text-white hover:bg-[#f4a261]"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-[#faf7f2] overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 40%, #f4a26133 0%, transparent 60%), radial-gradient(circle at 20% 80%, #e9c46a22 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a1a1a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4a261]/15 border border-[#f4a261]/30 text-[#c1440e] text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                New Arrivals — Spring 2025
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1a1a1a] tracking-tight leading-[1.05] text-balance mb-6"
            >
              Objects worth
              <br />
              <span className="text-[#f4a261]">living with.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-[#1a1a1a]/60 leading-relaxed max-w-md mb-10 text-pretty"
            >
              {APP_TAGLINE}. Every piece in our collection is chosen for its
              craft, its longevity, and the quiet joy it brings to daily life.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1a1a1a] text-white font-semibold text-sm hover:bg-[#f4a261] transition-colors duration-300 shadow-[0_4px_14px_rgba(26,26,26,0.25)]"
              >
                {APP_CTA}
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ x: 4 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors duration-200"
              >
                Our story
                <ChevronRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 mt-12 pt-8 border-t border-[#1a1a1a]/10 w-full"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-[#e9c46a]/40 overflow-hidden"
                  >
                    <img
                      src={`/images/avatar-customer-${i}.jpg`}
                      alt={`Customer ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-[#f4a261] text-[#f4a261]"
                    />
                  ))}
                </div>
                <p className="text-xs text-[#1a1a1a]/55 font-medium">
                  Loved by 12,000+ customers
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right image collage */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg ml-auto">
              {/* Main image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.14)]"
              >
                <img
                  src="https://www.hellolumio.com/cdn/shop/files/SET_03_LUMIO_OVO_0002_169_1200x.jpg?v=1781074260"
                  alt="Lumio curated home goods"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating card — bestseller */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-6 -left-8 bg-white rounded-2xl p-4 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-black/5 w-52"
              >
                <p className="text-xs font-semibold text-[#f4a261] uppercase tracking-wider mb-1">
                  Top Seller
                </p>
                <p className="text-sm font-bold text-[#1a1a1a] leading-tight mb-2">
                  Ceramic Pour-Over Set
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[#1a1a1a]">
                    $68
                  </span>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-[#f4a261] text-[#f4a261]" />
                    <span className="text-xs font-medium text-[#1a1a1a]/60">
                      4.9
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge — free shipping */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
                className="absolute -top-4 -right-4 bg-[#1a1a1a] text-white rounded-2xl px-4 py-3 shadow-lg"
              >
                <p className="text-xs font-semibold leading-tight">
                  Free shipping
                </p>
                <p className="text-xs text-white/60">on orders over $75</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {categories.map((cat) => (
              <motion.a
                key={cat.label}
                href="#products"
                variants={scaleIn}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative group rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-[#1a1a1a]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-white font-bold text-lg leading-tight">
                    {cat.label}
                  </p>
                  <p className="text-white/70 text-xs font-medium">
                    {cat.count} items
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────────────── */}
      <section id="products" className="py-24 md:py-32 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold text-[#f4a261] uppercase tracking-widest mb-3"
              >
                Curated Collection
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight text-balance"
              >
                Shop the edit
              </motion.h2>
            </div>
            <motion.p
              variants={fadeInUp}
              className="text-[#1a1a1a]/55 max-w-sm leading-relaxed"
            >
              Every item is hand-selected by our team of designers and tested
              for quality before it earns a place in the Lumio collection.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center mt-14"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] font-semibold text-sm hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {valueProps.map((vp) => {
              const Icon = vp.icon;
              return (
                <motion.div
                  key={vp.title}
                  variants={fadeInUp}
                  className="flex flex-col items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#f4a261]/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#f4a261]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base mb-1.5">
                      {vp.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed" style={vp.description === "Complimentary delivery on all domestic orders above $75. Tracked from our studio to your door." ? { color: "#df0c0c" } : undefined}>
                      {vp.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Bestsellers Feature ──────────────────────────────────────────── */}
      <section id="bestsellers" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[5/6] shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
                <img
                  src="https://m.media-amazon.com/images/I/71bpA9vU4hL._AC_UF894,1000_QL80_.jpg"
                  alt="Ceramic Pour-Over Set — Lumio Bestseller"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/30 to-transparent" />
              </div>
              {/* Stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="absolute -right-6 top-1/3 bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-black/5"
              >
                <p className="text-3xl font-bold text-[#1a1a1a] mb-0.5">
                  214
                </p>
                <p className="text-xs text-[#1a1a1a]/50 font-medium">
                  5-star reviews
                </p>
                <div className="flex items-center gap-0.5 mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#f4a261] text-[#f4a261]"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold text-[#f4a261] uppercase tracking-widest mb-4"
              >
                Most Loved
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight leading-tight mb-6 text-balance"
              >
                The pour-over that changed morning routines.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#1a1a1a]/60 leading-relaxed mb-8 text-pretty"
              >
                Hand-thrown by ceramicists in Oaxaca, each set is unique. The
                wide-mouth dripper slows the pour for a cleaner extraction, and
                the matte glaze stays cool to the touch. It is the kind of
                object that makes you want to wake up earlier.
              </motion.p>

              <motion.ul variants={staggerContainer} className="space-y-3 mb-10">
                {[
                  "Hand-thrown stoneware, no two alike",
                  "Food-safe matte glaze, dishwasher safe",
                  "Fits standard 1-cup and 2-cup carafes",
                  "Packaged in recycled kraft with seed paper",
                ].map((feat) => (
                  <motion.li
                    key={feat}
                    variants={fadeInUp}
                    className="flex items-center gap-3 text-sm text-[#1a1a1a]/70"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#f4a261]/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#f4a261]" />
                    </span>
                    {feat}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeInUp} className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#f4a261] text-white font-semibold text-sm hover:bg-[#e76f51] transition-colors duration-300 shadow-[0_4px_14px_rgba(244,162,97,0.35)]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart — $68
                </motion.button>
                <span className="text-sm text-[#1a1a1a]/40 line-through">
                  $89
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold text-[#f4a261] uppercase tracking-widest mb-3"
            >
              Real Reviews
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight text-balance"
            >
              What our customers say
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className={`bg-white rounded-2xl p-7 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] ${
                  i === 1 ? "md:mt-8" : ""
                }`}
              >
                <div className="flex items-center gap-0.5 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-[#f4a261] text-[#f4a261]"
                    />
                  ))}
                </div>
                <p className="text-[#1a1a1a]/75 text-sm leading-relaxed mb-6 text-pretty" style={t.text === "I've bought three linen blankets as gifts now. Every single person has asked where it's from. Lumio is the answer I give every time." ? { color: "#e61919" } : (t.text === "The pour-over set completely changed my morning routine. The quality is exceptional — it feels like something you'd find in a boutique in Copenhagen." ? { color: "#0e0101", fontSize: "18px" } : undefined)}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-[#1a1a1a]/8">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#f4a261]/20 flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a]">
                      {t.name}
                    </p>
                    <p className="text-xs text-[#1a1a1a]/45">{t.location}</p>
                  </div>
                  <span className="ml-auto text-xs text-[#f4a261] font-medium bg-[#f4a261]/10 px-2.5 py-1 rounded-full">
                    {t.product}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Copy side — reversed layout vs bestsellers */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="order-2 lg:order-1"
            >
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold text-[#f4a261] uppercase tracking-widest mb-4"
              >
                Our Philosophy
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight leading-tight mb-6 text-balance"
              >
                We believe in fewer, better things.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#1a1a1a]/60 leading-relaxed mb-5 text-pretty"
              >
                {APP_NAME} was founded in 2019 by a small team of designers who
                were tired of buying things that broke, faded, or simply stopped
                feeling good after a month. We set out to build a shop where
                every single product had earned its place.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-[#1a1a1a]/60 leading-relaxed mb-10 text-pretty"
              >
                We work directly with artisans and small-batch manufacturers
                across Europe, Japan, and the Americas. Every supplier is
                visited in person. Every material is tested. Nothing ships until
                we would genuinely want it in our own homes.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { stat: "2019", label: "Founded" },
                  { stat: "12k+", label: "Happy customers" },
                  { stat: "100%", label: "Ethically sourced" },
                ].map((item) => (
                  <motion.div key={item.label} variants={scaleIn}>
                    <p className="text-3xl font-bold text-[#1a1a1a] mb-1">
                      {item.stat}
                    </p>
                    <p className="text-xs text-[#1a1a1a]/50 font-medium">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image side */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="order-1 lg:order-2 relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                  <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/0b/aa/5d/caption.jpg?w=1200&h=-1&s=1"
                    alt="Artisan ceramics workshop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 pt-8">
                  <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                    <img
                      src="https://res.cloudinary.com/dllvojxqw/images/c_scale,w_448,h_448,dpr_2/f_webp,q_auto:best/v1694007015/kraft_mailer_box-scaled/kraft_mailer_box-scaled.jpg?_i=AA"
                      alt="Sustainable kraft packaging"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                    <img
                      src="https://www.6sigma.us/wp-content/uploads/2024/09/quality-inspection.webp"
                      alt="Quality inspection process"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <section
        id="newsletter"
        className="py-24 md:py-32 bg-[#1a1a1a] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, #f4a26144 0%, transparent 55%), radial-gradient(circle at 80% 20%, #e9c46a22 0%, transparent 45%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold text-[#f4a261] uppercase tracking-widest mb-4"
            >
              Stay in the loop
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 text-balance"
            >
              Good things, straight to your inbox.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/50 leading-relaxed mb-10 text-pretty"
            >
              New arrivals, restocks, and the occasional story about the makers
              behind our products. No spam, ever. Unsubscribe any time.
            </motion.p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-[#f4a261]/20 flex items-center justify-center mb-2">
                  <Check className="w-7 h-7 text-[#f4a261]" />
                </div>
                <p className="text-white font-semibold text-lg">
                  You&rsquo;re on the list.
                </p>
                <p className="text-white/50 text-sm">
                  Welcome to the Lumio community. Watch your inbox.
                </p>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-[#f4a261]/60 focus:border-[#f4a261]/60 transition-all duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-[#f4a261] text-white font-semibold text-sm hover:bg-[#e76f51] transition-colors duration-300 whitespace-nowrap shadow-[0_4px_14px_rgba(244,162,97,0.3)]"
                >
                  Subscribe
                </motion.button>
              </motion.form>
            )}

            <motion.p
              variants={fadeIn}
              className="text-white/30 text-xs mt-5"
            >
              Join 12,000+ subscribers. Unsubscribe any time.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}