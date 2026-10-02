/* Basilico — interacción mínima, sin dependencias */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Hora local del restaurante (Europe/Madrid) */
  function madridNow() {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day, min: +get('hour') * 60 + +get('minute') };
  }
  const toMin = (h) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
  const fmt = (h) => (h === '24:00' ? '00:00' : h);

  const L = {
    es: {
      open: (c) => `Abierto ahora · hasta las ${c}`,
      laterToday: (o) => `Cerrado ahora · abrimos hoy a las ${o}`,
      tomorrow: (o) => `Cerrado ahora · abrimos mañana a las ${o}`,
      onDay: (d, o) => `Cerrado ahora · abrimos el ${d} a las ${o}`,
      days: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      today: 'hoy',
    },
    en: {
      open: (c) => `Open now · until ${c}`,
      laterToday: (o) => `Closed now · opens today at ${o}`,
      tomorrow: (o) => `Closed now · opens tomorrow at ${o}`,
      onDay: (d, o) => `Closed now · opens ${d} at ${o}`,
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      today: 'today',
    },
  };

  function statusText(hours, lang) {
    const t = L[lang] || L.es;
    const { day, min } = madridNow();
    for (const [o, c] of hours[day] || []) {
      if (min >= toMin(o) && min < toMin(c)) return { open: true, text: t.open(fmt(c)) };
    }
    for (const [o] of hours[day] || []) {
      if (min < toMin(o)) return { open: false, text: t.laterToday(o) };
    }
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      const r = hours[d];
      if (r && r.length) return { open: false, text: i === 1 ? t.tomorrow(r[0][0]) : t.onDay(t.days[d], r[0][0]) };
    }
    return null;
  }

  $$('[data-status]').forEach((el) => {
    try {
      const hours = JSON.parse(el.dataset.hours);
      const res = statusText(hours, el.dataset.lang);
      if (!res) return;
      $('.status__text', el).textContent = res.text;
      el.classList.add(res.open ? 'is-open' : 'is-closed');
    } catch (e) { /* se queda el texto estático */ }
  });

  /* ── Día de hoy en las tablas de horario */
  const today = madridNow().day;
  $$('.hours tr[data-day]').forEach((tr) => {
    if (+tr.dataset.day !== today) return;
    tr.classList.add('is-today');
    const lang = document.documentElement.lang;
    const tag = document.createElement('span');
    tag.className = 'today';
    tag.textContent = (L[lang] || L.es).today;
    $('th', tr).append(tag);
  });

  /* ── Selector de pasta + salsa */
  const builder = $('[data-builder]');
  if (builder) {
    const dish = $('[data-order-dish]', builder);
    const priceEl = $('[data-order-price]', builder);
    const order = $('[data-order]', builder);
    const word = builder.dataset.with;
    const update = () => {
      const shape = $('input[name="shape"]:checked', builder);
      const sauce = $('input[name="sauce"]:checked', builder);
      if (!shape || !sauce) return;
      dish.textContent = `${shape.value} ${word} ${sauce.value}`;
      priceEl.textContent = sauce.dataset.price;
      if (!reduced) { order.classList.remove('is-bump'); void order.offsetWidth; order.classList.add('is-bump'); }
    };
    builder.addEventListener('change', update);
  }

  /* ── Buscador de la carta */
  const finder = $('[data-finder]');
  if (finder) {
    const empty = $('[data-finder-empty]');
    const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
    const run = () => {
      const q = norm(finder.value);
      let any = false;
      $$('[data-cat]').forEach((cat) => {
        let catHas = false;
        $$('.dish, .pick', cat).forEach((d) => {
          const hit = !q || d.dataset.search.includes(q);
          d.hidden = !hit;
          if (hit) catHas = true;
        });
        $$('.cat__group', cat).forEach((g) => { g.hidden = !$$('.dish', g).some((d) => !d.hidden); });
        cat.hidden = !catHas;
        if (catHas) any = true;
      });
      empty.hidden = any;
    };
    finder.addEventListener('input', run);
  }

  /* ── Scroll-spy de las familias de la carta */
  const nav = $('.catnav');
  if (nav && 'IntersectionObserver' in window) {
    const links = new Map($$('a', nav).map((a) => [a.getAttribute('href').slice(1), a]));
    let current = null;
    const setCurrent = (id) => {
      if (id === current) return;
      current = id;
      links.forEach((a, k) => a.setAttribute('aria-current', k === id ? 'true' : 'false'));
      const a = links.get(id);
      if (a) {
        const ul = a.closest('ul');
        const left = a.offsetLeft - ul.clientWidth / 2 + a.clientWidth / 2;
        ul.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' });
      }
    };
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setCurrent(visible[0].target.id);
    }, { rootMargin: '-140px 0px -60% 0px' });
    $$('[data-cat]').forEach((s) => io.observe(s));
  }

  /* ── Indicador de más familias a la derecha */
  $$('.catnav ul').forEach((ul) => {
    const check = () => {
      ul.classList.toggle('has-more', ul.scrollLeft + ul.clientWidth < ul.scrollWidth - 8);
      ul.classList.toggle('has-less', ul.scrollLeft > 8);
    };
    ul.addEventListener('scroll', check, { passive: true });
    addEventListener('resize', check);
    check();
  });

  /* ── Mapa bajo demanda (OpenStreetMap) */
  $$('[data-map]').forEach((box) => {
    const btn = $('button', box);
    btn.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.src = box.dataset.src;
      f.title = box.dataset.title;
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer';
      box.replaceChildren(f);
      box.classList.add('is-loaded');
    }, { once: true });
  });

  /* ── La mesa: cada plato se desplaza a su ritmo al hacer scroll */
  const dishes = $$('.tdish[data-depth]');
  if (dishes.length && !reduced) {
    const table = $('.table');
    let tick = false;
    const wide = matchMedia('(min-width: 900px)');
    const move = () => {
      const y = wide.matches ? Math.min(window.scrollY, table.offsetHeight) : 0;
      dishes.forEach((d, i) => {
        const k = +d.dataset.depth;
        d.style.setProperty('--py', `${(-y * k).toFixed(1)}px`);
        d.style.setProperty('--rot', `${(y * k * (i % 2 ? -0.08 : 0.08)).toFixed(2)}deg`);
      });
      tick = false;
    };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(move); } }, { passive: true });
  }

  /* ── El pase: botones anterior / siguiente */
  $$('[data-rail]').forEach((rail) => {
    const section = rail.closest('section');
    const prev = $('[data-rail-prev]', section);
    const next = $('[data-rail-next]', section);
    if (!prev || !next) return;
    const step = () => {
      const item = $('.order', rail);
      return item ? (item.offsetWidth + parseFloat(getComputedStyle(item.parentElement).columnGap || 0)) * 2 : rail.clientWidth * 0.8;
    };
    const sync = () => {
      prev.disabled = rail.scrollLeft < 8;
      next.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8;
    };
    prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: reduced ? 'auto' : 'smooth' }));
    rail.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
    sync();
  });

  /* ── El borde del plato gira con el scroll */
  if (!reduced) {
    const rims = $$('[data-plate] .plate__rim');
    if (rims.length) {
      let ticking = false;
      const visible = new Set();
      const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target))));
      rims.forEach((r, i) => { r.dataset.dir = i % 2 ? -1 : 1; io.observe(r); });
      const turn = () => {
        const y = window.scrollY;
        visible.forEach((r) => r.style.setProperty('--turn', `${(y * 0.06 * r.dataset.dir).toFixed(2)}deg`));
        ticking = false;
      };
      addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(turn); } }, { passive: true });
    }
  }
})();
