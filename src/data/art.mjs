// Recursos gráficos propios en SVG (sin dependencias).

const r2 = (n) => Math.round(n * 100) / 100;

// Borde de plato de loza pintado a pincel: anillos + motivos alternos (pétalo / tres puntos).
export function plateRim({ motifs = 18, cls = 'plate__rim' } = {}) {
  const c = 200;
  let deco = '';
  for (let i = 0; i < motifs; i++) {
    const a = (i / motifs) * 360;
    if (i % 2 === 0) {
      // pétalo con nervio, orientado hacia fuera
      deco += `<g transform="rotate(${r2(a)} ${c} ${c})"><path d="M200 33c-6.4-4.8-7.8-13.4-.1-22 7.7 8.6 6.3 17.2.1 22z"/><path class="pv" d="M200 29V15"/></g>`;
    } else {
      deco += `<g transform="rotate(${r2(a)} ${c} ${c})"><circle cx="200" cy="15" r="2.7"/><circle cx="194.4" cy="24" r="2.2"/><circle cx="205.6" cy="24" r="2.2"/></g>`;
    }
    // pequeñas comas entre motivos
    const b = a + 180 / motifs;
    deco += `<g transform="rotate(${r2(b)} ${c} ${c})"><path class="v" d="M198.6 27.5c3.2-1.2 4-4.6 1.6-7.2"/></g>`;
  }
  return `<svg class="${cls}" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
<circle class="loza" cx="200" cy="200" r="198"/>
<circle class="l1" cx="200" cy="200" r="195.5"/>
<circle class="l2" cx="200" cy="200" r="163.5"/>
<circle class="l3" cx="200" cy="200" r="159"/>
<g class="m">${deco}</g>
</svg>`;
}

export const leaf = (cls = 'leaf') => `<svg class="${cls}" viewBox="0 0 48 28" aria-hidden="true" focusable="false"><path class="leaf__b" d="M2 15.5C10 4 27-1 46 6c-6 12-22 21-38 15"/><path class="leaf__v" d="M4 15.5c12-2 25-5 38-8M15 13l-2-6M24 11l-1-6M32 9.3l.5-4.6M17 13.3l3 5.4M27 11l3.6 5"/></svg>`;

export const logoMark = `<svg class="mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" stroke-width="2.2" class="mark__ring"/><circle cx="32" cy="32" r="23.5" fill="none" stroke="currentColor" stroke-width="1" class="mark__ring" stroke-dasharray="1.5 4.2" stroke-linecap="round"/><path class="mark__leaf" d="M18 39c3-12 14-20 29-19-2 13-13 21-29 19z"/><path class="mark__vein" d="M20 37.5C27 32 34 27 43 23"/></svg>`;

