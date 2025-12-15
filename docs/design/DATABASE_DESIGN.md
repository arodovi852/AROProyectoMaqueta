# Diseño de Base de Datos - BROADCASTTD

**Plataforma de Tracking y Valoración de Series (Similar a Letterboxd)**

## 1. Diagrama Entidad-Relación (E/R)

```
┌─────────────────┐
│     USER        │
├─────────────────┤
│ id: UUID        │◄──┐
│ username: string│   │
│ email: string   │   │
│ password: string│   │
│ displayName: str│   │
│ bio: text       │   │
│ avatar: string  │   │
│ role: enum      │   │
│ createdAt: Date │   │
│ updatedAt: Date │   │
└─────────────────┘   │
                      │ 1
       ┌──────────────┼──────────────┐
       │              │              │
       │ 1            │ 1            │ 1
       │              │              │
       ▼ N            ▼ N            ▼ N
┌─────────────────┐┌──────────────┐┌──────────────┐
│   WATCHLIST     ││ USER_SERIES  ││   REVIEW     │
├─────────────────┤├──────────────┤├──────────────┤
│ id: UUID        ││ id: UUID     ││ id: UUID     │
│ userId: UUID    ││ userId: UUID ││ userId: UUID │
│ seriesId: UUID  ││ seriesId: UUID││ seriesId: UUID│
│ createdAt: Date ││ rating: num  ││ title: string│
└─────────────────┘│ isWatched:bool││ content: text│
                   │ watchedAt:Date││ rating: num  │
                   │ createdAt:Date││ isSpoiler:bool│
                   │ updatedAt:Date││ likes: number│
                   └──────────────┘│ createdAt:Date│
                          │         │ updatedAt:Date│
                          │         └──────────────┘
                          │                │
                          │ N              │ N
                          │ 1              │ 1
                          ▼                ▼
                   ┌──────────────────────────┐
                   │        SERIES            │
                   ├──────────────────────────┤
                   │ id: UUID                 │◄───┐
                   │ title: string            │    │
                   │ originalTitle: string    │    │
                   │ overview: text           │    │
                   │ releaseDate: Date        │    │
                   │ endDate: Date            │    │
                   │ status: enum             │    │
                   │ posterUrl: string        │    │
                   │ backdropUrl: string      │    │
                   │ numberOfSeasons: int     │    │
                   │ numberOfEpisodes: int    │    │
                   │ runtime: int             │    │
                   │ originCountry: string    │    │
                   │ originalLanguage: string │    │
                   │ tmdbId: string           │    │
                   │ imdbId: string           │    │
                   │ averageRating: decimal   │    │
                   │ ratingsCount: int        │    │
                   │ createdAt: Date          │    │
                   │ updatedAt: Date          │    │
                   └──────────────────────────┘    │
                              │                    │
                              │ N                  │ N
                              │                    │
                              │ N                  │ 1
                              ▼                    │
                   ┌──────────────────┐            │
                   │  SERIES_GENRE    │            │
                   ├──────────────────┤            │
                   │ id: UUID         │            │
                   │ seriesId: UUID   │────────────┘
                   │ genreId: UUID    │────┐
                   │ createdAt: Date  │    │
                   └──────────────────┘    │
                              │            │ N
                              │            │
                              │            │ 1
                              │            ▼
                              │     ┌─────────────┐
                              │     │   GENRE     │
                              │     ├─────────────┤
                              │     │ id: UUID    │
                              │     │ name: string│
                              │     │ slug: string│
                              │     │ createdAt:Date│
                              │     └─────────────┘
                              │
                              │ N
                              │
                              │ 1
                              ▼
                   ┌──────────────────┐
                   │    LIST_ITEM     │
                   ├──────────────────┤
                   │ id: UUID         │
                   │ listId: UUID     │◄────┐
                   │ seriesId: UUID   │     │
                   │ order: int       │     │
                   │ notes: text      │     │
                   │ createdAt: Date  │     │
                   └──────────────────┘     │
                              │             │ N
                              │             │
                              │ N           │ 1
                              │             │
                              │ 1           │
                              ▼             │
┌─────────────────┐    ┌──────────────────────┐
│     USER        │    │        LIST          │
├─────────────────┤    ├──────────────────────┤
│ (arriba)        │◄───│ id: UUID             │
└─────────────────┘  1 │ userId: UUID         │
                     N │ name: string         │
                       │ description: text    │
                       │ isPublic: boolean    │
                       │ itemCount: int       │
                       │ createdAt: Date      │
                       │ updatedAt: Date      │
                       └──────────────────────┘


┌─────────────────┐
│    CONTACT      │
├─────────────────┤
│ id: UUID        │
│ name: string    │
│ email: string   │
│ phone: string   │
│ subject: string │
│ message: text   │
│ status: enum    │
│ createdAt: Date │
│ respondedAt: Date│
└─────────────────┘
```

