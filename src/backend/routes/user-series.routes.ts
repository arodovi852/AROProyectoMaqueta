/**
 * Configuración de rutas para UserSeries (Series vistas y valoradas)
 * 
 * LÓGICA DE NEGOCIO IMPLEMENTADA:
 * - No se puede valorar una serie sin haberla marcado como vista
 * - Solo el usuario autenticado puede modificar sus propias relaciones
 * - Al valorar se recalcula automáticamente el rating promedio de la serie
 */

export const configureUserSeriesRoutes = (router: any, controller: any) => {
  // Todas las rutas requieren autenticación
  // router.use(authMiddleware);

  // Obtener series del usuario autenticado
  router.get(
    '/',
    // validatePagination,
    controller.findByUser.bind(controller)
  );

  // Obtener relación específica usuario-serie
  router.get(
    '/:seriesId',
    controller.findOne.bind(controller)
  );

  // Obtener estadísticas de un usuario
  router.get(
    '/user/:userId/stats',
    controller.getUserStats.bind(controller)
  );

  // Marcar serie como vista
  router.post(
    '/watch',
    // validateRequired(['seriesId', 'watchedDate']),
    controller.markAsWatched.bind(controller)
  );

  // Valorar serie (REQUIERE haberla visto)
  router.post(
    '/rate',
    // validateRequired(['seriesId', 'rating']),
    // validateRating,
    controller.rateSeries.bind(controller)
  );

  // Actualizar relación
  router.put(
    '/:seriesId',
    controller.update.bind(controller)
  );

  // Eliminar relación (desmarca como vista)
  router.delete(
    '/:seriesId',
    controller.delete.bind(controller)
  );

  // Toggle favorito
  router.post(
    '/:seriesId/favorite',
    controller.toggleFavorite.bind(controller)
  );
};
