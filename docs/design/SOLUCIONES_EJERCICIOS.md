# ✅ Soluciones a los Ejercicios de Práctica - BROADCASTTD

Este documento contiene las soluciones a los ejercicios del archivo `EJERCICIOS_EXAMENES.md`.

---

## 📋 Índice

1. [Soluciones de Diseño](#soluciones-de-diseño)
2. [Soluciones de Servidor](#soluciones-de-servidor)
3. [Soluciones de Clientes](#soluciones-de-clientes)

---

# Soluciones de Diseño

## Solución D1: Tarjeta de Película Horizontal

### HTML Completo con BEM

```html
<article class="movie-card-horizontal">
  <div class="movie-card-horizontal__image-wrapper">
    <img 
      src="/assets/movie.jpg" 
      alt="Película Inception" 
      class="movie-card-horizontal__image"
    >
  </div>
  <div class="movie-card-horizontal__content">
    <h3 class="movie-card-horizontal__title">Inception</h3>
    <p class="movie-card-horizontal__director">Director: Christopher Nolan</p>
    <p class="movie-card-horizontal__year">Año: 2010</p>
    <p class="movie-card-horizontal__synopsis">Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños...</p>
  </div>
  <footer class="movie-card-horizontal__footer">
    <button class="movie-card-horizontal__button movie-card-horizontal__button--primary">Ver más</button>
    <button class="movie-card-horizontal__button movie-card-horizontal__button--secondary">Favorito</button>
  </footer>
</article>
```

### SCSS Completo

```scss
// ==========================================================================
// COMPONENTE: MOVIE CARD HORIZONTAL
// ==========================================================================
@import '../../../../styles/01-tools/mixins';

.movie-card-horizontal {
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
  }

  &:focus-within {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  // Responsive: horizontal en tablet+
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: stretch;
  }

  // ==========================================
  // ELEMENTO: Image Wrapper
  // ==========================================
  &__image-wrapper {
    flex-shrink: 0;
    width: 100%;
    height: 200px;
    overflow: hidden;
    background-color: var(--color-neutral-200);

    @media (min-width: 768px) {
      width: 150px;
      height: auto;
      min-height: 180px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    .movie-card-horizontal:hover & {
      transform: scale(1.05);
    }
  }

  // ==========================================
  // ELEMENTO: Content
  // ==========================================
  &__content {
    flex: 1;
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__title {
    margin: 0;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-title);
    line-height: 1.2;
  }

  &__director,
  &__year {
    margin: 0;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  &__synopsis {
    margin: var(--spacing-xs) 0 0;
    font-size: var(--font-size-base);
    color: var(--color-text-body);
    line-height: 1.5;
    
    // Limitar a 3 líneas
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  // ==========================================
  // ELEMENTO: Footer
  // ==========================================
  &__footer {
    display: flex;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    border-top: 1px solid var(--color-neutral-200);
    background-color: var(--color-bg-secondary);

    @media (min-width: 768px) {
      flex-direction: column;
      justify-content: center;
      border-top: none;
      border-left: 1px solid var(--color-neutral-200);
    }
  }

  &__button {
    flex: 1;
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    &:active {
      transform: scale(0.98);
    }

    // Modificador: Primary
    &--primary {
      background-color: var(--color-primary);
      color: var(--color-text-inverted);

      &:hover {
        background-color: var(--color-primary-dark);
      }
    }

    // Modificador: Secondary
    &--secondary {
      background-color: transparent;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);

      &:hover {
        background-color: var(--color-primary-lightest);
      }
    }
  }
}
```

---

## Solución D2: Grid de Estadísticas

### HTML Completo

```html
<section class="stats-grid" aria-label="Estadísticas de la plataforma">
  <article class="stats-grid__card stats-grid__card--series">
    <span class="stats-grid__icon" aria-hidden="true">📺</span>
    <span class="stats-grid__value">150</span>
    <span class="stats-grid__label">Series</span>
  </article>
  
  <article class="stats-grid__card stats-grid__card--rating">
    <span class="stats-grid__icon" aria-hidden="true">⭐</span>
    <span class="stats-grid__value">4.5</span>
    <span class="stats-grid__label">Rating</span>
  </article>
  
  <article class="stats-grid__card stats-grid__card--users">
    <span class="stats-grid__icon" aria-hidden="true">👥</span>
    <span class="stats-grid__value">1.2K</span>
    <span class="stats-grid__label">Usuarios</span>
  </article>
  
  <article class="stats-grid__card stats-grid__card--reviews">
    <span class="stats-grid__icon" aria-hidden="true">📝</span>
    <span class="stats-grid__value">500</span>
    <span class="stats-grid__label">Reviews</span>
  </article>
</section>
```

### SCSS Completo

```scss
// ==========================================================================
// COMPONENTE: STATS GRID
// ==========================================================================

.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: var(--spacing-md);

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }

  // ==========================================
  // ELEMENTO: Card
  // ==========================================
  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg);
    background-color: var(--color-bg-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    text-align: center;
    transition: box-shadow 0.3s ease, transform 0.3s ease;

    &:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-4px);
    }

    // Modificadores de color
    &--series {
      border-left: 4px solid var(--color-primary);
      
      .stats-grid__icon {
        background-color: var(--color-primary-lightest);
      }
    }

    &--rating {
      border-left: 4px solid var(--color-warning);
      
      .stats-grid__icon {
        background-color: var(--color-warning-light);
      }
    }

    &--users {
      border-left: 4px solid var(--color-info);
      
      .stats-grid__icon {
        background-color: hsl(207, 89%, 90%);
      }
    }

    &--reviews {
      border-left: 4px solid var(--color-success);
      
      .stats-grid__icon {
        background-color: var(--color-success-light);
      }
    }
  }

  // ==========================================
  // ELEMENTO: Icon
  // ==========================================
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    margin-bottom: var(--spacing-sm);
    border-radius: 50%;
    font-size: 1.5rem;
  }

  // ==========================================
  // ELEMENTO: Value
  // ==========================================
  &__value {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-title);
    line-height: 1;
  }

  // ==========================================
  // ELEMENTO: Label
  // ==========================================
  &__label {
    margin-top: var(--spacing-xs);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}
```

---

## Solución D3: Navegación con Dropdown

### HTML Completo

```html
<nav class="main-nav" aria-label="Navegación principal">
  <div class="main-nav__container">
    <!-- Logo -->
    <a href="/" class="main-nav__logo">
      <span class="main-nav__logo-text">BROADCAST</span>
    </a>

    <!-- Hamburger (mobile) -->
    <button 
      class="main-nav__hamburger" 
      aria-label="Abrir menú"
      aria-expanded="false"
      aria-controls="main-menu"
    >
      <span class="main-nav__hamburger-line"></span>
      <span class="main-nav__hamburger-line"></span>
      <span class="main-nav__hamburger-line"></span>
    </button>

    <!-- Menu -->
    <ul class="main-nav__menu" id="main-menu" role="menubar">
      <li class="main-nav__item" role="none">
        <a href="/" class="main-nav__link" role="menuitem">Home</a>
      </li>
      
      <!-- Dropdown -->
      <li class="main-nav__item main-nav__item--has-dropdown" role="none">
        <button 
          class="main-nav__link main-nav__link--dropdown" 
          aria-expanded="false"
          aria-haspopup="true"
          role="menuitem"
        >
          Series
          <span class="main-nav__dropdown-arrow" aria-hidden="true">▼</span>
        </button>
        <ul class="main-nav__dropdown" role="menu" aria-label="Categorías de series">
          <li role="none">
            <a href="/series?genre=action" class="main-nav__dropdown-link" role="menuitem">Acción</a>
          </li>
          <li role="none">
            <a href="/series?genre=comedy" class="main-nav__dropdown-link" role="menuitem">Comedia</a>
          </li>
          <li role="none">
            <a href="/series?genre=drama" class="main-nav__dropdown-link" role="menuitem">Drama</a>
          </li>
          <li role="none">
            <a href="/series?genre=horror" class="main-nav__dropdown-link" role="menuitem">Terror</a>
          </li>
        </ul>
      </li>
      
      <li class="main-nav__item" role="none">
        <a href="/movies" class="main-nav__link" role="menuitem">Películas</a>
      </li>
      
      <li class="main-nav__item" role="none">
        <a href="/lists" class="main-nav__link" role="menuitem">Mi Lista</a>
      </li>
    </ul>
  </div>
</nav>
```

### SCSS Completo

```scss
// ==========================================================================
// COMPONENTE: MAIN NAV
// ==========================================================================

.main-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-bg-primary);
  box-shadow: var(--shadow-sm);

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-md) var(--spacing-lg);
  }

  // ==========================================
  // ELEMENTO: Logo
  // ==========================================
  &__logo {
    text-decoration: none;
  }

  &__logo-text {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
  }

  // ==========================================
  // ELEMENTO: Hamburger (Mobile)
  // ==========================================
  &__hamburger {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: var(--spacing-sm);
    background: none;
    border: none;
    cursor: pointer;

    @media (min-width: 768px) {
      display: none;
    }

    &[aria-expanded="true"] {
      .main-nav__hamburger-line:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      .main-nav__hamburger-line:nth-child(2) {
        opacity: 0;
      }
      .main-nav__hamburger-line:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
    }
  }

  &__hamburger-line {
    display: block;
    width: 24px;
    height: 3px;
    background-color: var(--color-text-primary);
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  // ==========================================
  // ELEMENTO: Menu
  // ==========================================
  &__menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: 0;
    padding: var(--spacing-md);
    background-color: var(--color-bg-primary);
    box-shadow: var(--shadow-md);
    list-style: none;

    &.is-open {
      display: flex;
    }

    @media (min-width: 768px) {
      display: flex;
      flex-direction: row;
      position: static;
      padding: 0;
      background: none;
      box-shadow: none;
      gap: var(--spacing-sm);
    }
  }

  // ==========================================
  // ELEMENTO: Item
  // ==========================================
  &__item {
    position: relative;

    &--has-dropdown {
      &:hover,
      &:focus-within {
        .main-nav__dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
      }
    }
  }

  // ==========================================
  // ELEMENTO: Link
  // ==========================================
  &__link {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    background: none;
    border: none;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    text-decoration: none;
    cursor: pointer;
    border-radius: var(--radius-md);
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: var(--color-primary-lightest);
      color: var(--color-primary);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    &--dropdown {
      &::after {
        content: '';
      }
    }
  }

  &__dropdown-arrow {
    font-size: 0.6em;
    transition: transform 0.3s ease;

    .main-nav__item--has-dropdown:hover &,
    .main-nav__item--has-dropdown:focus-within & {
      transform: rotate(180deg);
    }
  }

  // ==========================================
  // ELEMENTO: Dropdown
  // ==========================================
  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 180px;
    margin: 0;
    padding: var(--spacing-sm) 0;
    background-color: var(--color-bg-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    list-style: none;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;

    @media (max-width: 767px) {
      position: static;
      box-shadow: none;
      padding-left: var(--spacing-md);
      opacity: 1;
      visibility: visible;
      transform: none;
    }
  }

  &__dropdown-link {
    display: block;
    padding: var(--spacing-sm) var(--spacing-md);
    color: var(--color-text-primary);
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--color-primary-lightest);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: -2px;
    }
  }
}
```

---

## Solución D4: Formulario de Contacto Estilizado

### HTML Completo

```html
<form class="contact-form" novalidate>
  <div class="contact-form__group">
    <input 
      type="text" 
      id="name" 
      name="name" 
      class="contact-form__input" 
      placeholder=" "
      required
      aria-describedby="name-error"
    >
    <label for="name" class="contact-form__label">Nombre</label>
    <span id="name-error" class="contact-form__error">El nombre es requerido</span>
  </div>

  <div class="contact-form__group">
    <input 
      type="email" 
      id="email" 
      name="email" 
      class="contact-form__input" 
      placeholder=" "
      required
      aria-describedby="email-error"
    >
    <label for="email" class="contact-form__label">Email</label>
    <span id="email-error" class="contact-form__error">Introduce un email válido</span>
  </div>

  <div class="contact-form__group">
    <select 
      id="subject" 
      name="subject" 
      class="contact-form__select"
      required
    >
      <option value="" disabled selected>Selecciona un asunto</option>
      <option value="general">Consulta general</option>
      <option value="support">Soporte técnico</option>
      <option value="suggestion">Sugerencia</option>
      <option value="bug">Reportar error</option>
    </select>
    <label for="subject" class="contact-form__label contact-form__label--select">Asunto</label>
  </div>

  <div class="contact-form__group">
    <textarea 
      id="message" 
      name="message" 
      class="contact-form__textarea" 
      placeholder=" "
      rows="5"
      required
      aria-describedby="message-error"
    ></textarea>
    <label for="message" class="contact-form__label">Mensaje</label>
    <span id="message-error" class="contact-form__error">El mensaje es requerido</span>
  </div>

  <div class="contact-form__group contact-form__group--checkbox">
    <input 
      type="checkbox" 
      id="terms" 
      name="terms" 
      class="contact-form__checkbox"
      required
    >
    <label for="terms" class="contact-form__checkbox-label">
      Acepto los <a href="/terms">términos y condiciones</a>
    </label>
  </div>

  <button type="submit" class="contact-form__submit">
    Enviar mensaje
  </button>
</form>
```

### SCSS Completo

```scss
// ==========================================================================
// COMPONENTE: CONTACT FORM
// ==========================================================================

.contact-form {
  max-width: 500px;
  margin: 0 auto;
  padding: var(--spacing-xl);
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);

  // ==========================================
  // ELEMENTO: Group
  // ==========================================
  &__group {
    position: relative;
    margin-bottom: var(--spacing-lg);

    &--checkbox {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-sm);
    }
  }

  // ==========================================
  // ELEMENTO: Label (Floating)
  // ==========================================
  &__label {
    position: absolute;
    left: var(--spacing-md);
    top: 50%;
    transform: translateY(-50%);
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    pointer-events: none;
    transition: all 0.2s ease;
    background-color: var(--color-bg-primary);
    padding: 0 var(--spacing-xs);

    // Label flotante cuando el input tiene foco o contenido
    .contact-form__input:focus + &,
    .contact-form__input:not(:placeholder-shown) + &,
    .contact-form__textarea:focus + &,
    .contact-form__textarea:not(:placeholder-shown) + & {
      top: 0;
      font-size: var(--font-size-sm);
      color: var(--color-primary);
    }

    // Label para textarea
    .contact-form__textarea + & {
      top: var(--spacing-md);
      transform: none;
    }

    .contact-form__textarea:focus + &,
    .contact-form__textarea:not(:placeholder-shown) + & {
      top: -10px;
    }

    // Label para select (siempre arriba)
    &--select {
      top: 0;
      font-size: var(--font-size-sm);
      color: var(--color-primary);
    }
  }

  // ==========================================
  // ELEMENTO: Input
  // ==========================================
  &__input,
  &__select,
  &__textarea {
    width: 100%;
    padding: var(--spacing-md);
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    background-color: var(--color-bg-primary);
    border: 2px solid var(--color-neutral-300);
    border-radius: var(--radius-md);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-primary-lightest);
    }

    // Estado de error
    &:invalid:not(:placeholder-shown):not(:focus) {
      border-color: var(--color-error);

      & + .contact-form__label {
        color: var(--color-error);
      }

      & ~ .contact-form__error {
        display: block;
      }
    }

    // Estado de éxito
    &:valid:not(:placeholder-shown) {
      border-color: var(--color-success);

      & + .contact-form__label {
        color: var(--color-success);
      }
    }
  }

  &__textarea {
    resize: vertical;
    min-height: 120px;
  }

  &__select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right var(--spacing-md) center;
    padding-right: var(--spacing-xl);
  }

  // ==========================================
  // ELEMENTO: Error
  // ==========================================
  &__error {
    display: none;
    margin-top: var(--spacing-xs);
    font-size: var(--font-size-sm);
    color: var(--color-error);
  }

  // ==========================================
  // ELEMENTO: Checkbox
  // ==========================================
  &__checkbox {
    width: 20px;
    height: 20px;
    margin-top: 2px;
    cursor: pointer;
    accent-color: var(--color-primary);

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  &__checkbox-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    cursor: pointer;

    a {
      color: var(--color-primary);
      text-decoration: underline;

      &:hover {
        color: var(--color-primary-dark);
      }
    }
  }

  // ==========================================
  // ELEMENTO: Submit
  // ==========================================
  &__submit {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-inverted);
    background-color: var(--color-primary);
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;

    &:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:disabled {
      background-color: var(--color-neutral-400);
      cursor: not-allowed;
    }
  }
}
```

---

## Solución D5: Componente de Rating con Estrellas

### SCSS Completo

```scss
// ==========================================================================
// COMPONENTE: STAR RATING
// ==========================================================================

.star-rating {
  display: inline-flex;
  gap: var(--spacing-xs);

  // ==========================================
  // ELEMENTO: Star
  // ==========================================
  &__star {
    padding: 0;
    background: none;
    border: none;
    font-size: 2rem;
    line-height: 1;
    color: var(--color-neutral-400);
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }

    // Estado: Llena
    &.is-filled {
      color: var(--color-warning);
    }

    // Estado: Hover preview
    &.is-hovered {
      color: var(--color-warning-light);
    }

    // Hover en todo el grupo: iluminar hasta la estrella actual
    .star-rating:hover &:hover,
    .star-rating:hover &:hover ~ & {
      color: var(--color-neutral-400);
    }

    .star-rating:hover &,
    .star-rating:hover & ~ &:hover {
      color: var(--color-warning-light);
    }
  }

  // Alternativa con CSS puro para el efecto hover
  // Usando flexbox con direction: row-reverse
  &--hover-effect {
    display: inline-flex;
    flex-direction: row-reverse;
    justify-content: flex-end;

    .star-rating__star {
      &:hover,
      &:hover ~ .star-rating__star {
        color: var(--color-warning-light);
        transform: scale(1.2);
      }
    }
  }
}

// Alternativa: Usando CSS custom properties para control desde JS
.star-rating-v2 {
  --filled-stars: 0;
  --hovered-star: 0;
  
  display: inline-flex;
  gap: var(--spacing-xs);

  &__star {
    padding: 0;
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--color-neutral-400);
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;

    &:nth-child(1) { --star-index: 1; }
    &:nth-child(2) { --star-index: 2; }
    &:nth-child(3) { --star-index: 3; }
    &:nth-child(4) { --star-index: 4; }
    &:nth-child(5) { --star-index: 5; }

    // Estrella llena si su índice <= filled-stars
    &:where(:nth-child(-n+var(--filled-stars))) {
      color: var(--color-warning);
    }

    &:hover {
      transform: scale(1.2);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }
}
```

---

# Soluciones de Servidor

## Solución S1: Servicio de Películas Básico

```typescript
// movie.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, map, catchError } from 'rxjs';

/**
 * Interfaz de Película
 */
export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  rating: number;
  genre: string[];
  duration: number;
  status: 'released' | 'upcoming' | 'production';
}

/**
 * DTO para crear película
 */
export interface CreateMovieDto {
  title: string;
  director: string;
  year: number;
  genre: string[];
  duration: number;
  status: 'released' | 'upcoming' | 'production';
}

/**
 * DTO para actualizar película
 */
export interface UpdateMovieDto extends Partial<CreateMovieDto> {}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);
  
  // Estado con Signals
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Datos mock
  private mockMovies: Movie[] = [
    {
      id: '1',
      title: 'Inception',
      director: 'Christopher Nolan',
      year: 2010,
      rating: 4.8,
      genre: ['Sci-Fi', 'Action', 'Thriller'],
      duration: 148,
      status: 'released'
    },
    {
      id: '2',
      title: 'The Matrix',
      director: 'Lana Wachowski, Lilly Wachowski',
      year: 1999,
      rating: 4.7,
      genre: ['Sci-Fi', 'Action'],
      duration: 136,
      status: 'released'
    },
    {
      id: '3',
      title: 'Dune: Part Three',
      director: 'Denis Villeneuve',
      year: 2026,
      rating: 0,
      genre: ['Sci-Fi', 'Adventure'],
      duration: 0,
      status: 'production'
    }
  ];

  /**
   * GET: Obtener todas las películas
   */
  getAllMovies(): Observable<Movie[]> {
    this.loading.set(true);
    this.error.set(null);

    return of(this.mockMovies).pipe(
      delay(500),
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

  /**
   * GET: Obtener película por ID
   */
  getMovieById(id: string): Observable<Movie> {
    this.loading.set(true);
    this.error.set(null);

    const movie = this.mockMovies.find(m => m.id === id);

    return of(movie).pipe(
      delay(300),
      map(m => {
        this.loading.set(false);
        if (!m) {
          throw new Error('Película no encontrada');
        }
        return m;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Película no encontrada');
        throw error;
      })
    );
  }

  /**
   * POST: Crear nueva película
   */
  create(dto: CreateMovieDto): Observable<Movie> {
    this.loading.set(true);
    this.error.set(null);

    const newMovie: Movie = {
      id: String(Date.now()),
      ...dto,
      rating: 0
    };

    return of(newMovie).pipe(
      delay(500),
      map(movie => {
        this.mockMovies.push(movie);
        this.loading.set(false);
        return movie;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Error al crear película');
        throw error;
      })
    );
  }

  /**
   * PUT: Actualizar película
   */
  update(id: string, dto: UpdateMovieDto): Observable<Movie> {
    this.loading.set(true);
    this.error.set(null);

    const index = this.mockMovies.findIndex(m => m.id === id);

    return of(index).pipe(
      delay(400),
      map(idx => {
        if (idx === -1) {
          this.loading.set(false);
          throw new Error('Película no encontrada');
        }

        this.mockMovies[idx] = {
          ...this.mockMovies[idx],
          ...dto
        };

        this.loading.set(false);
        return this.mockMovies[idx];
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Error al actualizar película');
        throw error;
      })
    );
  }

  /**
   * DELETE: Eliminar película
   */
  delete(id: string): Observable<void> {
    this.loading.set(true);
    this.error.set(null);

    const index = this.mockMovies.findIndex(m => m.id === id);

    return of(undefined).pipe(
      delay(400),
      map(() => {
        if (index !== -1) {
          this.mockMovies.splice(index, 1);
        }
        this.loading.set(false);
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Error al eliminar película');
        throw error;
      })
    );
  }
}
```

---

## Solución S2: Servicio con Filtros y Paginación

```typescript
// Añadir al movie.service.ts

/**
 * Interfaz de filtros
 */
export interface MovieFilters {
  search?: string;
  genre?: string;
  yearFrom?: number;
  yearTo?: number;
  minRating?: number;
  status?: 'released' | 'upcoming' | 'production';
}

/**
 * Respuesta paginada
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Método a añadir en MovieService:

/**
 * GET: Obtener películas con filtros y paginación
 */
getMoviesFiltered(
  page: number = 1,
  pageSize: number = 10,
  filters: MovieFilters = {}
): Observable<PaginatedResponse<Movie>> {
  this.loading.set(true);
  this.error.set(null);

  // Empezar con todas las películas
  let filtered = [...this.mockMovies];

  // Aplicar filtro de búsqueda
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(m =>
      m.title.toLowerCase().includes(searchLower) ||
      m.director.toLowerCase().includes(searchLower)
    );
  }

  // Aplicar filtro de género
  if (filters.genre) {
    filtered = filtered.filter(m => 
      m.genre.some(g => g.toLowerCase() === filters.genre!.toLowerCase())
    );
  }

  // Aplicar filtro de año mínimo
  if (filters.yearFrom) {
    filtered = filtered.filter(m => m.year >= filters.yearFrom!);
  }

  // Aplicar filtro de año máximo
  if (filters.yearTo) {
    filtered = filtered.filter(m => m.year <= filters.yearTo!);
  }

  // Aplicar filtro de rating mínimo
  if (filters.minRating !== undefined) {
    filtered = filtered.filter(m => m.rating >= filters.minRating!);
  }

  // Aplicar filtro de estado
  if (filters.status) {
    filtered = filtered.filter(m => m.status === filters.status);
  }

  // Calcular paginación
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return of({
    items,
    total,
    page,
    pageSize,
    totalPages
  }).pipe(
    delay(400),
    map(response => {
      this.loading.set(false);
      return response;
    }),
    catchError(error => {
      this.loading.set(false);
      this.error.set('Error al filtrar películas');
      throw error;
    })
  );
}
```

---

## Solución S3: Servicio de Favoritos

```typescript
// favorite.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Interfaz de item favorito
 */
export interface FavoriteItem {
  id: string;
  type: 'movie' | 'series';
  addedAt: Date;
}

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private readonly STORAGE_KEY = 'user_favorites';
  
  // Estado con Signals
  private favoritesSignal = signal<FavoriteItem[]>([]);
  
  // Computed para el conteo
  favoritesCount = computed(() => this.favoritesSignal().length);
  
  // Observable para suscripciones
  private favoritesSubject = new BehaviorSubject<FavoriteItem[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Cargar favoritos desde localStorage
   */
  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const favorites = JSON.parse(stored).map((f: any) => ({
        ...f,
        addedAt: new Date(f.addedAt)
      }));
      this.favoritesSignal.set(favorites);
      this.favoritesSubject.next(favorites);
    }
  }

  /**
   * Guardar favoritos en localStorage
   */
  private saveToStorage(): void {
    localStorage.setItem(
      this.STORAGE_KEY, 
      JSON.stringify(this.favoritesSignal())
    );
  }

  /**
   * Obtener todos los favoritos
   */
  getAllFavorites(): FavoriteItem[] {
    return this.favoritesSignal();
  }

  /**
   * Verificar si un item está en favoritos
   */
  isFavorite(id: string, type: 'movie' | 'series'): boolean {
    return this.favoritesSignal().some(
      f => f.id === id && f.type === type
    );
  }

  /**
   * Añadir a favoritos
   */
  addFavorite(id: string, type: 'movie' | 'series'): void {
    if (this.isFavorite(id, type)) {
      return; // Ya existe
    }

    const newFavorite: FavoriteItem = {
      id,
      type,
      addedAt: new Date()
    };

    this.favoritesSignal.update(favorites => [...favorites, newFavorite]);
    this.favoritesSubject.next(this.favoritesSignal());
    this.saveToStorage();
  }

  /**
   * Eliminar de favoritos
   */
  removeFavorite(id: string, type: 'movie' | 'series'): void {
    this.favoritesSignal.update(favorites =>
      favorites.filter(f => !(f.id === id && f.type === type))
    );
    this.favoritesSubject.next(this.favoritesSignal());
    this.saveToStorage();
  }

  /**
   * Toggle favorito (añadir/eliminar)
   */
  toggleFavorite(id: string, type: 'movie' | 'series'): boolean {
    if (this.isFavorite(id, type)) {
      this.removeFavorite(id, type);
      return false;
    } else {
      this.addFavorite(id, type);
      return true;
    }
  }

  /**
   * Obtener favoritos por tipo
   */
  getFavoritesByType(type: 'movie' | 'series'): FavoriteItem[] {
    return this.favoritesSignal().filter(f => f.type === type);
  }

  /**
   * Limpiar todos los favoritos
   */
  clearAll(): void {
    this.favoritesSignal.set([]);
    this.favoritesSubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
```

---

## Solución S4: Servicio de Reviews

```typescript
// review.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { Observable, of, delay, map, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Interfaz de Review
 */
export interface Review {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'movie' | 'series';
  rating: number;
  title: string;
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * DTO para crear review
 */
export interface CreateReviewDto {
  itemId: string;
  itemType: 'movie' | 'series';
  rating: number;
  title: string;
  content: string;
}

/**
 * DTO para actualizar review
 */
export interface UpdateReviewDto {
  rating?: number;
  title?: string;
  content?: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private authService = inject(AuthService);
  
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Datos mock
  private mockReviews: Review[] = [
    {
      id: '1',
      userId: 'user1',
      itemId: '1',
      itemType: 'movie',
      rating: 5,
      title: 'Obra maestra',
      content: 'Una película que te hace pensar. Increíble.',
      likes: 42,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      userId: 'user2',
      itemId: '1',
      itemType: 'movie',
      rating: 4,
      title: 'Muy buena',
      content: 'Me gustó mucho, aunque el final es confuso.',
      likes: 18,
      createdAt: new Date('2024-01-20')
    },
    {
      id: '3',
      userId: 'user1',
      itemId: '2',
      itemType: 'series',
      rating: 5,
      title: 'La mejor serie',
      content: 'No puedo dejar de verla. Adictiva.',
      likes: 85,
      createdAt: new Date('2024-02-01')
    }
  ];

  /**
   * Validar rating (1-5)
   */
  private validateRating(rating: number): boolean {
    return rating >= 1 && rating <= 5;
  }

  /**
   * GET: Reviews por item
   */
  getReviewsByItem(itemId: string): Observable<Review[]> {
    this.loading.set(true);
    
    const reviews = this.mockReviews
      .filter(r => r.itemId === itemId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return of(reviews).pipe(
      delay(300),
      map(data => {
        this.loading.set(false);
        return data;
      })
    );
  }

  /**
   * GET: Reviews por usuario
   */
  getReviewsByUser(userId: string): Observable<Review[]> {
    this.loading.set(true);
    
    const reviews = this.mockReviews
      .filter(r => r.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return of(reviews).pipe(
      delay(300),
      map(data => {
        this.loading.set(false);
        return data;
      })
    );
  }

  /**
   * POST: Crear review
   */
  createReview(dto: CreateReviewDto): Observable<Review> {
    this.loading.set(true);
    this.error.set(null);

    // Validar rating
    if (!this.validateRating(dto.rating)) {
      this.loading.set(false);
      this.error.set('El rating debe estar entre 1 y 5');
      return throwError(() => new Error('Rating inválido'));
    }

    // Obtener usuario actual (simulado)
    const currentUserId = 'currentUser';

    // Verificar si ya existe una review de este usuario para este item
    const existingReview = this.mockReviews.find(
      r => r.userId === currentUserId && 
           r.itemId === dto.itemId && 
           r.itemType === dto.itemType
    );

    if (existingReview) {
      this.loading.set(false);
      this.error.set('Ya has dejado una review para este contenido');
      return throwError(() => new Error('Review duplicada'));
    }

    const newReview: Review = {
      id: String(Date.now()),
      userId: currentUserId,
      itemId: dto.itemId,
      itemType: dto.itemType,
      rating: dto.rating,
      title: dto.title,
      content: dto.content,
      likes: 0,
      createdAt: new Date()
    };

    return of(newReview).pipe(
      delay(500),
      map(review => {
        this.mockReviews.push(review);
        this.loading.set(false);
        return review;
      })
    );
  }

  /**
   * PUT: Actualizar review
   */
  updateReview(id: string, dto: UpdateReviewDto): Observable<Review> {
    this.loading.set(true);
    this.error.set(null);

    // Validar rating si se proporciona
    if (dto.rating !== undefined && !this.validateRating(dto.rating)) {
      this.loading.set(false);
      this.error.set('El rating debe estar entre 1 y 5');
      return throwError(() => new Error('Rating inválido'));
    }

    const index = this.mockReviews.findIndex(r => r.id === id);

    return of(index).pipe(
      delay(400),
      map(idx => {
        if (idx === -1) {
          this.loading.set(false);
          throw new Error('Review no encontrada');
        }

        this.mockReviews[idx] = {
          ...this.mockReviews[idx],
          ...dto,
          updatedAt: new Date()
        };

        this.loading.set(false);
        return this.mockReviews[idx];
      })
    );
  }

  /**
   * DELETE: Eliminar review
   */
  deleteReview(id: string): Observable<void> {
    this.loading.set(true);
    
    const index = this.mockReviews.findIndex(r => r.id === id);

    return of(undefined).pipe(
      delay(400),
      map(() => {
        if (index !== -1) {
          this.mockReviews.splice(index, 1);
        }
        this.loading.set(false);
      })
    );
  }

  /**
   * POST: Like a una review
   */
  likeReview(id: string): Observable<Review> {
    this.loading.set(true);
    
    const index = this.mockReviews.findIndex(r => r.id === id);

    return of(index).pipe(
      delay(200),
      map(idx => {
        if (idx === -1) {
          this.loading.set(false);
          throw new Error('Review no encontrada');
        }

        this.mockReviews[idx].likes++;
        this.loading.set(false);
        return this.mockReviews[idx];
      })
    );
  }

  /**
   * GET: Rating promedio de un item
   */
  getAverageRating(itemId: string): Observable<number> {
    const reviews = this.mockReviews.filter(r => r.itemId === itemId);
    
    if (reviews.length === 0) {
      return of(0);
    }

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = Math.round((sum / reviews.length) * 10) / 10;

    return of(average).pipe(delay(100));
  }
}
```

---

## Solución S5: Servicio de Búsqueda Global

```typescript
// search.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { Observable, forkJoin, of, delay, map } from 'rxjs';

/**
 * Interfaces de resultados de búsqueda
 */
export interface SeriesSearchResult {
  id: string;
  title: string;
  year: number;
  matchType: 'title' | 'description' | 'genre';
}

export interface MovieSearchResult {
  id: string;
  title: string;
  year: number;
  matchType: 'title' | 'description' | 'genre';
}

export interface UserSearchResult {
  id: string;
  username: string;
  matchType: 'username' | 'email';
}

export interface SearchResults {
  series: SeriesSearchResult[];
  movies: MovieSearchResult[];
  users: UserSearchResult[];
  totalResults: number;
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Mock data
  private mockSeries = [
    { id: '1', title: 'Twin Peaks', description: 'Mystery series', genre: ['Drama', 'Mystery'], year: 1990 },
    { id: '2', title: 'Stranger Things', description: 'Supernatural drama', genre: ['Drama', 'Fantasy'], year: 2016 },
    { id: '3', title: 'Breaking Bad', description: 'Crime drama', genre: ['Drama', 'Crime'], year: 2008 }
  ];

  private mockMovies = [
    { id: '1', title: 'Inception', description: 'Dream heist', genre: ['Sci-Fi', 'Action'], year: 2010 },
    { id: '2', title: 'The Matrix', description: 'Virtual reality', genre: ['Sci-Fi', 'Action'], year: 1999 },
    { id: '3', title: 'Interstellar', description: 'Space exploration', genre: ['Sci-Fi', 'Drama'], year: 2014 }
  ];

  private mockUsers = [
    { id: '1', username: 'john_doe', email: 'john@example.com' },
    { id: '2', username: 'jane_smith', email: 'jane@example.com' },
    { id: '3', username: 'movie_fan', email: 'fan@movies.com' }
  ];

  /**
   * Búsqueda global en todas las fuentes
   */
  globalSearch(query: string): Observable<SearchResults> {
    this.loading.set(true);
    this.error.set(null);

    if (!query || query.trim().length < 2) {
      return of({
        series: [],
        movies: [],
        users: [],
        totalResults: 0
      });
    }

    const queryLower = query.toLowerCase();

    // Ejecutar búsquedas en paralelo con forkJoin
    return forkJoin({
      series: this.searchSeries(queryLower),
      movies: this.searchMovies(queryLower),
      users: this.searchUsers(queryLower)
    }).pipe(
      delay(300),
      map(results => {
        this.loading.set(false);
        
        // Limitar a 5 resultados por categoría
        const series = results.series.slice(0, 5);
        const movies = results.movies.slice(0, 5);
        const users = results.users.slice(0, 5);

        return {
          series,
          movies,
          users,
          totalResults: series.length + movies.length + users.length
        };
      })
    );
  }

  /**
   * Buscar en series
   */
  private searchSeries(query: string): Observable<SeriesSearchResult[]> {
    const results: SeriesSearchResult[] = [];

    for (const series of this.mockSeries) {
      let matchType: 'title' | 'description' | 'genre' | null = null;

      if (series.title.toLowerCase().includes(query)) {
        matchType = 'title';
      } else if (series.description.toLowerCase().includes(query)) {
        matchType = 'description';
      } else if (series.genre.some(g => g.toLowerCase().includes(query))) {
        matchType = 'genre';
      }

      if (matchType) {
        results.push({
          id: series.id,
          title: series.title,
          year: series.year,
          matchType
        });
      }
    }

    // Ordenar por relevancia: title > description > genre
    results.sort((a, b) => {
      const order = { title: 0, description: 1, genre: 2 };
      return order[a.matchType] - order[b.matchType];
    });

    return of(results);
  }

  /**
   * Buscar en películas
   */
  private searchMovies(query: string): Observable<MovieSearchResult[]> {
    const results: MovieSearchResult[] = [];

    for (const movie of this.mockMovies) {
      let matchType: 'title' | 'description' | 'genre' | null = null;

      if (movie.title.toLowerCase().includes(query)) {
        matchType = 'title';
      } else if (movie.description.toLowerCase().includes(query)) {
        matchType = 'description';
      } else if (movie.genre.some(g => g.toLowerCase().includes(query))) {
        matchType = 'genre';
      }

      if (matchType) {
        results.push({
          id: movie.id,
          title: movie.title,
          year: movie.year,
          matchType
        });
      }
    }

    results.sort((a, b) => {
      const order = { title: 0, description: 1, genre: 2 };
      return order[a.matchType] - order[b.matchType];
    });

    return of(results);
  }

  /**
   * Buscar en usuarios
   */
  private searchUsers(query: string): Observable<UserSearchResult[]> {
    const results: UserSearchResult[] = [];

    for (const user of this.mockUsers) {
      let matchType: 'username' | 'email' | null = null;

      if (user.username.toLowerCase().includes(query)) {
        matchType = 'username';
      } else if (user.email.toLowerCase().includes(query)) {
        matchType = 'email';
      }

      if (matchType) {
        results.push({
          id: user.id,
          username: user.username,
          matchType
        });
      }
    }

    // Ordenar: username primero
    results.sort((a, b) => {
      const order = { username: 0, email: 1 };
      return order[a.matchType] - order[b.matchType];
    });

    return of(results);
  }
}
```

---

# Soluciones de Clientes

## Solución C1: Componente de Tarjeta de Película

### movie-card.ts

```typescript
import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  rating: number;
  genre: string[];
  posterUrl?: string;
}

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

  // Estado interno
  isFavorite = signal(false);

  /**
   * Toggle favorito
   */
  toggleFavorite(): void {
    this.isFavorite.update(value => !value);
    this.onFavorite.emit(this.movie.id);
  }

  /**
   * Emitir rating
   */
  rateMovie(rating: number): void {
    this.onRate.emit({ movieId: this.movie.id, rating });
  }

  /**
   * Clases CSS dinámicas
   */
  get cardClasses(): string {
    const classes = ['movie-card', `movie-card--${this.variant}`];
    if (this.isFavorite()) {
      classes.push('movie-card--favorite');
    }
    return classes.join(' ');
  }
}
```

### movie-card.html

```html
<article [class]="cardClasses">
  <!-- Imagen -->
  <div class="movie-card__image-wrapper">
    @if (movie.posterUrl) {
      <img 
        [src]="movie.posterUrl" 
        [alt]="movie.title + ' poster'" 
        class="movie-card__image"
      >
    } @else {
      <div class="movie-card__placeholder">
        <span>🎬</span>
      </div>
    }
    
    <!-- Botón favorito superpuesto -->
    <button 
      class="movie-card__favorite-btn"
      [class.active]="isFavorite()"
      (click)="toggleFavorite(); $event.stopPropagation()"
      [attr.aria-label]="isFavorite() ? 'Quitar de favoritos' : 'Añadir a favoritos'"
    >
      @if (isFavorite()) {
        ❤️
      } @else {
        🤍
      }
    </button>
  </div>

  <!-- Contenido -->
  <div class="movie-card__content">
    <h3 class="movie-card__title">{{ movie.title }}</h3>
    <p class="movie-card__meta">
      {{ movie.director }} ({{ movie.year }})
    </p>

    <!-- Géneros -->
    @if (movie.genre.length > 0) {
      <ul class="movie-card__genres">
        @for (genre of movie.genre; track genre) {
          <li class="movie-card__genre">{{ genre }}</li>
        }
      </ul>
    }

    <!-- Rating -->
    @if (showRating && movie.rating > 0) {
      <div class="movie-card__rating">
        <span class="movie-card__stars">⭐ {{ movie.rating }}/5</span>
      </div>
    }
  </div>

  <!-- Footer con link -->
  <footer class="movie-card__footer">
    <a [routerLink]="['/movies', movie.id]" class="movie-card__link">
      Ver detalles
    </a>
  </footer>
</article>
```

---

## Solución C2: Formulario de Búsqueda Reactivo

### search-form.ts

```typescript
import { Component, Output, EventEmitter, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';

export interface SearchFilters {
  query: string;
  type: 'all' | 'series' | 'movies' | 'users';
  yearFrom?: number;
  yearTo?: number;
  genre?: string;
}

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-form.html',
  styleUrl: './search-form.scss'
})
export class SearchForm implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();

  @Output() onSearch = new EventEmitter<SearchFilters>();

  searchForm: FormGroup = this.fb.group({
    query: ['', [Validators.required, Validators.minLength(3)]],
    type: ['all'],
    yearFrom: [null, [Validators.min(1900)]],
    yearTo: [null, [Validators.max(2030)]],
    genre: ['']
  });

  genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller'];

  // Getters para validaciones
  get query() { return this.searchForm.get('query'); }
  get yearFrom() { return this.searchForm.get('yearFrom'); }
  get yearTo() { return this.searchForm.get('yearTo'); }

  ngOnInit(): void {
    // Suscribirse a cambios con debounce
    this.searchForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    ).subscribe(values => {
      if (this.searchForm.valid) {
        this.emitSearch(values);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Emitir filtros de búsqueda
   */
  private emitSearch(values: any): void {
    const filters: SearchFilters = {
      query: values.query,
      type: values.type,
      ...(values.yearFrom && { yearFrom: values.yearFrom }),
      ...(values.yearTo && { yearTo: values.yearTo }),
      ...(values.genre && { genre: values.genre })
    };
    this.onSearch.emit(filters);
  }

  /**
   * Limpiar todos los filtros
   */
  clearFilters(): void {
    this.searchForm.reset({
      query: '',
      type: 'all',
      yearFrom: null,
      yearTo: null,
      genre: ''
    });
  }

  /**
   * Búsqueda manual (botón)
   */
  submitSearch(): void {
    if (this.searchForm.valid) {
      this.emitSearch(this.searchForm.value);
    } else {
      this.searchForm.markAllAsTouched();
    }
  }
}
```

### search-form.html

```html
<form [formGroup]="searchForm" (ngSubmit)="submitSearch()" class="search-form">
  <!-- Query -->
  <div class="search-form__group">
    <label for="query" class="search-form__label">Buscar</label>
    <input 
      type="text" 
      id="query" 
      formControlName="query"
      class="search-form__input"
      placeholder="Buscar series, películas..."
    >
    @if (query?.invalid && query?.touched) {
      <span class="search-form__error">
        @if (query?.errors?.['required']) {
          El campo de búsqueda es requerido
        }
        @if (query?.errors?.['minlength']) {
          Mínimo 3 caracteres
        }
      </span>
    }
  </div>

  <!-- Type -->
  <div class="search-form__group">
    <label for="type" class="search-form__label">Tipo</label>
    <select id="type" formControlName="type" class="search-form__select">
      <option value="all">Todos</option>
      <option value="series">Series</option>
      <option value="movies">Películas</option>
      <option value="users">Usuarios</option>
    </select>
  </div>

  <!-- Year Range -->
  <div class="search-form__row">
    <div class="search-form__group search-form__group--half">
      <label for="yearFrom" class="search-form__label">Año desde</label>
      <input 
        type="number" 
        id="yearFrom" 
        formControlName="yearFrom"
        class="search-form__input"
        min="1900"
        max="2030"
      >
      @if (yearFrom?.invalid && yearFrom?.touched) {
        <span class="search-form__error">Año mínimo: 1900</span>
      }
    </div>

    <div class="search-form__group search-form__group--half">
      <label for="yearTo" class="search-form__label">Año hasta</label>
      <input 
        type="number" 
        id="yearTo" 
        formControlName="yearTo"
        class="search-form__input"
        min="1900"
        max="2030"
      >
      @if (yearTo?.invalid && yearTo?.touched) {
        <span class="search-form__error">Año máximo: 2030</span>
      }
    </div>
  </div>

  <!-- Genre -->
  <div class="search-form__group">
    <label for="genre" class="search-form__label">Género</label>
    <select id="genre" formControlName="genre" class="search-form__select">
      <option value="">Todos los géneros</option>
      @for (genre of genres; track genre) {
        <option [value]="genre">{{ genre }}</option>
      }
    </select>
  </div>

  <!-- Buttons -->
  <div class="search-form__actions">
    <button 
      type="button" 
      (click)="clearFilters()"
      class="search-form__btn search-form__btn--secondary"
    >
      Limpiar
    </button>
    <button 
      type="submit" 
      [disabled]="searchForm.invalid"
      class="search-form__btn search-form__btn--primary"
    >
      Buscar
    </button>
  </div>
</form>
```

---

## Solución C3: Lista con Paginación

### series-list.ts

```typescript
import { Component, Input, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService, Series, SeriesListResponse } from '../../services/series.service';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series-list.html',
  styleUrl: './series-list.scss'
})
export class SeriesList implements OnInit {
  private seriesService = inject(SeriesService);

  @Input() pageSize = 10;

  // Estado
  series = signal<Series[]>([]);
  currentPage = signal(1);
  totalItems = signal(0);
  pageSizeOptions = [10, 20, 50];
  selectedPageSize = signal(10);

  // Computed
  totalPages = computed(() => 
    Math.ceil(this.totalItems() / this.selectedPageSize())
  );

  loading = computed(() => this.seriesService.loading());
  error = computed(() => this.seriesService.error());

  // Rango de items mostrados
  itemRange = computed(() => {
    const start = (this.currentPage() - 1) * this.selectedPageSize() + 1;
    const end = Math.min(this.currentPage() * this.selectedPageSize(), this.totalItems());
    return { start, end };
  });

  // Páginas a mostrar en la paginación
  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, 4, -1, total);
      } else if (current >= total - 2) {
        pages.push(1, -1, total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, -1, current - 1, current, current + 1, -1, total);
      }
    }

    return pages;
  });

  ngOnInit(): void {
    this.selectedPageSize.set(this.pageSize);
    this.loadSeries();
  }

  /**
   * Cargar series
   */
  loadSeries(): void {
    this.seriesService.getSeriesFiltered(
      this.currentPage(),
      this.selectedPageSize()
    ).subscribe({
      next: (response: SeriesListResponse) => {
        this.series.set(response.items);
        this.totalItems.set(response.total);
      },
      error: (err) => console.error('Error loading series:', err)
    });
  }

  /**
   * Ir a una página específica
   */
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) {
      return;
    }
    this.currentPage.set(page);
    this.loadSeries();
  }

  /**
   * Página anterior
   */
  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  /**
   * Página siguiente
   */
  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  /**
   * Cambiar tamaño de página
   */
  changePageSize(size: number): void {
    this.selectedPageSize.set(size);
    this.currentPage.set(1);
    this.loadSeries();
  }
}
```

### series-list.html

```html
<section class="series-list">
  <!-- Header con selector de página -->
  <header class="series-list__header">
    <p class="series-list__info">
      Mostrando {{ itemRange().start }}-{{ itemRange().end }} de {{ totalItems() }} resultados
    </p>
    
    <div class="series-list__page-size">
      <label for="pageSize">Items por página:</label>
      <select 
        id="pageSize" 
        [value]="selectedPageSize()"
        (change)="changePageSize(+$any($event.target).value)"
      >
        @for (size of pageSizeOptions; track size) {
          <option [value]="size">{{ size }}</option>
        }
      </select>
    </div>
  </header>

  <!-- Loading spinner -->
  @if (loading()) {
    <div class="series-list__loading">
      <div class="spinner"></div>
      <p>Cargando series...</p>
    </div>
  }

  <!-- Error -->
  @if (error()) {
    <div class="series-list__error">
      <p>{{ error() }}</p>
      <button (click)="loadSeries()">Reintentar</button>
    </div>
  }

  <!-- Grid de series -->
  @if (!loading() && !error()) {
    <div class="series-list__grid">
      @for (item of series(); track item.id) {
        <article class="series-list__card">
          <img [src]="item.imageUrl" [alt]="item.title">
          <h3>{{ item.title }}</h3>
          <p>{{ item.year }} • {{ item.seasons }} temporadas</p>
          <span class="rating">⭐ {{ item.rating }}</span>
        </article>
      } @empty {
        <p class="series-list__empty">No se encontraron series</p>
      }
    </div>

    <!-- Paginación -->
    @if (totalPages() > 1) {
      <nav class="series-list__pagination" aria-label="Paginación">
        <!-- Anterior -->
        <button 
          class="pagination__btn pagination__btn--prev"
          [disabled]="currentPage() === 1"
          (click)="previousPage()"
          aria-label="Página anterior"
        >
          ← Anterior
        </button>

        <!-- Números de página -->
        <div class="pagination__pages">
          @for (page of visiblePages(); track $index) {
            @if (page === -1) {
              <span class="pagination__ellipsis">...</span>
            } @else {
              <button 
                class="pagination__page"
                [class.active]="page === currentPage()"
                (click)="goToPage(page)"
                [attr.aria-current]="page === currentPage() ? 'page' : null"
              >
                {{ page }}
              </button>
            }
          }
        </div>

        <!-- Siguiente -->
        <button 
          class="pagination__btn pagination__btn--next"
          [disabled]="currentPage() === totalPages()"
          (click)="nextPage()"
          aria-label="Página siguiente"
        >
          Siguiente →
        </button>
      </nav>
    }
  }
</section>
```

---

## Solución C4: Modal de Confirmación Reutilizable

### confirm-modal.ts

```typescript
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss'
})
export class ConfirmModal {
  @Input() title = 'Confirmar';
  @Input() message = '¿Estás seguro?';
  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';
  @Input() type: 'info' | 'warning' | 'danger' = 'info';
  @Input() isOpen = false;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  /**
   * Cerrar con ESC
   */
  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isOpen) {
      this.close();
    }
  }

  /**
   * Obtener icono según tipo
   */
  get icon(): string {
    const icons = {
      info: 'ℹ️',
      warning: '⚠️',
      danger: '🚨'
    };
    return icons[this.type];
  }

  /**
   * Confirmar acción
   */
  confirm(): void {
    this.onConfirm.emit();
    this.close();
  }

  /**
   * Cancelar acción
   */
  cancel(): void {
    this.onCancel.emit();
    this.close();
  }

  /**
   * Cerrar modal
   */
  close(): void {
    this.onClose.emit();
  }

  /**
   * Click en overlay
   */
  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }
}
```

### confirm-modal.html

```html
@if (isOpen) {
  <div 
    class="modal-overlay"
    (click)="onOverlayClick($event)"
    role="dialog"
    aria-modal="true"
    [attr.aria-labelledby]="'modal-title'"
    [attr.aria-describedby]="'modal-message'"
  >
    <div class="modal" [class]="'modal--' + type">
      <!-- Header -->
      <header class="modal__header">
        <span class="modal__icon" aria-hidden="true">{{ icon }}</span>
        <h2 id="modal-title" class="modal__title">{{ title }}</h2>
        <button 
          class="modal__close"
          (click)="close()"
          aria-label="Cerrar modal"
        >
          ✕
        </button>
      </header>

      <!-- Body -->
      <div class="modal__body">
        <p id="modal-message" class="modal__message">{{ message }}</p>
      </div>

      <!-- Footer -->
      <footer class="modal__footer">
        <button 
          class="modal__btn modal__btn--cancel"
          (click)="cancel()"
        >
          {{ cancelText }}
        </button>
        <button 
          class="modal__btn modal__btn--confirm"
          [class]="'modal__btn--' + type"
          (click)="confirm()"
        >
          {{ confirmText }}
        </button>
      </footer>
    </div>
  </div>
}
```

### confirm-modal.scss

```scss
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.modal {
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 400px;
  width: 90%;
  animation: slideIn 0.3s ease;

  &__header {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-neutral-200);
  }

  &__icon {
    font-size: 1.5rem;
  }

  &__title {
    flex: 1;
    margin: 0;
    font-size: var(--font-size-lg);
  }

  &__close {
    padding: var(--spacing-xs);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }

  &__body {
    padding: var(--spacing-lg);
  }

  &__message {
    margin: 0;
    color: var(--color-text-secondary);
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
    border-top: 1px solid var(--color-neutral-200);
  }

  &__btn {
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--radius-md);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: background-color 0.2s ease;

    &--cancel {
      background: none;
      border: 1px solid var(--color-neutral-300);
      color: var(--color-text-primary);

      &:hover {
        background-color: var(--color-neutral-100);
      }
    }

    &--confirm {
      border: none;
      color: white;
    }

    &--info {
      background-color: var(--color-info);
      &:hover { background-color: var(--color-info-dark); }
    }

    &--warning {
      background-color: var(--color-warning);
      &:hover { background-color: var(--color-warning-dark); }
    }

    &--danger {
      background-color: var(--color-error);
      &:hover { background-color: var(--color-error-dark); }
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Solución C5: Página de Detalle con Resolver

### movie.resolver.ts

```typescript
import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { MovieService, Movie } from '../services/movie.service';

export const movieResolver: ResolveFn<Movie | null> = (route, state) => {
  const movieService = inject(MovieService);
  const router = inject(Router);
  
  const id = route.paramMap.get('id');
  
  if (!id) {
    router.navigate(['/movies']);
    return of(null);
  }

  return movieService.getMovieById(id).pipe(
    catchError(error => {
      console.error('Error loading movie:', error);
      router.navigate(['/not-found']);
      return of(null);
    })
  );
};
```

### movie-detail.ts

```typescript
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Movie } from '../../services/movie.service';
import { Review, ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss'
})
export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private reviewService = inject(ReviewService);

  movie = signal<Movie | null>(null);
  reviews = signal<Review[]>([]);
  averageRating = signal<number>(0);

  ngOnInit(): void {
    // Obtener datos del resolver
    this.route.data.subscribe(data => {
      if (data['movie']) {
        this.movie.set(data['movie']);
        this.titleService.setTitle(`${data['movie'].title} - BROADCAST`);
        this.loadReviews(data['movie'].id);
        this.loadAverageRating(data['movie'].id);
      }
    });
  }

  /**
   * Cargar reviews de la película
   */
  loadReviews(movieId: string): void {
    this.reviewService.getReviewsByItem(movieId).subscribe({
      next: (reviews) => this.reviews.set(reviews),
      error: (err) => console.error('Error loading reviews:', err)
    });
  }

  /**
   * Cargar rating promedio
   */
  loadAverageRating(movieId: string): void {
    this.reviewService.getAverageRating(movieId).subscribe({
      next: (rating) => this.averageRating.set(rating),
      error: (err) => console.error('Error loading rating:', err)
    });
  }

  /**
   * Formatear duración
   */
  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  /**
   * Generar estrellas
   */
  getStars(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) stars.push('★');
    if (hasHalf) stars.push('☆');
    while (stars.length < 5) stars.push('☆');

    return stars;
  }
}
```

### movie-detail.html

```html
@if (movie(); as movie) {
  <article class="movie-detail">
    <!-- Hero section -->
    <header class="movie-detail__hero">
      <div class="movie-detail__poster">
        @if (movie.posterUrl) {
          <img [src]="movie.posterUrl" [alt]="movie.title">
        } @else {
          <div class="movie-detail__poster-placeholder">🎬</div>
        }
      </div>

      <div class="movie-detail__info">
        <h1 class="movie-detail__title">{{ movie.title }}</h1>
        
        <p class="movie-detail__meta">
          <span>{{ movie.director }}</span>
          <span>•</span>
          <span>{{ movie.year }}</span>
          <span>•</span>
          <span>{{ formatDuration(movie.duration) }}</span>
        </p>

        <!-- Rating -->
        <div class="movie-detail__rating">
          <span class="movie-detail__stars">
            @for (star of getStars(averageRating()); track $index) {
              <span [class.filled]="star === '★'">{{ star }}</span>
            }
          </span>
          <span class="movie-detail__rating-value">
            {{ averageRating() }}/5 ({{ reviews().length }} reviews)
          </span>
        </div>

        <!-- Géneros -->
        <div class="movie-detail__genres">
          @for (genre of movie.genre; track genre) {
            <span class="movie-detail__genre">{{ genre }}</span>
          }
        </div>

        <!-- Estado -->
        <span class="movie-detail__status" [class]="'status--' + movie.status">
          {{ movie.status }}
        </span>
      </div>
    </header>

    <!-- Sinopsis -->
    <section class="movie-detail__section">
      <h2>Sinopsis</h2>
      <p>{{ movie.description || 'Sin descripción disponible.' }}</p>
    </section>

    <!-- Reviews -->
    <section class="movie-detail__section">
      <h2>Reviews ({{ reviews().length }})</h2>
      
      @if (reviews().length > 0) {
        <div class="movie-detail__reviews">
          @for (review of reviews(); track review.id) {
            <article class="review-card">
              <header class="review-card__header">
                <span class="review-card__rating">⭐ {{ review.rating }}/5</span>
                <h4 class="review-card__title">{{ review.title }}</h4>
              </header>
              <p class="review-card__content">{{ review.content }}</p>
              <footer class="review-card__footer">
                <span>👍 {{ review.likes }}</span>
                <span>{{ review.createdAt | date:'mediumDate' }}</span>
              </footer>
            </article>
          }
        </div>
      } @else {
        <p>No hay reviews todavía. ¡Sé el primero en opinar!</p>
      }
    </section>

    <!-- Navegación -->
    <nav class="movie-detail__nav">
      <a routerLink="/movies" class="movie-detail__back">
        ← Volver a películas
      </a>
    </nav>
  </article>
} @else {
  <div class="movie-detail__loading">
    <p>Cargando película...</p>
  </div>
}
```

### Configuración de ruta

```typescript
// app.routes.ts
import { movieResolver } from './core/resolvers/movie.resolver';

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

