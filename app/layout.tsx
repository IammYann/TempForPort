import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunny Patel - Full-Stack Developer",
  description:
    "Full-stack developer and cloud engineer. Building scalable applications with React, Next.js, and cloud technologies.",
  keywords: [
    "developer",
    "full-stack",
    "cloud engineer",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Sunny Patel" }],
  creator: "Sunny Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sunnypatel.dev",
    title: "Sunny Patel - Full-Stack Developer",
    description:
      "Full-stack developer and cloud engineer. Building scalable applications with React, Next.js, and cloud technologies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunny Patel - Full-Stack Developer",
    description:
      "Full-stack developer and cloud engineer. Building scalable applications with React, Next.js, and cloud technologies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050816" />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
