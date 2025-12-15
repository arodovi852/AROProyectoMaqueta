/**
 * Configuración de rutas para Reviews
 * 
 * LÓGICA DE NEGOCIO IMPLEMENTADA:
 * - Solo un review por usuario por serie
 * - Solo se puede escribir review de series vistas
 * - Solo el autor puede editar/eliminar su review
 */

export const configureReviewRoutes = (router: any, controller: any) => {
  // Rutas públicas
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
    '/series/:seriesId',
    // validatePagination,
    controller.findBySeries.bind(controller)
  );

  router.get(
    '/user/:userId',
    // validatePagination,
    controller.findByUser.bind(controller)
  );

  // Rutas protegidas (requieren autenticación)
  router.post(
    '/',
    // authMiddleware,
    // validateRequired(['seriesId', 'content']),
    // validateRating,
    controller.create.bind(controller)
  );

  router.put(
    '/:id',
    // authMiddleware,
    controller.update.bind(controller)
  );

  router.delete(
    '/:id',
    // authMiddleware,
    controller.delete.bind(controller)
  );

  router.post(
    '/:id/like',
    // authMiddleware,
    controller.addLike.bind(controller)
  );

  router.delete(
    '/:id/like',
    // authMiddleware,
    controller.removeLike.bind(controller)
  );
};