---

## Solución C6: Comunicación entre Componentes

### filter.service.ts

```typescript
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FilterState {
  search: string;
  genres: string[];
  yearRange: { from: number | null; to: number | null };
  minRating: number | null;
  status: string | null;
}

const initialState: FilterState = {
  search: '',
  genres: [],
  yearRange: { from: null, to: null },
  minRating: null,
  status: null
};

@Injectable({ providedIn: 'root' })
export class FilterService {
  // BehaviorSubject para suscripciones
  private filtersSubject = new BehaviorSubject<FilterState>(initialState);
  filters$ = this.filtersSubject.asObservable();

  // Signal para acceso síncrono
  currentFilters = signal<FilterState>(initialState);

  /**
   * Actualizar filtros
   */
  updateFilters(partial: Partial<FilterState>): void {
    const newFilters = { ...this.currentFilters(), ...partial };
    this.currentFilters.set(newFilters);
    this.filtersSubject.next(newFilters);
  }

  /**
   * Establecer búsqueda
   */
  setSearch(search: string): void {
    this.updateFilters({ search });
  }

  /**
   * Toggle género
   */
  toggleGenre(genre: string): void {
    const current = this.currentFilters().genres;
    const genres = current.includes(genre)
      ? current.filter(g => g !== genre)
      : [...current, genre];
    this.updateFilters({ genres });
  }

  /**
   * Establecer rango de años
   */
  setYearRange(from: number | null, to: number | null): void {
    this.updateFilters({ yearRange: { from, to } });
  }

  /**
   * Establecer rating mínimo
   */
  setMinRating(rating: number | null): void {
    this.updateFilters({ minRating: rating });
  }

  /**
   * Establecer estado
   */
  setStatus(status: string | null): void {
    this.updateFilters({ status });
  }

  /**
   * Limpiar todos los filtros
   */
  clearAll(): void {
    this.currentFilters.set(initialState);
    this.filtersSubject.next(initialState);
  }

  /**
   * Eliminar un filtro específico
   */
  removeFilter(key: keyof FilterState): void {
    switch (key) {
      case 'search':
        this.updateFilters({ search: '' });
        break;
      case 'genres':
        this.updateFilters({ genres: [] });
        break;
      case 'yearRange':
        this.updateFilters({ yearRange: { from: null, to: null } });
        break;
      case 'minRating':
        this.updateFilters({ minRating: null });
        break;
      case 'status':
        this.updateFilters({ status: null });
        break;
    }
  }

  /**
   * Verificar si hay filtros activos
   */
  hasActiveFilters(): boolean {
    const filters = this.currentFilters();
    return (
      filters.search !== '' ||
      filters.genres.length > 0 ||
      filters.yearRange.from !== null ||
      filters.yearRange.to !== null ||
      filters.minRating !== null ||
      filters.status !== null
    );
  }
}
```

