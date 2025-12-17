# AROProyectoMaqueta

Proyecto Angular con componentes interactivos y sistema de temas. Implementa los requisitos de Cliente Fase 1: Manipulación del DOM y Eventos.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Compilar para producción
npm run build
```

## 📋 Tabla de Contenidos

- [Arquitectura de Eventos](#arquitectura-de-eventos)
- [Componentes Implementados](#componentes-implementados)
- [Manipulación del DOM](#manipulación-del-dom)
- [Sistema de Temas](#sistema-de-temas)
- [Compatibilidad de Navegadores](#compatibilidad-de-navegadores)
- [Demo](#demo)

## 🏗️ Arquitectura de Eventos

### Descripción General

La arquitectura de eventos en esta aplicación Angular sigue el patrón **unidireccional de datos**, utilizando bindings de eventos nativos del DOM como `(click)`, `(keydown)` y `(pointerdown)` directamente en las plantillas de componentes standalone.

### Flujo de Eventos

Los eventos se capturan con la sintaxis `(eventName)="handler($event)"`, donde `$event` proporciona acceso al objeto nativo del evento (por ejemplo, `KeyboardEvent` o `PointerEvent`) para detalles como `event.key` o `event.preventDefault()`.

```
Usuario Interactúa con UI
         ↓
    DOM Event (click/keydown/mouseenter/etc)
         ↓
    Template Binding (event)="handler($event)"
         ↓
    Component Handler Method
         ↓
    Estado del Componente (signals/properties)
         ↓
    Detección de Cambios (Zone.js)
         ↓
    Re-render de la Vista
```

### Características Principales

1. **Event Binding Directo**: Los eventos del DOM se vinculan directamente en las plantillas usando la sintaxis de paréntesis `(event)`.

2. **Detección Automática de Cambios**: Zone.js detecta automáticamente los cambios y actualiza la vista sin necesidad de llamadas manuales.

3. **Modificadores de Eventos**: Angular proporciona modificadores como `(keyup.enter)` o `(click.alt)` para filtrar eventos específicos, reduciendo la lógica condicional en los handlers.

4. **Prevención de Comportamientos por Defecto**: Se utiliza `event.preventDefault()` para bloquear comportamientos nativos cuando sea necesario.

5. **Control de Propagación**: Se emplea `event.stopPropagation()` para evitar que los eventos burbujeen hacia elementos padres.

### Tipos de Eventos Implementados

#### Eventos de Teclado
- `(keydown)` - Detecta cuando se presiona una tecla
- `(keyup)` - Detecta cuando se suelta una tecla
- `(keyup.enter)` - Detecta específicamente la tecla Enter
- `(keydown.escape)` - Detecta específicamente la tecla Escape

**Ejemplo en Header Component:**
```typescript
@HostListener('document:keydown.escape')
onEscapeKey(): void {
  if (this.isMenuOpen) {
    this.toggleMenu();
  }
}
```

#### Eventos de Mouse
- `(click)` - Click del mouse
- `(dblclick)` - Doble click
- `(mouseenter)` - Mouse entra en el elemento
- `(mouseleave)` - Mouse sale del elemento

**Ejemplo en Tooltip Component:**
```typescript
onMouseEnter(): void {
  this.showTimer = window.setTimeout(() => {
    this.showTooltip = true;
  }, this.showDelay);
}
```

#### Eventos de Focus
- `(focus)` - Elemento recibe el foco
- `(blur)` - Elemento pierde el foco

**Ejemplo en Tooltip Component:**
```typescript
onFocus(): void {
  this.showTooltip = true;
}

