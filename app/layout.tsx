'use client'

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon set with multiple sizes for different contexts */}
        <link rel="icon" type="image/x-icon" href="/photos/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/photos/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/photos/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/photos/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/photos/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>
          {/* Client component that attempts to disable React DevTools and common shortcuts in production */}
          <DisableDevtools />
          {children}
        </LenisProvider>
        <div className="gemini-watermark">© 2025 Alegria Productions</div>
      </body>
    </html>
  );
}
