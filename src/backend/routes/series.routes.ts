/**
 * Configuración de rutas para Series
 * 
 * Este archivo muestra cómo configurar las rutas con Express
 * y aplicar los middlewares de autenticación y validación
 * 
 * NOTA: Para implementar completamente necesitarás:
 *   npm install express
 *   npm install --save-dev @types/express
 */

// import { Router } from 'express';
// import { SeriesController } from '../controllers/series.controller';
// import { SeriesService } from '../services/series.service';
// import { authMiddleware, authorize, optionalAuth } from '../middleware/auth.middleware';
// import { validateRequired, validatePagination } from '../middleware/validation.middleware';
// import { asyncHandler } from '../middleware/error.middleware';

/**
 * Configuración de rutas para Series
 * 
 * Ejemplo de uso en el servidor principal:
 *   import seriesRoutes from './routes/series.routes';
 *   app.use('/api/series', seriesRoutes);
 */
export const configureSeriesRoutes = (router: any, controller: any) => {
  // Rutas públicas (no requieren autenticación)
  router.get(
    '/',
    // validatePagination,
    controller.findAll.bind(controller)
  );

  router.get(
    '/:id',
    controller.findById.bind(controller)
  );

  router.get(
    '/search/:title',
    controller.searchByTitle.bind(controller)
  );

  router.get(
    '/genre/:genreId',
    // validatePagination,
    controller.findByGenre.bind(controller)
  );

  router.get(
    '/top-rated',
    controller.getTopRated.bind(controller)
  );

  router.get(
    '/popular',
    controller.getMostPopular.bind(controller)
  );

  router.get(
    '/recent',
    controller.getRecentlyAdded.bind(controller)
  );

  router.get(
    '/airing',
    controller.getCurrentlyAiring.bind(controller)
  );

  router.get(
    '/stats',
    controller.getStatistics.bind(controller)
  );

  // Rutas protegidas (solo ADMIN)
  router.post(
    '/',
    // authMiddleware,
    // authorize(['ADMIN']),
    // validateRequired(['title', 'originalTitle', 'firstAirDate', 'numberOfSeasons', 'numberOfEpisodes']),
    controller.create.bind(controller)
  );

  router.put(
    '/:id',
    // authMiddleware,
    // authorize(['ADMIN']),
    controller.update.bind(controller)
  );

  router.delete(
    '/:id',
    // authMiddleware,
    // authorize(['ADMIN']),
    controller.delete.bind(controller)
  );

  router.post(
    '/:id/genres/:genreId',
    // authMiddleware,
    // authorize(['ADMIN']),
    controller.addGenre.bind(controller)
  );

  router.delete(
    '/:id/genres/:genreId',
    // authMiddleware,
    // authorize(['ADMIN']),
    controller.removeGenre.bind(controller)
  );
};

/**
 * IMPLEMENTACIÓN COMPLETA:
 * 
 * import { Router } from 'express';
 * import { SeriesController } from '../controllers/series.controller';
 * import { SeriesService } from '../services/series.service';
 * import { SeriesRepository } from '../repositories/series.repository';
 * import { authMiddleware, authorize } from '../middleware';
 * 
 * const router = Router();
 * const seriesRepository = new SeriesRepository();
 * const seriesService = new SeriesService(seriesRepository);
 * const seriesController = new SeriesController(seriesService);
 * 
 * configureSeriesRoutes(router, seriesController);
 * 
 * export default router;
 */
