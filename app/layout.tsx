import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday, Bobby Sir 🎂",
  description:
    "A birthday tribute from your Software Engineering team — wishing you health, joy, and success.",
  openGraph: {
    title: "Happy Birthday, Bobby Sir 🎂",
    description:
      "A heartfelt birthday tribute from your Software Engineering team.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
