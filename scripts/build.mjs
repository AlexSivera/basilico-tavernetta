// Generador estático: node scripts/build.mjs → dist/  (las fotos se preparan aparte con scripts/images.mjs)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tavernetta, spritz } from '../src/data/menu.mjs';
import { SITE_URL, venues, reviewTopics, rating, crossings, days } from '../src/data/site.mjs';
import { photos } from '../src/data/photos.mjs';
import { plateRim, leaf, logoMark, pastaShapes, doughs, icons } from '../src/data/art.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

// ───────────────────────── helpers
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const price = (p, lang) => {
  const whole = Number.isInteger(p);
  if (lang === 'en') return '€' + (whole ? p : p.toFixed(2));
  return (whole ? String(p) : p.toFixed(2).replace('.', ',')) + ' €';
};
const ph = (v, lang) => (lang === 'en' ? '+34 ' : '') + v.phone;
const hhmm = (h) => (h === '24:00' ? '00:00' : h);
const ORDER = [1, 2, 3, 4, 5, 6, 0];

const paths = {
  home: { es: '/', en: '/en/' },
  menu: { es: '/carta/', en: '/en/menu/' },
  spritz: { es: '/spritz/', en: '/en/spritz/' },
};

const SIZES = { sq: [360, 720, 1200], land: [800, 1400, 2200], port: [500, 1000] };
const RATIO = { sq: 1, land: 2 / 3, port: 5 / 4 };

