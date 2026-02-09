# 📚 Guía de Preparación para Exámenes - BROADCASTTD

Este documento explica cómo implementar funcionalidades adicionales en cada área del proyecto de cara a los exámenes de **Clientes**, **Diseño** y **Servidor**.

---

## 📋 Índice

1. [Examen de Diseño (Maquetación)](#1-examen-de-diseño-maquetación)
2. [Examen de Servidor (Endpoints/Services)](#2-examen-de-servidor-endpointsservices)
3. [Examen de Clientes (Angular)](#3-examen-de-clientes-angular)

---

## 1. Examen de Diseño (Maquetación)

### 📖 Conceptos Clave

El examen de diseño probablemente se centre en:
- **Maquetación con CSS/SCSS**: Crear layouts con Flexbox y Grid
- **Metodología BEM**: Nomenclatura de clases CSS
- **Variables CSS**: Uso de custom properties
- **Responsive Design**: Media queries y diseño adaptativo
- **Accesibilidad**: ARIA, contraste, focus states

### 🛠️ Cómo Implementar un Componente Nuevo

#### Paso 1: Estructura HTML con BEM

```html
<!-- Bloque principal -->
<article class="card-feature">
  <!-- Elementos del bloque -->
  <div class="card-feature__image-wrapper">
    <img class="card-feature__image" src="..." alt="...">
  </div>
  
  <div class="card-feature__content">
    <h3 class="card-feature__title">Título</h3>
    <p class="card-feature__description">Descripción</p>
  </div>
  
  <!-- Modificadores -->
  <footer class="card-feature__footer card-feature__footer--highlighted">
    <button class="card-feature__button">Acción</button>
  </footer>
</article>
```

#### Paso 2: Estilos SCSS con Variables

```scss
// Importar mixins del proyecto
@import '../../../../styles/01-tools/mixins';

// Bloque base
.card-feature {
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  
  // Elemento
  &__title {
    color: var(--color-text-title);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
  }
  
  // Modificador
  &--highlighted {
    border: 2px solid var(--color-primary);
  }
}
```

#### Paso 3: Responsive Design

```scss
.card-feature {
  // Mobile first
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  
  // Tablet (768px+)
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
  
  // Desktop (1024px+)
  @media (min-width: 1024px) {
    max-width: 800px;
    margin: 0 auto;
  }
}
```

### 📁 Archivos Relevantes del Proyecto

| Archivo | Propósito |
|---------|-----------|
| `src/styles/00-settings/_variables.scss` | Variables CSS globales |
| `src/styles/01-tools/_mixins.scss` | Mixins SCSS reutilizables |
| `src/app/components/shared/card/card.scss` | Ejemplo de componente con BEM |

### ✅ Checklist de Maquetación

- [ ] Usar nomenclatura BEM: `.bloque__elemento--modificador`
- [ ] Usar variables CSS del proyecto: `var(--color-primary)`
- [ ] Incluir estados hover/focus/active
- [ ] Diseño responsive con media queries
- [ ] Accesibilidad: `alt`, `aria-label`, contraste

---

## 2. Examen de Servidor (Endpoints/Services)

### 📖 Conceptos Clave

El examen de servidor probablemente se centre en:
- **Servicios Angular**: Crear services con `@Injectable`
- **HTTP Client**: Llamadas GET, POST, PUT, DELETE
- **Observables RxJS**: Uso de `Observable`, `map`, `catchError`
- **Interfaces/DTOs**: Tipado de datos
- **Signals**: Estado reactivo con `signal()`

### 🛠️ Cómo Implementar un Servicio Nuevo

#### Paso 1: Definir Interfaces

```typescript
// Interfaz del modelo
export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  rating: number;
  genre: string[];
  duration: number; // minutos
  status: 'released' | 'upcoming' | 'production';
}

// DTO para crear
export interface CreateMovieDto {
  title: string;
  director: string;
  year: number;
  genre: string[];
  duration: number;
  status: 'released' | 'upcoming' | 'production';
}

// DTO para actualizar (todos los campos opcionales)
export interface UpdateMovieDto extends Partial<CreateMovieDto> {}

// Respuesta paginada
export interface MovieListResponse {
  items: Movie[];
  total: number;
  page: number;
  pageSize: number;
}
```

#### Paso 2: Crear el Servicio

```typescript
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, delay, map, catchError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);
  
  // Estado de carga con Signals
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  // URL base de la API (en producción)
  private apiUrl = '/api/movies';
  
  // Datos simulados para desarrollo
  private mockMovies: Movie[] = [
    {
      id: '1',
      title: 'Inception',
      director: 'Christopher Nolan',
      year: 2010,
      rating: 4.8,
      genre: ['Sci-Fi', 'Action'],
      duration: 148,
      status: 'released'
    }
  ];

  // GET: Obtener todas las películas
  getAllMovies(): Observable<Movie[]> {
    this.loading.set(true);
    this.error.set(null);

    return of(this.mockMovies).pipe(
      delay(500), // Simular latencia
      map(movies => {
        this.loading.set(false);
        return movies;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Error al cargar películas');
        throw error;
      })
    );
  }

  // GET: Obtener película por ID
  getMovieById(id: string): Observable<Movie> {
    this.loading.set(true);
    
    const movie = this.mockMovies.find(m => m.id === id);
    
    return of(movie).pipe(
      delay(300),
      map(m => {
        this.loading.set(false);
        if (!m) throw new Error('Película no encontrada');
        return m;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Película no encontrada');
        throw error;
      })
    );
  }

  // POST: Crear nueva película
  create(dto: CreateMovieDto): Observable<Movie> {
    this.loading.set(true);

    const newMovie: Movie = {
      id: String(this.mockMovies.length + 1),
      ...dto,
      rating: 0
    };

    return of(newMovie).pipe(
      delay(500),
      map(movie => {
        this.mockMovies.push(movie);
        this.loading.set(false);
        return movie;
      })
    );
  }

  // PUT: Actualizar película
  update(id: string, dto: UpdateMovieDto): Observable<Movie> {
    this.loading.set(true);

    const index = this.mockMovies.findIndex(m => m.id === id);
    
    return of(index).pipe(
      delay(400),
      map(idx => {
        if (idx === -1) {
          this.loading.set(false);
          throw new Error('Película no encontrada');
        }
        this.mockMovies[idx] = { ...this.mockMovies[idx], ...dto };
        this.loading.set(false);
        return this.mockMovies[idx];
      })
    );
  }

  // DELETE: Eliminar película
  delete(id: string): Observable<void> {
    this.loading.set(true);

    const index = this.mockMovies.findIndex(m => m.id === id);

    return of(undefined).pipe(
      delay(400),
      map(() => {
        if (index !== -1) {
          this.mockMovies.splice(index, 1);
        }
        this.loading.set(false);
      })
    );
  }

  // GET: Obtener con filtros y paginación
  getMoviesFiltered(
    page: number = 1, 
    pageSize: number = 10, 
    search?: string, 
    genre?: string
  ): Observable<MovieListResponse> {
    this.loading.set(true);
    
    let filtered = [...this.mockMovies];

    // Filtro de búsqueda
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(searchLower) ||
        m.director.toLowerCase().includes(searchLower)
      );
    }

    // Filtro por género
    if (genre) {
      filtered = filtered.filter(m => m.genre.includes(genre));
    }

    // Paginación
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return of({
      items,
      total: filtered.length,
      page,
      pageSize
    }).pipe(
      delay(400),
      map(response => {
        this.loading.set(false);
        return response;
      })
    );
  }
}
```

### 📁 Archivos Relevantes del Proyecto

| Archivo | Propósito |
|---------|-----------|
| `src/app/services/series.service.ts` | Ejemplo completo de servicio CRUD |
| `src/app/services/auth.service.ts` | Servicio de autenticación |
| `src/app/core/services/api.service.ts` | Servicio base para API |

### ✅ Checklist de Servicios

- [ ] Decorador `@Injectable({ providedIn: 'root' })`
- [ ] Inyección con `inject()` en lugar de constructor
- [ ] Signals para estado: `loading`, `error`
- [ ] Interfaces bien tipadas
- [ ] Métodos CRUD: `getAll`, `getById`, `create`, `update`, `delete`
- [ ] Manejo de errores con `catchError`

---

## 3. Examen de Clientes (Angular)

### 📖 Conceptos Clave

El examen de clientes probablemente se centre en:
- **Componentes**: Crear componentes standalone
- **Inputs/Outputs**: Comunicación padre-hijo
- **Formularios reactivos**: `FormGroup`, `FormControl`, validaciones
- **Routing**: Rutas, parámetros, guards, resolvers
- **Directivas**: `*ngIf`, `*ngFor`, `@if`, `@for`

### 🛠️ Cómo Implementar un Componente Angular

#### Paso 1: Estructura del Componente

```typescript
import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard {
  // Inputs
  @Input({ required: true }) movie!: Movie;
  @Input() showRating = true;
  @Input() variant: 'default' | 'compact' | 'featured' = 'default';
  
  // Outputs
  @Output() onFavorite = new EventEmitter<string>();
  @Output() onRate = new EventEmitter<{ movieId: string; rating: number }>();
  
  // Estado interno con Signals
  isFavorite = signal(false);
  
  // Métodos
  toggleFavorite(): void {
    this.isFavorite.update(v => !v);
    this.onFavorite.emit(this.movie.id);
  }
  
  rateMovie(rating: number): void {
    this.onRate.emit({ movieId: this.movie.id, rating });
  }
  
  // Computed property para clases CSS
  get cardClasses(): string {
    return `movie-card movie-card--${this.variant}`;
  }
}
```

#### Paso 2: Template con Control Flow

```html
<article [class]="cardClasses">
  <!-- Imagen -->
  <div class="movie-card__image-wrapper">
    @if (movie.posterUrl) {
      <img [src]="movie.posterUrl" [alt]="movie.title" class="movie-card__image">
    } @else {
      <div class="movie-card__placeholder">Sin imagen</div>
    }
  </div>
  
  <!-- Contenido -->
  <div class="movie-card__content">
    <h3 class="movie-card__title">{{ movie.title }}</h3>
    <p class="movie-card__director">{{ movie.director }} ({{ movie.year }})</p>
    
    <!-- Géneros -->
    @if (movie.genre.length > 0) {
      <ul class="movie-card__genres">
        @for (genre of movie.genre; track genre) {
          <li class="movie-card__genre">{{ genre }}</li>
        }
      </ul>
    }
    
    <!-- Rating condicional -->
    @if (showRating && movie.rating > 0) {
      <div class="movie-card__rating">
        <span class="movie-card__stars">⭐ {{ movie.rating }}/5</span>
      </div>
    }
  </div>
  
  <!-- Acciones -->
  <footer class="movie-card__actions">
    <button 
      (click)="toggleFavorite()" 
      [class.active]="isFavorite()"
      aria-label="Añadir a favoritos">
      ❤️
    </button>
    <a [routerLink]="['/movies', movie.id]" class="movie-card__link">
      Ver detalles
    </a>
  </footer>
</article>
```

#### Paso 3: Formulario Reactivo

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './movie-form.html'
})
export class MovieForm {
  private fb = inject(FormBuilder);
  private movieService = inject(MovieService);
  
  movieForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    director: ['', [Validators.required]],
    year: ['', [Validators.required, Validators.min(1900), Validators.max(2030)]],
    duration: ['', [Validators.required, Validators.min(1)]],
    genre: [[], [Validators.required]],
    status: ['released', [Validators.required]]
  });
  
  // Getters para acceder a los controles
  get title() { return this.movieForm.get('title'); }
  get director() { return this.movieForm.get('director'); }
  get year() { return this.movieForm.get('year'); }
  
  onSubmit(): void {
    if (this.movieForm.valid) {
      this.movieService.create(this.movieForm.value).subscribe({
        next: (movie) => console.log('Película creada:', movie),
        error: (err) => console.error('Error:', err)
      });
    } else {
      this.movieForm.markAllAsTouched();
    }
  }
}
```

#### Paso 4: Configurar Ruta

```typescript
// app.routes.ts
{
  path: 'movies',
  children: [
    {
      path: '',
      loadComponent: () => import('./pages/movies/movies').then(m => m.Movies),
      title: 'Películas - BROADCAST',
      data: { breadcrumb: 'Movies' }
    },
    {
      path: ':id',
      loadComponent: () => import('./pages/movie-detail/movie-detail').then(m => m.MovieDetail),
      title: 'Detalle - BROADCAST',
      data: { breadcrumb: 'Detail' },
      resolve: { movie: movieResolver }
    }
  ]
}
```

### 📁 Archivos Relevantes del Proyecto

| Archivo | Propósito |
|---------|-----------|
| `src/app/components/shared/card/card.ts` | Componente con Inputs/Outputs |
| `src/app/app.routes.ts` | Configuración de rutas |
| `src/app/components/shared/contact-form-reactive/` | Formulario reactivo |

### ✅ Checklist de Componentes Angular

- [ ] Componente standalone con `standalone: true`
- [ ] Imports necesarios: `CommonModule`, `RouterLink`, etc.
- [ ] `@Input()` para datos de entrada
- [ ] `@Output()` con `EventEmitter` para eventos
- [ ] Signals para estado interno
- [ ] Control flow moderno: `@if`, `@for`, `@switch`
- [ ] Formularios reactivos con validaciones

---

## 🎯 Resumen de Patrones del Proyecto

### Estructura de Carpetas

```
src/app/
├── components/
│   ├── layout/          # Header, Footer
│   ├── sections/        # Secciones de página
│   └── shared/          # Componentes reutilizables
├── core/
│   ├── guards/          # Auth guards
│   ├── interceptors/    # HTTP interceptors
│   ├── resolvers/       # Route resolvers
│   └── services/        # Servicios core
├── pages/               # Páginas/vistas
└── services/            # Servicios de dominio
```

### Convenciones de Nomenclatura

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componente | PascalCase | `MovieCard` |
| Servicio | camelCase + Service | `movieService` |
| Interfaz | PascalCase | `Movie`, `CreateMovieDto` |
| Archivo | kebab-case | `movie-card.ts` |
| Clase CSS | BEM | `.movie-card__title--highlighted` |
| Variable CSS | kebab-case | `--color-primary` |

---

## 📝 Consejos para el Examen

1. **Lee bien el enunciado** antes de empezar
2. **Sigue los patrones del proyecto** existente
3. **Usa TypeScript** correctamente (interfaces, tipos)
4. **No olvides la accesibilidad** (alt, aria-labels)
5. **Prueba tu código** antes de entregar
6. **Comenta el código** cuando sea necesario

¡Buena suerte! 🍀
