// Descarga y optimiza las fotografías del manifiesto: node scripts/images.mjs
// Genera src/assets/img/{clave}-{ancho}.webp (se suben al repositorio; el build solo los copia).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { photos } from '../src/data/photos.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, '.cache', 'photos');
const OUT = path.join(ROOT, 'src', 'assets', 'img');

export const SIZES = {
  sq: { widths: [360, 720, 1200], ratio: 1 },
  land: { widths: [800, 1400, 2200], ratio: 2 / 3 },
  port: { widths: [500, 1000], ratio: 5 / 4 },
};

fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) if (f.endsWith('.webp')) fs.rmSync(path.join(OUT, f));

let total = 0;
for (const [key, p] of Object.entries(photos)) {
  const cached = path.join(CACHE, `${p.uid}.jpg`);
  if (!fs.existsSync(cached)) {
    const res = await fetch(`${p.raw}?w=2400&q=85&fm=jpg`);
    if (!res.ok) throw new Error(`${key}: HTTP ${res.status}`);
    fs.writeFileSync(cached, Buffer.from(await res.arrayBuffer()));
  }
  const { widths, ratio } = SIZES[p.shape];
  for (const w of widths) {
    const file = path.join(OUT, `${key}-${w}.webp`);
    await sharp(cached)
      .resize(w, Math.round(w * ratio), { fit: 'cover', position: p.shape === 'sq' ? 'centre' : 'attention' })
      .webp({ quality: w >= 1200 ? 58 : 64, effort: 5 })
      .toFile(file);
    total += fs.statSync(file).size;
  }
  process.stdout.write('.');
}
console.log(`\n✓ ${Object.keys(photos).length} fotos → ${(total / 1024 / 1024).toFixed(1)} MB en src/assets/img`);