// Foto responsive a partir del manifiesto. deco: alt vacío (la imagen acompaña a un texto que ya lo dice).
function img(key, lang, { sizes = '100vw', eager = false, cls = '', deco = false } = {}) {
  const p = photos[key];
  if (!p) throw new Error('Foto desconocida: ' + key);
  const ws = SIZES[p.shape];
  const w = ws[ws.length - 1];
  return `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${key}-${ws[1] || ws[0]}.webp" srcset="${ws.map((x) => `/assets/img/${key}-${x}.webp ${x}w`).join(', ')}" sizes="${sizes}" width="${w}" height="${Math.round(w * RATIO[p.shape])}" alt="${deco ? '' : esc(p[lang])}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

function plate(key, lang, opts = {}) {
  return `<figure class="plate ${opts.cls || ''}" data-plate>
  ${plateRim()}
  <div class="plate__dish">${img(key, lang, { ...opts, cls: '' })}</div>
</figure>`;
}

// Foto de cada familia de la carta
const familyPhoto = {
  t: { antipastos: 'calamares', croquetas: 'croquetas', panes: 'pan', ensaladas: 'cesar', patatas: 'huevos', romanas: 'pepperoni', napolitanas: 'napolitana', pinsas: 'pinsa', pasta: 'carbonara', salsas: 'penne', risottos: 'risotto', granja: 'solomillo', mar: 'bacalao', postres: 'sundae' },
  s: { vinos: 'vinos', panes: 'pan', ensaladas: 'burrata', picar: 'tapas', patatas: 'quesos', burger: 'burger', costillas: 'costilla', postres: 'tiramisu' },
};

// ───────────────────────── copy
const T = {
  es: {
    skip: 'Saltar al contenido',
    nav: { menu: 'Carta', pasta: 'Pasta', visit: 'Visítanos', spritz: 'Spritz', tav: 'Tavernetta' },
    navLabel: 'Principal',
    langName: 'English', langShort: 'EN',
    call: 'Llamar',
    reserve: 'Reservar mesa',
    directions: 'Cómo llegar',
    closed: 'Cerrado',
    today: 'hoy',
    photosNote: 'Fotografías ilustrativas (Unsplash)',
    rights: 'Basilico · Beniarbeig y Benimeli',
    hoursCaption: 'Horario de apertura',
    hoursNote: '¿Vienes con la hora justa? Llama antes y te lo confirmamos.',
    statusFallback: 'Miércoles a domingo · comidas y cenas',
    statusFallbackSpritz: 'Viernes a domingo',
  },
  en: {
    skip: 'Skip to content',
    nav: { menu: 'Menu', pasta: 'Pasta', visit: 'Visit', spritz: 'Spritz', tav: 'Tavernetta' },
    navLabel: 'Main',
    langName: 'Español', langShort: 'ES',
    call: 'Call',
    reserve: 'Book a table',
    directions: 'Directions',
    closed: 'Closed',
    today: 'today',
    photosNote: 'Illustrative photography (Unsplash)',
    rights: 'Basilico · Beniarbeig & Benimeli',
    hoursCaption: 'Opening hours',
    hoursNote: 'Cutting it close? Give us a call and we’ll confirm.',
    statusFallback: 'Wednesday to Sunday · lunch and dinner',
    statusFallbackSpritz: 'Friday to Sunday',
  },
};

// ───────────────────────── components
function hoursTable(venue, lang) {
  const rows = ORDER.map((d) => {
    const r = venue.hours[d];
    const val = r.length ? r.map((x) => `${hhmm(x[0])}–${hhmm(x[1])}`).join('<span class="sep"> · </span>') : `<span class="is-closed">${T[lang].closed}</span>`;
    return `<tr data-day="${d}"><th scope="row">${days[lang][d]}</th><td>${val}</td></tr>`;
  }).join('');
  return `<table class="hours"><caption class="sr-only">${T[lang].hoursCaption} · ${esc(venue.name)}</caption><tbody>${rows}</tbody></table>`;
}

function status(venue, lang, fallback) {
  return `<p class="status" data-status data-lang="${lang}" data-hours='${JSON.stringify(venue.hours)}'><span class="status__dot" aria-hidden="true"></span><span class="status__text">${fallback}</span></p>`;
}

function header(page, lang) {
  const t = T[lang];
  const isSpritz = page.key === 'spritz';
  const v = isSpritz ? venues.spritz : venues.tavernetta;
  const home = paths.home[lang];
  const alt = paths[page.key][lang === 'es' ? 'en' : 'es'];
  const altLang = lang === 'es' ? 'en' : 'es';
  const items = isSpritz
    ? [[`#carta`, t.nav.menu], [`#visita`, t.nav.visit], [home, t.nav.tav]]
    : [[paths.menu[lang], t.nav.menu], [`${home}#pasta`, t.nav.pasta], [`${home}#visita`, t.nav.visit], [paths.spritz[lang], t.nav.spritz]];
  const current = page.key === 'menu' ? paths.menu[lang] : null;
  return `<header class="top">
  <a class="brand" href="${home}" aria-label="Basilico Tavernetta — ${lang === 'es' ? 'inicio' : 'home'}">${logoMark}<span class="brand__name">Basilico</span><span class="brand__sub">${isSpritz ? '&amp;Spritz' : 'Tavernetta'}</span></a>
  <nav class="top__nav" aria-label="${t.navLabel}"><ul>${items.map(([h, l]) => `<li><a href="${h}"${h === current ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul></nav>
  <a class="top__venue" href="${isSpritz ? home : paths.spritz[lang]}">${isSpritz ? 'Tavernetta' : 'Spritz'}</a>
  <a class="top__lang" href="${alt}" hreflang="${altLang}" lang="${altLang}"><abbr title="${t.langName}">${t.langShort}</abbr></a>
  <a class="btn btn--call top__call" href="tel:${v.tel}">${icons.phone}<span>${ph(v, lang)}</span></a>
</header>`;
}

function dock(page, lang) {
  const t = T[lang];
  const isSpritz = page.key === 'spritz';
  const v = isSpritz ? venues.spritz : venues.tavernetta;
  const menuHref = isSpritz ? '#carta' : paths.menu[lang];
  return `<nav class="dock" aria-label="${lang === 'es' ? 'Acciones rápidas' : 'Quick actions'}">
  <a href="${menuHref}"${page.key === 'menu' ? ' aria-current="page"' : ''}>${icons.menu}<span>${t.nav.menu}</span></a>
  <a class="dock__call" href="tel:${v.tel}">${icons.phone}<span>${t.call}</span></a>
  <a href="${v.maps}" target="_blank" rel="noopener">${icons.pin}<span>${t.directions}</span></a>
</nav>`;
}

function footer(lang) {
  const t = T[lang];
  const tv = venues.tavernetta, sp = venues.spritz;
  const credits = [...new Set(Object.values(photos).map((p) => p.credit))].sort((a, b) => a.localeCompare(b)).join(', ');
  return `<footer class="foot">
  <div class="foot__inner">
    <div class="foot__brand">${logoMark}<p class="foot__word">Basilico</p><p class="foot__tag">Tavernetta italo${leaf('leaf leaf--inline')}valenciana</p></div>
    <div class="foot__venue">
      <h2>${tv.name}</h2>
      <p>${tv.street}<br>${tv.postal} ${tv.town} (${tv.region})</p>
      <p><a href="tel:${tv.tel}">${ph(tv, lang)}</a><br><a href="mailto:${tv.email}">${tv.email}</a></p>
      <p><a class="foot__ig" href="https://www.instagram.com/${tv.instagram}/" rel="noopener" target="_blank">${icons.insta}@${tv.instagram}</a></p>
    </div>
    <div class="foot__venue">
      <h2>${sp.name}</h2>
      <p>${sp.street}<br>${sp.postal} ${sp.town} (${sp.region})</p>
      <p><a href="tel:${sp.tel}">${ph(sp, lang)}</a></p>
      <p><a class="foot__ig" href="https://www.instagram.com/${sp.instagram}/" rel="noopener" target="_blank">${icons.insta}@${sp.instagram}</a></p>
    </div>
  </div>
  <div class="foot__base">
    <p>© 2026 ${t.rights}</p>
    <details class="foot__credits"><summary>${t.photosNote}</summary><p>${esc(credits)}.</p></details>
  </div>
</footer>`;
}

function dishItem(it, lang, level = 3) {
  const d = it.d ? it.d[lang] : '';
  const unit = it.u ? ` <span class="dish__unit">· ${it.u[lang]}</span>` : '';
  const gf = it.tags && it.tags.includes('gf') ? ` <span class="tag">${lang === 'es' ? 'sin gluten' : 'gluten-free'}</span>` : '';
  const search = norm([it.n, it.d ? it.d.es : '', it.d ? it.d.en : ''].join(' '));
  return `<li class="dish" data-search="${esc(search)}">
  <div class="dish__line"><h${level} class="dish__name">${esc(it.n)}${gf}</h${level}><span class="dish__lead" aria-hidden="true"></span><span class="dish__price">${price(it.p, lang)}${unit}</span></div>
  ${d ? `<p class="dish__desc">${esc(d)}</p>` : ''}
</li>`;
}

function category(cat, lang, venueKey) {
  const id = cat.id;
  const note = cat.note ? `<p class="cat__note">${cat.note[lang]}</p>` : '';
  let body = '';
  if (cat.groups) {
    body = cat.groups.map((g) => `<div class="cat__group"><h3 class="cat__sub">${g.title[lang]}</h3><ul class="dishes">${g.items.map((i) => dishItem(i, lang, 4)).join('')}</ul></div>`).join('');
  } else {
    body = `<ul class="dishes${cat.id === 'croquetas' ? ' dishes--compact' : ''}">${cat.items.map((i) => dishItem(i, lang)).join('')}</ul>`;
  }
  if (cat.kind === 'pasta') {
    const sh = cat.shapes;
    const L = lang === 'es'
      ? { t: 'Pasta + salsa', a: 'Pasta al huevo', b: 'Pasta rellena', c: 'Elige la pasta y combínala con una salsa casera. El precio es el de la salsa.', d: 'Ver salsas' }
      : { t: 'Pasta + sauce', a: 'Egg pasta', b: 'Filled pasta', c: 'Choose your pasta and pair it with a homemade sauce. The price is set by the sauce.', d: 'See sauces' };
    body = `<div class="pick" data-search="${esc(norm([...sh.huevo, ...sh.rellena, 'pasta trufa truffle mushroom spinach filled egg huevo rellena'].join(' ')))}">
  <h3 class="cat__sub">${L.t}</h3>
  <p>${L.c}</p>
  <dl class="pick__list"><dt>${L.a}</dt><dd>${sh.huevo.join(' · ')}</dd><dt>${L.b}</dt><dd>${sh.rellena.join(' · ')}</dd></dl>
  <a class="link" href="#salsas">${L.d} ${icons.arrow}</a>
</div>` + body;
  }
  const fp = familyPhoto[venueKey][id];
  const pic = fp ? `<div class="cat__pic">${img(fp, lang, { sizes: '(min-width: 900px) 220px, 96px', deco: true })}</div>` : '';
  return `<section class="cat" id="${id}" aria-labelledby="h-${venueKey}-${id}" data-cat>
  <header class="cat__head"><div class="cat__sticky">${pic}<h2 id="h-${venueKey}-${id}">${cat.title[lang]}</h2>${note}</div></header>
  ${body}
</section>`;
}

function catNav(cats, lang, label) {
  return `<nav class="catnav" aria-label="${label}"><ul>${cats.map((c) => `<li><a href="#${c.id}">${c.title[lang]}</a></li>`).join('')}</ul></nav>`;
}

function finder(lang) {
  const L = lang === 'es'
    ? { l: 'Busca en la carta', p: 'burrata, trufa, gamba…', e: 'Nada con esa palabra. Prueba con otro ingrediente o pregunta en sala.' }
    : { l: 'Search the menu', p: 'burrata, truffle, prawn…', e: 'Nothing matches. Try another ingredient or just ask our team.' };
  return `<div class="finder" role="search">
  <label for="q">${L.l}</label>
  <div class="finder__field">${icons.search}<input id="q" type="search" placeholder="${L.p}" autocomplete="off" spellcheck="false" data-finder></div>
  <p class="finder__empty" data-finder-empty hidden>${L.e}</p>
</div>`;
}

// ───────────────────────── JSON-LD
function hoursSpec(h) {
  const map = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const out = [];
  for (const d of ORDER) for (const [o, c] of h[d]) out.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${map[d]}`, opens: o, closes: c === '24:00' ? '23:59' : c });
  return out;
}
function restaurantLd(key, lang) {
  const v = venues[key];
  const isT = key === 'tavernetta';
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}${isT ? '/' : '/spritz/'}#restaurant`,
    name: v.legalName,
    url: `${SITE_URL}${isT ? paths.home[lang] : paths.spritz[lang]}`,
    telephone: v.tel,
    ...(v.email ? { email: v.email } : {}),
    address: { '@type': 'PostalAddress', streetAddress: v.street, postalCode: v.postal, addressLocality: v.town, addressRegion: v.region, addressCountry: 'ES' },
    geo: { '@type': 'GeoCoordinates', latitude: v.geo.lat, longitude: v.geo.lng },
    servesCuisine: ['Italian', 'Mediterranean'],
    priceRange: '€€',
    acceptsReservations: true,
    hasMenu: `${SITE_URL}${isT ? paths.menu[lang] : paths.spritz[lang] + '#carta'}`,
    openingHoursSpecification: hoursSpec(v.hours),
    sameAs: [`https://www.instagram.com/${v.instagram}/`],
    image: `${SITE_URL}/assets/img/${isT ? 'pesto-1200' : 'spritz-1000'}.webp`,
  };
}
function menuLd(cats, lang, name) {
  const flat = (c) => (c.groups ? c.groups.flatMap((g) => g.items) : c.items || []);
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name,
    inLanguage: lang,
    hasMenuSection: cats.map((c) => ({
      '@type': 'MenuSection',
      name: c.title[lang],
      hasMenuItem: flat(c).map((i) => ({ '@type': 'MenuItem', name: i.n, ...(i.d ? { description: i.d[lang] } : {}), offers: { '@type': 'Offer', price: i.p.toFixed(2), priceCurrency: 'EUR' } })),
    })),
  };
}

