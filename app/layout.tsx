import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "DPI-HT-01 Forensic Reconstruction",
  description:
    "Reconstructed Profit and Loss, Cash Flow and Balance Sheet for Divorce Party International Ltd. at 31 August 2026, with a traceable evidence and decision trail.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
