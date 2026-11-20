"use client";

import { useEffect, useState } from "react";
import { buildWhatsappLink } from "@/lib/contact";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M27.3 4.7A15.55 15.55 0 0 0 16.2 0C7.58 0 .56 7.02.56 15.65c0 2.76.72 5.46 2.1 7.83L0 33l9.75-2.56a15.58 15.58 0 0 0 7.45 1.9h.01c8.62 0 15.65-7.02 15.65-15.65 0-4.18-1.63-8.1-4.56-11.03ZM16.2 29.7a13 13 0 0 1-6.63-1.82l-.48-.28-5.79 1.52 1.55-5.65-.31-.5a13.03 13.03 0 0 1-2-6.95C2.54 8.83 8.4 2.97 15.6 2.97c3.5 0 6.78 1.36 9.25 3.83a12.96 12.96 0 0 1 3.82 9.24c0 7.19-5.86 13.05-13.06 13.05h.59Z" />
      <path d="M23.35 19.66c-.42-.21-2.5-1.23-2.89-1.37-.39-.14-.67-.21-.95.21-.28.42-1.09 1.37-1.33 1.65-.25.28-.49.32-.91.11-.42-.21-1.77-.65-3.37-2.08-1.25-1.11-2.09-2.49-2.34-2.91-.25-.42-.03-.65.18-.86.19-.19.42-.49.63-.74.21-.25.28-.42.42-.7.14-.28.07-.53-.04-.74-.1-.21-.95-2.29-1.3-3.14-.34-.82-.69-.71-.95-.72h-.81c-.28 0-.74.1-1.12.53-.39.42-1.48 1.44-1.48 3.52s1.51 4.08 1.72 4.36c.21.28 2.97 4.54 7.2 6.37 1 .43 1.79.69 2.4.88 1.01.32 1.93.28 2.65.17.81-.12 2.5-1.02 2.85-2 .35-.98.35-1.82.25-2-.1-.18-.38-.28-.8-.49Z" />
    </svg>
  );
}

export default function FloatingWhatsApp({ heroRef }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = heroRef?.current;
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0),
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroRef]);

  return (
    <a
      className={`floating-whatsapp ${visible ? "is-visible" : ""}`}
      href={buildWhatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire with Karcari on WhatsApp"
    >
      <span className="floating-whatsapp-icon"><WhatsAppIcon /></span>
      <span className="floating-whatsapp-copy"><small>QUICK ENQUIRY</small><strong>WhatsApp us</strong></span>
    </a>
  );
}
