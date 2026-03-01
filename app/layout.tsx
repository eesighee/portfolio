import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import DisableDevtools from "../components/DisableDevtools";
import { LenisProvider } from "../components/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>
          {/* Client component that attempts to disable React DevTools and common shortcuts in production */}
          <DisableDevtools />
          {children}
        </LenisProvider>
        <div className="gemini-watermark">&copy; 2026 Alegria Productions</div>
      </body>
    </html>
  );
}
