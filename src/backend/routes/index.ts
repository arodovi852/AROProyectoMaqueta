/**
 * Archivo barrel para exportar configuraciones de rutas
 * 
 * Estas funciones configuran las rutas de Express para cada entidad.
 * Descomenta los middlewares cuando implementes Express.
 */

export { configureSeriesRoutes } from './series.routes';
export { configureUserSeriesRoutes } from './user-series.routes';
export { configureReviewRoutes } from './review.routes';
export { configureUserRoutes } from './user.routes';

// También puedes crear configuraciones para:
// - Watchlist routes
// - List routes
// - Genre routes
// - Contact routes
