/**
 * Middleware de manejo de errores global
 * 
 * Captura todos los errores no manejados y devuelve
 * una respuesta JSON estandarizada
 */

interface ErrorWithStatus extends Error {
  statusCode?: number;
  code?: string;
}

/**
 * Middleware de manejo de errores
 * 
 * Debe colocarse al final de todas las rutas:
 *   app.use(errorHandler);
 */
export const errorHandler = (
  err: ErrorWithStatus,
  req: any,
  res: any,
  next: any
): void => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      code: err.code,
    }),
  });
};

/**
 * Middleware para rutas no encontradas (404)
 */
export const notFoundHandler = (req: any, res: any): void => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
};

/**
 * Wrapper para funciones async de controladores
 * 
 * Evita tener que usar try-catch en cada controlador,
 * captura automáticamente errores de funciones async
 * 
 * Uso:
 *   router.get('/endpoint', asyncHandler(controller.method));
 */
export const asyncHandler = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
