# EXPLICACIÓN A FONDO DE LOS CONCEPTOS DE LA PRÁCTICA
## Para entender y explicar con tus propias palabras

---

## ÍNDICE
1. [Arquitectura ITCSS](#1-arquitectura-itcss)
2. [Metodología BEM](#2-metodología-bem)
3. [Variables CSS vs Variables SASS](#3-variables-css-vs-variables-sass)
4. [Container Queries vs Media Queries](#4-container-queries-vs-media-queries)
5. [Optimización de Imágenes](#5-optimización-de-imágenes)
6. [Mixins en SASS](#6-mixins-en-sass)

---

## 1. ARQUITECTURA ITCSS

### ¿Qué es ITCSS?

ITCSS significa **Inverted Triangle CSS** (CSS del Triángulo Invertido). Es una metodología para organizar archivos CSS/SASS creada por Harry Roberts.

### ¿Por qué "triángulo invertido"?

Imagina un triángulo con la punta hacia abajo:

```
▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼  ← Arriba: muy genérico, baja especificidad
 ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
   ▼▼▼▼▼▼▼▼▼▼▼▼
    ▼▼▼▼▼▼▼▼▼
     ▼▼▼▼▼▼
      ▼▼▼
       ▼ ← Abajo: muy específico, alta especificidad
```

### Las 7 capas de ITCSS (como están en tu proyecto):

| Capa | Carpeta | Qué contiene | Especificidad |
|------|---------|--------------|---------------|
| 1. Settings | `00-settings/` | Variables, tokens de diseño | Ninguna (solo variables) |
| 2. Tools | `01-tools/` | Mixins, funciones | Ninguna (solo herramientas) |
| 3. Generic | `02-generic/` | Reset, normalize | Muy baja (selectores de elemento) |
| 4. Elements | `03-elements/` | Estilos base para `h1`, `p`, `a`, etc. | Baja (selectores de elemento) |
| 5. Objects | `04-objects/` | Patrones de layout (grid, container) | Media (clases) |
| 6. Components | `05-components/` | Componentes UI (botones, cards) | Alta (clases específicas) |
| 7. Utilities | `06-utilities/` | Helpers con `!important` | Máxima |

### ¿Por qué es importante este orden?

**El problema de CSS:**
```css
/* Si escribes esto primero... */
.button { color: red; }

/* ...y luego esto */
.button { color: blue; }

/* El botón será AZUL porque el segundo sobrescribe al primero */
```

**La solución de ITCSS:**
Al organizar de menor a mayor especificidad, cada capa puede sobrescribir a las anteriores sin conflictos. Un componente específico siempre "ganará" sobre estilos genéricos porque viene después en la cascada.

### En tu proyecto (`styles.scss`):

```scss
// Orden correcto - de menor a mayor especificidad
@import 'styles/00-settings/variables';    // Solo variables
@import 'styles/01-tools/mixins';          // Solo mixins
@import 'styles/02-generic/reset';         // Reset básico
@import 'styles/03-elements/base';         // Elementos HTML
@import 'styles/04-objects/layout';        // Layouts
@import 'styles/05-components/buttons';    // Componentes
@import 'styles/06-utilities/helpers';     // Utilidades con !important
```

---

## 2. METODOLOGÍA BEM

### ¿Qué es BEM?

BEM significa **Block Element Modifier** (Bloque Elemento Modificador). Es una convención de nomenclatura para clases CSS.

### La estructura:

```
.bloque__elemento--modificador
```

- **Bloque:** Componente independiente y reutilizable
- **Elemento:** Parte del bloque que no tiene sentido por sí sola
- **Modificador:** Variación o estado del bloque/elemento

### Ejemplos de tu proyecto (header.scss):

```scss
// BLOQUE: El componente completo
.header { ... }

// ELEMENTOS: Partes del header
.header__container { ... }    // El contenedor interno
.header__brand { ... }        // Logo + breadcrumbs
.header__logo { ... }         // Solo el logo
.header__search { ... }       // El buscador
.header__search-input { ... } // El input del buscador
.header__toggle { ... }       // Botón hamburguesa

// MODIFICADORES: Variaciones
.header__toggle--active { ... }      // Hamburguesa cuando está abierto
.header__mobile-btn--login { ... }   // Botón de login en móvil
.header__mobile-btn--logout { ... }  // Botón de logout en móvil
```

### ¿Por qué evitar anidamiento profundo en SASS?

**MAL - Anidamiento profundo:**
```scss
.header {
  .header__container {
    .header__search {
      .header__search-input {
        color: black;
      }
    }
  }
}
```

Esto genera:
```css
.header .header__container .header__search .header__search-input {
  color: black;
}
```

**Problemas:**
1. **Especificidad muy alta:** Si luego quieres cambiar el color en un contexto específico, necesitarás un selector aún más largo o usar `!important`.

2. **Mal rendimiento:** El navegador lee los selectores de derecha a izquierda. Primero busca todos los `.header__search-input`, luego filtra los que están dentro de `.header__search`, etc.

3. **Acoplamiento al HTML:** Si mueves el input a otro lugar, los estilos se rompen.

**BIEN - Selectores planos con BEM:**
```scss
.header { ... }
.header__container { ... }
.header__search { ... }
.header__search-input { color: black; }
```

**Ventajas:**
1. Especificidad uniforme y predecible
2. Rendimiento óptimo
3. Componentes desacoplados del HTML
4. Fácil de sobrescribir cuando sea necesario

### Cuándo SÍ es aceptable anidar:

```scss
.header__search-input {
  color: black;
  
  // Pseudo-clases y pseudo-elementos
  &:hover { color: blue; }
  &:focus { outline: 2px solid blue; }
  &::placeholder { color: gray; }
  
  // Estados dentro del mismo elemento
  &:disabled { opacity: 0.5; }
}
```

---

## 3. VARIABLES CSS VS VARIABLES SASS

### Variables SASS (preprocesador):

```scss
// Definición
$color-primary: #6b21a8;

// Uso
.button {
  background: $color-primary;
}
```

**Después de compilar (CSS final):**
```css
.button {
  background: #6b21a8;
}
```

La variable **desaparece** y queda el valor literal.

### Variables CSS (custom properties):

```css
/* Definición */
:root {
  --color-primary: #6b21a8;
}

/* Uso */
.button {
  background: var(--color-primary);
}
```

**En el CSS final:**
```css
:root {
  --color-primary: #6b21a8;
}
.button {
  background: var(--color-primary);
}
```

La variable **permanece** y el navegador la resuelve en tiempo de ejecución.

### ¿Por qué usar CSS custom properties para temas?

**1. Cambio dinámico en tiempo de ejecución:**

```scss
// En tu _variables.scss:

:root {
  --color-bg-main: hsl(47, 85%, 85%);     // Amarillo claro
  --color-text-primary: hsl(290, 21%, 19%); // Morado oscuro
}

.dark-mode {
  --color-bg-main: hsl(286, 33%, 15%);    // Morado oscuro
  --color-text-primary: hsl(0, 0%, 100%); // Blanco
}
```

Al añadir la clase `.dark-mode` al body con JavaScript:
```javascript
document.body.classList.toggle('dark-mode');
```

**TODOS** los elementos que usen `var(--color-bg-main)` cambiarán instantáneamente.

Con variables SASS esto sería imposible sin recompilar todo el CSS.

**2. Herencia en cascada:**

Las CSS custom properties heredan como cualquier propiedad CSS:

```css
.card {
  --card-padding: 1rem;
}

.card--large {
  --card-padding: 2rem;
}

.card__content {
  padding: var(--card-padding); /* Hereda del padre */
}
```

**3. Valores computados:**

```css
:root {
  --spacing-unit: 8px;
  --spacing-2: calc(var(--spacing-unit) * 2);  /* 16px */
  --spacing-3: calc(var(--spacing-unit) * 3);  /* 24px */
}
```

### En tu proyecto:

Usas **CSS custom properties** para:
- Colores de tema (modo claro/oscuro)
- Espaciados
- Tipografías
- Sombras
- Transiciones

Usas **variables SASS** para:
- El mapa de breakpoints (`$breakpoints`) que se usa en mixins

Esta combinación es ideal: SASS para lógica de compilación, CSS para valores que cambian en runtime.

---

## 4. CONTAINER QUERIES VS MEDIA QUERIES

### Media Queries tradicionales:

```css
/* Responde al tamaño de la VENTANA del navegador */
@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Problema:** El componente no sabe en qué contexto se usará.

Imagina una grid de cards:
- En la página principal ocupa todo el ancho → se ven 4 columnas
- En un sidebar de 300px → debería verse 1 columna, pero sigue mostrando 4 porque el viewport sigue siendo grande

### Container Queries:

```css
/* El contenedor se declara como contexto de consulta */
.series-section {
  container-type: inline-size;
  container-name: series-section;
}

/* Las queries responden al tamaño del CONTENEDOR */
@container series-section (max-width: 400px) {
  .series-section__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container series-section (min-width: 901px) {
  .series-section__grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
```

### En tu proyecto (`main.scss`):

```scss
.series-section {
  // Declarar como contenedor
  container-type: inline-size;
  container-name: series-section;
}

// Container Queries para adaptar el grid
@container series-section (max-width: 400px) {
  .series-section__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-2);
  }
}

@container series-section (min-width: 401px) and (max-width: 600px) {
  .series-section__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@container series-section (min-width: 601px) and (max-width: 900px) {
  .series-section__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@container series-section (min-width: 901px) {
  .series-section__grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
```

### Comparativa:

| Aspecto | Media Queries | Container Queries |
|---------|--------------|-------------------|
| Responde a | Viewport (ventana) | Contenedor padre |
| Uso ideal | Layout de página | Componentes reutilizables |
| Portabilidad | Baja (depende del contexto) | Alta (se adapta al espacio) |
| Soporte | Universal | Moderno (95%+ navegadores) |

### ¿Cuándo usar cada uno?

**Media Queries:** Para layouts de página, cambiar disposición header/sidebar/main.

**Container Queries:** Para componentes que pueden aparecer en diferentes contextos.

---

## 5. OPTIMIZACIÓN DE IMÁGENES

### El problema:

Una imagen de 1920x1080 pesa ~500KB en JPEG. Si la muestras en un móvil de 375px de ancho:
- Descargas 500KB
- El móvil la redimensiona a ~375px
- Desperdicio de datos y tiempo de carga

### La solución: Imágenes responsive

Tu proyecto implementa dos técnicas:

#### 1. Elemento `<picture>` con múltiples `<source>`:

```html
<picture class="responsive-banner">
  <!-- WebP para navegadores modernos -->
  <source 
    type="image/webp"
    srcset="
      /assets/optimized/imagen-small.webp 400w,
      /assets/optimized/imagen-medium.webp 800w,
      /assets/optimized/imagen-large.webp 1200w,
      /assets/optimized/imagen-xlarge.webp 1920w
    "
    sizes="100vw"
  >
  
  <!-- JPEG como fallback -->
  <source 
    type="image/jpeg"
    srcset="
      /assets/optimized/imagen-small.jpg 400w,
      /assets/optimized/imagen-medium.jpg 800w,
      /assets/optimized/imagen-large.jpg 1200w,
      /assets/optimized/imagen-xlarge.jpg 1920w
    "
    sizes="100vw"
  >
  
  <!-- Imagen por defecto -->
  <img src="/assets/optimized/imagen-large.webp" alt="...">
</picture>
```

#### 2. Atributo `srcset` con descriptores de ancho:

```html
<img 
  srcset="
    imagen-small.jpg 400w,
    imagen-medium.jpg 800w,
    imagen-large.jpg 1200w
  "
  sizes="(max-width: 600px) 100vw, 50vw"
  src="imagen-medium.jpg"
  alt="..."
>
```

### ¿Cómo decide el navegador qué imagen cargar?

1. **Mira el `sizes`:** "100vw" significa que la imagen ocupará el 100% del viewport
2. **Calcula el ancho necesario:** Si el viewport es 375px y es retina (2x), necesita 750px
3. **Busca en `srcset`:** Elige la imagen más pequeña que cubra esa necesidad (800w en este caso)
4. **Prioriza formatos:** Si soporta WebP, elige ese source

### Formato WebP:

| Formato | Peso aprox. (misma calidad) | Soporte |
|---------|----------------------------|---------|
| JPEG | 100KB | Universal |
| WebP | 60-70KB | 97%+ navegadores |
| AVIF | 40-50KB | 92% navegadores |

Tu proyecto usa WebP con fallback a JPEG/PNG.

### En tu proyecto:

El componente `ResponsiveBanner` (en `responsive-banner.ts`) genera automáticamente:

```typescript
getWebPSrcset(): string {
  return [
    `${optimizedDir}/${baseName}-small.webp 400w`,
    `${optimizedDir}/${baseName}-medium.webp 800w`,
    `${optimizedDir}/${baseName}-large.webp 1200w`,
    `${optimizedDir}/${baseName}-xlarge.webp 1920w`
  ].join(', ');
}
```

Y las imágenes optimizadas están en `assets/optimized/` con estos tamaños:
- **small:** 400px de ancho
- **medium:** 800px de ancho
- **large:** 1200px de ancho
- **xlarge:** 1920px de ancho

---

## 6. MIXINS EN SASS

### ¿Qué es un mixin?

Un mixin es como una función que genera código CSS. Defines una vez, usas muchas veces.

### Tu mixin `responsive`:

```scss
@mixin responsive($breakpoint) {
  // Busca el breakpoint en el mapa
  @if map.has-key(vars.$breakpoints, $breakpoint) {
    // Si existe, genera la media query
    @media (min-width: map.get(vars.$breakpoints, $breakpoint)) {
      @content;  // Aquí va el CSS que pases al mixin
    }
  } @else {
    // Si no existe, muestra un warning
    @warn "No existe el breakpoint `#{$breakpoint}`";
  }
}
```

El mapa de breakpoints:
```scss
$breakpoints: (
  'sm': 640px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1280px,
  '2xl': 1536px
);
```

### Cómo se usa:

```scss
.series-section {
  padding: var(--spacing-4);
  
  @include responsive('md') {
    padding: var(--spacing-8);
  }
  
  @include responsive('lg') {
    padding: var(--spacing-12);
  }
}
```

### Qué genera:

```css
.series-section {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .series-section {
    padding: var(--spacing-8);
  }
}

@media (min-width: 1024px) {
  .series-section {
    padding: var(--spacing-12);
  }
}
```

### ¿Por qué usar mixins para media queries?

1. **Centralización:** Si cambias el valor de `md` de 768px a 800px, se actualiza en toda la app.

2. **Legibilidad:** `@include responsive('md')` es más claro que `@media (min-width: 768px)`.

3. **Prevención de errores:** El mixin valida que el breakpoint existe y te avisa si no.

4. **Consistencia:** Todos los desarrolladores usan los mismos breakpoints.

### Otros mixins útiles de tu proyecto:

```scss
// Centra con flexbox
@mixin flex-center($direction: row, $gap: 0) {
  display: flex;
  flex-direction: $direction;
  justify-content: center;
  align-items: center;
  @if $gap != 0 { gap: $gap; }
}

// Transiciones suaves
@mixin transition($properties...) {
  transition: $properties $duration $timing;
}

// Truncar texto
@mixin truncate($lines: 1) {
  @if $lines == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $lines;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

---

## RESUMEN PARA LA DEFENSA

| Concepto | Qué es | Por qué lo usas |
|----------|--------|-----------------|
| **ITCSS** | Arquitectura de capas CSS | Evita conflictos de especificidad |
| **BEM** | Nomenclatura de clases | Código legible y mantenible |
| **CSS Custom Properties** | Variables nativas del navegador | Temas dinámicos sin recompilar |
| **Container Queries** | Queries basadas en contenedor | Componentes verdaderamente modulares |
| **picture + srcset** | Imágenes responsive | Optimización de carga y datos |
| **Mixins** | Funciones que generan CSS | Código DRY y centralizado |

---

## NOTAS SOBRE LO NO INCLUIDO

Si durante la defensa te preguntan por algo que no está en el proyecto:

1. **AVIF:** El proyecto usa WebP pero no AVIF. WebP tiene mejor soporte (97% vs 92%) y la diferencia de peso no justifica la complejidad adicional.

2. **CSS-in-JS:** El proyecto usa SASS tradicional porque Angular tiene un sistema de encapsulación de estilos integrado con `ViewEncapsulation`.

3. **Atomic CSS (Tailwind):** Se optó por BEM para tener más control sobre los estilos y mejor legibilidad en componentes complejos.

4. **CSS Layers (@layer):** No implementado porque ITCSS ya resuelve el problema de especificidad de forma más compatible con navegadores antiguos.
