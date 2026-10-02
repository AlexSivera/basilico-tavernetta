# QA report: Basilico

Fecha: 2 de octubre de 2026 (madrugada, hora de Madrid) · Herramienta: Playwright (Chromium) sobre `npm run preview` (http://localhost:4173)

## Build

| Comprobación | Resultado |
|---|---|
| `npm run build` (Node 22, sin dependencias) | ✅ 6 páginas + 404, sitemap.xml y robots.txt en `dist/` |
| Páginas | `/`, `/carta/`, `/spritz/`, `/en/`, `/en/menu/`, `/en/spritz/`, `404.html` |
| HTML prerenderizado (indexable sin JS) | ✅ La web anterior era un `<div id="root">` vacío |
| JSON-LD | ✅ `Restaurant` en las 6 páginas y `Menu` con todas las secciones y precios en la carta y en Spritz; JSON válido |
| hreflang es/en/x-default + canonical | ✅ |

## Peso (gzip)

- HTML de inicio 8,7 KB · CSS 8,5 KB · JS 2,8 KB
- Fuentes autoalojadas: 110 KB (3 archivos woff2, solo subconjunto latino)
- Imágenes WebP con `srcset`: en móvil, ≈ 260 KB en toda la home; la del hero se carga con `fetchpriority="high"` y el resto en diferido
- Sin librerías, sin frameworks y sin peticiones a terceros al cargar (el mapa de OpenStreetMap solo se pide al pulsar "Mostrar mapa")

## Pruebas funcionales

| Prueba | Resultado |
|---|---|
| Enlaces internos de las 6 páginas | ✅ todos 200 |
| Anclas (`#pasta`, `#visita`, `#carta`, familias de la carta) | ✅ ningún destino roto |
| Ruta inexistente | ✅ 404 propio con enlaces a inicio y carta |
| Estado abierto/cerrado en vivo (zona Europe/Madrid) | ✅ Miércoles 23:45 → "Cerrado ahora · abrimos mañana a las 12:30"; Spritz → "abrimos mañana a las 19:00" (jueves de madrugada, abre el viernes) |
| Día actual resaltado en el horario | ✅ "Jueves · HOY" |
| Selector pasta + salsa (ratón y teclado, flechas en radios) | ✅ el ticket se actualiza: "Casarecce con Frutos del mar · 18 €" |
| Buscador de la carta | ✅ "burrata" → 6 platos en 5 familias · "trufa" → croquetas, salsa, risotto, magret y el bloque de pasta rellena (sinónimo "tartufo") · sin resultados → mensaje · vacío → 85 platos |
| Scroll-spy de familias + barra horizontal | ✅ marca la familia visible y centra su enlace; fundido en los bordes cuando hay más familias |
| Mapa bajo demanda | ✅ iframe OSM con marcador en Av. de la Pau, 15 |
| Enlaces `tel:` / Google Maps / Instagram | ✅ externos con `rel="noopener"` |
| Consola | ✅ 0 errores en las 6 páginas (solo el 404 provocado a propósito) |

## Responsive

Revisado a **375 × 812** (móvil), **768 × 1024** (tablet) y **1440 × 900** (escritorio).

- Sin desbordamiento horizontal en ninguna página.
- Dock inferior fijo en móvil y tablet (Carta · Llamar · Cómo llegar) con áreas táctiles de 64 px; en la página de Spritz el botón de llamar usa su teléfono y su color.
- El CTA "Reservar mesa" se ve sin hacer scroll en móvil, en las dos casas.
- En móvil el ticket del selector de pasta queda fijo encima del dock, en versión compacta.

## Accesibilidad

| Comprobación | Resultado |
|---|---|
| Un `h1` por página, sin saltos de nivel de encabezado | ✅ las 6 páginas |
| `alt` en todas las imágenes; SVG decorativos `aria-hidden` | ✅ |
| Labels: buscador con `<label for>`, radios dentro de su `<label>`, `fieldset/legend` en el selector | ✅ |
| IDs duplicados | ✅ ninguno |
| Enlace "Saltar al contenido" | ✅ visible al tabular |
| Focus visible (anillo cobalto; claro sobre fondos oscuros) | ✅ |
| `prefers-reduced-motion` | ✅ desactiva el giro del plato, el scroll suave y las transiciones |
| Contraste WCAG | ✅ texto 15:1 · secundario 7,9:1 · cobalto 8,4:1 · CTA verde 7,6:1 · CTA Spritz 5,6:1 · piscina 5,5:1 |
| Idioma (`lang="es"` / `lang="en"`) y enlace de idioma con `hreflang` | ✅ |

## Problemas encontrados y corregidos durante la QA

1. **La foto no llenaba el plato**: la clase del plato se colaba en el `<img>` y lo desplazaba. Corregido.
2. **Error de JS** en la home (`$` en vez de `$$` por un `String.replace`). Corregido; consola limpia.
3. **El hero se podía desplazar en horizontal** (`overflow: hidden` crea un contenedor de scroll; un `scrollIntoView` o el foco lo movían 16 px). Cambiado a `overflow: clip`.
4. **En móvil el plato pisaba el texto** del hero. Plato anclado al borde inferior de su zona.
5. **Cabecera y barra de familias semitransparentes**: el texto se transparentaba (glassmorphism sin motivo). Ahora son opacas.
6. **Las barras de puntos cortaban el último punto**. Ahora `background-repeat: space`.
7. **El color piscina no llegaba a AA** (3,9:1). Oscurecido a `#176570` (5,5:1).
8. **La barra de familias no indicaba que había más** a la derecha. Fundido dinámico.
9. **El motivo de las etiquetas era ilegible** a 10 px. Sustituido por un mini plato.
10. **El ticket de pasta tapaba media pantalla en móvil**. Versión compacta.
11. **En Spritz móvil la foto empujaba el CTA** fuera de la pantalla. Primero el texto.
12. **Afirmaciones sin fuente** detectadas en la revisión del copy y eliminadas: "la mesa se confirma en el momento", "precio por botella", y la nota "horario de la ficha de Google" en la web del propio cliente.
13. El servidor de previsualización cacheaba HTML viejo; ahora envía `no-store` (solo afecta al entorno local).

## Autocrítica (fase 9)

- **¿Parece hecha para Basilico?** Sí. Los tres elementos principales (plato de loza azul, libro de cuentas Italia | Aquí y selector pasta + salsa) solo tienen sentido con su carta y sus fotos de clientes. Si se cambia el nombre, la web deja de funcionar como concepto.
- **¿Componentes genéricos?** Las tres masas son, en estructura, "tres columnas". Se mantienen porque son literalmente las tres masas de su carta, pero sin tarjetas ni iconos: siluetas dibujadas y datos reales (número de pizzas y rango de precio).
- **¿Se entiende qué hacer?** Un único CTA principal (llamar) repetido con jerarquía: hero, Visítanos y dock móvil. La carta es el secundario.
- **Pendiente honesto**: las fotos son de stock. Están integradas en el sistema del plato y marcadas como ilustrativas, pero la web ganaría mucho con fotografía propia hecha cenital y en sus platos azules reales.

## Cambios de contenido respecto a la carta original (para validar con el cliente)

- Erratas normalizadas: "Arrabiatta" → "Arrabbiata", "Marquéz de Atrio" → "Marqués de Atrio". Se ha mantenido "Domino de Requena" tal cual porque no se ha podido verificar.
- "Carbonara Bacón" y "Carbonara Guanciale" tenían la misma descripción ("guanciale o bacón…"). Se ha separado: bacón en una y guanciale en la otra.
- Las traducciones al inglés de la carta son nuestras. Los nombres de los platos se mantienen en el original.

## Pendiente del cliente

- Confirmar horarios (los directorios no coinciden; se usa Google) y si Basilico&Spritz es de temporada.
- Confirmar que se puede publicar el email.
- Sesión de fotos propia (platos cenitales en su vajilla, fachada y pérgola de la piscina).
- Dominio definitivo: `SITE_URL=https://dominio.es npm run build`.
- Actualizar el enlace "web" y "reservar" de las dos fichas de Google y el QR de mesa cuando se publique.

## Cómo desarrollar y desplegar

```bash
npm run build      # genera dist/
npm run preview    # sirve dist/ en http://localhost:4173
```

`dist/` es estático: se sube tal cual a cualquier hosting. La carta se edita en `src/data/menu.mjs` y los horarios en `src/data/site.mjs`.

---

## Iteración 2: rediseño fotográfico (2 oct. 2026)

**Motivo:** el cliente vio la v1 "como una plantilla de WordPress" y con pocas imágenes en comparación con la web anterior.

**Cambios principales:** hero "La mesa", "El pase", foto a sangre con reseñas, masas con foto, foto por familia en las dos cartas, collage y tira de platos en Spritz. Las 30 fotos se generan en WebP en 3 tamaños con `npm run images` (sharp, solo como dependencia de desarrollo).

**QA repetida (Playwright, 375 / 1440 px):**

| Prueba | Resultado |
|---|---|
| 6 páginas: un h1, sin saltos de encabezado, sin IDs duplicados, JSON-LD válido | ✅ |
| 91 enlaces y archivos de imagen (todas las variantes de `srcset`) | ✅ todos 200 |
| `alt` en todas las imágenes; vacíos solo en las decorativas (mesa del hero dentro de `aria-hidden`, fotos de familia junto a su título) | ✅ |
| Consola | ✅ 0 errores |
| Desbordamiento horizontal en móvil | ✅ ninguno |
| Peso de la home en móvil (todo cargado) | ≈ 460 KB, de ellos ≈ 240 KB de imágenes en diferido; LCP local 216 ms |
| Pase: botones anterior/siguiente se desactivan en los extremos; swipe en móvil | ✅ |

**Corregido durante esta iteración:**
1. El texto del hero de Spritz heredaba el centrado de la nueva mesa: el centrado ahora se limita a `.table`.
2. El nombre de familia "Pinsas italovalencianas" se salía del ticket: tamaño y espaciado ajustados.
3. El vaso de spritz tocaba el plato de pesto en la mesa: recolocado.
4. En móvil el paralaje subía los platos de abajo hasta los botones: paralaje solo en escritorio.
5. Hueco bajo el collage de Spritz en móvil: altura ajustada.
6. Copy: se quitó "spritz" de la lista de lo que sirven, porque la carta publicada solo incluye vinos.

**Pendiente honesto:** las fotos siguen siendo ilustrativas (de stock, igual que en la web anterior). La siguiente mejora real es una sesión propia: los mismos encuadres cenitales, en su vajilla azul y en su mesa.

### Revisión de fotos por familia (a raíz del feedback sobre "Nuestras patatas")

La foto de *Nuestras patatas* mostraba jamón y un huevo en una sartén, **sin patatas**, y el recorte dejaba medio círculo en negro. Se revisaron las 22 fotos de familia de las dos cartas, recortadas en círculo tal como se muestran, y se cambiaron 4:

| Familia | Antes | Ahora |
|---|---|---|
| Nuestras patatas | Jamón y huevo en sartén (sin patatas) | Huevo frito sobre patatas fritas |
| Risottos | Verduras en plato ovalado (no parecía risotto) | Risotto de setas (como su risotto boletus) |
| Del mar | Mano sirviendo un plato pequeño | Pescado sobre puré de patatas (como su bacalao) |
| Algo para picar (Spritz) | Pulpo descentrado | Raciones: croquetas, patatas con salsa, pimientos del padrón y ensalada |

Las nuevas fotos de risotto y bacalao también se ven en "El pase" de la home.

También se corrigió el **espacio excesivo entre filas de platos** en las familias con pocos platos: la rejilla se estiraba hasta la altura de la columna de la foto (`align-content: start`).