## 2. Descripción de Entidades

### 2.1 USER (Usuario)
Almacena la información de los usuarios registrados en la plataforma.

**Campos:**
- `id` (UUID, PK): Identificador único del usuario
- `username` (string, unique, required): Nombre de usuario único para la plataforma
- `email` (string, unique, required): Email del usuario para autenticación
- `password` (string, required): Contraseña hasheada
- `displayName` (string, required): Nombre visible en el perfil
- `bio` (text, optional): Biografía del usuario
- `avatar` (string, optional): URL del avatar del usuario
- `role` (enum, required): Rol del usuario (ADMIN, USER)
- `createdAt` (Date): Fecha de creación del registro
- `updatedAt` (Date): Fecha de última actualización

**Relaciones:**
- Tiene muchos (1:N) WATCHLIST
- Tiene muchos (1:N) USER_SERIES
- Tiene muchos (1:N) REVIEWS
- Tiene muchos (1:N) LISTS

**Índices:**
- Primary Key: `id`
- Unique: `email`, `username`
- Index: `role`

**Reglas de Negocio:**
- El email y username deben ser únicos en el sistema
- La contraseña debe cumplir con requisitos mínimos de seguridad
- El rol por defecto es USER
- Un usuario puede eliminar su cuenta (soft delete)

---

### 2.2 SERIES (Serie)
Almacena la información de las series de televisión disponibles en la plataforma.

**Campos:**
- `id` (UUID, PK): Identificador único de la serie
- `title` (string, required): Título de la serie
- `originalTitle` (string, optional): Título original en idioma original
- `overview` (text, required): Sinopsis de la serie
- `releaseDate` (Date, required): Fecha de estreno
- `endDate` (Date, optional): Fecha de finalización (si aplica)
- `status` (enum, required): Estado (RETURNING, ENDED, CANCELLED, IN_PRODUCTION)
- `posterUrl` (string, optional): URL del póster de la serie
- `backdropUrl` (string, optional): URL de la imagen de fondo
- `numberOfSeasons` (integer, required): Número de temporadas
- `numberOfEpisodes` (integer, required): Número total de episodios
- `runtime` (integer, optional): Duración promedio de episodios (en minutos)
- `originCountry` (string, optional): País de origen
- `originalLanguage` (string, optional): Idioma original
- `tmdbId` (string, optional): ID de TMDB (The Movie Database)
- `imdbId` (string, optional): ID de IMDb
- `averageRating` (decimal, computed): Rating promedio calculado
- `ratingsCount` (integer, computed): Número total de valoraciones
- `createdAt` (Date): Fecha de creación del registro
- `updatedAt` (Date): Fecha de última actualización

**Relaciones:**
- Tiene muchos (1:N) SERIES_GENRE
- Tiene muchos (1:N) WATCHLIST
- Tiene muchos (1:N) USER_SERIES
- Tiene muchos (1:N) REVIEWS
- Tiene muchos (1:N) LIST_ITEMS

**Índices:**
- Primary Key: `id`
- Index: `status`, `releaseDate`, `averageRating`
- Full-text search: `title`, `originalTitle`, `overview`
- Unique: `tmdbId`, `imdbId` (cuando no son null)