// ───────────────────────── layout
function layout(page, lang, { title, desc, body, ld = [], ogImage = 'pesto-1200.webp' }) {
  const t = T[lang];
  const self = paths[page.key][lang];
  const es = paths[page.key].es, en = paths[page.key].en;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE_URL}${self}">
<link rel="alternate" hreflang="es" href="${SITE_URL}${es}">
<link rel="alternate" hreflang="en" href="${SITE_URL}${en}">
<link rel="alternate" hreflang="x-default" href="${SITE_URL}${es}">
<meta property="og:type" content="restaurant">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${SITE_URL}${self}">
<meta property="og:image" content="${SITE_URL}/assets/img/${ogImage}">
<meta property="og:locale" content="${lang === 'es' ? 'es_ES' : 'en_GB'}">
<meta name="theme-color" content="${page.key === 'spritz' ? '#F3E6D2' : '#F4EEE2'}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/young-serif.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/newsreader.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/styles.css?v=${BUILD}">
<script src="/assets/main.js?v=${BUILD}" defer></script>
${ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('\n')}
</head>
<body class="page-${page.key}">
<a class="skip" href="#main">${t.skip}</a>
${header(page, lang)}
<main id="main">
${body}
</main>
${footer(lang)}
${dock(page, lang)}
</body>
</html>
`;
}

// ───────────────────────── pages
const findDish = (cats, catId, name) => {
  const c = cats.find((x) => x.id === catId);
  const list = c.groups ? c.groups.flatMap((g) => g.items) : c.items;
  const d = list.find((x) => x.n === name);
  if (!d) throw new Error(`Plato no encontrado: ${catId}/${name}`);
  return { cat: c, dish: d };
};

// La mesa del hero: platos vistos desde arriba (decorativos; el texto del hero ya lo cuenta).
const tableDishes = [
  { k: 'pesto', c: 'd1', rim: true, depth: 0.10, sizes: '(min-width: 900px) 36vw, 72vw', eager: true },
  { k: 'pepperoni', c: 'd2', depth: 0.16, sizes: '(min-width: 900px) 27vw, 52vw', eager: true },
  { k: 'calamares', c: 'd3', depth: 0.22, sizes: '(min-width: 900px) 17vw, 38vw' },
  { k: 'croquetas', c: 'd4', depth: 0.30, sizes: '12vw' },
  { k: 'burrata', c: 'd5', rim: true, depth: 0.14, sizes: '(min-width: 900px) 20vw, 42vw' },
  { k: 'mar', c: 'd6', depth: 0.26, sizes: '15vw' },
  { k: 'spritz', c: 'd7', depth: 0.34, sizes: '(min-width: 900px) 10vw, 24vw' },
  { k: 'carbonara', c: 'd8', depth: 0.20, sizes: '12vw' },
];

// El pase: platos reales de la carta con foto de referencia.
const passDishes = [
  { cat: 'antipastos', n: 'Calamares a la andaluza', k: 'calamares' },
  { cat: 'croquetas', n: 'Gamba roja', k: 'croquetas', label: { es: 'Croquetas caseras', en: 'Homemade croquetas' } },
  { cat: 'romanas', n: 'Pepperoni', k: 'pepperoni', label: { es: 'Pizza Pepperoni', en: 'Pepperoni pizza' } },
  { cat: 'pinsas', n: 'Pinsa de búfala', k: 'pinsa' },
  { cat: 'salsas', n: 'Arrabbiata', k: 'penne', label: { es: 'Pasta + Arrabbiata', en: 'Pasta + Arrabbiata' } },
  { cat: 'risottos', n: 'Boletus', k: 'risotto', label: { es: 'Risotto boletus', en: 'Porcini risotto' } },
  { cat: 'patatas', n: 'Patatas a los 4 quesos', k: 'quesos' },
  { cat: 'ensaladas', n: 'Del César', k: 'cesar', label: { es: 'Ensalada Del César', en: 'Caesar salad' } },
  { cat: 'salsas', n: 'Frutos del mar', k: 'mar', label: { es: 'Pasta + Frutos del mar', en: 'Pasta + Seafood' } },
  { cat: 'granja', n: 'Solomillo', k: 'solomillo' },
  { cat: 'mar', n: 'Bacalao', k: 'bacalao' },
  { cat: 'postres', n: 'Un mal día en la playa', k: 'sundae' },
];
const tilts = [-2.2, 1.4, -0.8, 2, -1.6, 0.9, -2.4, 1.8, -1.1, 2.3, -0.6, 1.2];

function home(lang) {
  const tv = venues.tavernetta;
  const C = lang === 'es' ? {
    title: 'Basilico Tavernetta · Restaurante italovalenciano en Beniarbeig',
    desc: 'Pasta casera con salsa a elegir, pizzas romanas y napolitanas y pinsas italovalencianas en la Avinguda de la Pau, 15 de Beniarbeig. Reservas: 652 823 117.',
    eyebrow: 'Beniarbeig · Marina Alta',
    tag: ['Tavernetta italo', 'valenciana'],
    lead: 'Pasta casera con la salsa que elijas, pizzas de tres masas y platos que cruzan Italia con la taberna de aquí. Raciones para compartir y salir lleno.',
    seeMenu: 'Ver la carta',
    stripAddr: 'Avinguda de la Pau, 15 · Beniarbeig',
    stripCall: 'Reservas por teléfono',
    crossLabel: 'El cruce',
    crossTitle: 'Pan de pizza con picaeta. Pinsa con chuletón. Risotto con cava.',
    crossText: 'Eso es lo de <em>italovalenciana</em>: cocina italiana que se cruza con el producto y las recetas de taberna de aquí. Algunos cruces de la carta:',
    colIt: 'De Italia', colHere: 'De aquí', colDish: 'Plato',
    crossMore: 'Ver la carta entera',
    passLabel: 'Del pase',
    passTitle: 'Lo que sale de la cocina',
    passText: 'Doce platos de la carta, colgados en la barra de comandas como salen hacia la mesa.',
    passNote: 'Fotografías de referencia: el emplatado en casa puede variar.',
    passAll: 'Ver los 85 platos',
    prev: 'Platos anteriores', next: 'Más platos',
    pastaLabel: 'Pasta casera',
    pastaTitle: 'Primero la pasta. Luego, la salsa.',
    pastaText: 'La pasta se pide en dos pasos: escoges la forma, al huevo o rellena, y la combinas con una de las nueve salsas caseras. El precio lo marca la salsa.',
    step1: 'La pasta', step2: 'La salsa', egg: 'Al huevo', filled: 'Rellena',
    orderSay: 'Pídelo así',
    withWord: 'con',
    oven: 'Y del horno: canelones de espinacas, salmón o pollo, y lasagna de boloñesa. 16 €.',
    revLabel: 'Lo que dice la gente',
    revTitle: 'Raciones grandes. Mejor al centro de la mesa.',
    revScore: `sobre 5 en Google, con ${rating.count} reseñas`,
    revSource: `Temas que más se repiten en las reseñas de Google · ${rating.date.es}`,
    revTimes: 'menciones',
    doughLabel: 'Pizzas',
    doughTitle: 'Tres masas, tres formas',
    dough: [
      { k: 'romana', ph: 'pepperoni', n: 'Romana', t: 'Redonda y fina, la de toda la vida. Hay veinticinco: de la Margherita a la de pulpo con pimentón de la Vera.', r: '11,50–17 €', c: '25 pizzas' },
      { k: 'napolitana', ph: 'napolitana', n: 'Napolitana', t: 'Borde alto e hinchado. Cuatro, entre ellas la Campera, con chuletón gallego, y la Guanciale.', r: '17–18 €', c: '4 pizzas' },
      { k: 'pinsa', ph: 'pinsa', n: 'Pinsa', t: 'Alargada y ovalada; la que la carta llama italovalenciana. De chuletón, búfala, pato o costilla de cerdo.', r: '16,50–19 €', c: '4 pinsas' },
    ],
    visitLabel: 'Visítanos',
    visitTitle: 'Avinguda de la Pau, 15. Beniarbeig.',
    visitText: 'Comidas y cenas de miércoles a domingo. Lunes y martes, cerrado. Para reservar, llama por teléfono.',
    access: 'Acceso, aseo y asientos adaptados para silla de ruedas.',
    parking: 'En hora punta cuesta aparcar en la avenida: cuenta con unos minutos de más.',
    attrs: 'Negocio de propietarias mujeres · LGBTQ+ friendly',
    map: 'Mostrar mapa',
    mapTitle: 'Mapa de la ubicación de Basilico Tavernetta en Beniarbeig',
    spLabel: 'La otra casa',
    spTitle: 'Basilico&Spritz, en la piscina de Benimeli',
    spText: 'Bajo la pérgola de la piscina municipal de Benimeli: vinos de Rueda, Rioja, Ribera y Requena, burgers, costilla a baja temperatura y lo de picar de siempre.',
    spCta: 'Conocer Basilico&Spritz',
  } : {
    title: 'Basilico Tavernetta · Italo-Valencian restaurant in Beniarbeig',
    desc: 'Homemade pasta with your choice of sauce, Roman and Neapolitan pizzas and Italo-Valencian pinsas on Avinguda de la Pau 15, Beniarbeig. Bookings: +34 652 823 117.',
    eyebrow: 'Beniarbeig · Marina Alta',
    tag: ['Italo', 'Valencian tavernetta'],
    lead: 'Homemade pasta with the sauce of your choice, pizzas on three different bases and dishes where Italy meets the local Spanish tavern. Portions made for sharing.',
    seeMenu: 'See the menu',
    stripAddr: 'Avinguda de la Pau 15 · Beniarbeig',
    stripCall: 'Bookings by phone',
    crossLabel: 'The crossover',
    crossTitle: 'Pizza bread with picaeta. Pinsa with rib-steak. Risotto with cava.',
    crossText: 'That’s what <em>Italo-Valencian</em> means here: Italian cooking crossed with local produce and Spanish tavern recipes. A few crossovers from the menu:',
    colIt: 'From Italy', colHere: 'From here', colDish: 'Dish',
    crossMore: 'See the full menu',
    passLabel: 'From the pass',
    passTitle: 'Out of the kitchen',
    passText: 'Twelve dishes from the menu, clipped to the order rail on their way to the table.',
    passNote: 'Reference photography: plating at the restaurant may differ.',
    passAll: 'See all 85 dishes',
    prev: 'Previous dishes', next: 'More dishes',
    pastaLabel: 'Homemade pasta',
    pastaTitle: 'Pick the pasta. Then the sauce.',
    pastaText: 'Pasta is ordered in two steps: choose the shape, egg or filled, and pair it with one of nine homemade sauces. The sauce sets the price.',
    step1: 'Pasta', step2: 'Sauce', egg: 'Egg pasta', filled: 'Filled',
    orderSay: 'Order it like this',
    withWord: 'with',
    oven: 'From the oven: spinach, salmon or chicken cannelloni, and bolognese lasagna. €16.',
    revLabel: 'What people say',
    revTitle: 'Big portions. Best shared in the middle of the table.',
    revScore: `out of 5 on Google, from ${rating.count} reviews`,
    revSource: `Topics that come up most in Google reviews · ${rating.date.en}`,
    revTimes: 'mentions',
    doughLabel: 'Pizzas',
    doughTitle: 'Three bases, three shapes',
    dough: [
      { k: 'romana', ph: 'pepperoni', n: 'Roman', t: 'Round and thin, the classic. Twenty-five of them, from Margherita to octopus with La Vera paprika.', r: '€11.50–17', c: '25 pizzas' },
      { k: 'napolitana', ph: 'napolitana', n: 'Neapolitan', t: 'High, puffy crust. Four of them, including the Campera with Galician rib-steak, and the Guanciale.', r: '€17–18', c: '4 pizzas' },
      { k: 'pinsa', ph: 'pinsa', n: 'Pinsa', t: 'Long and oval — the one the menu calls Italo-Valencian. Rib-steak, buffalo, duck or pork rib.', r: '€16.50–19', c: '4 pinsas' },
    ],
    visitLabel: 'Visit',
    visitTitle: 'Avinguda de la Pau 15. Beniarbeig.',
    visitText: 'Lunch and dinner, Wednesday to Sunday. Closed Monday and Tuesday. To book, just give us a call.',
    access: 'Wheelchair-accessible entrance, toilet and seating.',
    parking: 'Parking on the avenue can be tight at peak times — allow a few extra minutes.',
    attrs: 'Women-owned business · LGBTQ+ friendly',
    map: 'Show map',
    mapTitle: 'Map showing Basilico Tavernetta in Beniarbeig',
    spLabel: 'Our other place',
    spTitle: 'Basilico&Spritz, at the Benimeli pool',
    spText: 'Under the pergola at Benimeli’s municipal pool: wines from Rueda, Rioja, Ribera and Requena, burgers, slow-cooked ribs and the usual things to share.',
    spCta: 'Discover Basilico&Spritz',
  };

  const sauces = tavernetta.find((c) => c.id === 'salsas').items;
  const shapes = tavernetta.find((c) => c.id === 'pasta').shapes;
  const maxTopic = Math.max(...reviewTopics.map((r) => r.n));
  const osm = `https://www.openstreetmap.org/export/embed.html?bbox=${tv.geo.lng - 0.006}%2C${tv.geo.lat - 0.0035}%2C${tv.geo.lng + 0.006}%2C${tv.geo.lat + 0.0035}&layer=mapnik&marker=${tv.geo.lat}%2C${tv.geo.lng}`;

  const body = `
<section class="table" aria-labelledby="hero-title">
  <div class="table__dishes" aria-hidden="true">
    ${tableDishes.map((d) => `<div class="tdish ${d.c}${d.rim ? ' tdish--rim' : ''}" data-depth="${d.depth}">${d.rim ? plateRim() : ''}<div class="tdish__img">${img(d.k, lang, { sizes: d.sizes, eager: !!d.eager, deco: true })}</div></div>`).join('\n    ')}
    ${leaf('leaf tleaf tleaf--1')}${leaf('leaf tleaf tleaf--2')}${leaf('leaf tleaf tleaf--3')}
  </div>
  <div class="table__card">
    <p class="eyebrow">${C.eyebrow}</p>
    <h1 id="hero-title" class="hero__title"><span class="hero__word">Basilico</span><span class="hero__tag">${C.tag[0]}${leaf('leaf leaf--dash')}${C.tag[1]}</span></h1>
    <p class="hero__lead">${C.lead}</p>
    <div class="hero__actions">
      <a class="btn btn--call btn--lg" href="tel:${tv.tel}">${icons.phone}<span>${T[lang].reserve} · ${ph(tv, lang)}</span></a>
      <a class="btn btn--ghost btn--lg" href="${paths.menu[lang]}"><span>${C.seeMenu}</span>${icons.arrow}</a>
    </div>
  </div>
</section>

<div class="strip">
  <div class="strip__inner">
    ${status(tv, lang, T[lang].statusFallback)}
    <a class="strip__item" href="${tv.maps}" target="_blank" rel="noopener">${icons.pin}<span>${C.stripAddr}</span></a>
    <a class="strip__item" href="tel:${tv.tel}">${icons.phone}<span>${C.stripCall} · <strong>${ph(tv, lang)}</strong></span></a>
  </div>
</div>

<section class="cross" aria-labelledby="cross-title">
  <div class="wrap">
    <p class="label">${C.crossLabel}</p>
    <h2 id="cross-title" class="h2">${C.crossTitle}</h2>
    <p class="intro">${C.crossText}</p>
    <div class="ledger" role="table" aria-label="${C.crossLabel}">
      <div class="ledger__head" role="row"><span role="columnheader" class="ledger__it">${C.colIt}</span><span role="columnheader" class="ledger__dish">${C.colDish}</span><span role="columnheader" class="ledger__here">${C.colHere}</span></div>
      ${crossings.map((x) => `<div class="ledger__row" role="row">
        <span role="cell" class="ledger__it"><span class="ledger__k">${C.colIt}</span>${x.it[lang]}</span>
        <span role="cell" class="ledger__dish"><strong>${esc(x.dish)}</strong><span class="ledger__p">${price(x.p, lang)}</span></span>
        <span role="cell" class="ledger__here"><span class="ledger__k">${C.colHere}</span>${x.here[lang]}</span>
      </div>`).join('')}
    </div>
    <a class="link" href="${paths.menu[lang]}">${C.crossMore} ${icons.arrow}</a>
  </div>
</section>

<section class="pass" aria-labelledby="pass-title">
  <div class="wrap pass__head">
    <div>
      <p class="label">${C.passLabel}</p>
      <h2 id="pass-title" class="h2">${C.passTitle}</h2>
      <p class="intro">${C.passText}</p>
    </div>
    <div class="pass__ctrl">
      <button type="button" class="pass__btn" data-rail-prev aria-label="${C.prev}">${icons.arrow}</button>
      <button type="button" class="pass__btn" data-rail-next aria-label="${C.next}">${icons.arrow}</button>
    </div>
  </div>
  <div class="rail" data-rail tabindex="0" role="region" aria-label="${C.passTitle}">
    <ol class="rail__track">
      ${passDishes.map((p, i) => {
        const { cat, dish } = findDish(tavernetta, p.cat, p.n);
        const label = p.label ? p.label[lang] : dish.n;
        const unit = dish.u ? ` · ${dish.u[lang]}` : (p.cat === 'croquetas' ? (lang === 'es' ? ' / ud.' : ' each') : '');
        return `<li class="order" style="--tilt:${tilts[i % tilts.length]}deg">
        <div class="ticket"><span class="ticket__fam">${cat.title[lang]}</span><span class="ticket__n">${esc(label)}</span><span class="ticket__p">${price(dish.p, lang)}${unit}</span></div>
        <div class="order__plate">${img(p.k, lang, { sizes: '(min-width: 900px) 300px, 62vw' })}</div>
      </li>`;
      }).join('\n      ')}
    </ol>
  </div>
  <div class="wrap pass__foot"><p class="note">${C.passNote}</p><a class="link" href="${paths.menu[lang]}">${C.passAll} ${icons.arrow}</a></div>
</section>

<section class="pasta" id="pasta" aria-labelledby="pasta-title">
  <div class="wrap pasta__grid">
    <div class="pasta__intro">
      <p class="label">${C.pastaLabel}</p>
      <h2 id="pasta-title" class="h2">${C.pastaTitle}</h2>
      <p>${C.pastaText}</p>
      <div class="pasta__plates">
        ${plate('ceramica', lang, { sizes: '(min-width: 900px) 340px, 58vw', cls: 'plate--pasta' })}
        ${plate('carbonara', lang, { sizes: '(min-width: 900px) 200px, 34vw', cls: 'plate--pasta2' })}
      </div>
    </div>
    <form class="builder" data-builder data-with="${C.withWord}" data-lang="${lang}" onsubmit="return false">
      <fieldset class="builder__step">
        <legend><span class="num">1</span>${C.step1}</legend>
        <p class="builder__group">${C.egg}</p>
        <div class="chips">
          ${shapes.huevo.map((s) => `<label class="chip chip--shape"><input type="radio" name="shape" value="${esc(s)}"${s === 'Tagliatelli' ? ' checked' : ''}>${pastaShapes[s]}<span>${s}</span></label>`).join('')}
        </div>
        <p class="builder__group">${C.filled}</p>
        <div class="chips">
          ${shapes.rellena.map((s) => `<label class="chip chip--shape chip--wide"><input type="radio" name="shape" value="${esc(s)}">${pastaShapes.ravioli}<span>${s}</span></label>`).join('')}
        </div>
      </fieldset>
      <fieldset class="builder__step">
        <legend><span class="num">2</span>${C.step2}</legend>
        <div class="sauces">
          ${sauces.map((s) => `<label class="sauce"><input type="radio" name="sauce" value="${esc(s.n)}" data-price="${price(s.p, lang)}"${s.n === 'Pesto verde' ? ' checked' : ''}><span class="sauce__n">${s.n}</span><span class="sauce__p">${price(s.p, lang)}</span><span class="sauce__d">${s.d[lang]}</span></label>`).join('')}
        </div>
      </fieldset>
      <output class="order-slip" aria-live="polite" data-order>
        <span class="order-slip__k">${C.orderSay}</span>
        <span class="order-slip__dish" data-order-dish>Tagliatelli ${C.withWord} Pesto verde</span>
        <span class="order-slip__p" data-order-price>${price(15.5, lang)}</span>
      </output>
      <p class="builder__oven">${C.oven}</p>
    </form>
  </div>
</section>

<section class="spread" aria-labelledby="rev-title">
  <div class="spread__img">${img('mesa', lang, { sizes: '100vw' })}</div>
  <div class="wrap spread__wrap">
    <div class="spread__card">
      <p class="label">${C.revLabel}</p>
      <h2 id="rev-title" class="h2">${C.revTitle}</h2>
      <p class="score"><span class="score__n">${lang === 'es' ? rating.value : rating.valueEn}</span><span class="score__t">${C.revScore}</span></p>
      <figure class="topics">
        <ul>
          ${reviewTopics.map((r) => `<li style="--w:${(r.n / maxTopic).toFixed(3)}"><span class="topics__w">${r[lang]}</span><span class="topics__bar" aria-hidden="true"></span><span class="topics__n">${r.n}<span class="sr-only"> ${C.revTimes}</span></span></li>`).join('')}
        </ul>
        <figcaption>${C.revSource}</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="doughs" aria-labelledby="dough-title">
  <div class="wrap">
    <p class="label">${C.doughLabel}</p>
    <h2 id="dough-title" class="h2">${C.doughTitle}</h2>
    <ol class="doughs__list">
      ${C.dough.map((d, i) => `<li class="dough-item">
        <div class="dough-item__pic">${img(d.ph, lang, { sizes: '(min-width: 900px) 300px, 40vw', cls: 'dough-item__photo' })}<span class="dough-item__shape">${doughs[d.k]}</span></div>
        <div class="dough-item__txt">
          <h3><span class="dough-item__i">${['I', 'II', 'III'][i]}</span>${d.n}</h3>
          <p>${d.t}</p>
          <p class="dough-item__meta"><span>${d.c}</span><span>${d.r}</span></p>
        </div>
      </li>`).join('')}
    </ol>
  </div>
</section>

<section class="visit" id="visita" aria-labelledby="visit-title">
  <div class="wrap visit__grid">
    <div class="visit__text">
      <p class="label">${C.visitLabel}</p>
      <h2 id="visit-title" class="h2">${C.visitTitle}</h2>
      <p>${C.visitText}</p>
      <div class="visit__actions">
        <a class="btn btn--call" href="tel:${tv.tel}">${icons.phone}<span>${ph(tv, lang)}</span></a>
        <a class="btn btn--ghost" href="${tv.maps}" target="_blank" rel="noopener">${icons.pin}<span>${T[lang].directions}</span></a>
      </div>
      <ul class="facts">
        <li>${C.access}</li>
        <li>${C.parking}</li>
        <li>${C.attrs}</li>
      </ul>
    </div>
    <div class="visit__hours">
      ${hoursTable(tv, lang)}
      <p class="note">${T[lang].hoursNote}</p>
      <div class="map" data-map data-src="${osm}" data-title="${esc(C.mapTitle)}">
        <button type="button" class="btn btn--ghost map__btn">${icons.pin}<span>${C.map}</span></button>
        <p class="map__addr">${tv.street} · ${tv.postal} ${tv.town}</p>
      </div>
    </div>
  </div>
</section>

<section class="other" aria-labelledby="sp-title">
  <div class="wrap other__grid">
    <div class="other__text">
      <p class="label">${C.spLabel}</p>
      <h2 id="sp-title" class="h2">${C.spTitle}</h2>
      <p>${C.spText}</p>
      <a class="btn btn--spritz" href="${paths.spritz[lang]}"><span>${C.spCta}</span>${icons.arrow}</a>
    </div>
    <div class="collage">
      <div class="collage__a">${img('spritzTarde', lang, { sizes: '(min-width: 900px) 340px, 52vw' })}</div>
      <div class="collage__b">${img('burger', lang, { sizes: '(min-width: 900px) 220px, 36vw' })}</div>
      <div class="collage__c">${img('tiramisu', lang, { sizes: '(min-width: 900px) 170px, 28vw' })}</div>
    </div>
  </div>
</section>`;

  return { title: C.title, desc: C.desc, body, ld: [restaurantLd('tavernetta', lang)] };
}

