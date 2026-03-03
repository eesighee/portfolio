import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "../components/LenisProvider";
import Navbar from "../components/Navbar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  ),
  title: "Fotos de Alegria",
  description:
    "Personal photography portfolio by Isai Alegria — photos and small gallery",
  openGraph: {
    title: "Fotos de Alegria",
    description:
      "Personal photography portfolio by Isai Alegria — photos and small gallery",
    images: [{ url: "/photos/hero/austin_storm.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fotos de Alegria",
    description:
      "Personal photography portfolio by Isai Alegria — photos and small gallery",
    images: ["/photos/hero/austin_storm.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${cormorant.variable} ${outfit.variable} antialiased`}
      >
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
        <div className="copyright-badge">&copy; 2026 Alegria Productions</div>
      </body>
    </html>
  );
}
