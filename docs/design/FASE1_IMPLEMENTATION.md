# Documentación Técnica - Cliente Fase 1

## Implementación de Requisitos

Este documento detalla la implementación de todos los requisitos de la Fase 1: Manipulación del DOM y Eventos.

## Tabla de Contenidos

1. [Tarea 1: Manipulación del DOM](#tarea-1-manipulación-del-dom)
2. [Tarea 2: Sistema de Eventos](#tarea-2-sistema-de-eventos)
3. [Tarea 3: Componentes Interactivos](#tarea-3-componentes-interactivos)
4. [Tarea 4: Theme Switcher](#tarea-4-theme-switcher)
5. [Patrones y Mejores Prácticas](#patrones-y-mejores-prácticas)

---

## Tarea 1: Manipulación del DOM

### ViewChild y ElementRef

**Implementación en Modal Component:**

```typescript
@ViewChild('modalContainer', { read: ElementRef }) 
modalContainer?: ElementRef;

@ViewChild('modalContent', { read: ElementRef }) 
modalContent?: ElementRef;

ngAfterViewInit(): void {
  this.updateFocusTrap();
}
```

**Uso:** Obtener referencias a elementos del DOM para manipulación directa o para operaciones con Renderer2.

**Ubicaciones:**
- [src/app/components/shared/modal/modal.ts](src/app/components/shared/modal/modal.ts)
- [src/app/components/shared/tooltip/tooltip.ts](src/app/components/shared/tooltip/tooltip.ts)
- [src/app/components/shared/dom-example/dom-example.ts](src/app/components/shared/dom-example/dom-example.ts)
- [src/app/components/layout/header/header.ts](src/app/components/layout/header/header.ts)

### Renderer2 para Modificar Estilos

**Implementación en Theme Toggle:**

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

**Implementación en Modal:**

```typescript
private updateFocusTrap(): void {
  if (this.isOpen && this.modalContainer) {
    // Bloquear scroll del body
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    
    // Enfocar el modal para accesibilidad
    if (this.modalContent?.nativeElement) {
      this.renderer.setAttribute(this.modalContent.nativeElement, 'tabindex', '-1');
      setTimeout(() => this.modalContent?.nativeElement.focus(), 100);
    }
  } else {
    // Restaurar scroll
    this.renderer.removeStyle(document.body, 'overflow');
  }
}
```

**Ventajas de Renderer2:**
- Seguro para SSR (Server-Side Rendering)
- Compatible con Web Workers
- Abstracción que funciona en diferentes plataformas
- Previene ataques XSS

### Crear y Eliminar Elementos

**Implementación en DomExample Component:**

```typescript
crearElemento(): void {
  this.elementCount++;

  // Crear nuevo div
  const nuevoDiv = this.renderer.createElement('div');
  
  // Crear y agregar texto
  const texto = this.renderer.createText(`Elemento #${this.elementCount}`);
  this.renderer.appendChild(nuevoDiv, texto);
  
  // Agregar clases
  this.renderer.addClass(nuevoDiv, 'elemento-dinamico');
  
  // Establecer estilos
  this.renderer.setStyle(nuevoDiv, 'backgroundColor', this.getRandomColor());
  this.renderer.setStyle(nuevoDiv, 'padding', '1rem');
  
  // Agregar atributos
  this.renderer.setAttribute(nuevoDiv, 'data-element-id', this.elementCount.toString());
  
  // Insertar en el contenedor
  this.renderer.appendChild(this.contenedor.nativeElement, nuevoDiv);
}

eliminarPrimerElemento(): void {
  const primerHijo = this.contenedor.nativeElement.firstChild;
  if (primerHijo) {
    this.renderer.removeChild(this.contenedor.nativeElement, primerHijo);
  }
}
```

**Métodos de Renderer2 utilizados:**
- `createElement(tag)` - Crea un nuevo elemento HTML
- `createText(text)` - Crea un nodo de texto
- `appendChild(parent, child)` - Inserta un elemento como hijo
- `removeChild(parent, child)` - Elimina un elemento hijo
- `setStyle(element, style, value)` - Establece un estilo inline
- `setAttribute(element, name, value)` - Establece un atributo
- `addClass(element, className)` - Agrega una clase CSS
- `removeClass(element, className)` - Quita una clase CSS

---

## Tarea 2: Sistema de Eventos

### Event Binding

Angular usa una sintaxis especial para vincular eventos: `(eventName)="handler($event)"`

**Ejemplo básico en Modal:**

```html
<button
  type="button"
  class="modal__close"
  (click)="closeModal()"
  aria-label="Cerrar modal"
>
  <!-- Icono -->
</button>
```

**Con parámetro $event:**

```html
<div 
  class="modal"
  (click)="onBackdropClick($event)"
  role="dialog"
>
  <!-- Contenido -->
</div>
```

### Eventos de Teclado

**Implementación con @HostListener:**

```typescript
@HostListener('document:keydown.escape')
onEscapeKey(): void {
  if (this.isOpen) {
    this.closeModal();
  }
}
```

**Modificadores de teclado disponibles:**
- `.enter` - Tecla Enter
- `.escape` - Tecla Escape
- `.space` - Tecla Espacio
- `.tab` - Tecla Tab
- `.delete` - Tecla Delete
- `.backspace` - Tecla Backspace
- `.arrowup`, `.arrowdown`, `.arrowleft`, `.arrowright` - Flechas

**Navegación con teclado en Tabs:**

```typescript
onKeyDown(event: KeyboardEvent, currentIndex: number): void {
  let newIndex = currentIndex;

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1;
      break;
    case 'ArrowRight':
      event.preventDefault();
      newIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0;
      break;
    case 'Home':
      event.preventDefault();
      newIndex = 0;
      break;
    case 'End':
      event.preventDefault();
      newIndex = this.tabs.length - 1;
      break;
    default:
      return;
  }

  this.selectTab(this.tabs[newIndex].id);
}
```

### Eventos de Mouse

**Implementación en Tooltip:**

```typescript
onMouseEnter(): void {
  this.clearTimers();
  this.showTimer = window.setTimeout(() => {
    this.showTooltip = true;
    setTimeout(() => this.updatePosition(), 0);
  }, this.showDelay);
}

onMouseLeave(): void {
  this.clearTimers();
  this.hideTimer = window.setTimeout(() => {
    this.showTooltip = false;
  }, this.hideDelay);
}
```

**Template:**

```html
<div 
  class="tooltip__trigger"
  (mouseenter)="onMouseEnter()"
  (mouseleave)="onMouseLeave()"
>
  <ng-content></ng-content>
</div>
```

### Eventos de Focus y Blur

**Implementación en Tooltip:**

```typescript
onFocus(): void {
  this.clearTimers();
  this.showTooltip = true;
  setTimeout(() => this.updatePosition(), 0);
}

onBlur(): void {
  this.clearTimers();
  this.showTooltip = false;
}
```

**Template:**

```html
<div 
  class="tooltip__trigger"
  (focus)="onFocus()"
  (blur)="onBlur()"
  tabindex="0"
>
  <ng-content></ng-content>
</div>
```

### preventDefault() y stopPropagation()

**Prevenir comportamiento por defecto:**

```typescript
onBackdropClick(event: MouseEvent): void {
  if (event.target === event.currentTarget) {
    event.preventDefault(); // Previene comportamiento por defecto
    this.closeModal();
  }
}
```

**Detener propagación:**

```typescript
onContentClick(event: MouseEvent): void {
  event.stopPropagation(); // Detiene la propagación hacia el backdrop
}
```

**¿Cuándo usar cada uno?**

- **preventDefault()**: Para evitar acciones por defecto del navegador (submit de formularios, navegación de enlaces, etc.)
- **stopPropagation()**: Para evitar que el evento se propague a elementos padres (prevenir que clicks en el contenido cierren un modal)

---

## Tarea 3: Componentes Interactivos

### Modal Component

**Características implementadas:**
- ✅ Cierre con ESC
- ✅ Cierre al hacer click en el backdrop
- ✅ Botón de cerrar
- ✅ Bloqueo de scroll del body
- ✅ Focus trap para accesibilidad
- ✅ Animaciones de entrada/salida
- ✅ Atributos ARIA completos

**Uso:**

```typescript
export class MyComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
```

```html
<app-modal
  [isOpen]="isModalOpen"
  title="Mi Modal"
  (close)="closeModal()"
>
  <p>Contenido del modal</p>
  
  <div modal-footer>
    <button (click)="closeModal()">Cancelar</button>
    <button (click)="confirm()">Confirmar</button>
  </div>
</app-modal>
```

### Tabs Component

**Características implementadas:**
- ✅ Cambio de pestaña con click
- ✅ Navegación con flechas (←→)
- ✅ Ir al inicio/fin con Home/End
- ✅ Clases dinámicas para pestaña activa
- ✅ Atributos ARIA para accesibilidad
- ✅ Scroll horizontal en mobile
- ✅ Animaciones de transición

**Uso:**

```typescript
export class MyComponent {
  tabs: Tab[] = [
    { id: 'tab1', label: 'Pestaña 1', content: 'Contenido 1' },
    { id: 'tab2', label: 'Pestaña 2', content: 'Contenido 2' }
  ];

  onTabChange(tabId: string) {
    console.log('Cambió a:', tabId);
  }
}
```

```html
<app-tabs
  [tabs]="tabs"
  activeTabId="tab1"
  (tabChange)="onTabChange($event)"
/>
```

### Tooltip Component

**Características implementadas:**
- ✅ Aparece con hover (mouseenter/mouseleave)
- ✅ Aparece con focus/blur
- ✅ Posiciones: top, bottom, left, right
- ✅ Delays configurables
- ✅ Posicionamiento automático
- ✅ Flecha apuntando al elemento
- ✅ Accesibilidad con atributos ARIA

**Uso:**

```html
<app-tooltip text="Texto del tooltip" position="top">
  <button>Hover me</button>
</app-tooltip>
```

**Con delays personalizados:**

```html
<app-tooltip 
  text="Aparece después de 500ms" 
  position="bottom"
  [showDelay]="500"
  [hideDelay]="200"
>
  <span>Hover me</span>
</app-tooltip>
```

### Header Component (Menú Hamburguesa)

**Características implementadas:**
- ✅ Toggle del menú con botón
- ✅ Cierre con ESC
- ✅ Cierre al hacer click fuera
- ✅ Cierre automático al cambiar a desktop
- ✅ Animaciones CSS
- ✅ Atributos ARIA dinámicos
- ✅ Icono animado del hamburguesa

**Implementación del cierre al click fuera:**

```typescript
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {
  if (!this.isMenuOpen) return;

  const target = event.target as HTMLElement;
  const headerElement = this.elementRef.nativeElement;
  
  // Verificar si el click fue fuera del header
  if (!headerElement.contains(target)) {
    this.toggleMenu();
  }
}
```

---

## Tarea 4: Theme Switcher

### Detectar prefers-color-scheme

```typescript
private getSystemThemePreference(): boolean {
  if (window.matchMedia) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDark.matches;
  }
  return true; // Default a dark
}
```

**¿Cómo funciona?**

`window.matchMedia()` permite ejecutar consultas CSS desde JavaScript. La consulta `(prefers-color-scheme: dark)` retorna un objeto `MediaQueryList` con la propiedad `matches` que indica si el usuario tiene configurado el modo oscuro en su sistema operativo.

### Inicialización del Tema

```typescript
private initializeTheme(): void {
  // 1. Primero intentar leer de localStorage
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    // Si hay preferencia guardada, usarla
    this.isDarkMode = savedTheme === 'dark';
  } else {
    // 2. Si no hay preferencia, detectar del sistema
    this.isDarkMode = this.getSystemThemePreference();
  }
  
  this.applyTheme();
}
```

**Orden de prioridad:**
1. **localStorage** (preferencia explícita del usuario)
2. **prefers-color-scheme** (preferencia del sistema)
3. **Default** (dark mode)

### Toggle del Tema

```typescript
toggleTheme(): void {
  this.isDarkMode = !this.isDarkMode;
  this.applyTheme();
  this.saveThemePreference();
}

private saveThemePreference(): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }
}
```

### Aplicación Global del Tema

```typescript
private applyTheme(): void {
  if (isPlatformBrowser(this.platformId)) {
    const htmlElement = document.documentElement;
    if (this.isDarkMode) {
      htmlElement.classList.add('dark-mode');
      htmlElement.classList.remove('light-mode');
    } else {
      htmlElement.classList.add('light-mode');
      htmlElement.classList.remove('dark-mode');
    }
  }
}
```

**Ventajas de aplicar en `<html>`:**
- Global para toda la aplicación
- Los componentes pueden usar `:host-context(.dark-mode)` en sus estilos
- Fácil de testear en DevTools
- Evita flashes de contenido sin estilizar (FOUC)

### Uso en Componentes

```scss
.component {
  background-color: var(--bg-primary, #fff);
  color: var(--text-primary, #111827);
}

:host-context(.dark-mode) {
  .component {
    background-color: var(--bg-primary, #1f2937);
    color: var(--text-primary, #f9fafb);
  }
}
```

---

## Patrones y Mejores Prácticas

### 1. Uso de Renderer2 vs Manipulación Directa

**❌ No hacer:**
```typescript
element.style.color = 'red'; // Manipulación directa
```

**✅ Hacer:**
```typescript
this.renderer.setStyle(element, 'color', 'red'); // Renderer2
```

**Razones:**
- Compatible con SSR
- Funciona en Web Workers
- Más seguro (previene XSS)
- Mantenible y testeable

### 2. @ViewChild con AfterViewInit

**❌ No hacer:**
```typescript
ngOnInit() {
  console.log(this.myElement); // undefined!
}
```

**✅ Hacer:**
```typescript
ngAfterViewInit() {
  console.log(this.myElement); // Disponible
}
```

**Razón:** Los elementos referenciados con `@ViewChild` no están disponibles hasta después de que la vista se inicializa.

### 3. Limpieza de Timers

**❌ No hacer:**
```typescript
setTimeout(() => {
  this.showTooltip = true;
}, 300);
// No guardar referencia, no limpiar
```

**✅ Hacer:**
```typescript
private showTimer?: number;

showTooltip() {
  this.showTimer = window.setTimeout(() => {
    this.showTooltip = true;
  }, 300);
}

ngOnDestroy() {
  if (this.showTimer) {
    clearTimeout(this.showTimer);
  }
}
```

### 4. Accesibilidad

**Siempre incluir:**
- Atributos ARIA (`role`, `aria-label`, `aria-expanded`, etc.)
- Soporte para navegación por teclado
- Focus visible para elementos interactivos
- Textos alternativos para iconos

**Ejemplo:**
```html
<button
  type="button"
  [attr.aria-expanded]="isOpen"
  [attr.aria-label]="isOpen ? 'Cerrar menú' : 'Abrir menú'"
  (click)="toggle()"
>
  <span aria-hidden="true">☰</span>
</button>
```

### 5. Prevención de Memory Leaks

**Para observables:**
```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.myService.data$
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {});
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

**Para event listeners del DOM:**
```typescript
@HostListener('window:resize')
onResize() {
  // Angular limpia automáticamente @HostListener
}
```

### 6. Estructura de Componentes Standalone

```typescript
@Component({
  selector: 'app-my-component',
  standalone: true, // Componente standalone
  imports: [CommonModule, OtherComponent], // Importar dependencias
  templateUrl: './my-component.html',
  styleUrl: './my-component.scss',
})
export class MyComponent {
  // Implementación
}
```

---

## Checklist de Implementación

### Tarea 1: Manipulación del DOM
- [x] ViewChild y ElementRef implementados en múltiples componentes
- [x] Renderer2 usado para modificar estilos (Modal, Tooltip, DomExample)
- [x] Renderer2 usado para modificar propiedades (DomExample)
- [x] Creación de elementos con Renderer2 (DomExample)
- [x] Eliminación de elementos con Renderer2 (DomExample)

### Tarea 2: Sistema de Eventos
- [x] Event binding con (click)
- [x] Eventos de teclado (keydown, keyup, escape, enter)
- [x] Eventos de mouse (mouseenter, mouseleave)
- [x] Eventos de focus y blur
- [x] preventDefault() implementado
- [x] stopPropagation() implementado
- [x] @HostListener para eventos globales

### Tarea 3: Componentes Interactivos
- [x] Modal con todas las características
- [x] Tabs con navegación por teclado
- [x] Tooltip con posicionamiento dinámico
- [x] Menú hamburguesa con cierre inteligente

### Tarea 4: Theme Switcher
- [x] Detectar prefers-color-scheme
- [x] Toggle entre claro/oscuro
- [x] Persistencia en localStorage
- [x] Aplicar tema al cargar
- [x] Variables CSS para temas

### Tarea 5: Documentación
- [x] README completo con arquitectura
- [x] Diagrama de flujo de eventos
- [x] Tabla de compatibilidad de navegadores
- [x] Documentación técnica detallada
- [x] Ejemplos de código
- [x] Página de demo funcional

---

## Ubicación de Archivos

### Componentes
- Modal: `src/app/components/shared/modal/`
- Tabs: `src/app/components/shared/tabs/`
- Tooltip: `src/app/components/shared/tooltip/`
- Theme Toggle: `src/app/components/shared/theme-toggle/`
- DOM Example: `src/app/components/shared/dom-example/`
- Header: `src/app/components/layout/header/`

### Páginas
- Demo: `src/app/pages/demo-components/`

### Documentación
- README principal: `README.md`
- Documentación técnica: `docs/design/FASE1_IMPLEMENTATION.md`
- Requisitos: `docs/requisitos/ClienteFase1.md`

---

## Cómo Probar

1. **Iniciar el servidor de desarrollo:**
   ```bash
   npm start
   ```

2. **Navegar a la página de demo:**
   ```
   http://localhost:4200/demo
   ```

3. **Probar cada componente:**
   - **Modal**: Click en "Abrir Modal", probar ESC, click fuera
   - **Tabs**: Navegar con click y flechas del teclado
   - **Tooltip**: Hover sobre los botones de ejemplo
   - **Menu**: Click en hamburguesa, probar ESC, click fuera
   - **Theme**: Toggle en el header
   - **DOM Manipulation**: Crear, eliminar elementos

4. **Verificar accesibilidad:**
   - Usar solo el teclado (Tab, Enter, ESC, flechas)
   - Verificar atributos ARIA en el inspector
   - Probar con lectores de pantalla

---

## Conclusión

Todos los requisitos de Cliente Fase 1 han sido implementados con éxito:

✅ Manipulación del DOM con ViewChild, ElementRef y Renderer2
✅ Sistema completo de eventos (teclado, mouse, focus)
✅ 4+ componentes interactivos funcionales
✅ Theme Switcher completo con detección de sistema
✅ Documentación técnica exhaustiva

El proyecto está listo para evaluación y demuestra dominio de:
- Manipulación segura del DOM en Angular
- Event handling avanzado
- Componentes interactivos accesibles
- Mejores prácticas de Angular
- Documentación profesional
