# Sección 1: Arquitectura CSS y comunicación visual.

## 1.1 Principios de comunicación visual: Explica los 5 principios básicos y cómo los aplicas en tu proyecto:

### Jerarquía: Cómo usas tamaños, pesos y espaciado para crear importancia visual

Para crear una jerarquía visual, en el proyecto de Figma todos los tamaños siguen una base de 4px, facilitando el trabajo con los elementos, de forma que muchos tienen espaciado de 24, 32, 48 o 64px dependiendo de qué se necesite. Por ejemplo, si se quiere mostrar varios elementos más agrupados, tendrán menos espaciado (32px), mientras que si se quiere separar del resto estos tendrán un espacio mayor (64px).

>
>Img



### Contraste: Cómo usas color, tamaño y peso para diferenciar elementos
    
Para poder llamar la atención visualmente, se ha escogido una paleta de colores morada y amarilla, una que alterna entre ambos colores en su modo claro y oscuro, de los cuales solo actualmente el modo oscuro se encuentra implementado en el proyecto de Figma:

- En el modo oscuro, el morado predomina como color principal, yendo desde más claro a más oscuro conforme más contenido en un contenedor un elemento se encuentre, con las letras y los botones siendo de colores más claros para que destaquen frente al resto de elementos. Esta idea no se ve tan reflejado dentro del proyecto de Figma, pero cambios provisionales dentro del proyecto llevado a código muestran una nueva propuesta de esta idea. 

>Img
>Img
    
- De esta forma, el modo claro tendría una idea opuesta, donde el fondo sería mucho más oscuro y conforme se va incluyendo dentro de contenedores se va a aclarando. Esto sirve como contraste con la letra morada oscura. Esto es una versión muy provisional del modo claro, y no es la definitiva en lo absoluto.

>Img

### Alineación: Tu estrategia de alineación (izquierda, centro, grid)
    
    Para mantener armonía en el proyecto, la mayoría de los elementos fueron centrados o, alternativamente, alineados con una grid, como se puede ver por los ejemplos por pantalla:

>
>Img
>Img

    Además, la alineación se basaba en múltiplos de 12 para su espaciado.


### Proximidad: Cómo agrupas elementos relacionados con espaciado
    
    Para mostrar que los elementos están agrupados, se ha utilizado un espaciado específico para diferencias entre cada componente:

>Img


### Repetición: Cómo creas coherencia repitiendo patrones visuales

A partir de una paleta de colores definida, una tipografía consistente, unos bordes redondeados y unas animaciones consistentes en todo el programa se logra una estética única de la página.

>Img

## 1.2 Metodología CSS: Explica qué metodología usas (BEM recomendado) y por qué. Muestra ejemplos de tu nomenclatura. Si usas BEM, explica que usarás bloques (.card), elementos (.card__title), y modificadores (.card--featured).

Se ha utilizado la metodología BEM, donde el bloque representa un componente independiente con significado propio, el elemento representa parte del bloque que no tiene significado independiente y el modificador es una variante del bloque o elemento.

Ejemplo en el código:


**Componente Button:**
```scss
// Bloque base
.btn {
  display: inline-flex;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  /* ... */
}

// Elemento
.btn__content {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

// Modificadores de variante
.btn--primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn--secondary {
  background-color: var(--color-secondary);
  color: var(--color-primary-dark);
}

.btn--ghost {
  background-color: transparent;
  border: 2px solid var(--color-primary);
}

// Modificadores de tamaño
.btn--sm {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
}

.btn--lg {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-lg);
}

// Modificador de estado
.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Componente Card:**
```scss
// Bloque
.card {
  background: var(--color-box-level-1);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

// Elementos
.card__image-wrapper {
  position: relative;
  overflow: hidden;
}

.card__image {
  width: 100%;
  height: auto;
  display: block;
}

.card__body {
  padding: var(--spacing-6);
}

.card__title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-4);
}

.card__content {
  color: var(--color-text-primary);
}

.card__footer {
  padding: var(--spacing-4) var(--spacing-6);
  border-top: 1px solid var(--color-neutral-300);
}

// Modificadores
.card--rating {
  display: flex;
  flex-direction: column;
}

.card--featured {
  border: 2px solid var(--color-primary);
  box-shadow: var(--shadow-primary);
}
```

**Componente Form-Input:**
```scss
// Bloque
.form-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

// Elementos
.form-input__label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.form-input__required {
  color: var(--color-error);
}

.form-input__field {
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
}

