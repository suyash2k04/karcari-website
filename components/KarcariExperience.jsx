"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { premixGroups } from "@/data/products";
import { buildEmailLink, buildWhatsappLink, INDIA_MART_URL, RETAIL_URL } from "@/lib/contact";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const categoryLabels = {
  breakfast: "Dosa & Chilla",
  specialty: "Specialty",
  soups: "Soups",
  smoothies: "Smoothies",
  pancakes: "Pancakes",
};

export default function KarcariExperience({ premixProducts, ingredientProducts }) {
  const heroRef = useRef(null);
  const [motionPaused, setMotionPaused] = useState(false);
  const [filter, setFilter] = useState("all");
  const indiaMartProducts = premixProducts.filter(product => product.indiaMartUrl);
  const catalogRef = useRef(null);
  const filters = [{ id: "all", title: "All premixes" }, ...premixGroups];
  const visible = filter === "all" ? premixProducts : premixProducts.filter(product => product.group === filter);

  useEffect(() => {
    if (!window.IntersectionObserver || !window.matchMedia || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("reveal-in");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    catalogRef.current.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function moveHero(event) {
    if (motionPaused || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    const hero = event.currentTarget;
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    hero.style.setProperty("--hero-x", x.toFixed(3));
    hero.style.setProperty("--hero-y", y.toFixed(3));
  }

  function resetHero() {
    heroRef.current.style.removeProperty("--hero-x");
    heroRef.current.style.removeProperty("--hero-y");
  }

  return (
    <div ref={catalogRef}>
      <section className="catalog-hero" id="top" ref={heroRef} aria-labelledby="hero-heading"
        data-motion-paused={motionPaused} onPointerMove={moveHero} onPointerLeave={resetHero}>
        <div className="hero-photo">
          <div className="hero-camera">
            <Image src="/brand/karcari-premix-hero.webp" alt="" fill sizes="100vw" quality={85} preload />
          </div>
        </div>
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker">Karcari</p>
            <h1 id="hero-heading">Ready-to-cook<br /><em>Indian premixes.</em></h1>
            <p>From dosas and chillas to soups, pancakes, smoothies and festive Puran Poli, make your favourites at home with less prep.</p>
            <div className="hero-actions">
              <a className="button hero-button" href="#premix-range">Browse premixes <span aria-hidden="true">↓</span></a>
              <a className="hero-retail" href={RETAIL_URL} target="_blank" rel="noopener noreferrer">Shop online ↗</a>
            </div>
          </div>
        </div>
        <button className="hero-motion" type="button" onClick={() => {
          resetHero();
          setMotionPaused(paused => !paused);
        }}>{motionPaused ? "Play motion" : "Pause motion"}</button>
      </section>

      <section className="shell collection" id="premix-range" aria-labelledby="collection-heading">
        <div className="section-heading" data-reveal>
          <div><p className="eyebrow">The Karcari collection</p><h2 id="collection-heading">Shop by category.</h2></div>
          <p>Breakfast staples, traditional favourites and comforting cups for busy days.</p>
        </div>
        <div className="catalog-toolbar">
          <div className="product-filters" role="group" aria-label="Filter premixes">
            {filters.map(({ id, title }) => (
              <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>
                {categoryLabels[id] || title}
              </button>
            ))}
          </div>
          <small role="status">{filter === "all" ? `${visible.length} ${visible.length === 1 ? "product" : "products"}` : `${visible.length} of ${premixProducts.length} products`}</small>
        </div>
        {visible.length ? <div className="product-grid filtered-grid" key={filter}>
          {visible.map((product, index) => (
            <article className="product-card" key={product.id} style={{ "--card-delay": `${Math.min(index, 5) * 35}ms` }}>
              <div className="product-photo" style={{ backgroundColor: product.tint || undefined }}>
                {product.image === "/products/actual/jowar-dhirde.webp" ? (
                  <div className="jowar-photo-frame">
                    <Image src={product.image} alt={product.name} width={984} height={1500} sizes="(max-width: 540px) 42vw, (max-width: 900px) 22vw, 14vw" />
                  </div>
                ) : product.image && <Image src={product.image} alt={product.name} fill sizes="(max-width: 540px) 92vw, (max-width: 900px) 45vw, 29vw" />}
                {product.badge && <span className="product-badge">{product.badge}</span>}
              </div>
              <div className="product-copy">
                <p className="eyebrow">{product.category}</p>
                <h3>{product.name}</h3>
                {(product.packSize || product.yieldLabel) && <p className="pack-details">{[product.packSize, product.yieldLabel].filter(Boolean).join(" · ")}</p>}
                {(product.description || product.highlights?.length > 0) && <details>
                  <summary>Product details</summary>
                  <p>{product.description}</p>
                  {product.highlights?.length > 0 && <ul>{product.highlights.map((highlight, index) => <li key={index}>{highlight}</li>)}</ul>}
                </details>}
                <div className="product-links">
                  {product.link ? <a href={product.link} target="_blank" rel="noopener noreferrer">Shop retail ↗</a>
                    : <a href={buildWhatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>}
                  <a href={buildEmailLink(`Karcari Enquiry — ${product.name}`)}>Email enquiry ↗</a>
                  {product.indiaMartUrl && <a href={product.indiaMartUrl} target="_blank" rel="noopener noreferrer">IndiaMART ↗</a>}
                </div>
              </div>
            </article>
          ))}
        </div> : <p className="empty-collection">No premixes are currently available in this category.</p>}
      </section>

      <section className="story" id="our-story" aria-labelledby="story-heading">
        <div className="shell story-grid" data-reveal>
          <div className="story-photo"><Image src="/products/lifestyle/puran-poli.webp" alt="Karcari Puran Poli Premix with prepared puran poli and dal" fill sizes="(max-width: 760px) 100vw, 48vw" /></div>
          <div className="story-copy">
            <p className="eyebrow">Our story</p>
            <h2 id="story-heading">Healthy Living, Made Simpler.</h2>
            <p className="story-lede">Karcari began with a mother’s wish to make healthy food easier for her children.</p>
            <p>Our founder, Poonam, was travelling the world while balancing work and home as a mother of two daughters. She wanted nutritious, wholesome food to be part of everyday life, but fresh meals take time, and busy families rarely have enough of it.</p>
            <p>So she created Karcari.</p>
            <p>The name comes from Sanskrit, <strong>Karcari (कर्चरी)</strong>, meaning the art of dietetics and home-style cooking. Rooted in <strong>Pakashastra</strong>, the ancient wisdom of Indian culinary science, we use modern technology to bring time-honoured food traditions to today’s kitchens. Karcari Products is <strong>FSSAI licensed</strong>.</p>
            <p>From dosa, pancake and chilla premixes to soups, Puran Poli and smoothies like Apple Beetroot Carrot and Ash Gourd Amla Carrot, our range helps you spend <strong>less time preparing and more time enjoying good food together.</strong></p>
            <p>Because life is busy, eating better shouldn’t be difficult.</p>
            <p className="story-signoff">Karcari: Good Food, Made Easier.</p>
          </div>
        </div>
      </section>

      <section className="shell collection" id="powders" aria-labelledby="ingredients-heading">
        <div className="section-heading" data-reveal>
          <div><p className="eyebrow">For food businesses</p><h2 id="ingredients-heading">Ingredient powders & flakes.</h2></div>
          <p>Explore bulk ingredients for manufacturing, food service and commercial kitchens.</p>
        </div>
        {ingredientProducts.length ? <div className="product-grid ingredient-grid">
          {ingredientProducts.map(item => (
            <article className="product-card" key={item.id} data-reveal>
              <div className="product-photo">
                {item.image && <Image src={item.image} alt={item.name} fill sizes="(max-width: 540px) 92vw, (max-width: 900px) 45vw, 29vw" />}
                {item.badge && <span className="product-badge">{item.badge}</span>}
              </div>
              <div className="product-copy">
                <p className="eyebrow">{item.category}</p><h3>{item.name}</h3>
                <p>{item.description}</p>
                {item.specs?.length > 0 && <ul className="ingredient-specs">{item.specs.map((spec, index) => <li key={index}>{spec}</li>)}</ul>}
                {item.proof && <p className="pack-details">{item.proof}</p>}
                <div className="product-links"><a href={buildEmailLink(`Bulk Enquiry — ${item.name}`)}>Bulk enquiry ↗</a></div>
              </div>
            </article>
          ))}
        </div> : <p className="empty-collection">Contact us for current ingredient availability.</p>}
      </section>

      <section className="partnerships shell" id="business" data-reveal aria-labelledby="business-heading">
        <div><p className="eyebrow">Partnerships</p><h2 id="business-heading">Work with Karcari.</h2></div>
        <div className="partnership-links">
          {["Distribution", "Private label", "Institutional supply"].map(subject => (
            <a key={subject} href={buildEmailLink(`${subject} enquiry`)}>{subject} <span aria-hidden="true">↗</span></a>
          ))}
        </div>
      </section>
      {!INDIA_MART_URL && (
        <section className="shell marketplace" id="indiamart" aria-labelledby="indiamart-heading" data-reveal>
          <h2 id="indiamart-heading">Karcari on IndiaMART</h2>
          {indiaMartProducts.length > 0 ? <div className="partnership-links">
            {indiaMartProducts.map(product => <a key={product.id} href={product.indiaMartUrl} target="_blank" rel="noopener noreferrer">{product.name} <span aria-hidden="true">↗</span></a>)}
          </div> : <a href={buildEmailLink("Karcari IndiaMART enquiry")}>Ask about IndiaMART listings ↗</a>}
        </section>
      )}
      <section className="reviews" id="reviews" aria-labelledby="reviews-heading">
        <div className="shell reviews-inner" data-reveal>
          <div>
            <p className="eyebrow">Customer reviews</p>
            <h2 id="reviews-heading">Tried Karcari?</h2>
            <p>Tell us what you made and how it turned out.</p>
          </div>
          <a className="button" href={buildEmailLink("Karcari product review", "Hello Karcari team,\n\nProduct I tried: \nMy review: \n\n")}>Email your review <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <FloatingWhatsApp heroRef={heroRef} />
    </div>
  );
}
