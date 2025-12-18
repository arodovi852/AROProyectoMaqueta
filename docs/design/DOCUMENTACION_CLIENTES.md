# Documentación Técnica - Desarrollo Web en Entorno Cliente (DWEC)

Este documento describe la implementación de la funcionalidad TypeScript/Angular del proyecto BROADCAST, cumpliendo con los criterios de evaluación de las Fases 1 a 5 del módulo DWEC.

---

# Índice

- [Fase 1: Manipulación del DOM y Eventos](#fase-1-manipulación-del-dom-y-eventos)
- [Fase 2: Componentes Interactivos y Comunicación](#fase-2-componentes-interactivos-y-comunicación)
- [Fase 3: Formularios Reactivos Avanzados](#fase-3-formularios-reactivos-avanzados)
- [Fase 4: Sistema de Rutas y Navegación](#fase-4-sistema-de-rutas-y-navegación)
- [Fase 5: Servicios y Comunicación HTTP](#fase-5-servicios-y-comunicación-http)

---

# Fase 1: Manipulación del DOM y Eventos

**Criterios**: RA6.a, RA6.c, RA6.d, RA6.e, RA6.h

## Tarea 1: Manipulación del DOM en componentes Angular

### Acceso a elementos del DOM con ViewChild y ElementRef

Se utiliza `@ViewChild` para acceder a elementos del DOM referenciados en las plantillas, junto con `ElementRef` para obtener la referencia nativa.

**Implementación en `dom-manipulation.ts`:**

```typescript
import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dom-manipulation',
  templateUrl: './dom-manipulation.html',
  standalone: true
})
export class DomManipulation implements AfterViewInit {
  @ViewChild('contentDiv', { static: false }) contentDiv!: ElementRef;
  @ViewChild('dynamicContainer', { static: false }) dynamicContainer!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Acceso al elemento nativo del DOM
    console.log('DOM Element:', this.contentDiv.nativeElement);
  }
}
```

**Puntos clave:**
- `@ViewChild` accede al elemento referenciado en la plantilla con `#contentDiv`
- `ElementRef` contiene la referencia al elemento nativo del DOM
- `ngAfterViewInit()` garantiza que el DOM está inicializado antes de acceder a él

### Modificación de propiedades y estilos con Renderer2

Se usa `Renderer2` para manipulaciones seguras y compatibles con SSR:

```typescript
// Cambiar estilos dinámicamente
changeStyles() {
  this.renderer.setStyle(this.contentDiv.nativeElement, 'color', '#e53e3e');
  this.renderer.setStyle(this.contentDiv.nativeElement, 'fontSize', '24px');
  this.renderer.setStyle(this.contentDiv.nativeElement, 'fontWeight', 'bold');
}

// Cambiar contenido
changeContent() {
  this.renderer.setProperty(this.contentDiv.nativeElement, 'innerText', '¡Texto modificado!');
}

// Resetear estilos
resetElement() {
  this.renderer.removeStyle(this.contentDiv.nativeElement, 'color');
  this.renderer.removeStyle(this.contentDiv.nativeElement, 'fontSize');
  this.renderer.setProperty(this.contentDiv.nativeElement, 'innerText', 'Contenido inicial');
}
```

### Creación y eliminación de elementos programáticamente

```typescript
// Crear nuevo elemento
createElement() {
  const newDiv = this.renderer.createElement('div');
  const text = this.renderer.createText(`Elemento creado a las ${new Date().toLocaleTimeString()}`);
  
  this.renderer.setStyle(newDiv, 'backgroundColor', '#e893cf');
  this.renderer.setStyle(newDiv, 'padding', '12px');
  this.renderer.setStyle(newDiv, 'marginTop', '8px');
  this.renderer.setStyle(newDiv, 'borderRadius', '1rem');
  
  this.renderer.appendChild(newDiv, text);
  this.renderer.appendChild(this.dynamicContainer.nativeElement, newDiv);
}

// Eliminar último elemento
removeElement() {
  const lastChild = this.dynamicContainer.nativeElement.lastChild;
  if (lastChild) {
    this.renderer.removeChild(this.dynamicContainer.nativeElement, lastChild);
  }
}

// Agregar/remover clases CSS
addCssClass() {
  this.renderer.addClass(this.contentDiv.nativeElement, 'highlighted');
}

removeCssClass() {
  this.renderer.removeClass(this.contentDiv.nativeElement, 'highlighted');
}
```

**Métodos de Renderer2 utilizados:**

| Método | Descripción |
|--------|-------------|
| `createElement(tag)` | Crea un elemento HTML |
| `createText(text)` | Crea un nodo de texto |
| `appendChild(parent, child)` | Inserta elemento hijo |
| `removeChild(parent, child)` | Elimina elemento hijo |
| `setStyle(el, prop, val)` | Establece estilo CSS |
| `removeStyle(el, prop)` | Elimina estilo CSS |
| `setProperty(el, prop, val)` | Establece propiedad del elemento |
| `addClass(el, class)` | Añade clase CSS |
| `removeClass(el, class)` | Elimina clase CSS |


## Tarea 2: Sistema de eventos en Angular

### Event binding en componentes interactivos

**Implementación en `event-demo.ts`:**

```typescript
@Component({
  selector: 'app-event-demo',
  templateUrl: './event-demo.html',
  standalone: true,
  imports: [CommonModule, FormsModule, Button]
})
export class EventDemo {
  clickCount = 0;
  lastKey = '';
  mousePosition = { x: 0, y: 0 };
  isFocused = false;
  eventLog: string[] = [];

  // Click simple
  onClick(event: MouseEvent) {
    this.clickCount++;
    this.addToLog(`Click en (${event.clientX}, ${event.clientY})`);
  }

  // Doble click
  onDoubleClick(event: MouseEvent) {
    this.addToLog('Doble click detectado');
  }
}
```

### Eventos de teclado, mouse, focus y blur

```typescript
// Eventos de teclado
onKeyDown(event: KeyboardEvent) {
  this.lastKey = event.key;
  this.addToLog(`Tecla presionada: ${event.key}`);
}

onKeyUp(event: KeyboardEvent) {
  this.addToLog(`Tecla liberada: ${event.key}`);
}

// Evento especial: Enter
onEnterPressed() {
  this.addToLog(`¡Enter presionado! Valor: "${this.inputValue}"`);
}

// Eventos de mouse
onMouseMove(event: MouseEvent) {
  this.mousePosition = { x: event.clientX, y: event.clientY };
}

onMouseEnter() {
  this.isMouseInside = true;
  this.addToLog('Mouse entró en el área');
}

onMouseLeave() {
  this.isMouseInside = false;
  this.addToLog('Mouse salió del área');
}

// Eventos de focus
onFocus(event: FocusEvent) {
  this.isFocused = true;
  this.addToLog('Input recibió foco');
}

onBlur(event: FocusEvent) {
  this.isFocused = false;
  this.addToLog('Input perdió foco');
}
```

### Prevenir comportamiento por defecto y propagación

```typescript
// Prevenir comportamiento por defecto
onSubmit(event: Event) {
  event.preventDefault();
  this.addToLog('Formulario enviado (sin recarga)');
}

// Detener propagación
onInnerClick(event: MouseEvent) {
  event.stopPropagation();
  this.addToLog('Click interno (propagación detenida)');
}

onOuterClick() {
  this.addToLog('Click externo');
}
```

**Template con event bindings:**

```html
<!-- Eventos de click -->
<button (click)="onClick($event)">Click: {{ clickCount }}</button>
<button (dblclick)="onDoubleClick($event)">Doble click</button>

<!-- Eventos de teclado -->
<input 
  (keydown)="onKeyDown($event)" 
  (keyup)="onKeyUp($event)"
  (keyup.enter)="onEnterPressed()"
/>

<!-- Eventos de mouse -->
<div 
  (mouseenter)="onMouseEnter()" 
  (mouseleave)="onMouseLeave()"
  (mousemove)="onMouseMove($event)"
>
  Área de mouse
</div>

<!-- Eventos de focus -->
<input (focus)="onFocus($event)" (blur)="onBlur($event)" />

<!-- Prevenir default -->
<form (submit)="onSubmit($event)">
  <button type="submit">Enviar</button>
</form>

<!-- Propagación -->
<div (click)="onOuterClick()">
  <button (click)="onInnerClick($event)">Click interno</button>
</div>
```


## Tarea 3: Componentes interactivos funcionales

### Menú Hamburguesa

**Implementación en `hamburger-menu.ts`:**

```typescript
import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true
})
export class HamburgerMenu {
  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  // Cerrar al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
```

### Modal con cierre por ESC

**Implementación en `modal.ts`:**

```typescript
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true
})
export class Modal {
  @Input() isOpen = false;
  @Input() title?: string;
  @Output() close = new EventEmitter<void>();

  // Cerrar con tecla ESC
  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.isOpen) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
```

### Tabs

**Implementación en `tabs.ts`:**

```typescript
export interface Tab {
  id: string;
  label: string;
  content?: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true
})
export class Tabs {
  @Input() tabs: Tab[] = [];
  @Input() activeTabId?: string;
  @Output() tabChange = new EventEmitter<string>();

  activeTab = '';

  ngOnInit(): void {
    this.activeTab = this.activeTabId || this.tabs[0]?.id || '';
  }

  selectTab(tabId: string, event?: MouseEvent): void {
    event?.preventDefault();
    this.activeTab = tabId;
    this.tabChange.emit(tabId);
  }

  // Navegación con teclado
  onKeyDown(event: KeyboardEvent, currentIndex: number): void {
    let newIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1;
        break;
      case 'ArrowRight':
        newIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0;
        break;
    }

    if (newIndex !== currentIndex) {
      this.selectTab(this.tabs[newIndex].id);
    }
  }
}
```

### Tooltips

**Implementación en `tooltip.ts`:**

```typescript
@Component({
  selector: 'app-tooltip',
  standalone: true
})
export class Tooltip implements AfterViewInit {
  @Input() text = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() showDelay = 300;
  @Input() hideDelay = 100;

  showTooltip = false;
  private showTimer?: number;
  private hideTimer?: number;

  // Mostrar al pasar el mouse
  onMouseEnter(): void {
    this.clearTimers();
    this.showTimer = window.setTimeout(() => {
      this.showTooltip = true;
    }, this.showDelay);
  }

  // Ocultar al salir
  onMouseLeave(): void {
    this.clearTimers();
    this.hideTimer = window.setTimeout(() => {
      this.showTooltip = false;
    }, this.hideDelay);
  }

  private clearTimers(): void {
    if (this.showTimer) clearTimeout(this.showTimer);
    if (this.hideTimer) clearTimeout(this.hideTimer);
  }
}
```


## Tarea 4: Theme Switcher funcional

**Implementación en `theme-toggle.ts`:**

```typescript
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true
})
export class ThemeToggle implements OnInit {
  isDarkMode = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }
  }

  // Inicializar tema al cargar
  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      // Detectar preferencia del sistema
      this.isDarkMode = this.getSystemThemePreference();
    }
    
    this.applyTheme();
  }

  // Detectar prefers-color-scheme
  private getSystemThemePreference(): boolean {
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  }

  // Toggle entre temas
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  // Aplicar tema al documento
  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
}
```

**Características implementadas:**
- ✅ Detecta `prefers-color-scheme` del sistema
- ✅ Toggle entre tema claro/oscuro
- ✅ Persistencia en `localStorage`
- ✅ Aplica tema al cargar la aplicación


## Tarea 5: Documentación de eventos

### Arquitectura de eventos

La arquitectura de eventos sigue el patrón unidireccional de datos:

```
Usuario → DOM Event (click/keydown) 
      → Template Binding ((event)) 
      → Component Handler ($event) 
      → Service/State Update (signals/RxJS)
      → View Re-render (OnPush/Zone.js)
```

### Eventos implementados y compatibilidad

| Evento | Tipo | Uso | Navegadores |
|--------|------|-----|-------------|
| `(click)` | Mouse | Botones, enlaces | Todos |
| `(dblclick)` | Mouse | Acciones especiales | Todos |
| `(keydown)` | Teclado | Captura tecla presionada | Todos |
| `(keyup)` | Teclado | Captura tecla liberada | Todos |
| `(keyup.enter)` | Teclado | Envío con Enter | Todos |
| `(mouseenter)` | Mouse | Hover entrada | Todos |
| `(mouseleave)` | Mouse | Hover salida | Todos |
| `(mousemove)` | Mouse | Tracking posición | Todos |
| `(focus)` | Focus | Input recibe foco | Todos |
| `(blur)` | Focus | Input pierde foco | Todos |
| `(submit)` | Form | Envío formulario | Todos |


---

# Fase 2: Componentes Interactivos y Comunicación

**Criterios**: RA6.e, RA6.g, RA6.h

## Tarea 1: Servicios de comunicación

### Servicio de comunicación entre componentes hermanos

**Implementación en `communication.service.ts`:**

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommunicationService {
  private notificationSubject = new BehaviorSubject<string>('');
  public notifications$: Observable<string> = this.notificationSubject.asObservable();

  sendNotification(message: string): void {
    this.notificationSubject.next(message);
  }
}
```

### Componente emisor

**Implementación en `sibling-sender.ts`:**

```typescript
@Component({
  selector: 'app-sibling-sender',
  standalone: true
})
export class SiblingSender {
  messageCount = 0;

  constructor(private communicationService: CommunicationService) {}

  sendMessage(): void {
    this.messageCount++;
    const message = `Mensaje ${this.messageCount} desde Componente Emisor`;
    this.communicationService.sendNotification(message);
  }
}
```

### Componente receptor

**Implementación en `sibling-receiver.ts`:**

```typescript
@Component({
  selector: 'app-sibling-receiver',
  standalone: true
})
export class SiblingReceiver implements OnInit, OnDestroy {
  receivedMessages: string[] = [];
  private subscription: Subscription | null = null;

  constructor(private communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.subscription = this.communicationService.notifications$.subscribe(message => {
      if (message) {
        this.receivedMessages.unshift(message);
        // Mantener solo los últimos 5 mensajes
        if (this.receivedMessages.length > 5) {
          this.receivedMessages = this.receivedMessages.slice(0, 5);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
```


## Tarea 2: Separación de responsabilidades

La arquitectura sigue el patrón SRP (Single Responsibility Principle):

| Capa | Responsabilidad | Ejemplo |
|------|-----------------|---------|
| **Componentes** | Solo UI y eventos | `SiblingSender`, `Toast` |
| **Servicios** | Lógica de negocio y estado | `ToastService`, `AuthService` |
| **Validators** | Validación de datos | `custom-validators.ts` |


## Tarea 3: Sistema de notificaciones/toasts

### Servicio centralizado

**Implementación en `toast.service.ts`:**

```typescript
export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  public toast$: Observable<ToastMessage | null> = this.toastSubject.asObservable();

  show(message: string, type: ToastMessage['type'], duration = 5000): void {
    this.toastSubject.next({ message, type, duration });
  }

  success(message: string, duration = 4000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration = 8000): void {
    this.show(message, 'error', duration);
  }

  info(message: string, duration = 3000): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration = 6000): void {
    this.show(message, 'warning', duration);
  }
}
```

### Componente Toast

**Implementación en `toast.ts`:**

```typescript
@Component({
  selector: 'app-toast',
  standalone: true
})
export class Toast implements OnInit, OnDestroy {
  toast = signal<ToastMessage | null>(null);
  private timeoutId: any = null;
  private subscription: Subscription | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toast$.subscribe(msg => {
      this.dismiss(); // Cancela timeout anterior
      this.toast.set(msg);

      if (msg?.duration && msg.duration > 0) {
        this.timeoutId = setTimeout(() => {
          this.toast.set(null);
        }, msg.duration);
      }
    });
  }

  ngOnDestroy(): void {
    this.dismiss();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  dismiss(): void {
    this.toast.set(null);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
```


## Tarea 4: Gestión de loading states

### Servicio de loading global

**Implementación en `loading.service.ts`:**

```typescript
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.loadingSubject.asObservable();
  private requestCount = 0;

  show(): void {
    this.requestCount++;
    this.loadingSubject.next(this.requestCount > 0);
  }

  hide(): void {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.loadingSubject.next(false);
    }
  }
}
```

### Spinner global

**Implementación en `spinner.ts`:**

```typescript
@Component({
  selector: 'app-spinner',
  standalone: true
})
export class Spinner implements OnInit, OnDestroy {
  isLoading = false;
  private subscription: Subscription | null = null;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.subscription = this.loadingService.isLoading$.subscribe(
      loading => this.isLoading = loading
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
```


## Tarea 5: Diagrama de arquitectura de servicios

```
┌─────────────────────────────────────────────────────────────────┐
│                        COMPONENTES                               │
├──────────────┬──────────────┬──────────────┬──────────────────────┤
│ SiblingSender│SiblingReceiver│   Toast      │     Spinner         │
│    (emit)    │  (subscribe) │ (subscribe)  │   (subscribe)       │
└──────┬───────┴──────┬───────┴──────┬───────┴─────────┬───────────┘
       │              │              │                 │
       ▼              ▼              ▼                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                         SERVICIOS                                │
├──────────────────┬─────────────────┬─────────────────────────────┤
│ CommunicationSvc │   ToastService  │      LoadingService         │
│ (BehaviorSubject)│ (BehaviorSubject)│    (BehaviorSubject)       │
└──────────────────┴─────────────────┴─────────────────────────────┘
```

### Patrones implementados

| Patrón | Uso | Servicio |
|--------|-----|----------|
| **Observable/Subject** | Estado reactivo global | `CommunicationService` |
| **Singleton** | `providedIn: 'root'` | Todos los servicios |
| **BehaviorSubject** | Valor inicial + histórico | `ToastService`, `LoadingService` |


---

# Fase 3: Formularios Reactivos Avanzados

**Criterios**: RA6.d, RA6.e, RA6.h

## Tarea 1: Formularios reactivos básicos

### Implementación con FormBuilder

**Ejemplo en `contact-form-reactive.ts`:**

```typescript
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form-reactive',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class ContactFormReactive {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private toastService: ToastService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      nif: ['', [Validators.required, nif()]],
      email: ['', [Validators.email]],
      telefono: ['', [telefono()]],
      codigoPostal: ['', [codigoPostal()]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    }, {
      validators: atLeastOneRequired('email', 'telefono')
    });
  }

  // Getters para acceso fácil
  get name() { return this.contactForm.get('name')!; }
  get email() { return this.contactForm.get('email')!; }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.toastService.warning('Por favor, corrige los errores');
      return;
    }
    
    console.log('Formulario enviado:', this.contactForm.value);
    this.toastService.success('Mensaje enviado correctamente');
    this.contactForm.reset();
  }
}
```

### Validadores síncronos integrados

| Validador | Uso | Error retornado |
|-----------|-----|-----------------|
| `required` | Campo obligatorio | `{required: true}` |
| `minLength(n)` | Longitud mínima | `{minlength: {requiredLength, actualLength}}` |
| `email` | Formato email | `{email: true}` |
| `pattern(regex)` | Expresión regular | `{pattern: {requiredPattern, actualValue}}` |
| `min(n)` | Valor mínimo | `{min: {min, actual}}` |


## Tarea 2: Validadores personalizados

### Validador de contraseña fuerte

**Implementación en `custom-validators.ts`:**

```typescript
export function passwordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const minLength = value.length >= 12;

    const errors: ValidationErrors = {};
    if (!hasUpper) errors['noUppercase'] = true;
    if (!hasLower) errors['noLowercase'] = true;
    if (!hasNumber) errors['noNumber'] = true;
    if (!hasSpecial) errors['noSpecial'] = true;
    if (!minLength) errors['minLength'] = true;

    return Object.keys(errors).length ? errors : null;
  };
}
```

### Validadores de formato español

```typescript
// Validador de NIF
export function nif(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    
    const nif = control.value.toUpperCase().trim();
    const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
    
    if (!nifRegex.test(nif)) return { invalidNif: true };

    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const position = parseInt(nif.substring(0, 8)) % 23;
    
    return letters[position] === nif[8] ? null : { invalidNif: true };
  };
}

// Validador de teléfono móvil español
export function telefono(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return /^[67][0-9]{8}$/.test(control.value) ? null : { invalidTelefono: true };
  };
}

// Validador de código postal
export function codigoPostal(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return /^\d{5}$/.test(control.value) ? null : { invalidCP: true };
  };
}
```

### Validadores cross-field

**Implementación en `cross-field-validators.ts`:**

```typescript
// Confirmación de contraseña
export function passwordMatch(controlName: string, matchControlName: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchControl = group.get(matchControlName);

    if (!control || !matchControl) return null;

    if (control.value !== matchControl.value) {
      matchControl.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      matchControl.setErrors(null);
      return null;
    }
  };
}

