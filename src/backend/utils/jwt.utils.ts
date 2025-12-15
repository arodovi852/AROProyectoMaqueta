/**
 * Utilidades para manejo de JWT (JSON Web Tokens)
 * 
 * Para implementar completamente JWT necesitarás instalar:
 *   npm install jsonwebtoken
 *   npm install --save-dev @types/jsonwebtoken
 * 
 * Y configurar una clave secreta en .env:
 *   JWT_SECRET=tu-clave-secreta-muy-segura
 *   JWT_EXPIRES_IN=7d
 */

import { UserRole } from '../models/enums';

// Interfaces para los datos del token
export interface TokenPayload {
  id: string;
  email: string;
  username: string;
  role: UserRole;
}

export interface TokenResponse {
  token: string;
  expiresIn: string;
}

/**
 * Genera un token JWT para un usuario
 * 
 * Implementación básica - REQUIERE librería jsonwebtoken
 * 
 * @param payload Datos del usuario a incluir en el token
 * @returns Token JWT firmado
 */
export const generateToken = (payload: TokenPayload): string => {
  // IMPLEMENTACIÓN COMPLETA (descomenta cuando instales jsonwebtoken):
  /*
  import jwt from 'jsonwebtoken';
  
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign(payload, secret, {
    expiresIn,
    issuer: 'broadcasttd',
    audience: 'broadcasttd-users',
  });
  */

  // Por ahora, estructura básica:
  console.warn('JWT generation not implemented - install jsonwebtoken package');
  return 'mock-token';
};

/**
 * Verifica y decodifica un token JWT
 * 
 * @param token Token JWT a verificar
 * @returns Payload decodificado
 * @throws Error si el token es inválido o ha expirado
 */
export const verifyToken = (token: string): TokenPayload => {
  // IMPLEMENTACIÓN COMPLETA (descomenta cuando instales jsonwebtoken):
  /*
  import jwt from 'jsonwebtoken';
  
  const secret = process.env.JWT_SECRET || 'your-secret-key';

  try {
    const decoded = jwt.verify(token, secret, {
      issuer: 'broadcasttd',
      audience: 'broadcasttd-users',
    }) as TokenPayload;

    return decoded;
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expirado');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Token inválido');
    }
    throw error;
  }
  */

  // Por ahora, estructura básica:
  console.warn('JWT verification not implemented - install jsonwebtoken package');
  throw new Error('JWT not implemented');
};

/**
 * Genera un refresh token (token de renovación)
 * 
 * Los refresh tokens tienen mayor duración y se usan para
 * obtener nuevos access tokens sin requerir login
 */
export const generateRefreshToken = (userId: string): string => {
  // IMPLEMENTACIÓN COMPLETA:
  /*
  import jwt from 'jsonwebtoken';
  
  const secret = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

  return jwt.sign(
    { id: userId, type: 'refresh' },
    secret,
    { expiresIn: '30d' }
  );
  */

  console.warn('Refresh token generation not implemented');
  return 'mock-refresh-token';
};

/**
 * Decodifica un token sin verificar la firma
 * 
 * Útil para debugging o para extraer información
 * de tokens cuando no importa si son válidos
 */
export const decodeToken = (token: string): TokenPayload | null => {
  // IMPLEMENTACIÓN COMPLETA:
  /*
  import jwt from 'jsonwebtoken';
  
  try {
    return jwt.decode(token) as TokenPayload;
  } catch (error) {
    return null;
  }
  */

  console.warn('Token decode not implemented');
  return null;
};

/**
 * Extrae el token del header Authorization
 * 
 * @param authHeader Header "Authorization" de la petición
 * @returns Token JWT sin el prefijo "Bearer "
 */
export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.substring(7);
};

/**
 * Genera tokens de acceso y renovación
 * 
 * @param user Datos del usuario
 * @returns Objeto con ambos tokens
 */
export const generateTokens = (user: TokenPayload): { accessToken: string; refreshToken: string } => {
  return {
    accessToken: generateToken(user),
    refreshToken: generateRefreshToken(user.id),
  };
};
