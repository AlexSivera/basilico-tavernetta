# Dirección creativa — Basilico

## Concepto: «Plato azul, mano italiana»

La investigación dio una imagen muy concreta: en las fotos de clientes la pasta llega en **platos de cerámica blanca y azul**, de los que hay en cualquier casa valenciana, y el negocio se presenta como **italovalenciano**. La identidad sale de ahí. Nada de banderas tricolor, manteles de cuadros ni la típica Toscana de stock: **la cocina italiana servida en vajilla de aquí**.

Tres ideas sostienen todo:

1. **La vajilla como marco.** Cada foto de plato se presenta en círculo con un **borde de cerámica pintado en azul cobalto** (SVG propio, trazo de pincel). El borde gira despacio al hacer scroll, como cuando se coloca un plato en la mesa.
2. **El cruce como sistema de contenido.** La sección "El cruce" no usa adjetivos: es un **libro de cuentas en dos columnas**, *Italia* en verde albahaca e *Aquí* en azul cobalto, con platos reales de su carta en el centro. Así se demuestra el italovalenciano en lugar de contarlo.
3. **La carta como sistema, no como lista.** La pasta se explica como lo que es (**pasta + salsa**) con un selector interactivo, y las tres masas se dibujan por su forma.

## Personalidad

Familiar, generosa, con guasa ("Que morro", "Llama a los bomberos", "Un mal día en la playa") y sin postureo. Tono de casa de pueblo que sabe lo que hace. **No** es lujo ni "alta cocina", y la web no debe parecerlo.

## Tipografía

- **Young Serif** (titulares): serif cálida, con algo de rótulo de trattoria antigua y un poco de imperfección. Se aleja de las Playfair/Cormorant que usan casi todos los italianos de la zona (la web actual incluida).
- **Newsreader** (texto y carta): serif de lectura con óptica variable y una **cursiva** muy buena para los ingredientes, como en una carta impresa. Cifras tabulares para los precios.
- Etiquetas en versalitas espaciadas de Newsreader, precedidas de un **mini plato** (anillo + punto); **no** se añade una tercera familia.
- Fuentes **autoalojadas** (sin peticiones a Google: más rendimiento y mejor RGPD).

## Color

| Token | Hex | Uso |
|---|---|---|
| `--cal` | `#F4EEE2` | Fondo: pared encalada, papel de carta |
| `--cal-2` | `#EAE1CF` | Bandas y superficies |
| `--tinta` | `#1D1A16` | Texto |
| `--cobalto` | `#1F3F8E` | Azul de cerámica: bordes de plato, "Aquí", precios, enlaces |
| `--albahaca` | `#2E5A28` | Marca y CTA principal (llamar) |
| `--hoja` | `#6E9B45` | Detalles de la hoja |
| `--pomodoro` | `#B83A20` | Solo para el estado "cerrado" y detalles mínimos |

**Basilico&Spritz** tiene su propio clima: `--spritz #E0561C`, `--piscina #176570` y un fondo de **franjas de luz y sombra** sacado de su pérgola de lamas (la única foto real del local en Google). Es la misma familia, pero de día y en verano.

Contrastes comprobados (WCAG): tinta/cal 15:1 · cobalto/cal 8,4:1 · loza/albahaca 7,6:1 · texto secundario 7,9:1 · CTA Spritz 5,6:1 · piscina/arena 5,5:1. Todos ≥ AA.

## Composición

- **Hero asimétrico**: el wordmark gigante a la izquierda y un plato enorme que **se sale por el borde derecho**. En móvil el plato asoma arriba, recortado, y el texto entra debajo. No es el típico hero partido 50/50.
- Debajo del hero, una **línea de estado** ("Hoy abierto · 20:00–23:30 · Av. de la Pau, 15") que se calcula en vivo con el horario.
- Las secciones alternan **ancho de lectura** (texto de carta) con **bandas a sangre** (el cruce, Spritz).
- Separadores: pequeñas **filas de motivos de azulejo** dibujadas en SVG, nunca líneas grises.

## Fotografía y tratamiento

- Mientras no haya sesión propia se usa stock con licencia Unsplash, **siempre en plano cenital**, recortado en círculo dentro del borde cobalto. Las fotos se integran así en el sistema y no parecen un banco de imágenes rectangular.
- Pie discreto en el footer: "Fotografías ilustrativas". No se presentan como platos propios.
- No hay galería decorativa.

## Elementos gráficos