.form-input__help {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.form-input__error {
  font-size: var(--font-size-xs);
  color: var(--color-error);
}

// Modificadores
.form-input--error .form-input__field {
  border-color: var(--color-error);
}

.form-input--disabled .form-input__field {
  background-color: var(--color-neutral-200);
  cursor: not-allowed;
}
```


## 1.3 Organización de archivos: Documenta tu estructura ITCSS. Explica por qué cada carpeta está en ese orden (de menor a mayor especificidad). Muestra el árbol de carpetas completo.


### Estructura de carpetas del proyecto

```
src/styles/
├── _main.scss                      # Archivo principal (importa todo)
├── 00-settings/
│   └── _variables.scss            # Design tokens (CSS Custom Properties)
├── 01-tools/
│   └── _mixins.scss               # Mixins y funciones SCSS
├── 02-generic/
│   └── _reset.scss                # Reset CSS básico
├── 03-elements/
│   └── _base.scss                 # Estilos de elementos HTML
├── 04-objects/
│   └── _layout.scss               # Patrones de layout reutilizables
├── 05-components/
│   ├── _buttons.scss              # Estilos globales de botones
│   ├── _footer.scss               # Estilos del footer
│   └── _header.scss               # Estilos del header
└── 06-utilities/
    └── _helpers.scss              # Clases de utilidad
```

### Explicación de cada Capa

El orden se ha escogido porque cada carpeta depende de la anterior para funcionar (Settings -> Tools -> Generic -> ...), el principio de especidad creciente. Así, se evitan problemas de cascada.

- **Settings**: Define todas las variables CSS (Design Tokens) y contiene colores, tipografías, espaciados, breakpoints. 
- **Tools**: Son mixins y funciones SCSS reutilizables con mixins de responsive, flexbox, grid, transiciones
- **Elements**: Incluye estilos base de elementos HTML sin clases.
- **Objects**: Son patrones de layout reutilizables sin estética con containers, grids y wrappers.
- **Components**: Son componentes UI específicos con BEM.
- **Utilities**: Incluyen clases helper que modifican una sola propiedad



## 1.4 Sistema de Design Tokens: Documenta todas tus variables. Para cada grupo (colores, tipografía, espaciado, etc.) explica las decisiones:

### Por qué elegiste esos colores

    Debido a la estética de ocio y de fiesta que emite el morado y cómo se complementa con el amarillo, un color que representa la alegría, se escogieron ambos colores como principales

### Por qué esa escala tipográfica

    MochiyPopOne se escogió para transmitir un sentimiento de ocio, ya que es una aplicación web enfocada puramente a ello.

    Por otra parte, Do Hyeon se utilizó para la letra más pequeña para evocar un sentimiento más profesional, ya que se supone que es la tipografía más legible de entre los dos.

    De esta forma, una está enfocada a los títulos y la otra se encarga de mostrar el texto más legible.

    Además, se escogió una base de 1 rem por estándares web (16px), lo que facilita mucho más la edición y visibilización de elementos.


### Por qué esos breakpoints

    Se realizó de esta forma para adaptarlos a los siguientes formatos:

- **640px**: iPhone 13/14 en landscape, móviles grandes
- **768px**: iPad portrait, tablets estándar
- **1024px**: iPad landscape, laptops pequeños
- **1280px**: Laptops estándar (1366px es común)
- **1536px**: Monitores grandes, 4K


## 1.5 Mixins y funciones: Documenta cada mixin que creaste, para qué sirve, y muestra un ejemplo de uso.


### 1. Mixin: Responsive

**Propósito**: Facilitar la escritura de media queries para diferentes breakpoints.

**Código**:
```scss
@mixin responsive($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  } @else {
    @warn "No existe el breakpoint `#{$breakpoint}`";
  }
}
```

**Ejemplo de uso**:
```scss
.elemento {
  font-size: 16px;
  padding: var(--spacing-4);
  
  @include responsive('md') {
    font-size: 18px;
    padding: var(--spacing-6);
  }
  
  @include responsive('lg') {
    font-size: 20px;
    padding: var(--spacing-8);
  }
}

// Compila a:
.elemento {
  font-size: 16px;
  padding: 1rem;
}

@media (min-width: 768px) {
  .elemento {
    font-size: 18px;
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .elemento {
    font-size: 20px;
    padding: 2rem;
  }
}
```

### 2. Mixin: Responsive-Max

**Propósito**: Media queries con max-width (para casos especiales donde necesitamos estilos solo en móvil).

**Código**:
```scss
@mixin responsive-max($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (max-width: calc(#{map-get($breakpoints, $breakpoint)} - 1px)) {
      @content;
    }
  }
}
```

**Ejemplo de uso**:
```scss
.menu-mobile {
  display: block;
  
  @include responsive-max('md') {
    // Solo visible en pantallas menores a 768px
    position: fixed;
    bottom: 0;
  }
}
```

### 3. Mixin: Flex-Center

**Propósito**: Centrar elementos usando flexbox de forma rápida.

**Código**:
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

**Ejemplo de uso**:
```scss
// Centrado horizontal y vertical
.modal-content {
  @include flex-center;
  min-height: 100vh;
}

// Centrado vertical (columna)
.hero {
  @include flex-center(column, var(--spacing-6));
  padding: var(--spacing-12);
}

// Compila a:
.modal-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem;
}
```

### 4. Mixin: Flex-Between

**Propósito**: Distribuir elementos con espacio entre ellos (común en headers, cards).

**Código**:
```scss
@mixin flex-between($align: center) {
  display: flex;
  justify-content: space-between;
  align-items: $align;
}
```

**Ejemplo de uso**:
```scss
.card-header {
  @include flex-between;
  padding: var(--spacing-4);
}

.footer {
  @include flex-between(flex-start);
  padding: var(--spacing-8);
}

// Compila a:
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem;
}
```

### 5. Mixin: Grid-Center

**Propósito**: Centrar elementos usando CSS Grid (más simple que flexbox para centrado total).

**Código**:
```scss
@mixin grid-center {
  display: grid;
  place-items: center;
}
```

**Ejemplo de uso**:
```scss
.loading-spinner {
  @include grid-center;
  min-height: 200px;
}

// Compila a:
.loading-spinner {
  display: grid;
  place-items: center;
  min-height: 200px;
}
```

### 6. Mixin: Grid-Auto

**Propósito**: Grid responsive automático con columnas que se ajustan según el espacio disponible.

**Código**:
```scss
@mixin grid-auto($min-width: 15.625rem) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax($min-width, 1fr));
  gap: var(--spacing-4);
}
```

**Ejemplo de uso**:
```scss
.products-grid {
  @include grid-auto(250px);
}

