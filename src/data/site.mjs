// Datos verificados (ver docs/business-brief.md). Horarios: Google Maps, oct. 2026.
// Días: 0 = domingo … 6 = sábado. '24:00' = medianoche.

export const SITE_URL = (process.env.SITE_URL || 'https://sfs-p5g7uxx6vmgc.live-website.com').replace(/\/$/, '');

export const venues = {
  tavernetta: {
    name: 'Basilico Tavernetta',
    legalName: 'Basilico Tavernetta Italovalenciana',
    street: 'Avinguda de la Pau, 15',
    postal: '03778',
    town: 'Beniarbeig',
    region: 'Alicante',
    phone: '652 823 117',
    tel: '+34652823117',
    instagram: 'basilico_tavernetta',
    email: 'basilicotavernettaitaliana@gmail.com',
    geo: { lat: 38.8218426, lng: -0.0023952 },
    maps: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('Basilico Tavernetta Italovalenciana, Avinguda de la Pau 15, 03778 Beniarbeig'),
    hours: {
      0: [['13:00', '16:00'], ['20:00', '23:30']],
      1: [],
      2: [],
      3: [['12:30', '15:30'], ['20:00', '23:30']],
      4: [['12:30', '15:30'], ['20:00', '23:30']],
      5: [['12:30', '15:30'], ['20:00', '23:30']],
      6: [['13:00', '16:00'], ['20:00', '24:00']],
    },
  },
  spritz: {
    name: 'Basilico&Spritz',
    legalName: 'Basilico&Spritz',
    street: 'Carrer Olivars · Piscina Municipal',
    postal: '03769',
    town: 'Benimeli',
    region: 'Alicante',
    phone: '653 888 937',
    tel: '+34653888937',
    instagram: 'basilico_spritz',
    geo: { lat: 38.8214906, lng: -0.0423867 },
    maps: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('Basilico&Spritz, Carrer Olivars, 03769 Benimeli'),
    hours: {
      0: [['12:00', '16:00']],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [['19:00', '23:00']],
      6: [['13:00', '16:00'], ['20:00', '23:00']],
    },
  },
};

// Temas que Google agrupa en las reseñas de la Tavernetta (oct. 2026)
export const reviewTopics = [
  { es: 'pizzas', en: 'pizzas', n: 36 },
  { es: 'postres', en: 'desserts', n: 13 },
  { es: 'croquetas', en: 'croquetas', n: 9 },
  { es: 'raciones', en: 'portions', n: 6 },
  { es: 'cantidad', en: 'quantity', n: 6 },
  { es: 'ambiente', en: 'atmosphere', n: 6 },
  { es: 'risotto', en: 'risotto', n: 5 },
  { es: 'pesto', en: 'pesto', n: 5 },
];
export const rating = { value: '4,6', valueEn: '4.6', count: 291, date: { es: 'octubre de 2026', en: 'October 2026' } };

// «El cruce»: platos reales de la carta, separando lo italiano de lo de aquí.
export const crossings = [
  { dish: 'Pan de pizza y gambas', p: 15, it: { es: 'pan de pizza, mozzarella gratinada', en: 'pizza bread, grilled mozzarella' }, here: { es: 'gambitas, picaeta de ajo y perejil', en: 'baby prawns, garlic-parsley picaeta' } },
  { dish: 'Mini burger de figatells de sepia', p: 12, it: { es: 'tomate seco, rúcula', en: 'sun-dried tomato, rocket' }, here: { es: 'figatells de sepia', en: 'cuttlefish figatells' } },
  { dish: 'Alcachofas confitadas', p: 13.5, it: { es: 'burrata, tomate seco', en: 'burrata, sun-dried tomato' }, here: { es: 'alcachofa confitada, jamón serrano', en: 'confit artichoke, serrano ham' } },
  { dish: 'Pizza Contorná', p: 14, it: { es: 'masa romana, scamorza', en: 'Roman base, scamorza' }, here: { es: 'sobrasada, dátiles', en: 'sobrasada, dates' } },
  { dish: 'Pinsa de chuletón', p: 19, it: { es: 'pinsa, mozzarella', en: 'pinsa, mozzarella' }, here: { es: 'chuletón, patata, pimientos del padrón', en: 'rib-steak, potato, padrón peppers' } },
  { dish: 'Risotto del mar', p: 18, it: { es: 'risotto, parmigiano', en: 'risotto, parmigiano' }, here: { es: 'gambas, mejillones, cava', en: 'prawns, mussels, cava' } },
];

export const days = {
  es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

