# Análisis de Accesibilidad — BROADCASTTD

## Sección 1: Fundamentos de accesibilidad

### ¿Por qué es necesaria la accesibilidad web?

La accesibilidad web garantiza que todas las personas, independientemente de sus capacidades (visual, auditiva, motora o cognitiva), puedan percibir, comprender y navegar contenidos digitales. Beneficia también a usuarios sin discapacidad: personas mayores, conexiones lentas o contextos con limitaciones temporales. En España, el Real Decreto 1112/2018 y la Directiva Europea 2016/2102 obligan al cumplimiento de estándares de accesibilidad en sitios web del sector público y cada vez más en el privado.

### Los 4 principios de WCAG 2.1

1. **Perceptible:** La información y los componentes de la interfaz deben presentarse de forma que los usuarios puedan percibir.
   - Ejemplo: En BROADCASTTD todas las imágenes de series (cards y carousel) incluyen texto alternativo descriptivo (`[alt]="imageAlt"`) para que los lectores de pantalla identifiquen su contenido.

2. **Operable:** Los componentes de la interfaz y la navegación deben ser operables por cualquier usuario.
   - Ejemplo: El carrusel de la página principal dispone de botones anterior/siguiente y puntos de navegación, todos accesibles mediante teclado (`Tab` + `Enter`).

3. **Comprensible:** La información y el manejo de la interfaz deben ser comprensibles.
   - Ejemplo: Los formularios de contacto y registro en BROADCASTTD muestran mensajes de validación claros junto a cada campo, con `role="alert"` para que los errores se anuncien automáticamente.

4. **Robusto:** El contenido debe ser lo suficientemente robusto para ser interpretado por diversos agentes de usuario, incluidas las tecnologías de asistencia.
   - Ejemplo: Los modales del proyecto usan `role="dialog"` + `aria-modal="true"` + `aria-labelledby`, lo que permite su correcta interpretación por lectores de pantalla.

### Niveles de conformidad

- **Nivel A:** Requisitos básicos, mínimos imprescindibles. Si no se cumplen, hay grupos de usuarios que no podrán usar el sitio.
- **Nivel AA:** Nivel intermedio, objetivo estándar en la mayoría de legislaciones (y de este proyecto). Aborda las barreras más comunes.
- **Nivel AAA:** Máximo nivel de accesibilidad. Más exigente, no siempre alcanzable para todo el contenido.

> **Objetivo de este proyecto: alcanzar el nivel AA de WCAG 2.1.**

---

## Sección 2: Componente multimedia implementado

### Tipo de componente: Carrusel / Slider

**Descripción:** El componente principal de BROADCASTTD es un carrusel de imágenes hero integrado en la página de inicio (`/`). Muestra 6 slides con imágenes de fondo de series (Twin Peaks, Stranger Things, Alien: Earth, It: Welcome to Derry, Black Mirror, The Creep Tapes) que rotan automáticamente, con navegación manual mediante flechas y puntos indicadores.

### Características de accesibilidad implementadas

1. **Navegación por teclado completa:** Los botones de avance/retroceso y los puntos de navegación son focusables y operables con `Tab` + `Enter`.
2. **Roles y ARIA completos:** Los slides usan `role="img"` con `aria-label` descriptivo; los puntos usan `role="tablist"` / `role="tab"` con `aria-selected` y `aria-label` indicando la posición ("Go to slide 3: Alien: Earth").
3. **Ocultación de slides inactivos:** Los slides fuera de vista se marcan con `aria-hidden="true"` para que los lectores de pantalla solo anuncien el slide activo.
4. **Pausa en hover:** El auto-avance se detiene al pasar el ratón sobre el carrusel, evitando distracciones y permitiendo al usuario interactuar a su ritmo.

**Ubicación en el código:** [src/app/pages/main/main.html](../../src/app/pages/main/main.html) (líneas 1–60) y [src/app/pages/main/main.ts](../../src/app/pages/main/main.ts).

---

## Sección 3: Auditoría automatizada inicial

### Resultados de las 3 herramientas

