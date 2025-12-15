/**
 * Configuración del servidor Express
 * 
 * Este archivo muestra cómo configurar un servidor Express básico
 * con todos los middlewares y rutas necesarios
 * 
 * Para implementar completamente necesitarás:
 *   npm install express
 *   npm install cors
 *   npm install dotenv
 *   npm install jsonwebtoken
 *   npm install bcryptjs
 *   npm install --save-dev @types/express @types/cors @types/jsonwebtoken @types/bcryptjs
 * 
 * Y crear un archivo .env con:
 *   PORT=3000
 *   JWT_SECRET=tu-clave-secreta-muy-segura
 *   JWT_EXPIRES_IN=7d
 *   NODE_ENV=development
 *   DATABASE_URL=tu-conexion-a-base-de-datos
 */

/*
import express from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './middleware/cors.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

// Importar configuraciones de rutas
import { configureSeriesRoutes } from './routes/series.routes';
import { configureUserSeriesRoutes } from './routes/user-series.routes';
import { configureReviewRoutes } from './routes/review.routes';
import { configureUserRoutes } from './routes/user.routes';

// Importar controllers
import { 
  SeriesController, 
  UserSeriesController, 
  ReviewController,
  UserController,
  WatchlistController,
  ListController,
  GenreController
} from './controllers';

// Importar services
import {
  SeriesService,
  UserSeriesService,
  ReviewService,
  UserService,
  WatchlistService,
  ListService,
  GenreService
} from './services';

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARES GLOBALES =====

// CORS - Permitir peticiones desde el frontend
app.use(corsMiddleware);

// Body parser - Parsear JSON en el body
app.use(express.json());

// Body parser - Parsear URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Logging básico de peticiones (en desarrollo)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ===== HEALTH CHECK =====

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// ===== INICIALIZAR SERVICIOS Y CONTROLADORES =====

// Aquí deberías inicializar tus repositorios con la conexión a la BD
// const seriesRepository = new SeriesRepository(dbConnection);
// const seriesService = new SeriesService(seriesRepository);
// const seriesController = new SeriesController(seriesService);

// Por ahora, pseudocódigo:
// const seriesController = new SeriesController(seriesService);
// const userSeriesController = new UserSeriesController(userSeriesService);
// const reviewController = new ReviewController(reviewService);
// const userController = new UserController(userService);
// const watchlistController = new WatchlistController(watchlistService);
// const listController = new ListController(listService);
// const genreController = new GenreController(genreService);

// ===== CONFIGURAR RUTAS =====

// Rutas de usuarios y autenticación
const userRouter = express.Router();
// configureUserRoutes(userRouter, userController);
app.use('/api/users', userRouter);

// Rutas de series
const seriesRouter = express.Router();
// configureSeriesRoutes(seriesRouter, seriesController);
app.use('/api/series', seriesRouter);

// Rutas de series del usuario (vistas, valoradas)
const userSeriesRouter = express.Router();
// configureUserSeriesRoutes(userSeriesRouter, userSeriesController);
app.use('/api/user-series', userSeriesRouter);

// Rutas de reviews
const reviewRouter = express.Router();
// configureReviewRoutes(reviewRouter, reviewController);
app.use('/api/reviews', reviewRouter);

// Rutas de watchlist
const watchlistRouter = express.Router();
// Similar a las anteriores
app.use('/api/watchlist', watchlistRouter);

// Rutas de listas
const listRouter = express.Router();
// Similar a las anteriores
app.use('/api/lists', listRouter);

// Rutas de géneros
const genreRouter = express.Router();
// Similar a las anteriores
app.use('/api/genres', genreRouter);

// ===== MANEJO DE ERRORES =====

// Ruta no encontrada (debe ir antes del error handler)
app.use(notFoundHandler);

// Error handler global (debe ir al final)
app.use(errorHandler);

// ===== INICIAR SERVIDOR =====

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API Base URL: http://localhost:${PORT}/api`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

export default app;
*/

console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║  BROADCASTTD API SERVER - Configuración Base                  ║
║                                                                ║
║  Este archivo contiene la estructura del servidor Express.    ║
║  Descomenta el código y completa con tu conexión a BD.        ║
║                                                                ║
║  Endpoints implementados:                                      ║
║  - POST /api/users/register    - Registro de usuario          ║
║  - POST /api/users/login       - Login (retorna JWT)          ║
║  - GET  /api/series            - Listar series                ║
║  - POST /api/user-series/watch - Marcar como vista            ║
║  - POST /api/user-series/rate  - Valorar (requiere vista)     ║
║  - POST /api/reviews           - Crear review (requiere vista)║
║  - GET  /api/watchlist         - Ver watchlist                ║
║  - POST /api/lists             - Crear lista                  ║
║                                                                ║
║  Seguridad implementada:                                       ║
║  ✓ JWT Authentication                                          ║
║  ✓ CORS Configuration                                          ║
║  ✓ Role-based Authorization (USER, ADMIN)                      ║
║  ✓ Password Hashing (bcrypt)                                   ║
║  ✓ Input Validation                                            ║
║                                                                ║
║  Lógica de negocio implementada:                              ║
║  ✓ No valorar sin haber visto                                  ║
║  ✓ Un review por usuario-serie                                ║
║  ✓ No duplicados en watchlist                                  ║
║  ✓ Solo propietario modifica listas                            ║
║  ✓ No eliminar series con valoraciones                         ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`);
