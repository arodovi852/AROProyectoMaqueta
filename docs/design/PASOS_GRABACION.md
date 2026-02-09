# PASOS TÉCNICOS PARA LA GRABACIÓN
## Cómo llegar a cada sección durante el vídeo

---

## PREPARACIÓN PREVIA

### Antes de grabar:
1. **Abrir VS Code** con el proyecto `AROProyectoMaqueta`
2. **Ejecutar la aplicación**: `npm start` en terminal
3. **Abrir Chrome/Firefox** en `http://localhost:4200`
4. **Preparar pestañas de archivos** en VS Code (ver lista abajo)
5. **Probar el cambio de tema** para asegurar que funciona
6. **Limpiar caché del navegador** si es necesario

### Pestañas a tener abiertas en VS Code:
- `src/styles.scss`
- `src/styles/00-settings/_variables.scss`
- `src/styles/01-tools/_mixins.scss`
- `src/app/components/layout/header/header.scss`
- `src/app/pages/main/main.scss`
- `src/app/components/shared/responsive-banner/responsive-banner.ts`

---

## 1. FLUJO MVP (0:00 - 0:45)

### Pasos en el navegador:

1. **Abrir DevTools:**
   - Presionar `F12` o `Ctrl+Shift+I`
   - Asegurarse de que la consola está visible

2. **Mostrar la página principal:**
   - URL: `http://localhost:4200`
   - Está en la ruta `/main`

3. **Señalar componentes visibles:**
   - **Header:** parte superior fija
   - **ThemeToggle:** botón de sol/luna en el header
   - **Buttons:** "Lists" (ghost), botones del hero (secondary)
   - **Hero:** sección con carrusel de imágenes
   - **Cards:** en las secciones "Popular this week" y "Future releases"

4. **Navegar a una serie:**
   - Hacer clic en cualquier card de serie
   - Se abre la página `/series-info/:id`

5. **Demostrar cambio de tema:**
   - Clic en el ThemeToggle (icono sol/luna)
   - Mostrar cómo cambian los colores

---

## 2. ARQUITECTURA SASS - ITCSS (0:45 - 1:45)

### Pasos para mostrar la estructura ITCSS:

1. **Abrir archivo `styles.scss`:**
   - Ruta: `src/styles.scss`
   - Atajo: `Ctrl+P` → escribir `styles.scss`

2. **Mostrar los imports en orden:**
   ```
   Líneas 21-52:
   - @import 'styles/00-settings/variables'
   - @import 'styles/01-tools/mixins'
   - @import 'styles/02-generic/reset'
   - @import 'styles/03-elements/base'
   - @import 'styles/04-objects/layout'
   - @import 'styles/05-components/buttons' (y otros)
   - @import 'styles/06-utilities/helpers'
   ```

3. **Leer los comentarios** que explican cada capa

### Pasos para mostrar el Mixin:

1. **Abrir archivo `_mixins.scss`:**
   - Ruta: `src/styles/01-tools/_mixins.scss`
   - Atajo: `Ctrl+P` → escribir `mixins`

2. **Localizar el mixin `responsive`:**
   - Líneas 8-18
   - Mostrar la lógica del `@if map.has-key`

3. **Mostrar dónde se invoca:**
   - Abrir `src/app/pages/main/main.scss`
   - Buscar `@include responsive` (Ctrl+F)
   - Ejemplo en línea ~326: `@include responsive('md')`

---

## 3. BEM (1:45 - 2:45)

### Pasos para mostrar el componente Header:

1. **Abrir archivo `header.scss`:**
   - Ruta: `src/app/components/layout/header/header.scss`
   - Atajo: `Ctrl+P` → escribir `header.scss`

2. **Localizar ejemplos de BEM:**

   **Bloque (línea ~14):**
   ```scss
   .header { ... }
   ```

   **Elementos (líneas ~26, ~37, ~47, ~123, ~205):**
   ```scss
   .header__container
   .header__brand
   .header__logo
   .header__actions
   .header__search
   .header__search-input
   ```

   **Modificadores (líneas ~279, ~307-350):**
   ```scss
   .header__toggle--active
   .header__mobile-btn--login
   .header__mobile-btn--logout
   .header__mobile-btn--lists
   ```

3. **Mostrar que NO hay anidamiento profundo:**
   - Hacer scroll por el archivo
   - Notar que cada selector está al nivel raíz o con un solo nivel de anidamiento para pseudo-clases (`:hover`, `&:focus-visible`)

