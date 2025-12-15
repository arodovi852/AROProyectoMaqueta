import { UserRole } from '../models/enums';

/**
 * Middleware de autenticación JWT
 * 
 * Extrae y verifica el token JWT del header Authorization
 * y añade la información del usuario a req.user
 * 
 * Uso:
 *   router.get('/protected', authMiddleware, handler);
 */
export const authMiddleware = async (req: any, res: any, next: any): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Token de autenticación no proporcionado',
      });
      return;
    }

    const token = authHeader.substring(7); // Remover "Bearer "

    // Importar las utilidades JWT
    const { verifyToken } = require('../utils/jwt.utils');
    
    // Verificar y decodificar el token
    const decoded = verifyToken(token);

    // Añadir usuario a la request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role,
    };

    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || 'Token inválido o expirado',
    });
  }
};

/**
 * Middleware de autorización por rol
 * 
 * Verifica que el usuario autenticado tenga uno de los roles permitidos
 * 
 * Uso:
 *   router.delete('/admin-only', authMiddleware, authorize(['ADMIN']), handler);
 */
export const authorize = (allowedRoles: UserRole[]) => {
  return (req: any, res: any, next: any): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Usuario no autenticado',
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'No tienes permisos para realizar esta acción',
      });
      return;
    }

    next();
  };
};

/**
 * Middleware opcional de autenticación
 * 
 * Intenta autenticar pero no falla si no hay token.
 * Útil para endpoints que cambian comportamiento según si hay usuario o no.
 * 
 * Uso:
 *   router.get('/public-but-personalized', optionalAuth, handler);
 */
export const optionalAuth = async (req: any, res: any, next: any): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      // Intentar verificar token
      const { verifyToken } = require('../utils/jwt.utils');
      try {
        const decoded = verifyToken(token);
        req.user = {
          id: decoded.id,
          email: decoded.email,
          username: decoded.username,
          role: decoded.role,
        };
      } catch (error) {
        // Si falla, continuar sin usuario
      }
    }

    next();
  } catch (error) {
    // Si falla la verificación, continuar sin usuario
    next();
  }
};
