"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { buildEmailLink, INDIA_MART_URL, RETAIL_URL } from "@/lib/contact";

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M9 5h10v10" /></svg>;
}

export default function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-nav ${open ? "is-open" : ""}`}>
      <div className="nav-shell">
        <a className="brand-lockup" href="#top" onClick={close} aria-label="Karcari home">
          <Image className="brand-logo-actual" src="/brand/karcari-logo-navbar.webp" alt="Karcari Products" width={152} height={104} priority sizes="152px" />
        </a>

        <nav className="nav-menu" id="primary-navigation" aria-label="Primary navigation">
          <a href="#premix-range" onClick={close}>Premixes</a>
          <a href="#powders" onClick={close}>Ingredients</a>
          <a href="#our-story" onClick={close}>Our Story</a>
          <a href="#reviews" onClick={close}>Reviews</a>
        </nav>

        <div className="nav-actions">
          <a className="nav-business" href={buildEmailLink("Karcari Business Enquiry")}>Email enquiry</a>
          <a className="nav-business" onClick={close} href={INDIA_MART_URL || "#indiamart"} target={INDIA_MART_URL ? "_blank" : undefined} rel={INDIA_MART_URL ? "noopener noreferrer" : undefined}>IndiaMART</a>
          <a className="nav-retail" href={RETAIL_URL} target="_blank" rel="noopener noreferrer">Shop retail <Arrow /></a>
        </div>

        <button className="nav-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-navigation">
          <span /><span />
        </button>
      </div>
    </header>
  );
}