**Reglas de Negocio:**
- El título debe ser único considerando el año de estreno
- averageRating y ratingsCount se calculan automáticamente desde USER_SERIES
- numberOfSeasons y numberOfEpisodes deben ser >= 1
- runtime debe ser positivo si está presente

---

### 2.3 GENRE (Género)
Categoriza las series por género.

**Campos:**
- `id` (UUID, PK): Identificador único del género
- `name` (string, required): Nombre del género (ej: Drama, Comedy, Sci-Fi)
- `slug` (string, unique): URL-friendly identifier
- `createdAt` (Date): Fecha de creación del registro

**Relaciones:**
- Tiene muchos (1:N) SERIES_GENRE

**Índices:**
- Primary Key: `id`
- Unique: `slug`, `name`

**Reglas de Negocio:**
- El nombre del género debe ser único
- El slug se genera automáticamente del nombre
- No se pueden eliminar géneros con series asociadas

---

### 2.4 SERIES_GENRE (Serie-Género)
Tabla de relación muchos a muchos entre Series y Géneros.

**Campos:**
- `id` (UUID, PK): Identificador único de la relación
- `seriesId` (UUID, FK): Referencia a la serie
- `genreId` (UUID, FK): Referencia al género
- `createdAt` (Date): Fecha de creación del registro

**Relaciones:**
- Pertenece a (N:1) SERIES
- Pertenece a (N:1) GENRE

**Índices:**
- Primary Key: `id`
- Foreign Keys: `seriesId`, `genreId`
- Unique: Combinación de `seriesId` + `genreId`

**Reglas de Negocio:**
- Una serie puede tener múltiples géneros
- No puede haber duplicados de la misma serie-género

---

### 2.5 WATCHLIST (Lista de Pendientes)
Almacena las series que el usuario quiere ver más tarde.

**Campos:**
- `id` (UUID, PK): Identificador único
- `userId` (UUID, FK): Referencia al usuario
- `seriesId` (UUID, FK): Referencia a la serie
- `createdAt` (Date): Fecha en que se agregó a la watchlist

**Relaciones:**
- Pertenece a (N:1) USER
- Pertenece a (N:1) SERIES

**Índices:**
- Primary Key: `id`
- Foreign Keys: `userId`, `seriesId`
- Unique: Combinación de `userId` + `seriesId`
- Index: `createdAt`

**Reglas de Negocio:**
- Un usuario no puede tener la misma serie dos veces en su watchlist
- Al marcar una serie como vista (USER_SERIES), puede opcionalmente eliminarse de la watchlist
- Se puede ordenar por fecha de adición

---

### 2.6 USER_SERIES (Series Vistas y Valoradas)
Almacena las series que el usuario ha visto y su valoración.

**Campos:**
- `id` (UUID, PK): Identificador único
- `userId` (UUID, FK): Referencia al usuario
- `seriesId` (UUID, FK): Referencia a la serie
- `rating` (decimal, optional): Valoración del usuario (0-10 o 1-5 estrellas)
- `isWatched` (boolean, required): Indica si el usuario ha visto la serie
- `watchedAt` (Date, optional): Fecha en que se marcó como vista
- `createdAt` (Date): Fecha de creación del registro
- `updatedAt` (Date): Fecha de última actualización

**Relaciones:**
- Pertenece a (N:1) USER
- Pertenece a (N:1) SERIES

**Índices:**
- Primary Key: `id`
- Foreign Keys: `userId`, `seriesId`
- Unique: Combinación de `userId` + `seriesId`
- Index: `rating`, `watchedAt`

**Reglas de Negocio:**
- Un usuario solo puede tener un registro por serie
- El rating debe estar entre 0 y 10 (o el rango definido)
- isWatched puede ser true sin rating
- Si rating existe, isWatched debe ser true
- Al actualizar rating, se recalcula el averageRating de la serie

---

### 2.7 REVIEW (Reseña)
Almacena las reseñas escritas por usuarios sobre series.