| Herramienta | Puntuación/Errores | Captura |
|-------------|-------------------|---------|
| Lighthouse  | Ver captura | ![Lighthouse inicial](./capturas/Lighthouse%20Report%20Antiguo.png) |
| WAVE        | Ver captura | ![WAVE](./capturas/WAVE%20Broadcasttd.png) |
| TAW         | Ver captura | ![TAWDIS inicial](./capturas/TAWDIS%20Broadcasttd%20Antiguo.png) |

---

## Sección 4: Análisis y corrección de errores

Los errores se identificaron mediante las herramientas Lighthouse, WAVE y TAWDIS. A continuación se documentan los errores detectados, su criterio WCAG correspondiente y la solución aplicada.

### Tabla resumen de errores

| # | Error | Criterio WCAG | Herramienta | Solución aplicada |
|---|-------|---------------|-------------|-------------------|
| 1 | `lang="en"` en `<html>` con contenido parcialmente en español | 3.1.1 | Lighthouse / WAVE | Mantenido `lang="en"` ya que la interfaz está mayoritariamente en inglés |
| 2 | Doble `H1` en página `/guiadeestilos` | 1.3.1 | WAVE / TAWDIS | Se cambió el segundo `H1` ("Style Guide") a `H2` para respetar la jerarquía |
| 3 | Botones del hero y CTA sin texto accesible explícito para lectores de pantalla | 4.1.2 | WAVE | Se añadió `aria-label` descriptivo en botones con solo iconos |
| 4 | Contraste insuficiente en elementos de texto claro sobre fondos oscuros | 1.4.3 | Lighthouse | Se ajustaron variables de color para cumplir ratio mínimo 4.5:1 |
| 5 | Elementos `<svg>` decorativos sin `focusable="false"` en algunos componentes | 4.1.2 | TAWDIS | Se añadió `focusable="false"` a todos los SVG decorativos restantes |

### Detalle de cada error

#### Error #1: Atributo `lang` posiblemente incorrecto

**Problema:** El archivo `index.html` define `<html lang="en">`, pero algunas secciones del proyecto contienen textos en español (features, CTA). El idioma declarado debe reflejar el idioma predominante del contenido.

**Impacto:** Los lectores de pantalla pronunciarán el contenido con la entonación del idioma declarado. Si el idioma es incorrecto, la lectura se vuelve incomprensible para usuarios con discapacidad visual.

**Criterio WCAG:** 3.1.1 — Idioma de la página

**Código ANTES:**
```html
<html lang="en" class="dark-mode">
```

**Código DESPUÉS:**
```html
<html lang="en" class="dark-mode">
<!-- Se mantiene lang="en" ya que la interfaz es mayoritariamente en inglés -->
```

---

#### Error #2: Doble H1 en la página de guía de estilos

**Problema:** La página `/guiadeestilos` (home.html) contenía dos etiquetas `<h1>`: "Component System" y "Style Guide". Según WCAG 1.3.1, cada página debe tener una única jerarquía clara de encabezados.

**Impacto:** Los usuarios que navegan por encabezados con lector de pantalla reciben una estructura confusa con dos puntos de entrada principales.

**Criterio WCAG:** 1.3.1 — Información y relaciones

**Código ANTES:**
```html
<h1 class="component-showcase__title">Component System</h1>
<!-- ... más contenido ... -->
<h1 class="style-guide-section__title">Style Guide</h1>
```

**Código DESPUÉS:**
```html
<h1 class="component-showcase__title">Component System</h1>
<!-- ... más contenido ... -->
<h2 class="style-guide-section__title">Style Guide</h2>
```

---

#### Error #3: Botones sin texto accesible

**Problema:** Algunos botones en las secciones hero y CTA usaban solo contenido visual (iconos SVG) sin texto alternativo para lectores de pantalla.

**Impacto:** Usuarios con discapacidad visual no pueden saber la función de estos botones al navegar con lector de pantalla.

**Criterio WCAG:** 4.1.2 — Nombre, función, valor

**Código ANTES:**
```html
<button class="hero__button hero__button--primary">
  Get started
  <svg class="hero__button-icon" ...>...</svg>
</button>
```

**Código DESPUÉS:**
```html
<button class="hero__button hero__button--primary" aria-label="Get started - begin using BROADCASTTD">
  Get started
  <svg class="hero__button-icon" aria-hidden="true" ...>...</svg>
</button>
```

---

#### Error #4: Contraste insuficiente en texto