### filter-panel.ts

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <aside class="filter-panel">
      <h2 class="filter-panel__title">Filtros</h2>

      <!-- Búsqueda -->
      <div class="filter-panel__group">
        <label for="search">Buscar</label>
        <input 
          type="text" 
          id="search"
          [ngModel]="filterService.currentFilters().search"
          (ngModelChange)="filterService.setSearch($event)"
          placeholder="Buscar..."
        >
      </div>

      <!-- Géneros -->
      <div class="filter-panel__group">
        <label>Géneros</label>
        @for (genre of genres; track genre) {
          <label class="filter-panel__checkbox">
            <input 
              type="checkbox"
              [checked]="filterService.currentFilters().genres.includes(genre)"
              (change)="filterService.toggleGenre(genre)"
            >
            {{ genre }}
          </label>
        }
      </div>

      <!-- Rating mínimo -->
      <div class="filter-panel__group">
        <label for="rating">Rating mínimo</label>
        <select 
          id="rating"
          [ngModel]="filterService.currentFilters().minRating"
          (ngModelChange)="filterService.setMinRating($event)"
        >
          <option [ngValue]="null">Cualquiera</option>
          @for (r of [1,2,3,4,5]; track r) {
            <option [ngValue]="r">{{ r }}+ ⭐</option>
          }
        </select>
      </div>

      <!-- Botón limpiar -->
      <button 
        class="filter-panel__clear"
        (click)="filterService.clearAll()"
        [disabled]="!filterService.hasActiveFilters()"
      >
        Limpiar filtros
      </button>
    </aside>
  `,
  styleUrl: './filter-panel.scss'
})
export class FilterPanel {
  filterService = inject(FilterService);
  
  genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller'];
}
```

