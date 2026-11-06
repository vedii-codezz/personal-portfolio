import type { Metadata } from "next";
import { Instrument_Serif, Newsreader, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { lotusBootstrap } from "@/components/lotus-lifecycle";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap", fallback: ["Georgia", "Times New Roman"] });
const body = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-body", display: "swap", fallback: ["Georgia", "Times New Roman"] });
const bengali = Noto_Serif_Bengali({ subsets: ["bengali"], weight: "400", variable: "--font-bengali", display: "swap", preload: false, fallback: ["Nirmala UI", "serif"] });

export const metadata: Metadata = {
  title: "Bedantika Mondal — Intelligence × Expression",
  description: "B.Tech Computer Science student specializing in AI. Exploring artificial intelligence, creative technology, and expressive digital experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${bengali.variable}`}><head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var p=localStorage.getItem('bedantika-theme');document.documentElement.dataset.theme=p==='light'||p==='dark'?p:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}})()` }} /><script dangerouslySetInnerHTML={{ __html: lotusBootstrap }} /></head><body>{children}</body></html>;
}
