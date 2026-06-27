import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumio — Modern Goods for Modern Living",
  description:
    "Discover curated, design-forward products built for everyday life. Shop the latest drops at Lumio.",
  openGraph: {
    title: "Lumio — Modern Goods for Modern Living",
    description:
      "Discover curated, design-forward products built for everyday life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-[#fafaf8] text-[#1a1a1a] antialiased font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}