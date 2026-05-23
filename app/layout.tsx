import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Would You Have Survived? — Armenian Genocide 1915",
  description:
    "Enter your demographic profile to learn your survival probability during the 1915 Armenian Genocide, and discover the history behind the numbers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`}>
      <body className="bg-stone-950 text-stone-100 antialiased">{children}</body>
    </html>
  );
}