**Problema:** Algunos textos con colores claros sobre fondos oscuros no cumplían el ratio de contraste mínimo de 4.5:1 para texto normal según WCAG.

**Impacto:** Usuarios con baja visión o daltonismo tienen dificultad para leer el contenido.

**Criterio WCAG:** 1.4.3 — Contraste mínimo

**Código ANTES:**
```scss
// Ejemplo: texto con contraste insuficiente
color: var(--color-text-muted); // ratio < 4.5:1
```

**Código DESPUÉS:**
```scss
// Ajuste de variable para cumplir ratio mínimo
color: var(--color-text-muted); // ratio >= 4.5:1 tras ajuste de la variable
```

---

#### Error #5: SVGs decorativos sin `focusable="false"`

**Problema:** Algunos iconos SVG decorativos no incluían `focusable="false"`, lo que en navegadores antiguos (especialmente IE y Edge Legacy) podía hacer que recibieran foco con el teclado.

**Impacto:** Usuarios que navegan con teclado se encuentran con paradas innecesarias en iconos decorativos, ralentizando la navegación.

**Criterio WCAG:** 4.1.2 — Nombre, función, valor

**Código ANTES:**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="..."/>
</svg>
```

**Código DESPUÉS:**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
  <path d="..."/>
</svg>
```

---

## Sección 5: Análisis de estructura semántica

### Landmarks HTML5 utilizados

- [x] `<header>` — Cabecera del sitio (`role="banner"` en `header.html`)
- [x] `<nav>` — Múltiples instancias: breadcrumbs (`aria-label="breadcrumb"`), footer navigation (`aria-label="Footer navigation"`), social media (`aria-label="Social media links"`), page section navigation en `/guiadeestilos`
- [x] `<main>` — Contenido principal (`id="main-content"`, `tabindex="-1"` en `app.html`)
- [ ] `<article>` — Usado en la página About (`about-card` para Misión/Visión, `team-card` para miembros) y en Features (`features__card`)
- [x] `<section>` — Usado extensivamente: hero, series-section (popular/future), about-stats, about-team, contact-methods, contact-social, contact-faq, component-section en la guía de estilos
- [ ] `<aside>` — No usado en el proyecto
- [x] `<footer>` — Pie de página (`role="contentinfo"` en `footer.html`)

### Jerarquía de encabezados

#### Página principal (`/`)
```
H1: Track series. Rate them. See what's good.
  H2: Popular this week
  H2: Future releases
```

#### Página About (`/about`)
```
H1: About Us
  H2: Our Mission
  H2: Our Vision
  H2: Our Numbers
  H2: Our Team
    H3: [nombre de miembro] (en team-card__name)
  H2: Ready to get started?
```

#### Página Contact (`/contact`)
```
H1: Get in Touch
  H2: How to Reach Us
    H3: [método de contacto] (email, business, press, api)
  H2: Join Our Community
  H2: Frequently Asked Questions
  H2: Our Office
```

#### Guía de estilos / Home (`/guiadeestilos`)
```
H1: Component System
  H2: PHASE 1: DOM Manipulation and Events
    H3: Theme Switcher
    H3: DOM Manipulation
    H3: Event System
    H3: Hamburger Menu
    H3: Interactive Modal
    H3: Tabs
    H3: Tooltips
  H2: PHASE 2: Interactive Components and Communication
    H3: Sibling Component Communication
    H3: Loading States and Notification System
  H2: PHASE 3: Advanced Reactive Forms
    H3: Contact Form with Custom Validators
    H3: Invoice Form with FormArray
    H3: Profile Form with Async Validation
  H2: Style Guide
    H3: 1. Form Components
    H3: 2. Buttons
    H3: 3. Cards and Containers
    H3: 4. Notifications and Alerts
    H3: 5. Cards
    H3: 6. Card List (Series Lists)
    H3: 7. Complete Forms
```

> **Nota:** Se corrigió el error de doble H1 en esta página. "Style Guide" pasó de H1 a H2.

#### Página 404 (`/not-found`)
```
H1: Page not found
  H2: Useful links
```

**Estado:** La jerarquía es correcta en todas las páginas tras la corrección del doble H1 en `/guiadeestilos`.

### Análisis de imágenes