function menuPage(lang) {
  const tv = venues.tavernetta;
  const C = lang === 'es' ? {
    title: 'Carta · Basilico Tavernetta, Beniarbeig',
    desc: 'Carta completa de Basilico Tavernetta: antipastos, croquetas caseras, pizzas romanas y napolitanas, pinsas italovalencianas, pasta casera, risottos y postres, con precios.',
    h1: 'La carta', sub: `${tv.name} · ${tv.town}`,
    intro: 'Raciones generosas: muchos entrantes son para compartir. Si tienes alguna alergia o intolerancia, avísanos y te informamos de los alérgenos de cada plato.',
    navLabel: 'Familias de la carta',
    spritzNote: '¿Vas a la piscina de Benimeli? Basilico&Spritz tiene su propia carta.',
    spritzLink: 'Ver carta de Basilico&Spritz',
    prices: 'Precios en euros. Pueden cambiar; la carta del local manda. Fotografías de referencia.',
  } : {
    title: 'Menu · Basilico Tavernetta, Beniarbeig',
    desc: 'Full menu at Basilico Tavernetta: antipasti, homemade croquetas, Roman and Neapolitan pizzas, Italo-Valencian pinsas, homemade pasta, risottos and desserts, with prices.',
    h1: 'The menu', sub: `${tv.name} · ${tv.town}`,
    intro: 'Portions are generous — many starters are meant for sharing. If you have any allergy or intolerance, tell us and we’ll go through the allergens in each dish.',
    navLabel: 'Menu sections',
    spritzNote: 'Heading to the Benimeli pool? Basilico&Spritz has its own menu.',
    spritzLink: 'See the Basilico&Spritz menu',
    prices: 'Prices in euros and subject to change; the menu at the restaurant prevails. Reference photography.',
  };
  const body = `
<section class="menu-head">
  <div class="menu-head__plates" aria-hidden="true">
    <div class="mplate mplate--1">${img('porcion', lang, { sizes: '(min-width: 900px) 260px, 34vw', deco: true, eager: true })}</div>
    <div class="mplate mplate--2">${img('pesto', lang, { sizes: '(min-width: 900px) 180px, 24vw', deco: true })}</div>
  </div>
  <div class="wrap menu-head__grid">
    <div>
      <p class="eyebrow">${C.sub}</p>
      <h1 class="h1">${C.h1}</h1>
      <p class="intro">${C.intro}</p>
    </div>
    ${finder(lang)}
  </div>
</section>
${catNav(tavernetta, lang, C.navLabel)}
<div class="wrap menu" data-menu>
  ${tavernetta.map((c) => category(c, lang, 't')).join('')}
  <aside class="menu__aside">
    <p>${C.spritzNote}</p>
    <a class="link" href="${paths.spritz[lang]}#carta">${C.spritzLink} ${icons.arrow}</a>
    <p class="note">${C.prices}</p>
  </aside>
</div>`;
  return { title: C.title, desc: C.desc, body, ogImage: 'porcion-1200.webp', ld: [restaurantLd('tavernetta', lang), menuLd(tavernetta, lang, `${tv.name} — ${C.h1}`)] };
}