### active-filters.ts

```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterService, FilterState } from '../../services/filter.service';

@Component({
  selector: 'app-active-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (filterService.hasActiveFilters()) {
      <div class="active-filters">
        <span class="active-filters__label">Filtros activos:</span>
        
        @if (filters().search) {
          <span class="active-filters__chip">
            Búsqueda: "{{ filters().search }}"
            <button (click)="filterService.removeFilter('search')">✕</button>
          </span>
        }

        @for (genre of filters().genres; track genre) {
          <span class="active-filters__chip">
            {{ genre }}
            <button (click)="filterService.toggleGenre(genre)">✕</button>
          </span>
        }

        @if (filters().minRating) {
          <span class="active-filters__chip">
            Rating: {{ filters().minRating }}+ ⭐
            <button (click)="filterService.removeFilter('minRating')">✕</button>
          </span>
        }

        <button class="active-filters__clear-all" (click)="filterService.clearAll()">
          Limpiar todo
        </button>
      </div>
    }
  `,
  styleUrl: './active-filters.scss'
})
export class ActiveFilters {
  filterService = inject(FilterService);
  
  filters = this.filterService.currentFilters;
}
```

### movie-grid.ts (componente que recibe los filtros)

```typescript
import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { FilterService, FilterState } from '../../services/filter.service';
import { MovieService, Movie } from '../../services/movie.service';

