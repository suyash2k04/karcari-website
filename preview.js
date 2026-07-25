(() => {
  const products = window.KARCARI_PRODUCTS || [];
  const hero = document.querySelector('.hero');
  const theatre = document.querySelector('.product-theatre');
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-menu a');
  let active = 0;
  let manual = false;
  let timer;

  const q = (selector) => document.querySelector(selector);
  const qa = (selector) => [...document.querySelectorAll(selector)];

  function update(index) {
    active = index;
    const p = products[index];
    if (!p || !hero) return;
    hero.style.setProperty('--accent', p.accent);
    hero.style.setProperty('--accent-2', p.accent2);
    hero.style.setProperty('--glow', p.glow);
    hero.style.setProperty('--deep', p.deep);

    q('#hero-index').textContent = `${p.index} / 05`;
    q('#hero-mode').textContent = p.mode;
    q('#hero-line').textContent = p.heroLine;
    q('#hero-description').textContent = p.description;
    q('#hero-shop').href = p.link;
    q('#hero-shop-name').textContent = p.short;
    q('#theatre-name').textContent = p.name;
    q('#dial-pack').src = p.cutout;
    q('#dial-pack').alt = `${p.name} pack`;
    const thesis = q('.thesis-visual');
    if (thesis) {
      thesis.style.setProperty('--accent', p.accent);
      thesis.style.setProperty('--glow', p.glow);
    }

    ['[data-hero-scene]', '[data-hero-ingredients]', '[data-hero-pack]', '[data-product-index]'].forEach((selector) => {
      qa(selector).forEach((node, i) => node.classList.toggle('is-active', i === index));
    });
    qa('.pantry-card').forEach((node, i) => node.classList.toggle('is-selected', i === index));

    ['#hero-mode', '#hero-line', '#hero-description'].forEach((selector) => {
      const node = q(selector);
      if (!node) return;
      node.style.animation = 'none';
      requestAnimationFrame(() => {
        node.style.animation = '';
      });
    });
  }

  function restartAuto() {
    clearInterval(timer);
    if (manual) return;
    timer = setInterval(() => update((active + 1) % products.length), 7000);
  }

  qa('[data-product-index]').forEach((button, index) => {
    button.addEventListener('click', () => {
      manual = true;
      update(index);
      clearInterval(timer);
    });
  });

  const onScroll = () => nav?.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle?.addEventListener('click', () => nav?.classList.toggle('is-open'));
  navLinks.forEach((link) => link.addEventListener('click', () => nav?.classList.remove('is-open')));

  let raf = 0;
  theatre?.addEventListener('pointermove', (event) => {
    if (window.innerWidth < 900) return;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rect = theatre.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      theatre.style.setProperty('--mx', `${x * 14}px`);
      theatre.style.setProperty('--my', `${y * 10}px`);
      theatre.style.setProperty('--rx', `${-y * 2.5}deg`);
      theatre.style.setProperty('--ry', `${x * 4}deg`);
    });
  }, { passive: true });
  theatre?.addEventListener('pointerleave', () => {
    theatre.style.setProperty('--mx', '0px');
    theatre.style.setProperty('--my', '0px');
    theatre.style.setProperty('--rx', '0deg');
    theatre.style.setProperty('--ry', '0deg');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  qa('[data-reveal]').forEach((node) => observer.observe(node));

  update(0);
  restartAuto();
})();