function spritzPage(lang) {
  const sp = venues.spritz;
  const C = lang === 'es' ? {
    title: 'Basilico&Spritz · Piscina municipal de Benimeli',
    desc: 'Basilico&Spritz, la otra casa de Basilico, en la piscina municipal de Benimeli: terraza bajo pérgola, vinos, burgers, costillas y raciones. Tel. 653 888 937.',
    eyebrow: 'Benimeli · Piscina municipal',
    lead: 'La segunda casa de Basilico está bajo la pérgola de la piscina municipal de Benimeli. Vinos de Rueda, Rioja, Ribera y Requena, burgers, costilla a baja temperatura y lo de picar de siempre.',
    call: 'Reservar', seeMenu: 'Ver la carta',
    visitTitle: 'Cómo encontrarnos',
    visitText: 'Estamos en el recinto de la piscina municipal, junto al polideportivo, en el Carrer Olivars.',
    menuTitle: 'La carta de Basilico&Spritz',
    navLabel: 'Familias de la carta de Basilico&Spritz',
    back: 'La casa principal: Basilico Tavernetta, en Beniarbeig',
    backLink: 'Ir a la Tavernetta',
    allergens: 'Si tienes alguna alergia o intolerancia, avísanos y te informamos de los alérgenos. Fotografías de referencia.',
  } : {
    title: 'Basilico&Spritz · Benimeli municipal pool',
    desc: 'Basilico&Spritz, our second place, at the Benimeli municipal pool: pergola terrace, wines, burgers, ribs and sharing plates. Tel. +34 653 888 937.',
    eyebrow: 'Benimeli · Municipal pool',
    lead: 'Basilico’s second home sits under the pergola at Benimeli’s municipal pool. Wines from Rueda, Rioja, Ribera and Requena, burgers, slow-cooked ribs and the usual things to share.',
    call: 'Book', seeMenu: 'See the menu',
    visitTitle: 'Finding us',
    visitText: 'We’re inside the municipal pool grounds, next to the sports centre, on Carrer Olivars.',
    menuTitle: 'The Basilico&Spritz menu',
    navLabel: 'Basilico&Spritz menu sections',
    back: 'Our main restaurant: Basilico Tavernetta, in Beniarbeig',
    backLink: 'Go to the Tavernetta',
    allergens: 'If you have any allergy or intolerance, tell us and we’ll go through the allergens. Reference photography.',
  };
  const strip = ['pulpo', 'burger', 'costilla', 'quesos', 'tiramisu', 'helado'];
  const body = `
<section class="sp-hero" aria-labelledby="sp-h1">
  <div class="wrap sp-hero__grid">
    <div class="sp-hero__text">
      <p class="eyebrow">${C.eyebrow}</p>
      <h1 id="sp-h1" class="sp-hero__title">Basilico<span>&amp;Spritz</span></h1>
      <p class="hero__lead">${C.lead}</p>
      <div class="hero__actions">
        <a class="btn btn--spritz btn--lg" href="tel:${sp.tel}">${icons.phone}<span>${C.call} · ${ph(sp, lang)}</span></a>
        <a class="btn btn--ghost btn--lg" href="#carta"><span>${C.seeMenu}</span>${icons.arrow}</a>
      </div>
      ${status(sp, lang, T[lang].statusFallbackSpritz)}
    </div>
    <div class="sp-hero__img">
      <div class="sp-hero__a">${img('spritzTarde', lang, { sizes: '(min-width: 900px) 400px, 56vw', eager: true })}</div>
      <div class="sp-hero__b">${img('spritz', lang, { sizes: '(min-width: 900px) 260px, 40vw', eager: true })}</div>
    </div>
  </div>
</section>

<div class="sp-strip" aria-hidden="true">
  <div class="sp-strip__track">${[...strip, ...strip].map((k) => `<div class="sp-strip__item">${img(k, lang, { sizes: '220px', deco: true })}</div>`).join('')}</div>
</div>

<section class="sp-visit" id="visita" aria-labelledby="sp-visit-title">
  <div class="wrap sp-visit__grid">
    <div>
      <h2 id="sp-visit-title" class="h2">${C.visitTitle}</h2>
      <p>${C.visitText}</p>
      <p class="addr">${sp.street}<br>${sp.postal} ${sp.town} (${sp.region})</p>
      <div class="visit__actions">
        <a class="btn btn--ghost" href="${sp.maps}" target="_blank" rel="noopener">${icons.pin}<span>${T[lang].directions}</span></a>
        <a class="btn btn--ghost" href="https://www.instagram.com/${sp.instagram}/" target="_blank" rel="noopener">${icons.insta}<span>@${sp.instagram}</span></a>
      </div>
    </div>
    <div>
      ${hoursTable(sp, lang)}
      <p class="note">${T[lang].hoursNote}</p>
    </div>
  </div>
</section>

<section class="sp-menu" id="carta" aria-labelledby="sp-menu-title">
  <div class="wrap"><h2 id="sp-menu-title" class="h2">${C.menuTitle}</h2><p class="intro">${C.allergens}</p></div>
  ${catNav(spritz, lang, C.navLabel)}
  <div class="wrap menu" data-menu>
    ${spritz.map((c) => category(c, lang, 's')).join('')}
  </div>
</section>

<section class="sp-back">
  <div class="wrap sp-back__inner">
    <div class="sp-back__pic">${img('pesto', lang, { sizes: '120px', deco: true })}</div>
    <p>${C.back}</p>
    <a class="btn btn--call" href="${paths.home[lang]}"><span>${C.backLink}</span>${icons.arrow}</a>
  </div>
</section>`;
  return { title: C.title, desc: C.desc, body, ogImage: 'spritzTarde-1000.webp', ld: [restaurantLd('spritz', lang), menuLd(spritz, lang, 'Basilico&Spritz')] };
}

