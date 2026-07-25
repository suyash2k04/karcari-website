import "./globals.css";
import { Cormorant_Garamond, Manrope } from "next/font/google";

const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["500", "600", "700"] });

export const metadata = {
  title: "Karcari — Better Mornings. Better Ingredients.",
  description: "Explore Karcari ready-to-cook consumer foods, dehydrated powders and flakes, distribution, institutional supply and private-label opportunities."
};

export default function RootLayout({ children }) {
  return <html lang="en"><body className={`${body.variable} ${display.variable}`}>{children}</body></html>;
}