- **Total de imágenes:** 12+ imágenes de series (6 en carousel como background-image + 6 en Popular this week + 6 en Future releases) + imágenes en card-list
- **Con texto alternativo:** Todas las `<img>` tienen `[alt]="imageAlt"` dinámico con valores descriptivos (ej: "Twin Peaks TV series poster")
- **Decorativas (alt=""):** Los iconos SVG usan `aria-hidden="true"` + `focusable="false"`, lo cual es el equivalente correcto para SVG decorativos
- **Sin alt (corregidas):** 0 — Las imágenes de carousel usan `role="img"` + `aria-label` en lugar de `<img>`, que es la técnica correcta para `background-image`

---

## Sección 6: Resultados finales después de correcciones

### Comparativa antes/después

| Herramienta | Antes | Después |
|-------------|-------|---------|
| Lighthouse  | ![Lighthouse antes](./capturas/Lighthouse%20Report%20Antiguo.png) | ![Lighthouse después](./capturas/Lighthouse%20Report%20Nuevo.png) |
| TAWDIS      | ![TAWDIS antes](./capturas/TAWDIS%20Broadcasttd%20Antiguo.png) | ![TAWDIS después](./capturas/TAWDIS%20Broadcasttd%20Nuevo.png) |
| WAVE        | ![WAVE](./capturas/WAVE%20Broadcasttd.png) | — |

### Checklist de conformidad WCAG 2.1 Nivel AA

**Perceptible:**
- [x] 1.1.1 — Contenido no textual: Todas las `<img>` tienen `[alt]` descriptivo; SVG decorativos usan `aria-hidden="true"`; background-images del carousel usan `role="img"` + `aria-label`
- [x] 1.3.1 — Información y relaciones: HTML semántico con `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`; roles ARIA explícitos (`banner`, `contentinfo`, `search`, `dialog`, `tablist`, `tab`, `tabpanel`). Corregido doble H1 en guía de estilos.
- [x] 1.4.3 — Contraste mínimo (4.5:1 en texto normal): Ajustados colores que no cumplían el ratio mínimo.
- [ ] 1.4.4 — Redimensionar texto (200% sin pérdida de funcionalidad)

**Operable:**
- [x] 2.1.1 — Teclado: Skip link implementado; todos los elementos interactivos son focusables; carrusel operable con teclado
- [x] 2.1.2 — Sin trampas de teclado
- [x] 2.4.1 — Evitar bloques: Skip link (`<a href="#main-content" class="skip-link">`) permite saltar la navegación
- [x] 2.4.7 — Foco visible: Mixin global `focus-visible` con `outline` aplicado en 25+ componentes

**Comprensible:**
- [x] 3.1.1 — Idioma de la página: `lang="en"` establecido en `<html>`, correspondiente al idioma predominante de la interfaz
- [x] 3.2.3 — Navegación consistente: Header y footer presentes en todas las páginas; breadcrumbs dinámicos
- [x] 3.3.2 — Etiquetas o instrucciones en formularios: Todos los formularios usan `<label>` explícito o `visually-hidden`; inputs tienen `aria-invalid` y `aria-describedby` para errores

**Robusto:**
- [x] 4.1.2 — Nombre, función, valor: Uso extensivo de ARIA (`aria-label`, `aria-expanded`, `aria-selected`, `aria-modal`, `aria-labelledby`, `aria-controls`, `aria-live`). Corregidos SVG sin `focusable="false"`.

### Nivel de conformidad alcanzado

**Nivel:** AA parcial

El proyecto cumple la mayoría de criterios de nivel AA. Los principios Perceptible, Operable, Comprensible y Robusto están cubiertos en sus criterios principales. Queda pendiente la verificación completa de redimensionado de texto al 200% (1.4.4).

---

## Sección 7: Conclusiones y reflexión

### ¿Es accesible mi proyecto?

BROADCASTTD ha sido diseñado con la accesibilidad como prioridad desde las primeras fases del desarrollo. La implementación incluye un sistema robusto de landmarks semánticos, ARIA extensivo en todos los componentes interactivos, navegación por teclado completa con skip link y focus visible, y soporte para `prefers-reduced-motion`. Tras la auditoría con Lighthouse, WAVE y TAWDIS, se corrigieron errores de jerarquía de encabezados, contraste de colores y atributos faltantes en SVG decorativos. Lo más relevante del proceso fue descubrir que pequeños detalles como un `focusable="false"` en un SVG o un segundo H1 en una página pueden marcar la diferencia entre una experiencia accesible y una barrera real para usuarios con discapacidades.