.cards-grid {
  @include grid-auto(300px);
  gap: var(--spacing-6); // Sobrescribe el gap por defecto
}

// Compila a:
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

### 7. Mixin: Transition

**Propósito**: Aplicar transiciones suaves a múltiples propiedades.

**Código**:
```scss
@mixin transition($properties...) {
  $transitions: ();
  $duration: var(--duration-base);
  $timing: var(--ease-in-out);
  
  @each $property in $properties {
    $transitions: append($transitions, $property $duration $timing, comma);
  }
  
  transition: $transitions;
}
```

**Ejemplo de uso**:
```scss
.button {
  @include transition(background-color, transform, box-shadow);
  
  &:hover {
    background-color: var(--color-primary-light);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
}

// Compila a:
.button {
  transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 8. Mixin: Transition-Fast

**Propósito**: Transiciones rápidas para interacciones inmediatas.

**Código**:
```scss
@mixin transition-fast($properties...) {
  $transitions: ();
  $duration: var(--duration-fast);
  $timing: var(--ease-in-out);
  
  @each $property in $properties {
    $transitions: append($transitions, $property $duration $timing, comma);
  }
  
  transition: $transitions;
}
```

**Ejemplo de uso**:
```scss
.link {
  @include transition-fast(color, text-decoration);
  
  &:hover {
    color: var(--color-primary-light);
    text-decoration: underline;
  }
}
```

## 1.6 ViewEncapsulation en Angular: Explica qué estrategia de encapsulación usarás. Angular por defecto usa Emulated (estilos encapsulados por componente). Documenta si mantendrás esto o usarás None (estilos globales). Justifica tu decisión.

Se mantiene **ViewEncapsulation.Emulated** (valor por defecto de Angular) para la mayoría de componentes. Esta estrategia:

1. **Encapsula los estilos** añadiendo atributos únicos a los elementos del componente
2. **Evita conflictos** entre estilos de diferentes componentes
3. **Permite usar selectores simples** sin preocuparse por colisiones globales

**Excepción**: Los estilos globales en `src/styles/` usan ViewEncapsulation.None implícitamente al estar en archivos SCSS globales, permitiendo:
- Design tokens accesibles en toda la aplicación
- Reset CSS aplicado globalmente
- Clases de utilidad disponibles en cualquier componente

```typescript
// Ejemplo: Componente con encapsulación por defecto (Emulated)
@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  // ViewEncapsulation.Emulated es el valor por defecto
})
export class Button { }
```

---

# Sección 2: HTML semántico y estructura

## 2.1 Elementos semánticos utilizados

El proyecto utiliza elementos HTML5 semánticos para mejorar la accesibilidad, el SEO y la mantenibilidad del código. Cada elemento tiene un propósito específico:

### `<header>` - Cabecera

Se usa para la cabecera principal de la aplicación y cabeceras de secciones.

**Ejemplo - Header principal (app.html):**
```html
<app-header></app-header>

<main>
  <router-outlet></router-outlet>
</main>

<app-footer></app-footer>
```

**Ejemplo - Componente Header (header.html):**
```html
<header class="header">
  <div class="header__container">
    <!-- Logo -->
    <a routerLink="/" class="header__logo" aria-label="Ir a la página principal">
      <span class="header__logo-text">BROADCASTTD</span>
    </a>

    <!-- Navegación y acciones -->
    <div class="header__actions">
      <app-theme-toggle class="header__theme-toggle" />
      <app-button text="Log In" variant="primary" size="md" />
    </div>
  </div>
</header>
```

### `<nav>` - Navegación

Se utiliza para bloques de navegación, tanto en el header como en el footer.

**Ejemplo - Navegación en Footer (footer.html):**
```html
<nav class="footer__nav" aria-label="Footer navigation">
  <ul class="footer__nav-list">
    <li class="footer__nav-item">
      <a href="/about" class="footer__nav-link">About</a>
    </li>
    <li class="footer__nav-item">
      <a href="/contact" class="footer__nav-link">Contact</a>
    </li>
    <li class="footer__nav-item">
      <a href="/terms" class="footer__nav-link">Terms</a>
    </li>
  </ul>
</nav>
```

**Ejemplo - Navegación en Style Guide:**
```html
<nav class="style-guide__nav">
  <a href="#formularios" class="style-guide__nav-link">1. Componentes de Formulario</a>
  <a href="#botones" class="style-guide__nav-link">2. Botones</a>
  <a href="#tarjetas" class="style-guide__nav-link">3. Tarjetas y Contenedores</a>
</nav>
```

### `<main>` - Contenido principal

Contiene el contenido principal de la página. Solo debe haber un `<main>` por página.

**Ejemplo - Layout principal (app.html):**
```html
<app-header></app-header>

<main>
  <router-outlet></router-outlet>
</main>

<app-footer></app-footer>
```

### `<section>` - Secciones temáticas

Agrupa contenido relacionado temáticamente, siempre con un heading.

**Ejemplo - Secciones en Home (home.html):**
```html
<!-- Sección de Fase 1 -->
<section class="component-section phase-1">
  <h2 class="component-section__title">FASE 1: Manipulación del DOM y Eventos</h2>
  <p class="component-section__description">
    Implementación de manipulación del DOM, gestión de eventos y componentes interactivos
  </p>

  <!-- Grupos de componentes dentro de la sección -->
  <div class="component-group">
    <h3 class="component-group__title">Theme Switcher</h3>
    <div class="component-demo">
      <app-theme-switcher />
    </div>
  </div>
</section>