---

## 4. LÓGICA CSS (2:45 - 4:00)

### 4.1 Temas - Variables CSS

1. **Abrir archivo `_variables.scss`:**
   - Ruta: `src/styles/00-settings/_variables.scss`
   - Atajo: `Ctrl+P` → escribir `variables`

2. **Mostrar modo claro (`:root`):**
   - Líneas 1-180 aproximadamente
   - Ejemplos a mencionar:
     - `--color-primary` (línea 6)
     - `--color-bg-main` (línea 75)
     - `--color-btn-primary-bg` (línea 113)

3. **Mostrar modo oscuro (`.dark-mode`):**
   - Líneas 365-485 aproximadamente
   - Buscar: `Ctrl+F` → `.dark-mode`
   - Mostrar cómo se redefinen las mismas variables

### 4.2 Container Queries

1. **Abrir archivo `main.scss`:**
   - Ruta: `src/app/pages/main/main.scss`
   - Atajo: `Ctrl+P` → escribir `main.scss`

2. **Localizar Container Queries:**

   **Definición del contenedor (línea ~314):**
   ```scss
   .series-section {
     container-type: inline-size;
     container-name: series-section;
   }
   ```

   **Container Queries (líneas 430-455):**
   ```scss
   @container series-section (max-width: 400px) { ... }
   @container series-section (min-width: 401px) and (max-width: 600px) { ... }
   @container series-section (min-width: 601px) and (max-width: 900px) { ... }
   @container series-section (min-width: 901px) { ... }
   ```

3. **Opcional - Demostrar en navegador:**
   - Usar DevTools para redimensionar solo el contenedor
   - Ver cómo cambia el número de columnas

---

## 5. OPTIMIZACIÓN DE IMÁGENES (4:00 - 4:45)

### Pasos en el navegador:

1. **Abrir DevTools (F12)**

2. **Ir a pestaña Network:**
   - Clic en "Network" en las pestañas de DevTools

3. **Filtrar por imágenes:**
   - Clic en "Img" en los filtros
   - O escribir en el filtro: `larger-than:0`

4. **Refrescar la página:**
   - `Ctrl+R` o `F5`
   - Ver las imágenes que se cargan

5. **Inspeccionar una imagen:**
   - Clic derecho sobre una imagen de card → "Inspect"
   - Ver el elemento `<picture>` con sus `<source>`

### Pasos para mostrar el código (opcional):

1. **Abrir archivo `responsive-banner.ts`:**
   - Ruta: `src/app/components/shared/responsive-banner/responsive-banner.ts`

2. **Mostrar el template (líneas 26-50):**
   ```html
   <picture class="responsive-banner">
     <source type="image/webp" [srcset]="getWebPSrcset()" sizes="100vw">
     <source [type]="getOriginalType()" [srcset]="getOriginalSrcset()" sizes="100vw">
     <img [src]="getLargeSrc()" ...>
   </picture>
   ```

3. **Mostrar los métodos (líneas 95-125):**
   - `getWebPSrcset()`: genera srcset para WebP
   - `getOriginalSrcset()`: genera srcset para formato original

### Mostrar carpeta de imágenes optimizadas:

1. **En VS Code, expandir:**
   - `assets/optimized/`
   - Mostrar los archivos con sufijos: `-small`, `-medium`, `-large`, `-xlarge`
   - Mostrar versiones `.webp` y `.jpg`

---

## CHECKLIST FINAL ANTES DE GRABAR

- [ ] Aplicación corriendo en `localhost:4200`
- [ ] DevTools cerrados inicialmente (los abrirás al empezar)
- [ ] VS Code con las pestañas preparadas
- [ ] Tema en modo claro (para mostrar el cambio)
- [ ] Micrófono probado y funcionando
- [ ] Grabador de pantalla configurado
- [ ] Guión impreso o en segunda pantalla

---

## ATAJOS ÚTILES DURANTE LA GRABACIÓN

| Acción | Atajo |
|--------|-------|
| Abrir DevTools | `F12` |
| Buscar archivo en VS Code | `Ctrl+P` |
| Buscar texto en archivo | `Ctrl+F` |
| Ir a línea específica | `Ctrl+G` |
| Cambiar entre pestañas VS Code | `Ctrl+Tab` |
| Refrescar navegador | `F5` o `Ctrl+R` |
