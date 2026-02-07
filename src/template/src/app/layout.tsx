import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Untitled",
  icons: {
    icon: "/favicon.ico",
  },
};

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