<!-- Sección de Fase 2 -->
<section class="component-section phase-2">
  <h2 class="component-section__title">FASE 2: Componentes Interactivos y Comunicación</h2>
  <p class="component-section__description">
    Implementación de servicios de comunicación, notificaciones y gestión de estados de carga
  </p>
</section>
```

**Ejemplo - Secciones en Style Guide:**
```html
<section id="formularios" class="style-guide__section">
  <h2 class="style-guide__section-title">1. Componentes de Formulario</h2>
  
  <div class="style-guide__component">
    <h3 class="style-guide__component-title">Form Input</h3>
    <div class="style-guide__component-demo">
      <app-form-input label="Username" type="text" />
    </div>
  </div>
</section>

<section id="botones" class="style-guide__section">
  <h2 class="style-guide__section-title">2. Botones</h2>
  <!-- contenido -->
</section>
```

### `<footer>` - Pie de página

Contiene información del pie de página como navegación secundaria, redes sociales y copyright.

**Ejemplo - Footer (footer.html):**
```html
<footer class="footer">
  <div class="footer__container">
    <!-- Enlaces de navegación -->
    <nav class="footer__nav" aria-label="Footer navigation">
      <ul class="footer__nav-list">
        <li class="footer__nav-item">
          <a href="/about" class="footer__nav-link">About</a>
        </li>
        <!-- más enlaces -->
      </ul>
    </nav>

    <!-- Redes sociales -->
    <div class="footer__social">
      <a href="https://linkedin.com" class="footer__social-link" 
         aria-label="LinkedIn" target="_blank" rel="noopener">
        <svg><!-- icono --></svg>
      </a>
      <a href="https://twitter.com" class="footer__social-link" 
         aria-label="Twitter/X" target="_blank" rel="noopener">
        <svg><!-- icono --></svg>
      </a>
    </div>
  </div>
</footer>
```

### Tabla resumen de elementos semánticos

| Elemento | Uso en el proyecto | Ejemplo |
|----------|-------------------|---------|
| `<header>` | Cabecera principal de la app | `header.html` |
| `<nav>` | Navegación principal y secundaria | Header, Footer, Style Guide |
| `<main>` | Contenedor del contenido principal | `app.html` |
| `<section>` | Secciones temáticas con heading | Fases en Home, secciones en Style Guide |
| `<footer>` | Pie de página con enlaces y redes sociales | `footer.html` |
| `<article>` | (Reservado para contenido independiente) | Cards de contenido |


## 2.2 Jerarquía de headings

### Reglas de la jerarquía

1. **Solo un `<h1>` por página**: Representa el título principal de la página
2. **`<h2>` para secciones principales**: Dividen el contenido en bloques temáticos
3. **`<h3>` para subsecciones**: Subdividen las secciones principales
4. **NUNCA saltar niveles**: No pasar de h1 a h3 directamente

### Diagrama de jerarquía del proyecto

```
📄 Página Home
├── h1: "Sistema de Componentes"
│   ├── h2: "FASE 1: Manipulación del DOM y Eventos"
│   │   ├── h3: "Theme Switcher"
│   │   ├── h3: "Manipulación del DOM"
│   │   ├── h3: "Sistema de Eventos"
│   │   ├── h3: "Menú Hamburguesa"
│   │   ├── h3: "Modal Interactivo"
│   │   ├── h3: "Tabs"
│   │   └── h3: "Tooltips"
│   │
│   ├── h2: "FASE 2: Componentes Interactivos y Comunicación"
│   │   ├── h3: "Comunicación entre Componentes Hermanos"
│   │   ├── h3: "Sistema de Notificaciones Toast"
│   │   └── h3: "Indicador de Carga (Spinner)"
│   │
│   └── h2: "FASE 3: Formularios"
│       ├── h3: "Formulario de Contacto"
│       └── h3: "Formulario de Perfil"

📄 Página Style Guide
├── h1: "Guía de Estilos"
│   ├── h2: "1. Componentes de Formulario"
│   │   ├── h3: "Form Input"
│   │   ├── h3: "Form Textarea"
│   │   ├── h3: "Form Select"
│   │   └── h3: "Form Checkbox"
│   │
│   ├── h2: "2. Botones"
│   │   ├── h3: "Button - Variantes"
│   │   ├── h3: "Button - Tamaños"
│   │   ├── h3: "Button - Estados"
│   │   └── h3: "Close Button"
│   │
│   ├── h2: "3. Tarjetas y Contenedores"
│   │   └── h3: "Card - Media"
│   │
│   ├── h2: "4. Notificaciones y Alertas"
│   │   └── h3: "Alert"
│   │
│   └── h2: "5. Cards"
│       ├── h3: "Card - Media Variant"
│       └── h3: "Card - Rating Variant"
```

### Ejemplo de implementación correcta

**Home (home.html):**
```html
<div class="component-showcase">
  <header class="component-showcase__header">
    <h1 class="component-showcase__title">Sistema de Componentes</h1>
    <p class="component-showcase__description">
      Demostración de todos los componentes disponibles en el proyecto
    </p>
  </header>

  <!-- FASE 1 -->
  <section class="component-section phase-1">
    <h2 class="component-section__title">FASE 1: Manipulación del DOM y Eventos</h2>
    
    <div class="component-group">
      <h3 class="component-group__title">Theme Switcher</h3>
      <div class="component-demo">
        <app-theme-switcher />
      </div>
    </div>

    <div class="component-group">
      <h3 class="component-group__title">Modal Interactivo</h3>
      <div class="component-demo">
        <app-interactive-modal />
      </div>
    </div>
  </section>

  <!-- FASE 2 -->
  <section class="component-section phase-2">
    <h2 class="component-section__title">FASE 2: Componentes Interactivos</h2>
    
    <div class="component-group">
      <h3 class="component-group__title">Sistema de Notificaciones Toast</h3>
      <div class="component-demo">
        <app-notification />
      </div>
    </div>
  </section>