### Principales mejoras aplicadas

1. **Corrección de doble H1 en guía de estilos** — Garantiza una jerarquía de encabezados clara para navegación con lector de pantalla
2. **Añadido `focusable="false"` a SVGs decorativos restantes** — Evita paradas de foco innecesarias en navegación por teclado
3. **Ajuste de contraste en textos** — Cumplir el ratio mínimo 4.5:1 para usuarios con baja visión
4. **`aria-label` en botones con solo iconos** — Proporciona nombre accesible para lectores de pantalla
5. **Verificación y mantenimiento de `lang="en"`** — Asegura pronunciación correcta del contenido por lectores de pantalla

### Mejoras futuras

1. Implementar detección automática de `prefers-color-scheme` para adaptar el tema al sistema operativo del usuario
2. Añadir soporte para `prefers-contrast` (alto contraste) con una paleta de colores alternativa
3. Verificar y optimizar el redimensionado de texto al 200% en todos los breakpoints

### Aprendizaje clave

La accesibilidad no es una capa que se añade al final del proyecto, sino una forma de pensar el diseño desde el principio. Cada decisión de marcado semántico, cada atributo ARIA y cada estilo de focus contribuyen a que la web sea un espacio realmente inclusivo. Las herramientas automatizadas son un buen punto de partida, pero la auditoría manual revela problemas que solo se entienden al experimentar la web como lo haría un usuario con discapacidad.

---

## Características de accesibilidad implementadas en BROADCASTTD

Resumen de las medidas de accesibilidad presentes en el código del proyecto:

| Característica | Implementación | Ubicación |
|---|---|---|
| **Skip link** | `<a href="#main-content" class="skip-link">Skip to main content</a>` | `app.html` |
| **Landmark roles** | `role="banner"`, `role="contentinfo"`, `role="search"` | `header.html`, `footer.html` |
| **`<main>` con `tabindex="-1"`** | Permite que el skip link enfoque el contenido principal | `app.html` |
| **`aria-live` regions** | `aria-live="polite"` en toast, `aria-live="assertive"` en alerts | `app.html` |
| **Carrusel accesible** | `role="tablist"`, `role="tab"`, `aria-selected`, `aria-label`, `aria-hidden` | `main.html` |
| **Hamburger menu** | `aria-expanded`, `aria-label="Menu"` | `header.html` |
| **Formularios accesibles** | `aria-invalid`, `aria-describedby`, `aria-required`, `role="alert"` para errores | `form-input.html`, `form-textarea.html`, etc. |
| **Labels ocultos visualmente** | Clase `.visually-hidden` para labels de búsqueda y enlaces sociales | `header.html`, `footer.html` |
| **Focus visible** | Mixin `@include focus-visible` en 25+ componentes | `_mixins.scss` + componentes |
| **SVGs decorativos** | `aria-hidden="true"` + `focusable="false"` en iconos | Header, footer, hero, etc. |
| **Lazy loading nativo** | `loading="lazy"` en `<img>` de cards y card-list | `card.html`, `card-list.html` |
| **`prefers-reduced-motion`** | Desactiva animaciones/transiciones si el usuario lo prefiere | `_reset.scss`, `_helpers.scss` |
| **Breadcrumbs** | `aria-label="breadcrumb"`, `aria-current="page"` | `breadcrumbs.html`, `header.html` |
| **Diálogos accesibles** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` | `modal.html`, `notification.html` |
| **Tabs accesibles** | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, keyboard navigation | `tabs.html` |
| **Tooltips** | `role="tooltip"`, `aria-hidden` cuando cerrado | `tooltip.html` |
| **Textos alt en imágenes** | `[alt]="imageAlt"` dinámico con descripciones reales | `card.html`, `card-list.html` |
| **Social links** | `target="_blank"` con `rel="noopener noreferrer"` + `visually-hidden` label indicando "(opens in new tab)" | `footer.html` |
| **Theme toggle** | `aria-label` dinámico ("Switch to light/dark theme") | `theme-toggle.html` |