- Borde de plato (anillo SVG de pinceladas cobalto: puntos, pétalos y hojitas).
- Hoja de albahaca como guion en "italo—valenciana".
- Siluetas de lineal fino para las formas de pasta y las tres masas.
- **Sin** emoji, iconos genéricos, gradientes, glassmorphism ni sombras grandes.

## Navegación

- **Escritorio**: barra superior fina con el logotipo, Carta · Pasta · Visítanos · Spritz · EN y el CTA "Llamar 652 823 117".
- **Móvil**: cabecera mínima y **dock inferior fijo** con las tres acciones que importan en la calle o en la mesa: **Carta · Llamar · Cómo llegar**. Botones de al menos 48 px.
- **Carta**: barra de familias fija y desplazable en horizontal, con scroll-spy, más un **buscador de ingredientes** ("burrata", "trufa", "gamba"…) pensado para quien está en la mesa.

## Interacción y animación

- Giro lento del borde del plato con el scroll (solo `transform`; se desactiva con `prefers-reduced-motion`).
- Selector de pasta: al elegir forma y salsa se compone la frase del pedido ("Fusilotti al pesto verde · 15,50 €").
- Estado abierto/cerrado en vivo.
- Mapa OpenStreetMap que **solo se carga al pulsar** (rendimiento y privacidad).
- Sin parallax, sin cursor personalizado y sin animaciones de entrada en cada bloque.

## Estructura

```
/            Tavernetta (ES)       /en/          (EN)
/carta/      Carta completa        /en/menu/
/spritz/     Basilico&Spritz       /en/spritz/
```

Inicio: Hero → El cruce → Pasta a tu manera → Tres masas → Lo que más se nombra → Visítanos → La otra casa (Spritz) → Footer.

## Qué la hace inconfundible

1. El **plato de cerámica azul** como marco fotográfico y como logotipo.
2. **El cruce Italia | Aquí** como forma de presentar la carta.
3. El **selector pasta + salsa** sacado del funcionamiento real de su carta.
4. El clima de **pérgola y piscina** propio de Basilico&Spritz.

---

## Iteración 2: de "plantilla" a mesa fotográfica (2 oct. 2026)

**Feedback del cliente:** la primera versión tenía muy poca fotografía y se leía como una plantilla de WordPress, con el mismo bloque (etiqueta + título + párrafo + botón) repetido sobre fondo crema.

**Respuesta:** se mantiene el concepto (plato azul, mano italiana), pero la web pasa a contarse **con fotos y en el espacio**:

| Antes | Ahora |
|---|---|
| Hero partido: texto + un plato | **La mesa vista desde arriba**: 8 platos sobre un mantel de lino alrededor del nombre. Cada uno se mueve a su ritmo con el scroll (paralaje solo en escritorio y sin `prefers-reduced-motion`). Refuerza la idea de "raciones para compartir" |
| Sin muestra de platos | **El pase**: 12 platos reales de la carta colgados de la barra de comandas, cada uno con su ticket (familia, nombre y precio). Fondo oscuro de cocina, desplazamiento horizontal con *snap* y botones |
| Reseñas sobre fondo liso | **Foto a sangre** de la mesa de pizzas (imagen de la web anterior del cliente) con la tarjeta de reseñas encima |
| Masas solo dibujadas | Foto de cada masa con el dibujo como sello |
| Carta solo tipográfica | **Foto por familia** en la columna fija, como tenía la web anterior, pero a alta resolución |
| Spritz con una foto | Collage + tira de platos sobre el color piscina |

**Fotografía.** Se analizaron las 40 imágenes de la web anterior (38 distintas, servidas a 400 px). Comparando por similitud visual se encontró el **original en Unsplash de 19 de ellas** y se usan a alta resolución. Las demás se descartan: una muestra el rótulo de otro restaurante ("Papá Danilo"), otra una tarta con logotipo "DG", otra es un steak tartar etiquetado como "huevos rotos", y otra es solo un tomate. Las que no tienen original localizado solo existen a 400 px. Se completa con 11 fotos más de Unsplash. Criterio: **solo comida y bebida**. No se usa ninguna foto de un local que no sea el suyo (se descartó una pérgola de otro bar).

**Tratamiento único:** todo plato se recorta en círculo y se trata como un objeto sobre la mesa (sombra de contacto). Algunos llevan el borde de loza azul. Es coherente con el concepto y unifica fotos de procedencias distintas.