</div>
```

**Style Guide (style-guide.html):**
```html
<div class="style-guide">
  <header class="style-guide__header">
    <h1 class="style-guide__title">Guía de Estilos</h1>
  </header>

  <section id="formularios" class="style-guide__section">
    <h2 class="style-guide__section-title">1. Componentes de Formulario</h2>
    
    <div class="style-guide__component">
      <h3 class="style-guide__component-title">Form Input</h3>
      <!-- demo -->
    </div>

    <div class="style-guide__component">
      <h3 class="style-guide__component-title">Form Textarea</h3>
      <!-- demo -->
    </div>
  </section>

  <section id="botones" class="style-guide__section">
    <h2 class="style-guide__section-title">2. Botones</h2>
    
    <div class="style-guide__component">
      <h3 class="style-guide__component-title">Button - Variantes</h3>
      <!-- demo -->
    </div>
  </section>
</div>
```


## 2.3 Estructura de formularios

### Asociación de labels con inputs

Se utiliza la asociación explícita mediante los atributos `for` e `id`, que es la práctica recomendada para accesibilidad:

```html
<label for="input-id">Texto del label</label>
<input id="input-id" type="text" />
```

### Componente Form Input

El componente `app-form-input` implementa todas las mejores prácticas de accesibilidad:

**Código del template (form-input.html):**
```html
<div class="form-input" 
     [class.form-input--error]="showError" 
     [class.form-input--disabled]="disabled">
  
  <!-- Label asociado al input mediante for/id -->
  <label 
    *ngIf="label" 
    [for]="inputId" 
    class="form-input__label"
  >
    {{ label }}
    <span *ngIf="required" class="form-input__required" aria-label="campo requerido">*</span>
  </label>

  <!-- Input field con accesibilidad completa -->
  <input
    [id]="inputId"
    [type]="type"
    [name]="name"
    [placeholder]="placeholder"
    [required]="required"
    [disabled]="disabled"
    [attr.aria-invalid]="showError ? 'true' : null"
    [attr.aria-describedby]="ariaDescribedBy"
    [value]="value"
    (input)="onInput($event)"
    (blur)="onBlur()"
    (focus)="onFocus()"
    class="form-input__field"
  />

  <!-- Texto de ayuda (referenciado por aria-describedby) -->
  <p 
    *ngIf="helpText && !showError" 
    [id]="helpTextId" 
    class="form-input__help"
  >
    {{ helpText }}
  </p>

  <!-- Mensaje de error con role="alert" para lectores de pantalla -->
  <p 
    *ngIf="showError && errorMessage" 
    [id]="errorId" 
    class="form-input__error" 
    role="alert"
  >
    {{ errorMessage }}
  </p>
