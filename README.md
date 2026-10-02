# Basilico Tavernetta · web

Web de **Basilico Tavernetta** (Av. de la Pau, 15 · Beniarbeig) y **Basilico&Spritz** (Piscina municipal de Benimeli).
Sitio estático en español e inglés, sin frameworks.

```bash
npm install        # solo hace falta para preparar fotos (sharp)
npm run images     # descarga y optimiza las fotos de src/data/photos.mjs
npm run build      # genera dist/
npm run preview    # sirve dist/ en http://localhost:4173
```

- Carta: `src/data/menu.mjs` · Horarios y datos: `src/data/site.mjs` · Fotos: `src/data/photos.mjs`
- Publicación en una subcarpeta (GitHub Pages): `SITE_URL=https://usuario.github.io/repo BASE_PATH=repo npm run build`
- Investigación, dirección creativa y QA en `docs/`.

Fotografías ilustrativas de Unsplash (créditos en el pie de la web).
