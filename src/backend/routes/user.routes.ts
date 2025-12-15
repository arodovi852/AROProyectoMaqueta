/**
 * Configuración de rutas para Users (Usuarios)
 * 
 * Incluye autenticación JWT y autorización por rol
 */

export const configureUserRoutes = (router: any, controller: any) => {
  // Rutas públicas (no requieren autenticación)
  router.post(
    '/register',
    // validateRequired(['email', 'username', 'password']),
    // validateEmail,
    // validatePassword,
    controller.register.bind(controller)
  );

  router.post(
    '/login',
    // validateRequired(['email', 'password']),
    controller.login.bind(controller)
  );

  // Rutas protegidas (requieren autenticación)
  router.get(
    '/profile',
    // authMiddleware,
    controller.getProfile.bind(controller)
  );

  router.get(
    '/:id',
    // optionalAuth, // Puede ver perfil público sin auth
    controller.findById.bind(controller)
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

  // Ruta solo para ADMIN
  router.get(
    '/',
    // authMiddleware,
    // authorize(['ADMIN']),
    // validatePagination,
    controller.findAll.bind(controller)
  );
};