onBlur(): void {
  this.showTooltip = false;
}
```

#### Eventos de Documento
- `@HostListener('document:click')` - Detecta clicks en cualquier parte del documento
- `@HostListener('window:resize')` - Detecta cambios de tamaño de ventana

**Ejemplo en Header Component:**
```typescript
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {
  if (!this.isMenuOpen) return;
  
  const target = event.target as HTMLElement;
  if (!this.elementRef.nativeElement.contains(target)) {
    this.toggleMenu();
  }
}
```

### Diagrama de Flujo Detallado

```
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO INTERACTÚA                       │
│              (click, keydown, mouseenter, etc)              │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                      DOM EVENT FIRED                        │
│           (Evento nativo del navegador)                     │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                  ANGULAR EVENT BINDING                      │
│         (eventName)="handler($event)"                       │
│    • Captura el evento del DOM                              │
│    • Pasa $event al handler                                 │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│               COMPONENT HANDLER METHOD                      │
│    • Ejecuta lógica de negocio                              │
│    • Puede llamar event.preventDefault()                    │
│    • Puede llamar event.stopPropagation()                   │
│    • Actualiza estado del componente                        │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│              ACTUALIZACIÓN DE ESTADO                        │
│    • Properties del componente                              │
│    • Signals (cuando se usen)                               │
│    • Servicios compartidos                                  │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│           CHANGE DETECTION (Zone.js)                        │
│    • Detecta cambios automáticamente                        │
│    • Marca componentes para actualización                   │
└────────────────────────────┬────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                  VIEW RE-RENDER                             │
│    • Actualiza el DOM                                       │
│    • Aplica cambios de estilos y clases                     │
│    • Muestra/oculta elementos                               │
└─────────────────────────────────────────────────────────────┘
```

## 🧩 Componentes Implementados

### 1. Modal Component

Modal reutilizable con las siguientes características:

- ✅ Cierre con tecla ESC
- ✅ Cierre al hacer click fuera del contenido
- ✅ Botón de cerrar en el header
- ✅ Bloqueo del scroll del body cuando está abierto
- ✅ Animaciones de entrada y salida
- ✅ Accesibilidad con atributos ARIA

**Ubicación:** `src/app/components/shared/modal/`

**Uso:**
```html
<app-modal
  [isOpen]="isModalOpen"
  title="Título del Modal"
  (close)="closeModal()"
>
  <p>Contenido del modal</p>
  
  <div modal-footer>
    <app-button text="Cancelar" (click)="closeModal()" />
    <app-button text="Confirmar" (click)="confirm()" />
  </div>
</app-modal>
```

**Técnicas de Manipulación del DOM:**
- `@ViewChild` para referencias a elementos
- `Renderer2` para manipular estilos del body
- `@HostListener` para detectar tecla ESC
- Control de propagación de eventos con `stopPropagation()`

### 2. Tabs Component

Sistema de pestañas con navegación por teclado:

- ✅ Cambio de pestaña con click
- ✅ Navegación con flechas del teclado
- ✅ Soporte para Home/End
- ✅ Clases dinámicas para pestaña activa
- ✅ Accesibilidad completa con roles ARIA

**Ubicación:** `src/app/components/shared/tabs/`

**Uso:**
```typescript
tabs: Tab[] = [
  { id: 'tab1', label: 'Pestaña 1', content: 'Contenido 1' },
  { id: 'tab2', label: 'Pestaña 2', content: 'Contenido 2' }
];
```

```html
<app-tabs
  [tabs]="tabs"
  activeTabId="tab1"
  (tabChange)="onTabChange($event)"
/>
```

**Técnicas Implementadas:**
- Event binding con `(click)` y `(keydown)`
- Clases condicionales con `[class.tabs__button--active]`
- Manejo de eventos de teclado con `KeyboardEvent`

### 3. Tooltip Component

Tooltips con posicionamiento automático:

- ✅ Aparece con hover (mouseenter/mouseleave)
- ✅ Aparece con focus/blur para accesibilidad
- ✅ Posiciones: top, bottom, left, right
- ✅ Delays configurables para mostrar/ocultar
- ✅ Posicionamiento dinámico con Renderer2

**Ubicación:** `src/app/components/shared/tooltip/`

**Uso:**
```html
<app-tooltip text="Texto del tooltip" position="top">
  <button>Hover me</button>
