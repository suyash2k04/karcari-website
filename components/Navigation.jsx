"use client";

import { useEffect, useState } from "react";

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M9 5h10v10" /></svg>;
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav-shell">
        <a className="brand-lockup" href="#top" onClick={close} aria-label="Karcari home">
          <span className="brand-seal">क</span>
          <span className="brand-type"><strong>karcari</strong><small>Natural Food. Nourished Life.</small></span>
        </a>

        <nav className="nav-menu" aria-label="Primary navigation">
          <a href="#thinking" onClick={close}>Why Karcari</a>
          <a href="#pantry" onClick={close}>Consumer Pantry</a>
          <a href="#ingredients" onClick={close}>B2B Ingredients</a>
          <a href="#business" onClick={close}>Partnerships</a>
        </nav>

        <div className="nav-actions">
          <a className="nav-business" href="mailto:connect@karcari.com?subject=Karcari%20Business%20Enquiry">Business enquiry</a>
          <a className="nav-retail" href="https://www.karcari.in/products" target="_blank" rel="noreferrer">Shop retail <Arrow /></a>
        </div>

        <button className="nav-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
          <span /><span />
        </button>
      </div>
    </header>
  );
}