**Campos:**
- `id` (UUID, PK): Identificador único de la reseña
- `userId` (UUID, FK): Referencia al usuario autor
- `seriesId` (UUID, FK): Referencia a la serie
- `title` (string, required): Título de la reseña
- `content` (text, required): Contenido de la reseña
- `rating` (decimal, optional): Valoración asociada (sincronizada con USER_SERIES)
- `isSpoiler` (boolean, default: false): Indica si contiene spoilers
- `likes` (integer, default: 0): Número de "me gusta"
- `createdAt` (Date): Fecha de creación de la reseña
- `updatedAt` (Date): Fecha de última actualización

**Relaciones:**
- Pertenece a (N:1) USER
- Pertenece a (N:1) SERIES

**Índices:**
- Primary Key: `id`
- Foreign Keys: `userId`, `seriesId`
- Index: `likes`, `createdAt`
- Unique: Combinación de `userId` + `seriesId` (una reseña por usuario por serie)

**Reglas de Negocio:**
- Un usuario solo puede escribir una reseña por serie
- El contenido debe tener un mínimo de caracteres (ej: 50)
- Solo el autor puede editar/eliminar su reseña
- Si se actualiza el rating, se sincroniza con USER_SERIES

---

### 2.8 LIST (Lista de Series)
Listas personalizadas creadas por usuarios para organizar series.

**Campos:**
- `id` (UUID, PK): Identificador único de la lista
- `userId` (UUID, FK): Referencia al usuario creador
- `name` (string, required): Nombre de la lista
- `description` (text, optional): Descripción de la lista
- `isPublic` (boolean, default: false): Indica si la lista es pública
- `itemCount` (integer, computed): Número de series en la lista
- `createdAt` (Date): Fecha de creación de la lista
- `updatedAt` (Date): Fecha de última actualización

**Relaciones:**
- Pertenece a (N:1) USER
- Tiene muchos (1:N) LIST_ITEMS

**Índices:**
- Primary Key: `id`
- Foreign Key: `userId`
- Index: `isPublic`, `createdAt`

**Reglas de Negocio:**
- El nombre debe ser único por usuario
- Solo el creador puede modificar la lista
- Las listas públicas son visibles para todos
- itemCount se actualiza automáticamente

---

### 2.9 LIST_ITEM (Item de Lista)
Representa cada serie dentro de una lista personalizada.

**Campos:**
- `id` (UUID, PK): Identificador único del item
- `listId` (UUID, FK): Referencia a la lista
- `seriesId` (UUID, FK): Referencia a la serie
- `order` (integer, required): Orden de la serie en la lista
- `notes` (text, optional): Notas personales sobre por qué está en la lista
- `createdAt` (Date): Fecha de adición a la lista

**Relaciones:**
- Pertenece a (N:1) LIST
- Pertenece a (N:1) SERIES

**Índices:**
- Primary Key: `id`
- Foreign Keys: `listId`, `seriesId`
- Unique: Combinación de `listId` + `seriesId`
- Index: `order`

**Reglas de Negocio:**
- Una serie no puede estar duplicada en la misma lista
- El orden debe ser único dentro de la lista
- Al eliminar un item, se reordenan los siguientes
- Solo el dueño de la lista puede agregar/eliminar items

---

### 2.10 CONTACT (Contacto)
Almacena los mensajes de contacto enviados por usuarios o visitantes.

**Campos:**
- `id` (UUID, PK): Identificador único del mensaje
- `name` (string, required): Nombre del remitente
- `email` (string, required): Email del remitente
- `phone` (string, optional): Teléfono del remitente
- `subject` (string, required): Asunto del mensaje
- `message` (text, required): Contenido del mensaje
- `status` (enum, required): Estado (PENDING, IN_PROGRESS, RESOLVED, CLOSED)
- `createdAt` (Date): Fecha de creación del mensaje
- `respondedAt` (Date, optional): Fecha de respuesta

**Relaciones:**
- Ninguna (entidad independiente)

**Índices:**
- Primary Key: `id`
- Index: `status`, `createdAt`

**Reglas de Negocio:**
- El email debe ser válido
- Solo admins pueden cambiar el estado
- Al responder, se actualiza `respondedAt`
- Los mensajes CLOSED no pueden cambiar de estado

