// app/layout.js
"use client";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import "./globals.css";
import { metadata } from "./metadata"; // Import metadata from the separate file

// Font setup
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

 // This directive makes the component a Client Component

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

// You can still use `metadata` where needed in your app, just not in this Client Component