@Component({
  selector: 'app-movie-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="movie-grid">
      @if (loading()) {
        <div class="movie-grid__loading">Cargando...</div>
      }

      @if (!loading() && movies().length === 0) {
        <div class="movie-grid__empty">
          No se encontraron películas con los filtros seleccionados
        </div>
      }

      @for (movie of movies(); track movie.id) {
        <article class="movie-grid__card">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.year }} • ⭐ {{ movie.rating }}</p>
        </article>
      }
    </div>
  `,
  styleUrl: './movie-grid.scss'
})
export class MovieGrid implements OnInit, OnDestroy {
  private filterService = inject(FilterService);
  private movieService = inject(MovieService);
  private destroy$ = new Subject<void>();

  movies = signal<Movie[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    // Suscribirse a cambios de filtros
    this.filterService.filters$.pipe(
      takeUntil(this.destroy$),
      switchMap(filters => {
        this.loading.set(true);
        return this.movieService.getMoviesFiltered(1, 20, {
          search: filters.search || undefined,
          genre: filters.genres[0] || undefined,
          minRating: filters.minRating || undefined
        });
      })
    ).subscribe({
      next: (response) => {
        this.movies.set(response.items);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Página contenedora

```typescript
import { Component } from '@angular/core';
import { FilterPanel } from '../../components/filter-panel/filter-panel';
import { ActiveFilters } from '../../components/active-filters/active-filters';
import { MovieGrid } from '../../components/movie-grid/movie-grid';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [FilterPanel, ActiveFilters, MovieGrid],
  template: `
    <div class="movies-page">
      <aside class="movies-page__sidebar">
        <app-filter-panel />
      </aside>
      
      <main class="movies-page__content">
        <app-active-filters />
        <app-movie-grid />
      </main>
    </div>
  `,
  styles: [`
    .movies-page {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: var(--spacing-lg);
      padding: var(--spacing-lg);
    }

    @media (max-width: 768px) {
      .movies-page {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MoviesPage {}
```

---

# 🎯 Resumen

Este documento contiene las soluciones completas para todos los ejercicios de práctica. Recuerda:

1. **Diseño**: Usa siempre BEM, variables CSS y piensa en responsive
2. **Servidor**: Usa Signals para estado, RxJS para async, interfaces tipadas
3. **Clientes**: Componentes standalone, control flow moderno, formularios reactivos

¡Buena suerte en los exámenes! 🍀