---

## 3. Relaciones Principales

### Relaciones de Usuario

1. **USER → WATCHLIST** (1:N)
   - Un usuario puede tener múltiples series en su watchlist
   - Una entrada de watchlist pertenece a un único usuario

2. **USER → USER_SERIES** (1:N)
   - Un usuario puede valorar/ver múltiples series
   - Un registro de serie vista pertenece a un único usuario

3. **USER → REVIEW** (1:N)
   - Un usuario puede escribir múltiples reseñas
   - Una reseña pertenece a un único usuario

4. **USER → LIST** (1:N)
   - Un usuario puede crear múltiples listas personalizadas
   - Una lista pertenece a un único usuario

### Relaciones de Series

5. **SERIES → WATCHLIST** (1:N)
   - Una serie puede estar en múltiples watchlists de diferentes usuarios
   - Una entrada de watchlist referencia una única serie

6. **SERIES → USER_SERIES** (1:N)
   - Una serie puede ser vista/valorada por múltiples usuarios
   - Un registro de serie vista referencia una única serie

7. **SERIES → REVIEW** (1:N)
   - Una serie puede tener múltiples reseñas de diferentes usuarios
   - Una reseña referencia una única serie

8. **SERIES → SERIES_GENRE** (1:N)
   - Una serie puede tener múltiples géneros
   - Una relación serie-género referencia una única serie

9. **SERIES → LIST_ITEM** (1:N)
   - Una serie puede estar en múltiples listas de diferentes usuarios
   - Un item de lista referencia una única serie

### Relaciones de Géneros

10. **GENRE → SERIES_GENRE** (1:N)
    - Un género puede estar asociado a múltiples series
    - Una relación serie-género referencia un único género

### Relaciones de Listas

11. **LIST → LIST_ITEM** (1:N)
    - Una lista puede contener múltiples series
    - Un item de lista pertenece a una única lista

### Entidad Independiente

- **CONTACT**: No tiene relaciones directas, almacena mensajes de contacto

## 4. Enumeraciones (Enums)

### UserRole
```typescript
enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}
```

### SeriesStatus
```typescript
enum SeriesStatus {
  RETURNING = 'returning',      // Serie en emisión con más temporadas confirmadas
  ENDED = 'ended',               // Serie finalizada
  CANCELLED = 'cancelled',       // Serie cancelada
  IN_PRODUCTION = 'in_production' // Serie en producción/próximo estreno
}
```

### ContactStatus
```typescript
enum ContactStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}
```

## 5. Índices Recomendados

### USER
- `idx_user_email` (UNIQUE) en `email`
- `idx_user_username` (UNIQUE) en `username`
- `idx_user_role` en `role`

### SERIES
- `idx_series_title` en `title` (para búsquedas)
- `idx_series_status` en `status`
- `idx_series_rating` en `averageRating`
- `idx_series_release` en `releaseDate`
- `idx_series_tmdb` (UNIQUE) en `tmdbId` (cuando no es null)
- `idx_series_imdb` (UNIQUE) en `imdbId` (cuando no es null)

### GENRE
- `idx_genre_slug` (UNIQUE) en `slug`
- `idx_genre_name` (UNIQUE) en `name`

### SERIES_GENRE
- `idx_seriesgenre_series` en `seriesId`
- `idx_seriesgenre_genre` en `genreId`
- `idx_seriesgenre_unique` (UNIQUE) en `(seriesId, genreId)` - evita duplicados

### WATCHLIST
- `idx_watchlist_user` en `userId`
- `idx_watchlist_series` en `seriesId`
- `idx_watchlist_unique` (UNIQUE) en `(userId, seriesId)` - evita duplicados
- `idx_watchlist_created` en `createdAt`

### USER_SERIES
- `idx_userseries_user` en `userId`
- `idx_userseries_series` en `seriesId`
- `idx_userseries_unique` (UNIQUE) en `(userId, seriesId)` - evita duplicados
- `idx_userseries_rating` en `rating`
- `idx_userseries_watched` en `watchedAt`