// Formas de pasta: trazo fino, currentColor.
const s = (d) => `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" class="shape">${d}</svg>`;
export const pastaShapes = {
  Spaghetti: s('<path d="M6 22c10-6 18 6 28 0s16-6 24-1M6 30c10-6 18 6 28 0s16-6 24-1M6 38c10-6 18 6 28 0s16-6 24-1M6 46c10-6 18 6 28 0s16-6 24-1"/>'),
  Tagliatelli: s('<path d="M33 32c0-2.5-3.5-2.6-4-.4-.8 3.3 3.6 5.6 7 3.8 4.6-2.4 3.7-9.3-.6-11.2-6.2-2.8-12.8 1.6-13.3 8.2-.6 8.4 8.1 13.7 15.6 10.6 9.5-3.9 11.2-17 3.6-23.4C34 13.9 20.3 16 14.6 25.4 9 35 14 48.3 25 51.4c11.4 3.2 23.5-4.6 25-16.3"/><path d="M35.6 32.4c.8-2.6-1.5-6-4.3-5.5"/>'),
  Casarecce: s('<path d="M14 44c-4-8 2-15 9-13s9 9 4 13M50 20c4 8-2 15-9 13s-9-9-4-13M27 44c6 5 18-3 23-24M14 44c5 6 20 2 23-24"/>'),
  Maccheroni: s('<path d="M14 22c18-5 34 6 38 24M24 18c13-2 25 7 28 18"/><ellipse cx="19" cy="20" rx="5.2" ry="2.6" transform="rotate(-20 19 20)"/><ellipse cx="52" cy="41" rx="2.6" ry="5.2" transform="rotate(-25 52 41)"/><path d="M27 23l2-4M35 25l1.4-4.4M42 30l2.4-3.6"/>'),
  Zitone: s('<path d="M10 40 46 14M18 50 54 24"/><ellipse cx="14" cy="45" rx="3" ry="6.2" transform="rotate(-36 14 45)"/><ellipse cx="50" cy="19" rx="3" ry="6.2" transform="rotate(-36 50 19)"/><path d="M22 38l3 4.2M30 32l3 4.2M38 26l3 4.2"/>'),
  Fusilotti: s('<path d="M18 52c-6-4 4-8 10-7s10-3 4-7-14-1-10-6 14 0 16-5-8-6-4-10 12 1 14-3M24 54c6 2 14-2 8-6M44 13c3-4 0-6-3-5"/>'),
  ravioli: s('<rect x="14" y="14" width="36" height="36" rx="3"/><rect x="20" y="20" width="24" height="24" rx="10"/><path d="M14 20h-3M14 26h-3M14 32h-3M14 38h-3M14 44h-3M50 20h3M50 26h3M50 32h3M50 38h3M50 44h3M20 14v-3M26 14v-3M32 14v-3M38 14v-3M44 14v-3M20 50v3M26 50v3M32 50v3M38 50v3M44 50v3"/>'),
};

// Las tres masas, dibujadas por su forma.
export const doughs = {
  romana: `<svg viewBox="0 0 200 140" aria-hidden="true" focusable="false" class="dough"><circle cx="100" cy="70" r="58" class="d-base"/><circle cx="100" cy="70" r="54.5" class="d-sauce"/><g class="d-top"><circle cx="78" cy="58" r="7"/><circle cx="114" cy="50" r="6"/><circle cx="96" cy="86" r="7.5"/><circle cx="124" cy="82" r="6"/><circle cx="72" cy="88" r="4.5"/></g></svg>`,
  napolitana: `<svg viewBox="0 0 200 140" aria-hidden="true" focusable="false" class="dough"><circle cx="100" cy="70" r="60" class="d-base"/><circle cx="100" cy="70" r="44" class="d-sauce"/><circle cx="100" cy="70" r="52" class="d-rim"/><g class="d-char"><circle cx="62" cy="40" r="2.5"/><circle cx="141" cy="56" r="3"/><circle cx="128" cy="113" r="2.2"/><circle cx="55" cy="96" r="3"/><circle cx="100" cy="17" r="2"/></g><g class="d-top"><circle cx="88" cy="62" r="9"/><circle cx="116" cy="80" r="8"/><circle cx="92" cy="90" r="5"/></g></svg>`,
  pinsa: `<svg viewBox="0 0 200 140" aria-hidden="true" focusable="false" class="dough"><ellipse cx="100" cy="70" rx="88" ry="48" class="d-base"/><ellipse cx="100" cy="70" rx="78" ry="39" class="d-sauce"/><g class="d-dimple"><circle cx="58" cy="60" r="2"/><circle cx="74" cy="82" r="2"/><circle cx="104" cy="54" r="2"/><circle cx="132" cy="78" r="2"/><circle cx="150" cy="60" r="2"/><circle cx="90" cy="76" r="2"/></g><g class="d-top"><circle cx="70" cy="68" r="6"/><circle cx="120" cy="64" r="7"/><circle cx="142" cy="74" r="4.5"/></g></svg>`,
};

export const icons = {
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="ico"><path d="M6.6 3.5h2.9l1.5 4.2-2 1.6a12 12 0 0 0 5.7 5.7l1.6-2 4.2 1.5v2.9a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="ico"><path d="M5 3.5h11.5a2.5 2.5 0 0 1 2.5 2.5v14.5H7.5A2.5 2.5 0 0 1 5 18zM5 18a2.5 2.5 0 0 1 2.5-2.5H19M9 8h6M9 11h4"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="ico"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="ico ico--arrow"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
  insta: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="ico"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="ico"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 20 20"/></svg>',
};
