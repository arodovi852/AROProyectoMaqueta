# 📝 Ejercicios de Práctica para Exámenes - BROADCASTTD

Este documento contiene ejercicios de práctica para los exámenes de **Diseño**, **Servidor** y **Clientes**. Las soluciones se encuentran en el documento `SOLUCIONES_EJERCICIOS.md`.

---

## 📋 Índice

1. [Ejercicios de Diseño (Maquetación)](#ejercicios-de-diseño-maquetación)
2. [Ejercicios de Servidor (Services)](#ejercicios-de-servidor-services)
3. [Ejercicios de Clientes (Angular)](#ejercicios-de-clientes-angular)

---

# Ejercicios de Diseño (Maquetación)

## Ejercicio D1: Tarjeta de Película Horizontal

**Dificultad:** ⭐⭐ Media

**Descripción:**
Crea una tarjeta horizontal para mostrar información de una película. La tarjeta debe tener:

- Una imagen a la izquierda (150px de ancho)
- Contenido a la derecha con título, director, año y sinopsis
- Un footer con botones de acción
- Debe ser responsive: en móvil (<768px) debe ser vertical

**Requisitos:**
1. Usar metodología BEM
2. Usar variables CSS del proyecto (`var(--color-primary)`, etc.)
3. Incluir estados hover
4. Incluir transiciones suaves
5. Accesibilidad: focus visible

**HTML proporcionado:**
```html
<article class="movie-card-horizontal">
  <div class="???">
    <img src="/assets/movie.jpg" alt="Película Example" class="???">
  </div>
  <div class="???">
    <h3 class="???">Inception</h3>
    <p class="???">Director: Christopher Nolan</p>
    <p class="???">Año: 2010</p>
    <p class="???">Un ladrón que roba secretos corporativos...</p>
  </div>
  <footer class="???">
    <button class="???">Ver más</button>
    <button class="???">Favorito</button>
  </footer>
</article>
```

**Entregable:** 
- Completa las clases BEM del HTML
- Crea el archivo SCSS con los estilos

//HTML
<article class="movie-card-horizontal">
  <div class="movie-card-horizontal__image-wrapper">
    <img src="/assets/movie.jpg" alt="Película Example" class="movie-card-horizontal__image">
  </div>
  <div class="movie-card-horizontal__instance">
    <h3 class="movie-card-horizontal__title">Inception</h3>
    <p class="movie-card-horizontal__director">Director: Christopher Nolan</p>
    <p class="movie-card-horizontal__year">Año: 2010</p>
    <p class="movie-card-horizontal__desc">Un ladrón que roba secretos corporativos...</p>
  </div>
  <footer class="movie-card-horizontal__footer">
    <button class="movie-card-horizontal__button movie-card-horizontal__button--primary">Ver más</button>
    <button class="movie-card-horizontal__button movie-card-horizontal__button--secondary">Favorito</button>
  </footer>
</article>

```scss
//SCSS
@import '../../../../styles/01-tools/mixins';


.movie-card-horizontal{
  background-color: --var(--color-background-lg);
  border-radius: --var(--radius-lg);
  padding: --var(--spacing);

  &__instance {
    
  }

}



```

---

## Ejercicio D2: Grid de Estadísticas

**Dificultad:** ⭐⭐ Media

**Descripción:**
Crea un grid de 4 tarjetas de estadísticas que muestre métricas de la aplicación.

**Diseño esperado:**
```
┌─────────────┬─────────────┐
│  📺 150     │  ⭐ 4.5     │
│  Series     │  Rating     │
├─────────────┼─────────────┤
│  👥 1.2K    │  📝 500     │
│  Usuarios   │  Reviews    │
├─────────────┴─────────────┤
```

**Requisitos:**
1. Grid de 2x2 en desktop, 1 columna en móvil
2. Cada card debe tener: icono, número grande, label
3. Hover con elevación (box-shadow)
4. Colores diferentes para cada tipo de stat
5. Gap de 1rem entre cards

**Entregable:**
- HTML completo con BEM
- SCSS con Grid layout

---

## Ejercicio D3: Navegación con Dropdown

**Dificultad:** ⭐⭐⭐ Alta

**Descripción:**
Crea un componente de navegación que incluya un dropdown para categorías.

**Estructura:**
```
┌──────────────────────────────────────────────────────┐
│ LOGO    │ Home │ Series ▼ │ Películas │ Mi Lista    │
│         │      │ ┌────────────┐                      │
│         │      │ │ Acción     │                      │
│         │      │ │ Comedia    │                      │
│         │      │ │ Drama      │                      │
│         │      │ │ Terror     │                      │
│         │      │ └────────────┘                      │
└──────────────────────────────────────────────────────┘
```

**Requisitos:**
1. Dropdown aparece en hover
2. Transición suave de apertura
3. Accesible con teclado (focus)
4. Hamburger menu en móvil (<768px)
5. Usar variables CSS del proyecto

**Entregable:**
- HTML semántico con BEM
- SCSS completo con responsive

---

## Ejercicio D4: Formulario de Contacto Estilizado

**Dificultad:** ⭐⭐ Media

**Descripción:**
Estiliza un formulario de contacto siguiendo el diseño del proyecto.

**Campos:**
- Nombre (input text)
- Email (input email)
- Asunto (select con opciones)
- Mensaje (textarea)
- Checkbox de términos
- Botón de enviar

**Requisitos:**
1. Labels flotantes (animación al focus)
2. Validación visual (borde rojo/verde)
3. Estados: normal, focus, error, success
4. Botón con hover y disabled states
5. Responsive

**Entregable:**
- HTML del formulario con BEM
- SCSS con todos los estados

---

## Ejercicio D5: Componente de Rating con Estrellas

**Dificultad:** ⭐⭐⭐ Alta

**Descripción:**
Crea el CSS para un componente de rating con estrellas que permite:
- Mostrar rating actual (estrellas llenas/vacías)
- Hover preview (al pasar el mouse se ilumina hasta esa estrella)
- Click para seleccionar rating

**Estados de estrella:**
- Vacía: `color: var(--color-neutral-400)`
- Llena: `color: var(--color-warning)` (amarillo)
- Hover: `color: var(--color-warning-light)`

**HTML proporcionado:**
```html
<div class="star-rating" role="group" aria-label="Rating">
  <button class="star-rating__star" data-value="1" aria-label="1 estrella">★</button>
  <button class="star-rating__star" data-value="2" aria-label="2 estrellas">★</button>
  <button class="star-rating__star" data-value="3" aria-label="3 estrellas">★</button>
  <button class="star-rating__star" data-value="4" aria-label="4 estrellas">★</button>
  <button class="star-rating__star" data-value="5" aria-label="5 estrellas">★</button>
</div>
```

**Requisitos:**
1. Tamaño de estrella: 2rem
2. Transición suave de color
3. Efecto de escala en hover (1.2)
4. Cursor pointer
5. Focus visible para accesibilidad

**Entregable:**
- SCSS completo con todos los estados

---

# Ejercicios de Servidor (Services)

## Ejercicio S1: Servicio de Películas Básico

**Dificultad:** ⭐⭐ Media

**Descripción:**
Crea un servicio `MovieService` que implemente operaciones CRUD básicas para películas.

**Interfaz Movie:**
```typescript
interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  rating: number;
  genre: string[];
  duration: number; // en minutos
  status: 'released' | 'upcoming' | 'production';
}
```

**Métodos a implementar:**
1. `getAllMovies()`: Devuelve todas las películas
2. `getMovieById(id: string)`: Devuelve una película por ID
3. `create(movie: CreateMovieDto)`: Crea una nueva película
4. `update(id: string, movie: UpdateMovieDto)`: Actualiza una película
5. `delete(id: string)`: Elimina una película

**Requisitos:**
- Usar `signal()` para estado de carga y error
- Simular delay con `delay()` de RxJS
- Manejar errores con `catchError`
- Al menos 3 películas mock

**Entregable:**
- Archivo `movie.service.ts` completo

---

## Ejercicio S2: Servicio con Filtros y Paginación

**Dificultad:** ⭐⭐⭐ Alta

**Descripción:**
Extiende el servicio de películas para incluir filtrado y paginación.

**Método a implementar:**
```typescript
getMoviesFiltered(
  page: number,
  pageSize: number,
  filters: {
    search?: string;
    genre?: string;
    yearFrom?: number;
    yearTo?: number;
    minRating?: number;
    status?: 'released' | 'upcoming' | 'production';
  }
): Observable<PaginatedResponse<Movie>>
```

**Interfaz de respuesta:**
```typescript
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

**Requisitos:**
- Todos los filtros son opcionales
- Búsqueda por título y director
- Paginación correcta
- Calcular `totalPages`

**Entregable:**
- Método completo con toda la lógica de filtrado

---

## Ejercicio S3: Servicio de Favoritos

**Dificultad:** ⭐⭐ Media

**Descripción:**
Crea un servicio `FavoriteService` para gestionar la lista de favoritos del usuario.

**Funcionalidades:**
1. Añadir serie/película a favoritos
2. Eliminar de favoritos
3. Verificar si un item está en favoritos
4. Obtener todos los favoritos
5. Persistir en localStorage

**Interfaz:**
```typescript
interface FavoriteItem {
  id: string;
  type: 'movie' | 'series';
  addedAt: Date;
}
```

**Requisitos:**
- Usar signals para el estado
- Persistir en localStorage
- Emitir eventos cuando cambie la lista
- Método `toggleFavorite` que añade/elimina

**Entregable:**
- Archivo `favorite.service.ts` completo

---

## Ejercicio S4: Servicio de Reviews

**Dificultad:** ⭐⭐⭐ Alta

**Descripción:**
Crea un servicio para gestionar las reviews de series/películas.

**Interfaz:**
```typescript
interface Review {
  id: string;
  userId: string;
  itemId: string; // ID de la serie/película
  itemType: 'movie' | 'series';
  rating: number; // 1-5
  title: string;
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt?: Date;
}

interface CreateReviewDto {
  itemId: string;
  itemType: 'movie' | 'series';
  rating: number;
  title: string;
  content: string;
}
```

**Métodos:**
1. `getReviewsByItem(itemId: string)`: Reviews de una serie/película
2. `getReviewsByUser(userId: string)`: Reviews de un usuario
3. `createReview(dto: CreateReviewDto)`: Crear review
4. `updateReview(id: string, dto: UpdateReviewDto)`: Actualizar
5. `deleteReview(id: string)`: Eliminar
6. `likeReview(id: string)`: Dar like a una review
7. `getAverageRating(itemId: string)`: Calcular rating promedio

**Requisitos:**
- Validar que rating esté entre 1 y 5
- No permitir más de una review por usuario/item
- Ordenar reviews por fecha (más reciente primero)

**Entregable:**
- Archivo `review.service.ts` completo

---

## Ejercicio S5: Servicio de Búsqueda Global

**Dificultad:** ⭐⭐⭐ Alta

**Descripción:**
Crea un servicio que busque en múltiples fuentes (series, películas, usuarios).

**Método principal:**
```typescript
globalSearch(query: string): Observable<SearchResults>
```

**Interfaz de resultados:**
```typescript
interface SearchResults {
  series: SeriesSearchResult[];
  movies: MovieSearchResult[];
  users: UserSearchResult[];
  totalResults: number;
}

interface SeriesSearchResult {
  id: string;
  title: string;
  year: number;
  matchType: 'title' | 'description' | 'genre';
}
```

**Requisitos:**
- Usar `forkJoin` para buscar en paralelo
- Limitar resultados a 5 por categoría
- Indicar dónde se encontró el match
- Ordenar por relevancia

**Entregable:**
- Archivo `search.service.ts` completo

---

# Ejercicios de Clientes (Angular)

## Ejercicio C1: Componente de Tarjeta de Película

**Dificultad:** ⭐⭐ Media

**Descripción:**
Crea un componente `MovieCard` que muestre información de una película.

**Inputs:**
- `movie: Movie` (requerido)
- `showRating: boolean` (default: true)
- `variant: 'default' | 'compact' | 'featured'` (default: 'default')

**Outputs:**
- `onFavorite: EventEmitter<string>` (emite el ID)
- `onRate: EventEmitter<{movieId: string, rating: number}>`

**Template debe incluir:**
- Imagen de la película
- Título y año
- Director
- Lista de géneros con `@for`
- Rating condicional con `@if`
- Botón de favoritos

**Requisitos:**
- Componente standalone
- Usar control flow moderno (@if, @for)
- Signal interno para estado de favorito
- Método `toggleFavorite()`

**Entregable:**
- `movie-card.ts` con la lógica
- `movie-card.html` con el template

---

## Ejercicio C2: Formulario de Búsqueda Reactivo

**Dificultad:** ⭐⭐ Media

**Descripción:**
Crea un componente de búsqueda con formulario reactivo.

**Campos del formulario:**
- `query`: string (requerido, mínimo 3 caracteres)
- `type`: 'all' | 'series' | 'movies' | 'users'
- `yearFrom`: number (opcional, min 1900)
- `yearTo`: number (opcional, max 2030)
- `genre`: string (opcional)

**Funcionalidades:**
1. Búsqueda en tiempo real (debounce 300ms)
2. Validación de campos
3. Mostrar errores de validación
4. Botón de limpiar filtros
5. Emitir evento con los filtros al cambiar

**Requisitos:**
- Usar `FormBuilder`
- Validadores síncronos
- `debounceTime` en el valueChanges
- Output para emitir cambios

**Entregable:**
- `search-form.ts` completo
- `search-form.html` con validaciones visibles

---

## Ejercicio C3: Lista con Paginación

**Dificultad:** ⭐⭐⭐ Alta

**Descripción:**
Crea un componente que muestre una lista paginada de series.

**Funcionalidades:**
1. Mostrar lista de series en grid
2. Paginación con números de página
3. Selector de items por página (10, 20, 50)
4. Indicador de página actual
5. Botones Anterior/Siguiente
6. Loading state mientras carga

**Inputs:**
- `pageSize: number` (default: 10)

**Integración:**
- Inyectar `SeriesService`
- Llamar a `getSeriesFiltered(page, pageSize)`
- Mostrar spinner mientras `loading()` sea true

**Requisitos:**
- Computed para calcular total de páginas
- Método `goToPage(page: number)`
- Deshabilitar botones cuando corresponda
- Mostrar "Mostrando X-Y de Z resultados"

**Entregable:**
- `series-list.ts` con toda la lógica
- `series-list.html` con la UI

---

## Ejercicio C4: Modal de Confirmación Reutilizable

**Dificultad:** ⭐⭐ Media

**Descripción:**
Crea un componente modal reutilizable para confirmaciones.

**Inputs:**
- `title: string`
- `message: string`
- `confirmText: string` (default: 'Confirmar')
- `cancelText: string` (default: 'Cancelar')
- `type: 'info' | 'warning' | 'danger'` (default: 'info')
- `isOpen: boolean`

**Outputs:**
- `onConfirm: EventEmitter<void>`
- `onCancel: EventEmitter<void>`
- `onClose: EventEmitter<void>`

**Funcionalidades:**
1. Overlay oscuro de fondo
2. Centrado en pantalla
3. Cerrar con ESC o click en overlay
4. Animación de entrada/salida
5. Iconos diferentes según `type`

**Requisitos:**
- Accesible (focus trap, aria)
- `@HostListener` para tecla ESC
- Prevenir scroll del body cuando está abierto

**Entregable:**
- `confirm-modal.ts`
- `confirm-modal.html`
- `confirm-modal.scss`

---

## Ejercicio C5: Página de Detalle con Resolver

**Dificultad:** ⭐⭐⭐ Alta

**Descripción:**
Crea una página de detalle de película que use un resolver para cargar datos.

**Componentes a crear:**

1. **MovieDetail** (página)
   - Muestra toda la información de la película
   - Reviews de la película
   - Películas relacionadas

2. **MovieResolver** (resolver)
   - Carga la película antes de navegar
   - Maneja error 404

**Ruta a configurar:**
```typescript
{
  path: 'movies/:id',
  component: MovieDetail,
  resolve: { movie: movieResolver },
  title: 'Detalle de Película'
}
```

**Datos a mostrar:**
- Poster grande
- Título, director, año
- Sinopsis completa
- Géneros
- Duración
- Rating con estrellas
- Lista de reviews
- Carousel de películas relacionadas

**Requisitos:**
- Usar `ActivatedRoute` para obtener datos del resolver
- Manejar caso de película no encontrada
- Breadcrumbs actualizados
- SEO: título dinámico

**Entregable:**
- `movie-detail.ts` y `movie-detail.html`
- `movie.resolver.ts`
- Configuración de ruta

---

## Ejercicio C6: Comunicación entre Componentes

**Dificultad:** ⭐⭐⭐ Alta

**Descripción:**
Crea un sistema de filtros donde varios componentes se comunican.

**Componentes:**
1. **FilterPanel** - Panel lateral con filtros
2. **MovieGrid** - Grid de películas filtradas
3. **ActiveFilters** - Chips con filtros activos

**Comunicación:**
- FilterPanel emite cambios de filtros
- MovieGrid recibe filtros y muestra resultados
- ActiveFilters muestra filtros activos y permite eliminarlos

**Usar:**
- Service con BehaviorSubject para estado compartido
- Signals para estado local
- Input/Output para comunicación directa

**Entregable:**
- Los 3 componentes
- `filter.service.ts` con el estado compartido
- Página contenedora que los integre

---

# 📊 Tabla de Dificultad

| Ejercicio | Área | Dificultad | Tiempo Est. |
|-----------|------|------------|-------------|
| D1 | Diseño | ⭐⭐ | 30 min |
| D2 | Diseño | ⭐⭐ | 25 min |
| D3 | Diseño | ⭐⭐⭐ | 45 min |
| D4 | Diseño | ⭐⭐ | 35 min |
| D5 | Diseño | ⭐⭐⭐ | 30 min |
| S1 | Servidor | ⭐⭐ | 40 min |
| S2 | Servidor | ⭐⭐⭐ | 45 min |
| S3 | Servidor | ⭐⭐ | 35 min |
| S4 | Servidor | ⭐⭐⭐ | 50 min |
| S5 | Servidor | ⭐⭐⭐ | 45 min |
| C1 | Clientes | ⭐⭐ | 40 min |
| C2 | Clientes | ⭐⭐ | 45 min |
| C3 | Clientes | ⭐⭐⭐ | 60 min |
| C4 | Clientes | ⭐⭐ | 45 min |
| C5 | Clientes | ⭐⭐⭐ | 60 min |
| C6 | Clientes | ⭐⭐⭐ | 75 min |

---

**📌 Nota:** Las soluciones a estos ejercicios se encuentran en el archivo `SOLUCIONES_EJERCICIOS.md`

¡Buena suerte con la práctica! 🍀