### REVIEW
- `idx_review_user` en `userId`
- `idx_review_series` en `seriesId`
- `idx_review_unique` (UNIQUE) en `(userId, seriesId)` - evita duplicados
- `idx_review_created` en `createdAt`
- `idx_review_likes` en `likes`

### LIST
- `idx_list_user` en `userId`
- `idx_list_public` en `isPublic`
- `idx_list_created` en `createdAt`

### LIST_ITEM
- `idx_listitem_list` en `listId`
- `idx_listitem_series` en `seriesId`
- `idx_listitem_unique` (UNIQUE) en `(listId, seriesId)` - evita duplicados
- `idx_listitem_order` en `order`

### CONTACT
- `idx_contact_status` en `status`
- `idx_contact_email` en `email`
- `idx_contact_created` en `createdAt`

## 6. Restricciones (Constraints)

### Restricciones de Integridad Referencial

```sql
-- WATCHLIST
FOREIGN KEY (userId) REFERENCES USER(id) ON DELETE CASCADE
FOREIGN KEY (seriesId) REFERENCES SERIES(id) ON DELETE CASCADE

-- USER_SERIES
FOREIGN KEY (userId) REFERENCES USER(id) ON DELETE CASCADE
FOREIGN KEY (seriesId) REFERENCES SERIES(id) ON DELETE CASCADE

-- REVIEW
FOREIGN KEY (userId) REFERENCES USER(id) ON DELETE CASCADE
FOREIGN KEY (seriesId) REFERENCES SERIES(id) ON DELETE CASCADE

-- LIST
FOREIGN KEY (userId) REFERENCES USER(id) ON DELETE CASCADE

-- LIST_ITEM
FOREIGN KEY (listId) REFERENCES LIST(id) ON DELETE CASCADE
FOREIGN KEY (seriesId) REFERENCES SERIES(id) ON DELETE CASCADE

-- SERIES_GENRE
FOREIGN KEY (seriesId) REFERENCES SERIES(id) ON DELETE CASCADE
FOREIGN KEY (genreId) REFERENCES GENRE(id) ON DELETE RESTRICT
```

### Restricciones de Validación

```sql
-- USER
CHECK (email LIKE '%@%')
CHECK (LENGTH(password) >= 8)
CHECK (LENGTH(username) >= 3)

-- SERIES
CHECK (numberOfSeasons >= 1)
CHECK (numberOfEpisodes >= 1)
CHECK (runtime > 0 OR runtime IS NULL)
CHECK (averageRating >= 0 AND averageRating <= 10)
CHECK (ratingsCount >= 0)

-- USER_SERIES
CHECK (rating >= 0 AND rating <= 10)
CHECK (isWatched = true OR rating IS NULL) -- Solo se puede valorar si está vista

-- REVIEW
CHECK (LENGTH(content) >= 50)
CHECK (rating >= 0 AND rating <= 10 OR rating IS NULL)
CHECK (likes >= 0)

-- LIST
CHECK (itemCount >= 0)

-- LIST_ITEM
CHECK (`order` >= 0)
```

## 7. Reglas de Negocio

### Series
1. El rating promedio (`averageRating`) se calcula automáticamente desde USER_SERIES
2. El contador de ratings (`ratingsCount`) se actualiza al agregar/eliminar valoraciones
3. Una serie con valoraciones no puede ser eliminada (soft delete)
4. Los títulos únicos consideran año de estreno para evitar duplicados

### Watchlist
1. Un usuario no puede tener la misma serie dos veces en su watchlist
2. Al marcar como vista (USER_SERIES), opcionalmente se elimina de watchlist
3. Se puede ordenar por fecha de adición

### Valoraciones (USER_SERIES)
1. Un usuario solo puede tener un registro por serie
2. Solo se puede valorar una serie si se ha marcado como vista (`isWatched = true`)
3. El rating debe estar entre 0 y 10
4. Al actualizar/eliminar un rating, se recalcula `averageRating` de la serie

