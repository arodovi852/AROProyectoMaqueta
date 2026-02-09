# Series API - Spring Boot Backend

Backend REST API para la aplicación de series de TV, con integración preparada para TMDB.

## 🚀 Inicio Rápido

### Requisitos
- Java 17 o superior
- Maven 3.6+

### Ejecución

```bash
# Navegar al directorio del backend
cd backend

# Ejecutar con Maven
./mvnw spring-boot:run

# O en Windows
mvnw.cmd spring-boot:run
```

El servidor se iniciará en `http://localhost:8080`

## 📡 API Endpoints

### Series

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/series` | Obtener todas las series |
| GET | `/api/series/{id}` | Obtener serie por ID |
| GET | `/api/series/paginated` | Obtener series con paginación |
| GET | `/api/series/search?query=` | Buscar series |
| GET | `/api/series/genres` | Obtener todos los géneros |
| POST | `/api/series` | Crear nueva serie |
| PUT | `/api/series/{id}` | Actualizar serie completa |
| PATCH | `/api/series/{id}` | Actualizar serie parcial |
| DELETE | `/api/series/{id}` | Eliminar serie |

### Health Check

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Estado del servicio |
| GET | `/api` | Información de la API |

## 📦 Ejemplos de Peticiones

### Obtener todas las series
```bash
curl http://localhost:8080/api/series
```

### Obtener series paginadas con filtro
```bash
curl "http://localhost:8080/api/series/paginated?page=1&pageSize=5&search=stranger&genre=Horror"
```

### Buscar series
```bash
curl "http://localhost:8080/api/series/search?query=breaking"
```

### Crear nueva serie
```bash
curl -X POST http://localhost:8080/api/series \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Series",
    "description": "A great new series",
    "year": 2024,
    "genre": ["Drama", "Thriller"],
    "seasons": 1,
    "status": "ongoing"
  }'
```

### Actualizar serie
```bash
curl -X PUT http://localhost:8080/api/series/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "seasons": 4
  }'
```

### Eliminar serie
```bash
curl -X DELETE http://localhost:8080/api/series/1
```

## ⚙️ Configuración

### application.properties

```properties
# Puerto del servidor
server.port=8080

# TMDB API (para modo API real)
tmdb.api.key=YOUR_TMDB_API_KEY
tmdb.api.base-url=https://api.themoviedb.org/3

# CORS (orígenes permitidos)
cors.allowed-origins=http://localhost:4200,http://localhost:3000

# Modo Mock (true = datos simulados, false = API TMDB real)
api.mock-mode=true
```

## 🔗 Integración con Angular

Para conectar el frontend Angular con este backend:

1. Asegúrate de que el backend esté corriendo en `http://localhost:8080`
2. Actualiza el `ApiService` de Angular para usar la URL base correcta:

```typescript
// En api.service.ts
private readonly baseUrl = 'http://localhost:8080/api';
```

## 🎬 TMDB API

Este backend está preparado para integración con [The Movie Database API](https://developer.themoviedb.org/reference/search-tv).

Para activar la integración real:

1. Obtén una API key en https://www.themoviedb.org/settings/api
2. Configura `tmdb.api.key` en application.properties
3. Cambia `api.mock-mode=false`

## 🏗️ Estructura del Proyecto

```
backend/
├── pom.xml
└── src/
    └── main/
        ├── java/com/aroproyecto/seriesapi/
        │   ├── SeriesApiApplication.java
        │   ├── config/
        │   │   ├── CorsConfig.java
        │   │   └── WebClientConfig.java
        │   ├── controller/
        │   │   ├── HealthController.java
        │   │   └── SeriesController.java
        │   ├── dto/
        │   │   ├── CreateSeriesDto.java
        │   │   ├── PaginatedResponse.java
        │   │   └── UpdateSeriesDto.java
        │   ├── exception/
        │   │   └── GlobalExceptionHandler.java
        │   ├── model/
        │   │   └── Series.java
        │   └── service/
        │       ├── SeriesService.java
        │       └── TmdbService.java
        └── resources/
            └── application.properties
```

## 📝 Notas

- Por defecto, la API corre en **modo mock** con datos de ejemplo
- Los datos mock coinciden con los del frontend Angular
- CORS está configurado para permitir peticiones desde Angular (puerto 4200)