</app-tooltip>
```

**Técnicas de Manipulación del DOM:**
- Eventos `mouseenter`, `mouseleave`, `focus`, `blur`
- `@ViewChild` para referencia al tooltip
- `Renderer2.setStyle()` para posicionamiento dinámico
- Cálculo de posiciones con `getBoundingClientRect()`

### 4. Header Component (Menú Hamburguesa)

Header responsive con menú mobile:

- ✅ Toggle del menú con botón hamburguesa
- ✅ Cierre con tecla ESC
- ✅ Cierre al hacer click fuera del menú
- ✅ Cierre automático al cambiar a desktop
- ✅ Animaciones CSS
- ✅ Atributos ARIA dinámicos

**Ubicación:** `src/app/components/layout/header/`

**Técnicas de Manipulación del DOM:**
- `@ViewChild` con `ElementRef`
- `Renderer2.setAttribute()` para ARIA attributes
- `@HostListener` para eventos de teclado y resize
- Detección de clicks fuera con `contains()`

### 5. Theme Toggle Component

Switcher de tema claro/oscuro:

- ✅ Detecta `prefers-color-scheme` del sistema
- ✅ Toggle entre claro y oscuro
- ✅ Persistencia en localStorage
- ✅ Aplica tema al cargar la aplicación
- ✅ Transiciones suaves

**Ubicación:** `src/app/components/shared/theme-toggle/`

**Técnicas Implementadas:**
- `window.matchMedia('(prefers-color-scheme: dark)')` para detectar preferencia del sistema
- `localStorage.getItem/setItem()` para persistencia
- `document.documentElement.classList` para aplicar clases globales
- Inicialización en `ngOnInit()`

## 🎨 Manipulación del DOM

### ViewChild y ElementRef

Se utiliza `@ViewChild` para obtener referencias a elementos del DOM:

```typescript
@ViewChild('modalContainer', { read: ElementRef }) 
modalContainer?: ElementRef;

ngAfterViewInit(): void {
  console.log(this.modalContainer.nativeElement);
}
```

### Renderer2

Para manipulación segura del DOM compatible con SSR:

```typescript
constructor(private renderer: Renderer2) {}

// Cambiar estilos
this.renderer.setStyle(element, 'overflow', 'hidden');

// Cambiar atributos
this.renderer.setAttribute(button, 'aria-expanded', 'true');