// Total mínimo
export function totalMinimo(min: number): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const price = group.get('price')?.value || 0;
    const quantity = group.get('quantity')?.value || 0;
    return (price * quantity) >= min ? null : { totalMinimo: { min, actual: price * quantity } };
  };
}

// Al menos uno requerido
export function atLeastOneRequired(...fields: string[]): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const hasOne = fields.some(field => !!group.get(field)?.value?.toString().trim());
    return hasOne ? null : { atLeastOneRequired: { fields } };
  };
}
```


## Tarea 3: Validadores asíncronos

**Implementación en `async-validators.ts`:**

```typescript
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

// Email único
export function uniqueEmail(validationService: ValidationService, currentUserId?: string): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);

    // Debounce de 500ms
    return timer(500).pipe(
      switchMap(() => validationService.checkEmailUnique(control.value, currentUserId)),
      map(isUnique => isUnique ? null : { emailTaken: true }),
      catchError(() => of(null))
    );
  };
}

// Username disponible
export function usernameAvailable(validationService: ValidationService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value;
    if (!username || username.length < 3) return of(null);

    // Debounce de 300ms
    return timer(300).pipe(
      switchMap(() => validationService.checkUsernameAvailable(username)),
      map(isAvailable => isAvailable ? null : { usernameTaken: true }),
      catchError(() => of(null))
    );
  };
}
```

### Uso con updateOn: 'blur'

```typescript
this.profileForm = this.fb.group({
  username: ['', 
    [Validators.required, Validators.minLength(3)],
    [usernameAvailable(validationService)]
  ],
  email: ['',
    [Validators.required, Validators.email],
    [uniqueEmail(validationService)]
  ]
}, {
  updateOn: 'blur' // Solo valida al salir del campo
});
```


## Tarea 4: FormArray para contenido dinámico

**Implementación en `invoice-form.ts`:**

```typescript
@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class InvoiceForm {
  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      customer: ['', Validators.required],
      phones: this.fb.array([]),
      addresses: this.fb.array([]),
      items: this.fb.array([])
    }, {
      validators: totalMinimo(100)
    });

    this.addPhone();
    this.addAddress();
    this.addItem();
  }

  // Getters para FormArrays
  get phones(): FormArray { return this.invoiceForm.get('phones') as FormArray; }
  get addresses(): FormArray { return this.invoiceForm.get('addresses') as FormArray; }
  get items(): FormArray { return this.invoiceForm.get('items') as FormArray; }

  // Teléfonos
  newPhone(): FormGroup {
    return this.fb.group({
      phone: ['', [Validators.required, telefono()]]
    });
  }
  addPhone(): void { this.phones.push(this.newPhone()); }
  removePhone(index: number): void { 
    if (this.phones.length > 1) this.phones.removeAt(index); 
  }

  // Direcciones
  newAddress(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, codigoPostal()]]
    });
  }
  addAddress(): void { this.addresses.push(this.newAddress()); }
  removeAddress(index: number): void { 
    if (this.addresses.length > 1) this.addresses.removeAt(index); 
  }

  // Items de factura
  newItem(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });
  }
  addItem(): void { this.items.push(this.newItem()); }
  removeItem(index: number): void { 
    if (this.items.length > 1) this.items.removeAt(index); 
  }

  getTotal(): number {
    return this.items.value.reduce((acc: number, item: any) => 
      acc + (item.quantity || 0) * (item.price || 0), 0);
  }
}
```


## Tarea 5: Mostrar errores tras touched/dirty

```typescript
getErrorMessage(controlName: string): string {
  const control = this.contactForm.get(controlName);
  if (!control || !control.errors) return '';

  if (control.errors['required']) return `${this.getFieldName(controlName)} es obligatorio`;
  if (control.errors['minlength']) {
    return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
  }
  if (control.errors['email']) return 'Email inválido';
  if (control.errors['invalidNif']) return 'NIF inválido (formato: 12345678Z)';
  if (control.errors['invalidTelefono']) return 'Teléfono inválido (formato: 6/7XXXXXXXX)';
  if (control.errors['invalidCP']) return 'Código postal inválido (5 dígitos)';

  return '';
}
```

**Template con mensajes condicionados:**

```html
<input formControlName="email" type="email" />
<div *ngIf="email.invalid && email.touched" class="error">
  {{ getErrorMessage('email') }}
