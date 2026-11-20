import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.karcari.in";
export const metadata = {
 metadataBase: new URL(siteUrl),
 title: { default: "Karcari Products | Ready-to-Cook Premixes & Ingredient Powders", template: "%s | Karcari" },
 description: "Discover Karcari ready-to-cook dosa, chilla, soup, smoothie and pancake premixes, traditional favourites and B2B ingredient powders.",
 applicationName: "Karcari Products",
 robots: { index: true, follow: true },
 openGraph: { type:"website", locale:"en_IN", title:"Karcari Products | Good Food, Made Easier", description:"Wholesome ready-to-cook premixes inspired by Indian food traditions.", images:[{url:"/brand/karcari-logo.png",width:641,height:916,alt:"Karcari Products"}] },
 twitter: {card:"summary", title:"Karcari Products | Good Food, Made Easier"},
};
export default function RootLayout({ children }) {
 return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body></html>;
}