### Reseñas (REVIEW)
1. Un usuario solo puede escribir una reseña por serie
2. El contenido debe tener mínimo 50 caracteres
3. Solo el autor puede editar/eliminar su reseña
4. El rating en la reseña se sincroniza con USER_SERIES
5. Las reseñas con spoilers deben estar marcadas (`isSpoiler = true`)

### Listas (LIST)
1. El nombre debe ser único por usuario
2. Solo el creador puede modificar la lista
3. Las listas públicas son visibles para todos los usuarios
4. `itemCount` se actualiza automáticamente al agregar/eliminar items

### Items de Lista (LIST_ITEM)
1. Una serie no puede estar duplicada en la misma lista
2. El orden debe ser único dentro de cada lista
3. Al eliminar un item, se reordenan automáticamente los siguientes
4. Solo el dueño de la lista puede agregar/eliminar items

### Géneros
1. No se pueden eliminar géneros con series asociadas
2. El slug se genera automáticamente del nombre
3. Los nombres de género deben ser únicos

### Usuarios
1. El email y username deben ser únicos
2. La contraseña debe estar hasheada (bcrypt)
3. Un usuario eliminado debe mantener sus contribuciones (reseñas, listas públicas) anonimizadas
4. El rol por defecto es USER

### Contacto
1. Todos los mensajes nuevos tienen estado 'PENDING'
2. Solo admins pueden cambiar el estado de los mensajes
3. Al responder, se actualiza automáticamente `respondedAt`
4. Los mensajes antiguos pueden archivarse pero no eliminarse

## 8. Versionado y Auditoría

Todas las entidades principales incluyen:
- `createdAt`: Fecha de creación (timestamp)
- `updatedAt`: Fecha de última actualización (timestamp automático)

Para auditoría completa (opcional en versiones futuras):
- `createdBy`: Usuario que creó el registro
- `updatedBy`: Usuario que modificó el registro
- `deletedAt`: Soft delete (no eliminar físicamente)

## 9. Consideraciones de Escalabilidad

### Particionamiento
- `USER_SERIES`: Particionar por userId (sharding horizontal)
- `REVIEW`: Particionar por fecha (createdAt) - por mes o trimestre

### Archivado
- Reviews antiguas con baja interacción (> 2 años sin likes) mover a almacenamiento frío
- Contactos resueltos (> 1 año) mover a tabla de archivo

### Caché
- Series más populares (por averageRating y ratingsCount)
- Top series por género
- Perfiles de usuario con estadísticas (número de series vistas, reviews, listas)
- Datos de series de APIs externas (TMDB, IMDb)

### Optimización de Consultas
- Índices compuestos para búsquedas frecuentes (userId + seriesId)
- Materializedviews para estadísticas de usuario
- Full-text search para búsqueda de series por título/descripción

## 10. Migraciones Futuras

Entidades potenciales para fases avanzadas:

1. **SEASON** (Temporadas de series)
   - seriesId, seasonNumber, name, overview, airDate, episodeCount, posterUrl

2. **EPISODE** (Episodios)
   - seasonId, episodeNumber, name, overview, airDate, runtime, stillUrl

3. **USER_EPISODE** (Progreso por episodio)
   - userId, episodeId, isWatched, watchedAt

4. **FOLLOW** (Seguir usuarios)
   - followerId, followingId, createdAt

5. **ACTIVITY** (Feed de actividad)
   - userId, type, content, createdAt (para mostrar actividad de usuarios seguidos)

6. **COMMENT** (Comentarios en reviews)
   - reviewId, userId, content, createdAt

7. **NOTIFICATION** (Notificaciones)
   - userId, type, content, isRead, createdAt

8. **CAST** (Actores/Actrices)
   - name, biography, photoUrl, birthDate

9. **SERIES_CAST** (Relación serie-actor)
   - seriesId, castId, character, order

10. **TAG** (Etiquetas personalizadas)
    - userId, seriesId, tag, createdAt

11. **COLLECTION** (Colecciones temáticas)
    - name, description, isOfficial, creatorId

12. **SERIES_AWARD** (Premios y nominaciones)
    - seriesId, awardName, category, year, isWinner
