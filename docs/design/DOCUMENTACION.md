# FASE 1: Arquitectura CSS y Comunicación Visual

Este documento describe la arquitectura CSS completa del proyecto, incluyendo los principios de diseño visual, metodología, organización de archivos y sistema de design tokens.

---

## 1.1 Principios de Comunicación Visual



Los principios de comunicación visual son fundamentales para crear interfaces que sean intuitivas, atractivas y funcionales. A continuación se describe cómo se aplica cada principio en este proyecto:

### Jerarquía

La **jerarquía visual** se refiere al orden de importancia de los elementos en la interfaz, de forma que el usuario se fija en lo más relevante primero.

**Aplicación:**

- **Tamaños de fuente:** La escala tipográfica va desde `0.25rem` hasta `4rem`. Los títulos principales (h1) son significativamente más grandes que los títulos secundarios (h2-h6) y el texto de cuerpo.
  
- **Pesos de fuente:** Empleamos 5 pesos diferentes (`light: 300`, `regular: 400`, `medium: 500`, `semibold: 600`, `bold: 700`) para crear contraste entre elementos importantes y secundarios.

- **Espaciado consistente:** El sistema de espaciado basado en múltiplos de 4px asegura que los elementos importantes tengan más espacio respiratorio. Los títulos tienen `margin-bottom: 1rem` mientras que elementos secundarios usan valores menores.

