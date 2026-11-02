import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-sans", display: "swap", weight: "100 900",
});
const mono = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-mono", display: "swap", weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bedantika Mondal — Intelligence × Expression",
  description: "B.Tech Computer Science student specializing in AI. Exploring artificial intelligence, creative technology, and expressive digital experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geist.variable} ${mono.variable}`}><body>{children}</body></html>;
}
