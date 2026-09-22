import type { Metadata } from "next";
import { Instrument_Serif, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "@/app/globals.css";

const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const prose = Newsreader({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-prose",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DPI-HT-01 · Forensic Reconstruction · Sebastjans Peive (220592)",
  description:
    "Case DPI-HT-01 submission by Sebastjans Peive, student 220592. Reconstructed Profit and Loss, Cash Flow and Balance Sheet for Divorce Party International Ltd. at 31 August 2026. Certified net profit 72,000 against a claimed 312,000. All 100 decisions certified, 25 material judgments with a two-agent review trail. Machine-readable answer at /submission.json.",
  alternates: {
    types: { "application/json": "/submission.json" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${prose.variable} ${mono.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