</div>
```

**Código del componente TypeScript (form-input.ts):**
```typescript
@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInput),
      multi: true
    }
  ]
})
export class FormInput implements ControlValueAccessor {
  // ID único generado automáticamente
  @Input() inputId: string = `form-input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() helpText: string = '';
  @Input() errorMessage: string = '';
  @Input() showError: boolean = false;

  // Genera el aria-describedby dinámicamente
  get ariaDescribedBy(): string | null {
    const ids: string[] = [];
    if (this.helpText && !this.showError) ids.push(this.helpTextId);
    if (this.showError && this.errorMessage) ids.push(this.errorId);
    return ids.length > 0 ? ids.join(' ') : null;
  }

  get helpTextId(): string {
    return `${this.inputId}-help`;
  }

  get errorId(): string {
    return `${this.inputId}-error`;
  }
}
```

### Ejemplo de uso del componente

```html
<!-- Input básico -->
<app-form-input
  inputId="username"
  label="Username"
  type="text"
  placeholder="Introduce tu usuario"
  [required]="true"
/>

<!-- Input con error -->
<app-form-input
  inputId="email"
  label="Email"
  type="email"
  placeholder="ejemplo@correo.com"
  [required]="true"
  [showError]="true"
  errorMessage="El email no es válido"
/>

<!-- Input con texto de ayuda -->
<app-form-input
  inputId="password"
  label="Contraseña"
  type="password"
  [required]="true"
  helpText="Mínimo 8 caracteres, una mayúscula y un número"
/>
```

### Otros componentes de formulario

El proyecto incluye componentes de formulario adicionales que siguen el mismo patrón:

**Form Textarea:**
```html
<app-form-textarea
  textareaId="message"
  label="Mensaje"
  placeholder="Escribe tu mensaje..."
  [rows]="4"
  [required]="true"
  [showCharacterCount]="true"
  [maxLength]="500"
/>
```

**Form Select:**
```html
<app-form-select
  selectId="country"
  label="País"
  [options]="[
    { value: 'es', label: 'España' },
    { value: 'mx', label: 'México' },
    { value: 'ar', label: 'Argentina' }
  ]"
  placeholder="Selecciona un país"
  [required]="true"
/>
```

**Form Checkbox:**
```html
<app-form-checkbox
  checkboxId="terms"
  label="Acepto los términos y condiciones"
  [required]="true"
/>
```

### Características de accesibilidad implementadas

| Característica | Implementación | Propósito |
|---------------|----------------|-----------|
| `for` / `id` | Label vinculado al input | Asociación explícita para lectores de pantalla |
| `aria-invalid` | Se activa cuando hay error | Indica estado de error al usuario |
| `aria-describedby` | Referencia a help/error text | Proporciona contexto adicional |
| `role="alert"` | En mensajes de error | Anuncia errores inmediatamente |
| `aria-label="campo requerido"` | En asterisco (*) | Explica el significado del asterisco |
| `required` | Atributo nativo | Validación nativa del navegador |


---

# Sección 3: Sistema de componentes UI

## 3.1 Componentes implementados

### 1. Button (`app-button`)

**Propósito**: Botón reutilizable con múltiples variantes de estilo, tamaños y estados.

**Variantes disponibles**:
- `primary`: Botón principal con color morado
- `secondary`: Botón secundario con color amarillo
- `ghost`: Botón transparente con borde
- `danger`: Botón de acción destructiva (rojo)

**Tamaños disponibles**:
- `sm`: Pequeño (padding reducido)
- `md`: Mediano (por defecto)
- `lg`: Grande (padding aumentado)

**Estados**:
- Default
- Hover
- Focus
- Disabled

**Ejemplo de uso**:
```html
<!-- Variantes -->
<app-button text="Primary" variant="primary" />
<app-button text="Secondary" variant="secondary" />
<app-button text="Ghost" variant="ghost" />
<app-button text="Danger" variant="danger" />

<!-- Tamaños -->
<app-button text="Small" size="sm" />
<app-button text="Medium" size="md" />
<app-button text="Large" size="lg" />

<!-- Estados -->
<app-button text="Disabled" [disabled]="true" />
<app-button text="Full Width" [fullWidth]="true" />

<!-- Con evento -->
<app-button text="Click me" (onClick)="handleClick($event)" />
```

---

### 2. Card (`app-card`)

**Propósito**: Tarjeta para mostrar contenido estructurado como series, películas o productos.

**Variantes disponibles**:
- `default`: Tarjeta básica
- `horizontal`: Disposición horizontal
- `elevated`: Con sombra elevada
- `bordered`: Con borde visible
- `compact`: Versión compacta
- `interactive`: Con efectos hover
- `media`: Para contenido multimedia
- `rating`: Con sistema de valoración

**Estados**:
- Default
- Hover (scale y sombra)
- Con/sin footer
- Con/sin imagen

**Ejemplo de uso**:
```html
<!-- Card básica -->
<app-card
  title="TWIN PEAKS"
  imageSrc="https://example.com/image.jpg"
  imageAlt="Twin Peaks Series"
/>

<!-- Card con rating -->
<app-card
  variant="rating"
  title="Breaking Bad"
  [statBars]="[40, 50, 70, 100, 90]"
/>

<!-- Card interactiva -->
<app-card
  variant="interactive"
  title="Stranger Things"
  [hasFooter]="true"
/>
```

---

### 3. Form Input (`app-form-input`)

**Propósito**: Campo de entrada de texto reutilizable con validación y accesibilidad.

**Tipos disponibles**:
- `text`: Texto plano
- `email`: Correo electrónico
- `password`: Contraseña
- `tel`: Teléfono
- `url`: URL
- `number`: Numérico

**Estados**:
- Default
- Focus
- Error
- Disabled
- Con texto de ayuda

**Ejemplo de uso**:
```html
<app-form-input
  inputId="email"
  label="Email"
  type="email"
  placeholder="tu@email.com"
  [required]="true"
  helpText="Nunca compartiremos tu email"
/>

<app-form-input
  inputId="password"
  label="Contraseña"
  type="password"
  [required]="true"
  [showError]="true"
  errorMessage="La contraseña es muy corta"
/>
```

---

### 4. Form Textarea (`app-form-textarea`)

**Propósito**: Área de texto multilínea con contador de caracteres opcional.

**Características**:
- Rows configurables
- Contador de caracteres
- Límite máximo de caracteres

**Estados**:
- Default
- Focus
- Error
- Disabled

**Ejemplo de uso**:
```html
<app-form-textarea
  textareaId="message"
  label="Mensaje"
  placeholder="Escribe tu mensaje..."
  [rows]="4"
  [maxLength]="500"
  [showCharacterCount]="true"
  [required]="true"
/>
```

---

### 5. Form Select (`app-form-select`)

**Propósito**: Dropdown/select con opciones configurables.

**Estados**:
- Default
- Open
- Selected
- Error
- Disabled

**Ejemplo de uso**:
```html
<app-form-select
  selectId="country"
  label="País"
  [options]="[
    { value: 'es', label: 'España' },
    { value: 'mx', label: 'México' }
  ]"
  placeholder="Selecciona un país"
  [required]="true"
/>
```

---

### 6. Form Checkbox (`app-form-checkbox`)

**Propósito**: Checkbox personalizado con estilos consistentes.

**Estados**:
- Unchecked
- Checked
- Focus
- Disabled
- Error

**Ejemplo de uso**:
```html
<app-form-checkbox
  checkboxId="terms"
  label="Acepto los términos y condiciones"
  [required]="true"
/>
```

---

### 7. Alert (`app-alert`)

**Propósito**: Mostrar mensajes de información, éxito, advertencia o error.

**Variantes**:
- `info`: Información (azul)
- `success`: Éxito (verde)
- `warning`: Advertencia (amarillo)
- `error`: Error (rojo)

**Estados**:
- Visible
- Dismissible (con botón de cerrar)

**Ejemplo de uso**:
```html
<app-alert
  type="success"
  message="Cambios guardados correctamente"
  [dismissible]="true"
/>

<app-alert
  type="error"
  message="Ha ocurrido un error"
  [dismissible]="false"
/>
```

---

### 8. Toast (`app-toast`)

**Propósito**: Notificaciones temporales que aparecen y desaparecen automáticamente.

**Variantes**:
- `success`: Acción exitosa
- `error`: Error
- `warning`: Advertencia
- `info`: Información

**Características**:
- Duración configurable
- Auto-dismiss
- Posición fija en pantalla

**Ejemplo de uso**:
```typescript
// Desde el servicio ToastService
this.toastService.show({
  type: 'success',
  message: 'Usuario registrado correctamente',
  duration: 3000
});
```

---

### 9. Modal (`app-modal`)

**Propósito**: Ventana modal para contenido destacado o formularios.

**Características**:
- Título configurable
- Footer opcional
- Cierre con botón X
- Cierre con click en backdrop
- Accesibilidad con role="dialog" y aria-modal

**Ejemplo de uso**:
```html
<app-modal 
  [isOpen]="showModal" 
  title="Confirmar acción"
  (close)="closeModal()"
>
  <p>¿Estás seguro de realizar esta acción?</p>
  
  <div modal-footer>
    <app-button text="Cancelar" variant="ghost" (onClick)="closeModal()" />
    <app-button text="Confirmar" variant="primary" (onClick)="confirm()" />
  </div>
</app-modal>
```

---

### 10. Spinner (`app-spinner`)

**Propósito**: Indicador de carga global conectado al LoadingService.

**Características**:
- Se muestra/oculta automáticamente según el servicio
- Animación CSS con @keyframes
- Overlay semi-transparente

**Ejemplo de uso**:
```typescript
// Mostrar spinner
this.loadingService.show();

// Ocultar spinner
this.loadingService.hide();
```

---

### 11. Tabs (`app-tabs`)

**Propósito**: Sistema de pestañas para organizar contenido.

**Características**:
- Navegación con teclado (flechas)
- Evento al cambiar de pestaña
- Pestaña activa por defecto configurable

**Estados**:
- Default
- Active
- Hover
- Focus

**Ejemplo de uso**:
```html
<app-tabs
  [tabs]="[
    { id: 'tab1', label: 'Pestaña 1', content: 'Contenido 1' },
    { id: 'tab2', label: 'Pestaña 2', content: 'Contenido 2' }
  ]"
  activeTabId="tab1"
  (tabChange)="onTabChange($event)"
/>
```

---

### 12. Tooltip (`app-tooltip`)

**Propósito**: Mostrar información adicional al hacer hover o focus.

**Posiciones**:
- `top`
- `bottom`
- `left`
- `right`

**Características**:
- Delay configurable
- Se oculta automáticamente
- Posicionamiento dinámico

**Ejemplo de uso**:
```html
<app-tooltip text="Información adicional" position="top">
  <app-button text="Hover me" />
</app-tooltip>
```

---

### 13. Theme Toggle (`app-theme-toggle`)

**Propósito**: Cambiar entre tema claro y oscuro.

**Características**:
- Detecta preferencia del sistema (prefers-color-scheme)
- Persistencia en localStorage
- Toggle con icono sol/luna

**Ejemplo de uso**:
```html
<app-theme-toggle />
```

---

### 14. Close Button (`app-close-button`)

**Propósito**: Botón de cierre reutilizable (X).

**Tamaños**:
- Default
- `lg`: Grande

**Ejemplo de uso**:
```html
<app-close-button (closeClick)="onClose()" />
<app-close-button size="lg" (closeClick)="onClose()" />
```

---

### 15. Star (`app-star`)

**Propósito**: Estrella para sistema de valoración.

**Estados**:
- Empty (vacía)
- Half (media estrella)
- Filled (llena)
- Hover
- Clicked

**Ejemplo de uso**:
```html
<app-star 
  [filled]="true" 
  (clickStar)="onRate($event)"
/>
```

---

### Tabla resumen de componentes

| Componente | Variantes | Tamaños | Estados principales |
|------------|-----------|---------|---------------------|
| Button | primary, secondary, ghost, danger | sm, md, lg | default, hover, focus, disabled |
| Card | default, horizontal, elevated, rating, media | - | default, hover |
| Form Input | - | - | default, focus, error, disabled |
| Form Textarea | - | rows configurables | default, focus, error, disabled |
| Form Select | - | - | default, open, selected, error, disabled |
| Form Checkbox | - | - | unchecked, checked, focus, disabled |
| Alert | info, success, warning, error | - | visible, dismissible |
| Toast | success, error, warning, info | - | visible, auto-dismiss |
| Modal | - | - | open, closed |
| Spinner | - | - | visible, hidden |
| Tabs | - | - | default, active, hover, focus |
| Tooltip | top, bottom, left, right | - | visible, hidden |
| Theme Toggle | light, dark | - | - |
| Close Button | - | default, lg | hover, focus |
| Star | empty, half, filled | - | hover, clicked |


## 3.2 Nomenclatura y metodología

### Estrategia BEM aplicada

**BEM (Block Element Modifier)** se aplica consistentemente en todo el proyecto:

- **Block**: Componente independiente con significado propio
- **Element**: Parte del bloque que no tiene significado independiente (separado con `__`)
- **Modifier**: Variante del bloque o elemento (separado con `--`)

### Ejemplos reales del proyecto

**Button - Nomenclatura completa:**
```scss
// BLOCK: El componente completo
.btn { }

// ELEMENT: Parte del botón
.btn__content { }
.btn__icon { }

// MODIFIERS: Variantes de estilo
.btn--primary { }
.btn--secondary { }
.btn--ghost { }
.btn--danger { }

// MODIFIERS: Variantes de tamaño
.btn--sm { }
.btn--lg { }
.btn--full { }

// MODIFIERS: Estados
.btn--disabled { }
.btn--loading { }
```

**Card - Nomenclatura completa:**
```scss
// BLOCK
.card { }

// ELEMENTS
.card__image-wrapper { }
.card__image { }
.card__body { }
.card__title { }
.card__content { }
.card__footer { }

// MODIFIERS
.card--horizontal { }
.card--elevated { }
.card--bordered { }
.card--compact { }
.card--interactive { }
.card--rating { }
.card--featured { }
```

**Header - Nomenclatura completa:**
```scss
// BLOCK
.header { }

// ELEMENTS
.header__container { }
.header__logo { }
.header__logo-text { }
.header__toggle { }
.header__toggle-bar { }
.header__actions { }
.header__btn { }
.header__search { }
.header__search-input { }
.header__search-btn { }
.header__mobile-menu { }

// MODIFIERS
.header__toggle--active { }
.header__mobile-menu--open { }
.header__btn--login { }
.header__btn--logout { }
```

**Form Input - Nomenclatura completa:**
```scss
// BLOCK
.form-input { }

// ELEMENTS
.form-input__label { }
.form-input__required { }
.form-input__field { }
.form-input__help { }
.form-input__error { }

// MODIFIERS
.form-input--error { }
.form-input--disabled { }
.form-input--success { }
```

### Cuándo usar modificadores vs clases de estado

| Situación | Usar | Ejemplo |
|-----------|------|---------|
| Variante visual permanente | Modifier (`--`) | `.btn--primary`, `.card--horizontal` |
| Estado temporal/dinámico | Modifier con clase condicional | `.header__toggle--active` |
| Tamaño del componente | Modifier (`--`) | `.btn--sm`, `.btn--lg` |
| Estado de error | Modifier (`--`) | `.form-input--error` |
| Estado deshabilitado | Modifier (`--`) | `.btn--disabled` |
| Elemento visible/oculto | Modifier (`--`) | `.modal--open`, `.menu--open` |

### Reglas de nomenclatura

1. **Nombres en inglés y lowercase**: `.card__title`, no `.tarjeta__titulo`
2. **Nombres descriptivos**: `.card__image-wrapper`, no `.card__iw`
3. **Un solo nivel de elemento**: `.card__title`, no `.card__body__title`
4. **Modificadores autodescriptivos**: `.btn--primary`, `.alert--success`


## 3.3 Style Guide

### Propósito del Style Guide

El Style Guide (`/style-guide`) sirve como:

1. **Documentación visual**: Catálogo vivo de todos los componentes disponibles
2. **Testing visual**: Verificar que los componentes se renderizan correctamente
3. **Referencia para desarrollo**: Consulta rápida de variantes y estados
4. **Consistencia de diseño**: Asegurar que todos usan los mismos componentes
5. **Onboarding**: Facilitar la incorporación de nuevos desarrolladores

### Estructura del Style Guide

```
📄 Style Guide (/style-guide)
├── 1. Componentes de Formulario
│   ├── Form Input
│   ├── Form Textarea
│   ├── Form Select
│   └── Form Checkbox
│
├── 2. Botones
│   ├── Button - Variantes
│   ├── Button - Tamaños
│   ├── Button - Estados
│   └── Close Button
│
├── 3. Tarjetas y Contenedores
│   └── Card - Media
│
├── 4. Notificaciones y Alertas
│   └── Alert (info, success, warning, error)
│
└── 5. Cards
    ├── Card - Media Variant
    └── Card - Rating Variant
```

### Capturas del Style Guide

> **Nota**: Las capturas de pantalla deben añadirse manualmente en la ruta `/docs/screenshots/`

**Sección de Formularios:**
> ![Style Guide - Formularios](/docs/screenshots/style-guide-forms.png)

**Sección de Botones:**
> ![Style Guide - Botones](/docs/screenshots/style-guide-buttons.png)

**Sección de Alertas:**
> ![Style Guide - Alertas](/docs/screenshots/style-guide-alerts.png)

**Sección de Cards:**
> ![Style Guide - Cards](/docs/screenshots/style-guide-cards.png)

### Cómo acceder al Style Guide

1. Iniciar la aplicación: `npm start`
2. Navegar a: `http://localhost:4200/style-guide`
3. O hacer click en "Guía de Estilos" desde la página Home

### Ejemplo de código del Style Guide

```html
<!-- style-guide.html -->
<div class="style-guide">
  <header class="style-guide__header">
    <h1 class="style-guide__title">Guía de Estilos</h1>
    <p class="style-guide__description">
      Catálogo completo de componentes reutilizables del sistema de diseño BROADCAST
    </p>
  </header>

  <nav class="style-guide__nav">
    <a href="#formularios">1. Componentes de Formulario</a>
    <a href="#botones">2. Botones</a>
    <a href="#tarjetas">3. Tarjetas</a>
    <a href="#notificaciones">4. Notificaciones</a>
  </nav>

  <section id="botones" class="style-guide__section">
    <h2>2. Botones</h2>
    
    <div class="style-guide__component">
      <h3>Button - Variantes</h3>
      <div class="style-guide__component-demo">
        <app-button text="Primary" variant="primary" />
        <app-button text="Secondary" variant="secondary" />
        <app-button text="Ghost" variant="ghost" />
        <app-button text="Danger" variant="danger" />
      </div>
    </div>
  </section>
</div>
```
