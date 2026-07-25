"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ingredientProducts, retailProducts } from "@/data/products";

function Arrow({ down = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={down ? "arrow-down" : ""}>
      <path d={down ? "M12 4v16m-6-6 6 6 6-6" : "M5 19 19 5M9 5h10v10"} />
    </svg>
  );
}

function Check() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.2 4.2L19 6.8" /></svg>;
}

function Mail() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
}

const enquiryLink = (product) => {
  const subject = encodeURIComponent(`Karcari B2B Enquiry — ${product}`);
  const body = encodeURIComponent(
    `Hello Karcari Team,\n\nI would like to enquire about ${product}.\n\nCompany name:\nRequired format / grade:\nEstimated quantity:\nApplication:\nLocation:\nPhone:\n\nRegards,`
  );
  return `mailto:connect@karcari.com?subject=${subject}&body=${body}`;
};

export default function KarcariExperience() {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const theatreRef = useRef(null);
  const selected = retailProducts[active];

  const theme = useMemo(() => ({
    "--accent": selected.accent,
    "--accent-2": selected.accent2,
    "--glow": selected.glow,
    "--deep": selected.deep
  }), [selected]);

  useEffect(() => {
    if (manual) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % retailProducts.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [manual]);

  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const choose = (index) => {
    setManual(true);
    setActive(index);
  };

  const onPointerMove = (event) => {
    const node = theatreRef.current;
    if (!node || window.innerWidth < 900) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--mx", `${x * 14}px`);
    node.style.setProperty("--my", `${y * 10}px`);
    node.style.setProperty("--rx", `${-y * 2.5}deg`);
    node.style.setProperty("--ry", `${x * 4}deg`);
  };

  const resetPointer = () => {
    const node = theatreRef.current;
    if (!node) return;
    node.style.setProperty("--mx", "0px");
    node.style.setProperty("--my", "0px");
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  };

  return (
    <>
      <section className="hero" id="top" style={theme}>
        <div className="hero-scenes" aria-hidden="true">
          {retailProducts.map((product, index) => (
            <Image
              key={product.id}
              src={product.scene}
              alt=""
              fill
              priority={index < 2}
              sizes="100vw"
              className={index === active ? "is-active" : ""}
            />
          ))}
          <div className="hero-scene-shade" />
          <div className="hero-noise" />
        </div>

        <div className="hero-layout shell">
          <div className="hero-copy">
            <div className="hero-status">
              <span className="live-dot" />
              <span>Karcari Morning System</span>
              <strong>{selected.index} / 05</strong>
            </div>

            <p className="hero-mode" key={`${selected.id}-mode`}>{selected.mode}</p>
            <h1 key={`${selected.id}-headline`}>
              Mornings move fast.<br />
              <em>Breakfast can keep up.</em>
            </h1>
            <p className="hero-product-line" key={`${selected.id}-line`}>{selected.heroLine}</p>
            <p className="hero-description" key={`${selected.id}-description`}>{selected.description}</p>

            <div className="hero-actions">
              <a className="button button-primary" href={selected.link} target="_blank" rel="noreferrer">
                Shop {selected.short} <Arrow />
              </a>
              <a className="button button-text" href="#pantry">Explore the pantry <Arrow down /></a>
            </div>
          </div>

          <div
            className="product-theatre"
            ref={theatreRef}
            onPointerMove={onPointerMove}
            onPointerLeave={resetPointer}
            aria-live="polite"
          >
            <div className="telemetry-ring" aria-hidden="true">
              <span className="ring-label ring-label-a"><small>SOAKING</small><strong>00</strong></span>
              <span className="ring-label ring-label-b"><small>GRINDING</small><strong>00</strong></span>
              <span className="ring-label ring-label-c"><small>ROUTINE</small><strong>3 STEPS</strong></span>
            </div>

            <div className="ingredient-stage" aria-hidden="true">
              {retailProducts.map((product, index) => (
                <Image
                  key={product.id}
                  src={product.ingredients}
                  alt=""
                  fill
                  sizes="42vw"
                  className={index === active ? "is-active" : ""}
                />
              ))}
            </div>

            <div className="pack-stage">
              {retailProducts.map((product, index) => (
                <Image
                  key={product.id}
                  src={product.cutout}
                  alt={`Karcari ${product.name} pack`}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 800px) 58vw, 27vw"
                  className={index === active ? "is-active" : ""}
                />
              ))}
            </div>

            <div className="theatre-caption">
              <span>{selected.name}</span>
              <small>Ready-to-cook breakfast mix</small>
            </div>
          </div>
        </div>

        <div className="hero-switcher shell" aria-label="Select a Karcari product">
          <div className="switcher-title"><span>Choose your morning</span><i /></div>
          <div className="switcher-track">
            {retailProducts.map((product, index) => (
              <button
                key={product.id}
                type="button"
                className={index === active ? "is-active" : ""}
                onClick={() => choose(index)}
                aria-pressed={index === active}
              >
                <span>{product.index}</span>
                <strong>{product.short}</strong>
                <i />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="promise-strip" aria-label="Karcari preparation promise">
        <div className="shell promise-grid">
          <article><span>01</span><strong>No soaking</strong><p>Skip the overnight preparation cycle.</p></article>
          <article><span>02</span><strong>No grinding</strong><p>Move straight from pack to batter.</p></article>
          <article><span>03</span><strong>Just add water</strong><p>A familiar breakfast in a simpler routine.</p></article>
        </div>
      </section>

      <section className="brand-thesis" id="thinking">
        <div className="shell thesis-grid">
          <div className="thesis-copy" data-reveal>
            <p className="eyebrow">Why Karcari exists</p>
            <h2>Traditional breakfast should not demand a traditional schedule.</h2>
            <p>Karcari translates familiar Indian food into dependable ready-to-cook formats—so convenience does not have to feel disconnected from culture, nourishment or taste.</p>
            <a href="#pantry" className="text-link">Meet the consumer collection <Arrow /></a>
          </div>
          <div className="thesis-visual" data-reveal style={theme}>
            <div className="time-dial">
              <span className="dial-copy"><small>PREPARATION REMOVED</small><strong>SOAK + GRIND</strong></span>
              <div className="dial-pack"><Image src={selected.cutout} alt={`${selected.name} pack`} fill sizes="300px" /></div>
              <i className="dial-hand" />
            </div>
          </div>
        </div>
      </section>

      <section className="premium-definition">
        <div className="shell premium-grid">
          <div className="premium-sticky" data-reveal>
            <p className="eyebrow">What premium means here</p>
            <h2>Premium is not how loudly a brand announces itself.</h2>
            <p>It is how carefully every detail removes friction, builds confidence and delivers a result people want to repeat.</p>
          </div>
          <div className="premium-steps">
            <article data-reveal>
              <span>01</span>
              <div><small>INGREDIENT INTENT</small><h3>A product story people can understand.</h3><p>Each variant begins with a clear ingredient idea—from multigrain and millet to palak and beetroot.</p></div>
            </article>
            <article data-reveal>
              <span>02</span>
              <div><small>ROUTINE DESIGN</small><h3>Convenience that solves a real morning problem.</h3><p>No decorative complexity: the value is visible in fewer steps, easier preparation and a familiar format.</p></div>
            </article>
            <article data-reveal>
              <span>03</span>
              <div><small>REPEATABLE EXPERIENCE</small><h3>A result designed to earn the next purchase.</h3><p>Premium is the confidence that the pack, preparation and final plate will feel considered every time.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="pantry" id="pantry">
        <div className="shell section-heading" data-reveal>
          <div><p className="eyebrow">The Karcari Pantry</p><h2>Five ways to change the morning.</h2></div>
          <p>Select any product below. Each card opens its own exact page on Karcari.in for retail ordering and payment.</p>
        </div>

        <div className="pantry-grid shell">
          {retailProducts.map((product, index) => (
            <article className={`pantry-card ${index === active ? "is-selected" : ""}`} key={product.id} data-reveal style={{ "--card-accent": product.accent, "--card-deep": product.deep }}>
              <a className="pantry-card-link" href={product.link} target="_blank" rel="noreferrer" aria-label={`Shop ${product.name} on Karcari.in`}>
                <div className="pantry-media">
                  <Image src={product.scene} alt={`${product.name} ingredients and serving`} fill sizes="(max-width: 800px) 92vw, 38vw" />
                  <div className="pantry-pack"><Image src={product.cutout} alt={`${product.name} pack`} fill sizes="180px" /></div>
                  <span className="pantry-number">{product.index}</span>
                </div>
                <div className="pantry-copy">
                  <div><small>{product.mode}</small><h3>{product.name}</h3></div>
                  <p>{product.description}</p>
                  <span className="pantry-action">Shop exact product <Arrow /></span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="ingredient-studio" id="ingredients">
        <div className="shell ingredient-heading" data-reveal>
          <div><p className="eyebrow">The Ingredient Studio</p><h2>From harvest to production line.</h2></div>
          <div><p>Dehydrated powders and flakes for manufacturers, health brands, commercial kitchens, distributors and private-label partners.</p><a href={enquiryLink("Complete Dehydrated Ingredient Range")} className="text-link">Enquire about all products <Arrow /></a></div>
        </div>

        <div className="ingredient-grid shell">
          {ingredientProducts.map((product) => (
            <article className="ingredient-card" key={product.id} data-reveal style={{ "--ingredient-accent": product.accent }}>
              <div className="ingredient-image">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 800px) 92vw, 31vw" />
                <span>{product.badge}</span>
              </div>
              <div className="ingredient-copy">
                <small>{product.category}</small>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="spec-list">{product.specs.map((spec) => <span key={spec}>{spec}</span>)}</div>
                <div className="ingredient-foot">
                  <a href={enquiryLink(product.name)} className="ingredient-enquire"><Mail /> Enquire now</a>
                  <strong><Check /> {product.proof}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="business" id="business">
        <div className="business-backdrop" aria-hidden="true"><span>KARCARI</span></div>
        <div className="shell business-head" data-reveal>
          <p className="eyebrow">Built for business conversations</p>
          <h2>One portfolio.<br />Multiple commercial possibilities.</h2>
        </div>
        <div className="shell business-grid">
          {[
            ["Distribution", "Bring Karcari consumer products to new markets and retail networks.", "Distribution Partnership Enquiry"],
            ["Institutional supply", "Discuss food-service, hospitality, corporate and high-volume requirements.", "Institutional Supply Enquiry"],
            ["Private label", "Explore product-development and manufacturing conversations for your brand.", "Private Label Enquiry"]
          ].map(([title, copy, subject], index) => (
            <a href={`mailto:connect@karcari.com?subject=${encodeURIComponent(subject)}`} key={title} data-reveal>
              <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><strong>Start conversation <Arrow /></strong>
            </a>
          ))}
        </div>
        <div className="shell business-email" data-reveal>
          <span>All business enquiries</span>
          <a href="mailto:connect@karcari.com">connect@karcari.com <Arrow /></a>
        </div>
      </section>
    </>
  );
}