// ───────────────────────── build
const BUILD = Date.now().toString(36);

// Subcarpeta de publicación (p. ej. GitHub Pages de proyecto): BASE_PATH=/basilico-tavernetta/
const BASE = ('/' + (process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '') + '/').replace('//', '/');
const withBase = (html) => (BASE === '/' ? html : html
  .replace(/(\s(?:href|src|srcset)=")\/(?!\/)/g, `$1${BASE}`)
  .replace(/, \/assets\//g, `, ${BASE}assets/`));

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name), b = path.join(to, e.name);
    if (e.isDirectory()) copyDir(a, b); else fs.copyFileSync(a, b);
  }
}

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));
fs.copyFileSync(path.join(SRC, 'styles.css'), path.join(DIST, 'assets', 'styles.css'));
fs.copyFileSync(path.join(SRC, 'main.js'), path.join(DIST, 'assets', 'main.js'));
fs.copyFileSync(path.join(SRC, 'favicon.svg'), path.join(DIST, 'favicon.svg'));

const renderers = { home, menu: menuPage, spritz: spritzPage };
const urls = [];
for (const key of Object.keys(paths)) {
  for (const lang of ['es', 'en']) {
    const out = renderers[key](lang);
    const html = layout({ key }, lang, out);
    const p = paths[key][lang];
    const file = path.join(DIST, p, 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, withBase(html));
    urls.push(p);
  }
}

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Object.values(paths).flatMap((p) => ['es', 'en'].map((l) => `<url><loc>${SITE_URL}${p[l]}</loc><lastmod>${today}</lastmod><xhtml:link rel="alternate" hreflang="es" href="${SITE_URL}${p.es}"/><xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${p.en}"/></url>`)).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');
fs.writeFileSync(path.join(DIST, '404.html'), withBase(layout({ key: 'home' }, 'es', {
  title: 'Página no encontrada · Basilico',
  desc: 'Esta página no existe.',
  body: `<section class="notfound wrap"><p class="label">404</p><h1 class="h1">Este plato no está en la carta.</h1><p>La página que buscas no existe. <a class="link" href="/">Volver al inicio</a> · <a class="link" href="/carta/">Ver la carta</a></p></section>`,
}).replace('<link rel="canonical"', '<meta name="robots" content="noindex">\n<link rel="canonical"')));

console.log(`✓ Basilico build ${BUILD}: ${urls.length} páginas → dist/ (base ${BASE} · ${SITE_URL})`);