- **Color para jerarquía:** Los elementos primarios usan `$color-text-primary` (#FFFDEB) para máximo contraste, mientras que texto secundario usa `$color-text-secondary` (#D1CFC4) y deshabilitado `$color-text-disabled` (#8F8C7F).

**Ejemplo en el código:**
```scss
// Títulos con jerarquía clara
h1 {
  font-size: $font-size-5xl; // 4.768rem - Más grande
  font-weight: $font-weight-bold; // 700 - Más pesado
  margin-bottom: $spacing-4; // 1rem - Más espacio
}

h2 {
  font-size: $font-size-4xl; // 3.815rem - Mediano
  font-weight: $font-weight-bold; // 700
}

p {
  font-size: $font-size-base; // 1rem - Base
  font-weight: $font-weight-regular; // 400
  color: $color-text-primary;
}

small {
  font-size: $font-size-sm; // 0.8rem - Más pequeño
  color: $color-text-secondary; // Color secundario
}
```

### Contraste

El **contraste** ayuda a diferenciar elementos y hace que la interfaz sea más legible y accesible.

**Cómo lo aplicamos:**

- **Contraste de color:** Usamos un esquema de colores con alto contraste. El texto principal (#FFFDEB) sobre fondo oscuro (#38263B) proporciona excelente legibilidad. La paleta incluye colores brillantes para elementos interactivos (#A264BF primario, #BFBF64 secundario).

- **Contraste de tamaño:** Los botones y CTAs son más grandes que el texto normal. Los iconos importantes tienen tamaños destacados.

- **Contraste de forma:** Elementos interactivos tienen bordes redondeados (`border-radius`) mientras que elementos de contenido pueden ser más rectangulares.

- **Contraste de movimiento:** Los elementos interactivos tienen transiciones (`transition: 300ms`) que los diferencian de elementos estáticos.

**Ejemplo en el código:**
```scss
// Alto contraste en botones
button {
  background-color: $color-primary; // #A264BF
  color: $color-text-primary; // #FFFDEB
  padding: $spacing-3 $spacing-6; // Tamaño destacado
  
  &:hover {
    background-color: $color-primary-light; // #D885FE - Contraste visual
    transform: translateY(-1px); // Contraste de movimiento
    box-shadow: $shadow-md; // Contraste de elevación
  }
}

// Contraste en estados semánticos
.success {
  color: $color-success; // #4CAF50 - Verde
}

.error {
  color: $color-error; // #F44336 - Rojo
}
```

### Alineación

La **alineación** crea orden visual y conecta elementos relacionados.

**Cómo lo aplicamos:**

- **Grid system:** Utilizamos CSS Grid con 12 columnas que asegura alineación perfecta de elementos en layouts complejos.

- **Flexbox:** Para componentes más simples, usamos Flexbox con clases de utilidad (`.justify-center`, `.items-center`, `.justify-between`) que mantienen la alineación consistente.

- **Contenedores:** Todos los contenedores usan `.container` con anchos máximos definidos (`$max-width-xl: 1280px`) y padding lateral simétrico, asegurando alineación central en todas las resoluciones.

- **Alineación de texto:** Por defecto usamos alineación izquierda para lecturabilidad, con excepciones para títulos centrados en secciones hero.

**Ejemplo en el código:**
```scss
// Sistema de grid para alineación perfecta
.grid {
  display: grid;
  gap: $spacing-4;
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr)); // Columnas alineadas
}

// Flexbox para alineación de componentes
.flex-between {
  display: flex;
  justify-content: space-between; // Espacio distribuido
  align-items: center; // Alineación vertical
}

// Contenedor con alineación central
.container {
  max-width: $max-width-xl;
  margin-left: auto;
  margin-right: auto; // Centrado horizontal
  padding-left: $spacing-4;
  padding-right: $spacing-4; // Padding simétrico
}
```

### Proximidad

La **proximidad** agrupa elementos relacionados y separa elementos no relacionados.

**Cómo lo aplicamos:**

- **Sistema de espaciado:** Nuestra escala de espaciado de 0.25rem (4px) a 8rem (128px) permite espaciado preciso. Elementos relacionados tienen gaps menores (`$spacing-2`, `$spacing-3`) mientras que secciones diferentes tienen espaciado mayor (`$spacing-8`, `$spacing-12`).

- **Secciones:** Las clases `.section`, `.section-sm`, `.section-lg` definen espaciado vertical consistente para separar bloques de contenido.

- **Cards y grupos:** Los componentes tipo card agrupan información relacionada con padding interno uniforme y están separados de otros cards con margin.

- **Formularios:** Labels están cerca de sus inputs (`margin-bottom: $spacing-2`) pero los grupos de campos tienen más separación (`margin-bottom: $spacing-4`).

**Ejemplo en el código:**
```scss
// Proximidad en formularios
label {
  margin-bottom: $spacing-2; // 0.5rem - Cerca del input
}

.form-group {
  margin-bottom: $spacing-4; // 1rem - Separación entre grupos
}

// Proximidad en listas
li {
  margin-bottom: $spacing-2; // 0.5rem - Ítems cercanos
}

ul {
  margin-bottom: $spacing-4; // 1rem - Lista separada del siguiente elemento
}

// Secciones con espaciado apropiado
.section {
  padding: $spacing-12 0; // 3rem vertical - Mucho espacio
  
  @include responsive('md') {
    padding: $spacing-16 0; // 4rem en desktop
  }
}
```

### Repetición

La **repetición** crea coherencia y fortalece la identidad visual.

**Cómo lo aplicamos:**

- **Paleta de colores limitada:** Usamos consistentemente los mismos colores primarios (#A264BF), secundarios (#BFBF64) y neutrales en toda la aplicación.

- **Tipografía consistente:** Dos fuentes principales (MochiyPopOne para títulos, Do Hyeon para texto) se repiten en todos los componentes.

- **Bordes redondeados:** Todos los elementos interactivos usan el mismo `border-radius` (`$radius-md: 6px`) creando un lenguaje visual coherente.

- **Sombras consistentes:** Usamos el mismo conjunto de sombras (`$shadow-sm`, `$shadow-md`, `$shadow-lg`) para elevar elementos.

- **Transiciones uniformes:** Todas las interacciones usan `transition: 300ms ease-in-out` para coherencia.

- **Espaciado de grid:** Consistentemente usamos `gap: $spacing-4` en grids.

**Ejemplo en el código:**
```scss
// Repetición en botones
.btn,
.button,
button {
  border-radius: $radius-md; // Siempre 6px
  transition: $transition-base; // Siempre 300ms
  padding: $spacing-3 $spacing-6; // Padding consistente
  font-weight: $font-weight-medium; // Peso consistente
}

// Repetición en cards
.card {
  border-radius: $radius-md; // Mismo radio
  box-shadow: $shadow-base; // Misma sombra
  padding: $spacing-6; // Mismo padding
  background-color: rgba($color-neutral-900, 0.3); // Mismo fondo
}

// Repetición en formularios
input,
textarea,
select {
  border-radius: $radius-md; // Mismo radio
  padding: $spacing-3 $spacing-4; // Mismo padding
  border: $border-medium solid $color-neutral-700; // Mismo borde
  transition: $transition-base; // Misma transición
}
```

---

## 1.2 Metodología CSS

### BEM (Block Element Modifier)

Este proyecto utiliza **BEM (Block Element Modifier)** como metodología de nomenclatura CSS. BEM es un estándar de la industria que hace que el código sea más legible, mantenible y escalable.

**¿Por qué BEM?**

1. **Claridad:** Los nombres de las clases son autodescriptivos y revelan la estructura del componente.
2. **Modularidad:** Cada bloque es independiente y puede reutilizarse.
3. **Mantenibilidad:** Es fácil entender qué hace cada clase sin ver el HTML.
4. **Evita conflictos:** La especificidad es baja y predecible.
5. **Escalabilidad:** Funciona bien en proyectos grandes con múltiples desarrolladores.

**Estructura BEM:**

```
.block { }           // Componente independiente
.block__element { }  // Parte del bloque
.block--modifier { } // Variación del bloque o elemento
.block__element--modifier { } // Variación de un elemento
```

**Ejemplos de nomenclatura en nuestro proyecto:**

```scss
// BLOQUE: Card
.card {
  padding: $spacing-6;
  border-radius: $radius-md;
  background-color: $color-bg-secondary;
}

// ELEMENTOS: Partes de la card
.card__header {
  margin-bottom: $spacing-4;
  border-bottom: $border-thin solid $color-neutral-700;
}

.card__title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}

.card__body {
  padding: $spacing-4 0;
}

.card__footer {
  margin-top: $spacing-4;
  padding-top: $spacing-4;
  border-top: $border-thin solid $color-neutral-700;
}

// MODIFICADORES: Variaciones de la card
.card--featured {
  background: linear-gradient(135deg, $color-primary-dark, $color-primary);
  box-shadow: $shadow-primary;
}

.card--compact {
  padding: $spacing-3;
}

.card--large {
  padding: $spacing-8;
}

// Elemento con modificador
.card__title--small {
  font-size: $font-size-md;
}
```

**Más ejemplos:**

```scss
// Botones
.btn { }                    // Bloque base
.btn__icon { }              // Icono dentro del botón
.btn__text { }              // Texto del botón
.btn--primary { }           // Variación primaria
.btn--secondary { }         // Variación secundaria
.btn--large { }             // Variación de tamaño
.btn--disabled { }          // Estado deshabilitado

// Formulario
.form { }
.form__group { }            // Grupo de campo
.form__label { }            // Label
.form__input { }            // Input
.form__error { }            // Mensaje de error
.form__input--invalid { }   // Input con error
.form--inline { }           // Formulario en línea

// Navegación
.nav { }
.nav__list { }
.nav__item { }
.nav__link { }
.nav__link--active { }      // Link activo
.nav--vertical { }          // Navegación vertical
```

**Convenciones adicionales:**

- **Sin anidamiento profundo:** Máximo 1 nivel de elementos (`.block__element`, no `.block__element__subelement`).
- **Nombres descriptivos:** Usar nombres que describan función, no apariencia (`.btn--primary` en vez de `.btn--blue`).
- **Consistencia:** Siempre dos guiones para modificadores (`--`) y dos guiones bajos para elementos (`__`).
- **Mixins para estados:** Los estados como `:hover`, `:focus`, `:active` se anidan dentro del bloque/elemento.

---

## 1.3 Organización de Archivos

Este proyecto utiliza **ITCSS (Inverted Triangle CSS)**, una metodología de organización de CSS que estructura los estilos desde lo más genérico y de baja especificidad hasta lo más específico y de alta especificidad.

**¿Por qué ITCSS?**

- **Previene problemas de especificidad:** El orden de importación asegura que las reglas más específicas sobrescriban las generales sin necesidad de `!important`.
- **Facilita el mantenimiento:** Es fácil encontrar dónde debe ir un nuevo estilo.
- **Mejora el rendimiento:** Los estilos se cargan en orden óptimo.
- **Escalabilidad:** Funciona igual de bien en proyectos pequeños y grandes.

### Estructura de Carpetas

```
src/styles/
├── 00-settings/          # Variables y design tokens
│   └── _variables.scss   # Todas las variables SCSS
│
├── 01-tools/             # Mixins y funciones
│   └── _mixins.scss      # Mixins reutilizables
│
├── 02-generic/           # Resets y normalize
│   └── _reset.scss       # Reset CSS moderno
│
├── 03-elements/          # Estilos base de elementos HTML
│   └── _base.scss        # Estilos de h1, p, a, etc.
│
├── 04-objects/           # Patrones de layout
│   └── _layout.scss      # Grid, flex, contenedores
│
├── 05-components/        # Componentes específicos
│   ├── _buttons.scss     # Estilos de botones
│   ├── _header.scss      # Estilos del header
│   └── _footer.scss      # Estilos del footer
│
├── 06-utilities/         # Clases de utilidad
│   └── _helpers.scss     # Utilities con !important
│
└── _main.scss            # Archivo principal (opcional)
```

### Descripción de cada capa

#### 00-settings/ - Variables y Design Tokens

**Propósito:** Contiene todas las variables SCSS. No genera CSS por sí mismo.

**Contenido:**
- Variables de colores
- Escalas tipográficas
- Espaciado
- Breakpoints
- Sombras
- Transiciones
- Z-index

**Especificidad:** Ninguna (no genera CSS)

```scss
// Ejemplo
$color-primary: #A264BF;
$font-size-base: 1rem;
$spacing-4: 1rem;
```

#### 01-tools/ - Mixins y Funciones

**Propósito:** Mixins y funciones SCSS reutilizables. No genera CSS por sí mismo.

**Contenido:**
- Mixins de responsive
- Mixins de flexbox
- Mixins de transiciones
- Funciones de utilidad

**Especificidad:** Ninguna (no genera CSS)

```scss
// Ejemplo
@mixin responsive($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}
```

#### 02-generic/ - Reset CSS

**Propósito:** Normaliza diferencias entre navegadores y establece valores base.

**Contenido:**
- Box-sizing
- Reset de márgenes y paddings
- Configuración de fuentes
- Estilos de formularios base

**Especificidad:** Muy baja (selectores de elemento)

```scss
// Ejemplo
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

#### 03-elements/ - Estilos Base

**Propósito:** Estilos por defecto para elementos HTML sin clases.

**Contenido:**
- Tipografía de h1-h6, p, a
- Listas ul, ol, li
- Formularios input, button
- Tablas
- Imágenes

**Especificidad:** Baja (selectores de elemento)

```scss
// Ejemplo
h1 {
  font-size: $font-size-4xl;
  font-weight: $font-weight-bold;
}

a {
  color: $color-primary-light;
  text-decoration: none;
}
```

#### 04-objects/ - Patrones de Layout

**Propósito:** Patrones de layout reutilizables sin estilos visuales (colores, bordes).

**Contenido:**
- Sistema de grid
- Flexbox utilities
- Contenedores
- Espaciado

**Especificidad:** Baja-Media (clases simples)

```scss
// Ejemplo
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.grid {
  display: grid;
  gap: 1rem;
}
```

#### 05-components/ - Componentes

**Propósito:** Componentes específicos con estilos visuales completos.

**Contenido:**
- Botones
- Cards
- Navegación
- Modales
- Formularios estilizados

**Especificidad:** Media-Alta (clases con modificadores BEM)

```scss
// Ejemplo
.btn {
  padding: 0.75rem 1.5rem;
  background-color: $color-primary;
  border-radius: $radius-md;
}

.btn--large {
  padding: 1rem 2rem;
  font-size: $font-size-lg;
}
```

#### 06-utilities/ - Utilidades

**Propósito:** Clases de utilidad de un solo propósito que sobrescriben todo.

**Contenido:**
- Clases de texto
- Clases de display
- Clases de posicionamiento
- Clases de visibilidad

**Especificidad:** Muy alta (usa `!important`)

```scss
// Ejemplo
.text-center {
  text-align: center !important;
}

.d-none {
  display: none !important;
}
```

### Orden de Importación en styles.scss

**CRÍTICO:** Este orden debe respetarse estrictamente:

```scss
// 1. Settings - Variables primero
@import 'styles/00-settings/variables';

// 2. Tools - Mixins que usan variables
@import 'styles/01-tools/mixins';

// 3. Generic - Reset
@import 'styles/02-generic/reset';

// 4. Elements - Estilos base
@import 'styles/03-elements/base';

// 5. Objects - Layout
@import 'styles/04-objects/layout';

// 6. Components - Componentes específicos
@import 'styles/05-components/buttons';
@import 'styles/05-components/header';
@import 'styles/05-components/footer';

// 7. Utilities - Último, máxima prioridad
@import 'styles/06-utilities/helpers';
```

**¿Por qué este orden?**

Cada capa aumenta la especificidad. Las variables y mixins no generan CSS. El reset establece la base. Los elementos dan estilos por defecto. Los objetos crean estructura. Los componentes añaden estilos visuales. Las utilidades sobrescriben todo.

---

## 1.4 Sistema de Design Tokens

Los **design tokens** son la única fuente de verdad para todos los valores de diseño en el proyecto. Están definidos como variables SCSS en `00-settings/_variables.scss`.

### Selección de Colores

**Decisiones de diseño:**

Elegimos una paleta oscura y vibrante que refleja modernidad y energía:

- **Primarios (#A264BF, #38263B, #D885FE):** El morado representa creatividad y tecnología. Usamos tres tonos para versatilidad: oscuro para fondos, medio para elementos interactivos, claro para hovers.

- **Secundarios (#BFBF64, #59592F, #FEFE85):** El amarillo-verde complementa el morado y aporta calidez. Crea contraste visual sin ser agresivo.

- **Neutrales (escala 50-900):** Una escala de grises cálidos (con tono beige) que va desde casi blanco (#FFFDEB) hasta casi negro (#1C1B18). Proporciona opciones para texto, fondos y bordes manteniendo coherencia.

- **Semánticos:** Seguimos estándares universales: verde para éxito (#4CAF50), rojo para error (#F44336), naranja para advertencia (#FF9800), azul para información (#2196F3). Cada uno tiene variaciones light/dark para flexibilidad.

**Variables definidas:**

```scss
// Primarios
$color-primary: #A264BF;
$color-primary-dark: #38263B;
$color-primary-light: #D885FE;
$color-primary-lightest: #EDD5FF;

// Secundarios
$color-secondary: #BFBF64;
$color-secondary-dark: #59592F;
$color-secondary-light: #FEFE85;
$color-secondary-lightest: #FFFFCC;

// Neutrales (escala completa 50-900)
$color-neutral-50: #FFFDEB;
// ... hasta
$color-neutral-900: #1C1B18;

// Semánticos
$color-success: #4CAF50;
$color-error: #F44336;
$color-warning: #FF9800;
$color-info: #2196F3;
```

### Escala Tipográfica

**Decisiones de diseño:**

Usamos una **escala modular con ratio 1.25 (Major Third)** que crea armonía visual. Este ratio es ideal para interfaces web porque proporciona diferenciación clara sin saltos bruscos.

- **Ratio 1.25:** Cada tamaño es 1.25 veces el anterior. Esto crea progresión natural: 16px → 20px → 25px → 31.25px...

- **Base 16px (1rem):** Usamos 16px como tamaño base porque es el estándar del navegador y óptimo para lectura.

- **Rango xs a 5xl:** Desde 10.24px (para texto muy pequeño como disclaimers) hasta 76.29px (para títulos hero).

- **Fuentes elegidas:**
  - **MochiyPopOne:** Fuente display divertida y característica para títulos y elementos destacados.
  - **Do Hyeon:** Fuente sans-serif limpia y legible para texto de cuerpo.
  - **Fallback:** Sistema de fuentes del sistema operativo para carga rápida.

**Variables definidas:**

```scss
// Familias
$font-primary: 'MochiyPopOne', sans-serif;
$font-secondary: 'Do Hyeon', sans-serif;
$font-fallback: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;

// Tamaños (ratio 1.25)
$font-size-xs: 0.64rem;    // 10.24px
$font-size-sm: 0.8rem;     // 12.8px
$font-size-base: 1rem;     // 16px
$font-size-md: 1.25rem;    // 20px
$font-size-lg: 1.563rem;   // 25px
$font-size-xl: 1.953rem;   // 31.25px
$font-size-2xl: 2.441rem;  // 39px
$font-size-3xl: 3.052rem;  // 48.83px
$font-size-4xl: 3.815rem;  // 61px
$font-size-5xl: 4.768rem;  // 76.29px

// Pesos
$font-weight-light: 300;
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// Line heights
$line-height-tight: 1.2;    // Títulos
$line-height-normal: 1.5;   // Párrafos
$line-height-relaxed: 1.75; // Textos largos
```

### Sistema de Espaciado

**Decisiones de diseño:**

Usamos **escala basada en 4px (0.25rem)** que es estándar en la industria. Los múltiplos de 4 crean alineación perfecta en píxeles y son cómodos para diseñadores y desarrolladores.

- **Base 4px:** La unidad mínima de espaciado. Todos los espacios son múltiplos de 4.
- **Rango amplio:** Desde 4px hasta 128px para cubrir desde gaps pequeños hasta secciones grandes.
- **Nombres semánticos:** `spacing-1`, `spacing-2`, etc. son más claros que píxeles o rems directos.

**Variables definidas:**

```scss
$spacing-0: 0;
$spacing-1: 0.25rem;   // 4px
$spacing-2: 0.5rem;    // 8px
$spacing-3: 0.75rem;   // 12px
$spacing-4: 1rem;      // 16px
$spacing-5: 1.25rem;   // 20px
$spacing-6: 1.5rem;    // 24px
// ... hasta
$spacing-32: 8rem;     // 128px
```

### Breakpoints

**Decisiones de diseño:**

Definimos breakpoints basados en **dispositivos reales y patrones de uso**:

- **640px (sm):** Móvil grande / Phablets
- **768px (md):** Tablets en portrait
- **1024px (lg):** Tablets en landscape / Laptops pequeñas
- **1280px (xl):** Desktop estándar
- **1536px (2xl):** Desktop grande / Monitores 4K

Usamos **mobile-first approach**: los estilos base son para móvil y añadimos complejidad en pantallas más grandes.

**Variables definidas:**

```scss
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;

// Map para mixins
$breakpoints: (
  'sm': $breakpoint-sm,
  'md': $breakpoint-md,
  'lg': $breakpoint-lg,
  'xl': $breakpoint-xl,
  '2xl': $breakpoint-2xl
);
```

### Elevaciones (Sombras)

**Decisiones de diseño:**

Las sombras crean **profundidad y jerarquía**. Usamos sombras sutiles con negro transparente para que funcionen en cualquier fondo.

- **Gradación natural:** Desde `sm` (casi imperceptible) hasta `2xl` (muy prominente).
- **RGBA con transparencia:** Permite que las sombras se adapten al contexto.
- **Sombras especiales:** Incluimos sombras con color primario/secundario para efectos especiales.

**Variables definidas:**

```scss
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
$shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

// Especiales
$shadow-primary: 0 10px 15px -3px rgba(162, 100, 191, 0.4);
```

### Bordes y Radios

**Decisiones de diseño:**

Los **border-radius** suavizan la interfaz y crean un look moderno.

- **Radios consistentes:** Desde `sm` (2px, sutil) hasta `3xl` (24px, muy redondeado) y `full` (círculos perfectos).
- **Grosores de borde:** Tres opciones (thin, medium, thick) cubren la mayoría de casos.

**Variables definidas:**

```scss
// Grosores
$border-thin: 1px;
$border-medium: 2px;
$border-thick: 4px;

// Radios
$radius-sm: 0.125rem;   // 2px
$radius-base: 0.25rem;  // 4px
$radius-md: 0.375rem;   // 6px
$radius-lg: 0.5rem;     // 8px
$radius-xl: 0.75rem;    // 12px
$radius-2xl: 1rem;      // 16px
$radius-3xl: 1.5rem;    // 24px
$radius-full: 9999px;   // Círculos
```

### Transiciones

**Decisiones de diseño:**

Las **transiciones** hacen que la interfaz se sienta fluida y responsiva.

- **Duraciones estándar:**
  - **fast (150ms):** Cambios rápidos como hover en botones
  - **base (300ms):** La mayoría de transiciones
  - **slow (500ms):** Animaciones complejas como modales

- **Ease-in-out:** Timing function que se siente natural para la mayoría de casos.

**Variables definidas:**

```scss
// Duraciones
$duration-fast: 150ms;
$duration-base: 300ms;
$duration-slow: 500ms;

// Transiciones predefinidas
$transition-fast: all 150ms ease-in-out;
$transition-base: all 300ms ease-in-out;
$transition-slow: all 500ms ease-in-out;

// Específicas
$transition-colors: color 300ms ease-in-out, 
                    background-color 300ms ease-in-out,
                    border-color 300ms ease-in-out;
```

---

## 1.5 Mixins y Funciones

Los **mixins** son bloques de código SCSS reutilizables que nos ahorran escribir CSS repetitivo y mantienen consistencia.

### Mixin: `responsive`

**Propósito:** Facilita la escritura de media queries para diferentes breakpoints.

**Código:**
```scss
@mixin responsive($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}
```

**Uso:**
```scss
.elemento {
  font-size: 16px;
  
  @include responsive('md') {
    font-size: 18px;
  }
  
  @include responsive('lg') {
    font-size: 20px;
  }
}
```

**Resultado CSS:**
```css
.elemento {
  font-size: 16px;
}

@media (min-width: 768px) {
  .elemento {
    font-size: 18px;
  }
}

@media (min-width: 1024px) {
  .elemento {
    font-size: 20px;
  }
}
```

### Mixin: `flex-center`

**Propósito:** Centra elementos usando flexbox de forma rápida.

**Código:**
```scss
@mixin flex-center($direction: row, $gap: 0) {
  display: flex;
  flex-direction: $direction;
  justify-content: center;
  align-items: center;
  
  @if $gap != 0 {
    gap: $gap;
  }
}
```

**Uso:**
```scss
.hero {
  @include flex-center(column, $spacing-4);
  min-height: 100vh;
}
```

**Resultado CSS:**
```css
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 100vh;
}
```

### Mixin: `transition`

**Propósito:** Aplica transiciones suaves a propiedades específicas.

**Código:**
```scss
@mixin transition($properties..., $duration: $duration-base, $timing: $ease-in-out) {
  $transitions: ();
  
  @each $property in $properties {
    $transitions: append($transitions, $property $duration $timing, comma);
  }
  
  transition: $transitions;
}
```

**Uso:**
```scss
.button {
  @include transition(background-color, transform, box-shadow);
  
  &:hover {
    background-color: $color-primary-light;
    transform: translateY(-2px);
    box-shadow: $shadow-lg;
  }
}
```

**Resultado CSS:**
```css
.button {
  transition: background-color 300ms ease-in-out, 
              transform 300ms ease-in-out, 
              box-shadow 300ms ease-in-out;
}

.button:hover {
  background-color: #D885FE;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Mixin: `truncate`

**Propósito:** Trunca texto con puntos suspensivos, soporta una o múltiples líneas.

**Código:**
```scss
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

**Uso:**
```scss
.card__title {
  @include truncate(2); // Trunca a 2 líneas
}

.breadcrumb {
  @include truncate; // Trunca a 1 línea
}
```

### Mixin: `grid-auto`

**Propósito:** Crea un grid responsive con auto-fit.

**Código:**
```scss
@mixin grid-auto($min-width: 250px, $gap: $spacing-4) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax($min-width, 1fr));
  gap: $gap;
}
```

**Uso:**
```scss
.products-grid {
  @include grid-auto(300px, $spacing-6);
}
```

**Resultado:** Grid que automáticamente ajusta el número de columnas según el espacio disponible, manteniendo un mínimo de 300px por columna.

### Mixin: `hover-lift`

**Propósito:** Efecto de elevación al hacer hover en cards y botones.

**Código:**
```scss
@mixin hover-lift($distance: -4px, $shadow: $shadow-lg) {
  @include transition(transform, box-shadow);
  
  &:hover {
    transform: translateY($distance);
    box-shadow: $shadow;
  }
}
```

**Uso:**
```scss
.card {
  @include hover-lift;
}
```

### Función: `rem`

**Propósito:** Convierte píxeles a rem basado en font-size base de 16px.

**Código:**
```scss
@function rem($pixels) {
  @return calc($pixels / 16) * 1rem;
}
```

**Uso:**
```scss
.element {
  padding: rem(24);  // Resulta en 1.5rem
  margin: rem(32);   // Resulta en 2rem
}
```

### Otros mixins incluidos

- **`flex-between`:** Flex con `justify-content: space-between`
- **`aspect-ratio`:** Mantiene relación de aspecto (16:9, 4:3, etc.)
- **`visually-hidden`:** Oculta visualmente pero accesible para lectores de pantalla
- **`focus-visible`:** Estilos de focus accesibles
- **`container`:** Crea contenedor con ancho máximo y padding
- **`button-reset`:** Resetea estilos por defecto de botones
- **`gradient`:** Crea gradientes fácilmente

---

## 1.6 ViewEncapsulation en Angular

### ¿Qué es ViewEncapsulation?

**ViewEncapsulation** es una característica de Angular que controla cómo se aplican los estilos CSS a los componentes. Angular ofrece tres estrategias:

1. **Emulated (por defecto):** Emula Shadow DOM añadiendo atributos únicos
2. **None:** Los estilos son globales
3. **ShadowDom:** Usa Shadow DOM nativo del navegador

### Estrategia elegida: Emulated

**Para este proyecto, mantenemos `ViewEncapsulation.Emulated` (el valor por defecto de Angular).**

### ¿Por qué Emulated?

**Ventajas:**

1. **Encapsulación de estilos:** Los estilos de un componente no afectan a otros componentes accidentalmente.

2. **Modularidad:** Cada componente puede tener sus propios estilos sin preocuparse por conflictos.

3. **Compatibilidad:** Funciona en todos los navegadores, incluyendo los que no soportan Shadow DOM nativo.

4. **Balance perfecto:** Ofrece encapsulación sin los problemas de rendimiento o accesibilidad del Shadow DOM real.

5. **Facilita testing:** Los estilos están aislados por componente, haciendo testing más predecible.

6. **CSS tradicional:** Permite usar selectores CSS normales dentro del componente.

**Desventajas (mínimas):**

- Añade atributos únicos al HTML (`_ngcontent-xxx`), aumentando ligeramente el tamaño del DOM.
- Los estilos globales pueden sobrescribir estilos del componente si tienen mayor especificidad.

### ¿Cómo funciona?

Angular añade atributos únicos a los elementos y modifica los selectores CSS:

**Tu código:**
```typescript
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <h2 class="card__title">Título</h2>
    </div>
  `,
  styles: [`
    .card {
      padding: 1rem;
      background: #333;
    }
    .card__title {
      color: #fff;
    }
  `]
})
export class CardComponent {}
```

**HTML renderizado:**
```html
<app-card _nghost-abc-123>
  <div class="card" _ngcontent-abc-123>
    <h2 class="card__title" _ngcontent-abc-123>Título</h2>
  </div>
</app-card>
```

**CSS compilado:**
```css
.card[_ngcontent-abc-123] {
  padding: 1rem;
  background: #333;
}
.card__title[_ngcontent-abc-123] {
  color: #fff;
}
```

### Arquitectura CSS con Emulated

**Estilos globales (`styles.scss`):**
- Variables, mixins, reset, estilos base de elementos
- Sistema de grid y layout
- Clases de utilidad reutilizables
- No se encapsulan, afectan a toda la app

**Estilos de componente:**
- Específicos de cada componente
- Encapsulados automáticamente
- Pueden usar variables globales importándolas

**Ejemplo de componente:**

```typescript
// card.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
  // encapsulation: ViewEncapsulation.Emulated (por defecto, no hace falta especificarlo)
})
export class CardComponent {}
```

```scss
// card.component.scss
@import '../../../styles/00-settings/variables';
@import '../../../styles/01-tools/mixins';

.card {
  padding: $spacing-6;
  background-color: rgba($color-neutral-900, 0.3);
  border-radius: $radius-md;
  box-shadow: $shadow-base;
  @include transition(transform, box-shadow);
  
  &:hover {
    @include hover-lift;
  }
}

.card__title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-3;
  color: $color-text-primary;
}

.card__body {
  color: $color-text-secondary;
  line-height: $line-height-normal;
}
```

### Buenas prácticas con Emulated

1. **Importa variables y mixins:** Cada componente debe importar `_variables.scss` y `_mixins.scss` si los necesita.

2. **Usa BEM:** Aunque los estilos están encapsulados, BEM sigue siendo útil para claridad.

3. **Evita selectores profundos:** No uses `::ng-deep` a menos que sea absolutamente necesario. Es deprecated y rompe la encapsulación.

4. **Estilos globales mínimos:** Solo usa estilos globales para resets, variables y utilidades generales.

5. **`:host` para el elemento raíz:**
```scss
:host {
  display: block;
  padding: $spacing-4;
}
```

6. **`:host-context` para temas:**
```scss
:host-context(.theme-dark) {
  background: black;
}
```

### Alternativa: ViewEncapsulation.None

**Solo usaríamos `None` si:**
- Necesitamos estilos verdaderamente globales desde un componente
- Estamos migrando una aplicación no-Angular
- Necesitamos sobrescribir estilos de librerías externas

**Cómo activarlo:**
```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-global-styles',
  template: `...`,
  styleUrls: ['./global-styles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GlobalStylesComponent {}
```

**No lo usamos porque:**
- Pierde la ventaja de la encapsulación
- Más propenso a conflictos de estilos
- Hace el CSS menos mantenible
- No es necesario con una buena arquitectura ITCSS

### Resumen

**En este proyecto usamos `ViewEncapsulation.Emulated` porque:**

✅ Encapsula estilos por componente automáticamente  
✅ Compatible con todos los navegadores  
✅ Permite usar variables y mixins globales  
✅ Evita conflictos de estilos entre componentes  
✅ Mantiene el CSS modular y mantenible  
✅ Se combina perfectamente con ITCSS y BEM  

Esta estrategia nos da lo mejor de ambos mundos: estilos globales reutilizables (variables, reset, grid) y estilos de componente encapsulados que no se filtran a otros componentes.

---

## Resumen de la Fase 1

Con la implementación de esta fase, hemos establecido:

✅ **Sistema completo de design tokens** con colores, tipografía, espaciado, sombras y transiciones  
✅ **12+ mixins reutilizables** que ahorran código y mantienen consistencia  
✅ **Reset CSS moderno** que normaliza diferencias entre navegadores  
✅ **Estilos base** para todos los elementos HTML  
✅ **Sistema de grid y flexbox** con clases de utilidad  
✅ **Arquitectura ITCSS** perfectamente organizada  
✅ **Metodología BEM** para nomenclatura clara  
✅ **ViewEncapsulation estratégica** que balancea globalidad y modularidad  

Esta base sólida nos permite construir componentes consistentes, mantener el código fácilmente, y escalar el proyecto sin problemas de especificidad o conflictos de estilos.