</div>

<!-- Errores async con pending -->
<div *ngIf="email.pending" class="loading">Verificando...</div>
<div *ngIf="email.errors?.['emailTaken'] && !email.pending" class="error">
  Email ya registrado
</div>
```


---

# Fase 4: Sistema de Rutas y Navegación

**Criterios**: RA6.g, RA6.h

## Tarea 1: Configuración de rutas

**Implementación en `app.routes.ts`:**

```typescript
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { Contacto } from './pages/contacto/contacto';
import { DemoComponents } from './pages/demo-components/demo-components';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'BROADCAST - Soluciones tecnológicas innovadoras'
  },
  {
    path: 'productos',
    component: Productos,
    title: 'Productos - BROADCAST'
  },
  {
    path: 'contacto',
    component: Contacto,
    title: 'Contacto - BROADCAST'
  },
  {
    path: 'demo',
    component: DemoComponents,
    title: 'Demo Componentes - BROADCAST'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
```

### Estructura de rutas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `Home` | Página principal |
| `/productos` | `Productos` | Listado de productos |
| `/contacto` | `Contacto` | Formulario de contacto |
| `/demo` | `DemoComponents` | Demostración de componentes |
| `/**` | - | Redirección a home (404) |


## Tarea 2: Navegación

### Layout principal con router-outlet

**Implementación en `app.html`:**

```html
<app-header></app-header>

<main>
  <router-outlet></router-outlet>
</main>

<app-footer></app-footer>

<!-- Componentes globales -->
<app-toast></app-toast>
```

### Navegación con routerLink

```html
<!-- En Header -->
<a routerLink="/" class="header__logo">BROADCASTTD</a>

<!-- En Footer -->
<nav class="footer__nav">
  <a routerLink="/about">About</a>
  <a routerLink="/contact">Contact</a>
  <a routerLink="/productos">Productos</a>
</nav>
```


---

# Fase 5: Servicios y Comunicación HTTP

**Criterios**: RA7.a, RA7.b, RA7.c, RA7.d, RA7.e, RA7.f, RA7.g

## Servicio de autenticación (simulado con localStorage)

**Implementación en `auth.service.ts`:**

```typescript
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  public currentUser$: Observable<AuthUser | null> = this.currentUserSubject.asObservable();
  public isAuthenticated = signal<boolean>(false);
  
  private readonly USERS_KEY = 'app_users';
  private readonly CURRENT_USER_KEY = 'current_user';

  constructor() {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);
    if (storedUser) {
      const user = JSON.parse(storedUser) as AuthUser;
      this.currentUserSubject.next(user);
      this.isAuthenticated.set(true);
    }
  }

  register(username: string, email: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    
    if (users.some(u => u.username === username)) {
      return { success: false, message: 'El nombre de usuario ya existe' };
    }
    
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'El email ya está registrado' };
    }

    const newUser: User = {
      id: this.generateId(),
      username,
      email,
      password,
      createdAt: new Date()
    };

    users.push(newUser);
    this.saveUsers(users);

    return { success: true, message: 'Usuario registrado correctamente' };
  }

  login(usernameOrEmail: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    
    const user = users.find(u => 
      (u.username === usernameOrEmail || u.email === usernameOrEmail) && 
      u.password === password
    );

    if (!user) {
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    const authUser: AuthUser = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(authUser));
    this.currentUserSubject.next(authUser);
    this.isAuthenticated.set(true);

    return { success: true, message: `Bienvenido ${user.username}!` };
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);
  }
}
```

## Servicio de validación (simulado)

**Implementación en `validation.service.ts`:**

```typescript
@Injectable({ providedIn: 'root' })
export class ValidationService {
  checkEmailUnique(email: string, currentUserId?: string): Observable<boolean> {
    // Simula llamada API con delay
    return of(email !== 'taken@example.com').pipe(delay(800));
  }

  checkUsernameAvailable(username: string): Observable<boolean> {
    const takenUsernames = ['admin', 'root', 'user', 'test'];
    return of(!takenUsernames.includes(username.toLowerCase())).pipe(delay(500));
  }
}
```


---