// Agregar/quitar clases
this.renderer.addClass(element, 'active');
this.renderer.removeClass(element, 'inactive');
```

### Creación Dinámica de Elementos

Aunque no se usa extensivamente en este proyecto, Renderer2 permite crear elementos:

```typescript
const div = this.renderer.createElement('div');
this.renderer.setProperty(div, 'innerText', 'Nuevo elemento');
this.renderer.appendChild(parent, div);
```

## 🌓 Sistema de Temas

### Detección de Preferencia del Sistema

```typescript
private getSystemThemePreference(): boolean {
  if (window.matchMedia) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDark.matches;
  }
  return true; // Default a dark
}
```

### Orden de Prioridad

1. **localStorage** - Si existe preferencia guardada, se usa
2. **prefers-color-scheme** - Si no hay preferencia, detecta del sistema
3. **Default** - Dark mode por defecto

### Aplicación del Tema

El tema se aplica agregando/quitando clases en el elemento `<html>`:

```typescript
private applyTheme(): void {
  const htmlElement = document.documentElement;
  if (this.isDarkMode) {
    htmlElement.classList.add('dark-mode');
    htmlElement.classList.remove('light-mode');
  } else {
    htmlElement.classList.add('light-mode');
    htmlElement.classList.remove('dark-mode');
  }
}
```

### Variables CSS

Los componentes usan variables CSS que cambian según el tema:

```scss
:host-context(.dark-mode) {
  .component {
    background-color: var(--bg-primary, #1f2937);
    color: var(--text-primary, #f9fafb);
  }
}
```

## 🌐 Compatibilidad de Navegadores

### Tabla de Compatibilidad de Eventos

| Evento | Chrome | Firefox | Safari | Edge | Móviles |
|--------|--------|---------|--------|------|---------|
| `click` | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos |
| `keydown` | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos | ✅ iOS 13+ |
| `keyup` | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos | ✅ iOS 13+ |
| `mouseenter` | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos | ⚠️ Touch: hover |
| `mouseleave` | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos | ⚠️ Touch: hover |
| `focus` | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos |
| `blur` | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos |
| `pointerdown` | ✅ 55+ | ✅ 59+ | ✅ 13+ | ✅ 12+ | ✅ iOS 13+ |
| `matchMedia` | ✅ 9+ | ✅ 6+ | ✅ 5.1+ | ✅ 12+ | ✅ Todos |

### APIs Utilizadas

| API | Chrome | Firefox | Safari | Edge | Notas |
|-----|--------|---------|--------|------|-------|
| `localStorage` | ✅ 4+ | ✅ 3.5+ | ✅ 4+ | ✅ 12+ | Soporte universal |
| `classList` | ✅ 8+ | ✅ 3.6+ | ✅ 5.1+ | ✅ 10+ | Usado para temas |
| `getBoundingClientRect` | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos | Para tooltips |
| `prefers-color-scheme` | ✅ 76+ | ✅ 67+ | ✅ 12.1+ | ✅ 79+ | Detección de tema |

### Navegadores Soportados

- **Chrome/Edge**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **iOS Safari**: 14+
- **Android Chrome**: 90+

## 🎯 Demo

Visita `/demo` en la aplicación para ver todos los componentes interactivos en acción.

**URL:** `http://localhost:4200/demo`

La página de demo incluye:
- Ejemplos de todos los componentes
- Explicaciones de cada característica
- Código interactivo para probar

## 📚 Estructura del Proyecto

```
src/app/
├── components/
│   ├── layout/
│   │   ├── header/          # Header con menú hamburguesa
│   │   └── footer/
│   └── shared/
│       ├── modal/           # Componente Modal
│       ├── tabs/            # Componente Tabs
│       ├── tooltip/         # Componente Tooltip
│       ├── theme-toggle/    # Theme Switcher
│       └── ...
├── pages/
│   ├── home/
│   ├── demo-components/     # Página de demostración
│   └── ...
└── styles/                  # Estilos globales y variables
```

## 🔧 Tecnologías

- **Angular 19** - Framework principal
- **TypeScript 5.7** - Lenguaje
- **SCSS** - Preprocesador CSS
- **Standalone Components** - Arquitectura moderna de Angular

## 📝 Requisitos Implementados

### ✅ Tarea 1: Manipulación del DOM
- [x] ViewChild y ElementRef
- [x] Renderer2 para modificar estilos y propiedades
- [x] Creación dinámica de elementos (ejemplos documentados)

### ✅ Tarea 2: Sistema de Eventos
- [x] Event binding en componentes interactivos
- [x] Eventos de teclado (keydown, keyup, escape, enter)
- [x] Eventos de mouse (click, mouseenter, mouseleave)
- [x] Eventos de focus y blur
- [x] preventDefault() y stopPropagation()

### ✅ Tarea 3: Componentes Interactivos
- [x] Menú hamburguesa funcional
- [x] Modal con cierre ESC y click fuera
- [x] Tabs con navegación por teclado
- [x] Tooltips con hover y focus

### ✅ Tarea 4: Theme Switcher
- [x] Detectar prefers-color-scheme
- [x] Toggle claro/oscuro
- [x] Persistencia en localStorage
- [x] Aplicar tema al cargar

### ✅ Tarea 5: Documentación
- [x] Arquitectura de eventos explicada
- [x] Diagrama de flujo
- [x] Tabla de compatibilidad de navegadores
- [x] Documentación técnica completa

## � Componentes de la Fase 1

### Nuevos Componentes Implementados

1. **ThemeSwitcher** (`theme-switcher/`)
   - Detección de prefers-color-scheme
   - Persistencia en localStorage
   - Modo automático y manual
   - Variables CSS para temas

2. **DomManipulation** (`dom-manipulation/`)
   - ViewChild y ElementRef
   - Renderer2 para estilos y propiedades
   - Creación/eliminación dinámica de elementos
   - Manejo de clases CSS

3. **EventDemo** (`event-demo/`)
   - Event binding completo
   - Eventos de teclado, mouse y focus
   - preventDefault y stopPropagation
   - Log de eventos en tiempo real

4. **HamburgerMenu** (`hamburger-menu/`)
   - Toggle con animación
   - Cierre al click fuera
   - HostListener para documento
   - Overlay oscuro

5. **InteractiveModal** (`interactive-modal/`)
   - Cierre con ESC
   - Click en overlay
   - Múltiples variantes
   - Animaciones de entrada/salida

6. **InteractiveTabs** (`interactive-tabs/`)
   - Sistema de pestañas
   - Navegación por click
   - Contenido dinámico
   - Indicador visual activo

7. **InteractiveTooltip** (`interactive-tooltip/`)
   - Mouseenter/mouseleave
   - Múltiples posiciones
   - Diferentes estilos
   - Animaciones suaves

### Integración

Todos los componentes están disponibles en la página principal (`/`) en la sección destacada "FASE 1: Manipulación del DOM y Eventos".

## �👨‍💻 Autor

Alberto Rodríguez - ARO Proyecto Maqueta

## 📄 Licencia

Este proyecto es parte de un trabajo académico para el módulo de Desarrollo Web en Entorno Cliente.