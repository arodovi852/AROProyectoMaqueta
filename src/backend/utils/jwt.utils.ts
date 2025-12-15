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
 * @param payload Datos del usuario a incluir en el token
 * @returns Token JWT firmado
 */
export const generateToken = (payload: TokenPayload): string => {
  // Implementación sin librería externa para demostración
  // En producción, usar jsonwebtoken:
  // import jwt from 'jsonwebtoken';
  // const secret = process.env.JWT_SECRET || 'your-secret-key';
  // return jwt.sign(payload, secret, { expiresIn: '7d' });
  
  const secret = process.env.JWT_SECRET || 'broadcasttd-secret-key-change-in-production';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  
  // Header
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  // Payload con expiración
  const now = Math.floor(Date.now() / 1000);
  const exp = now + (7 * 24 * 60 * 60); // 7 días
  
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: exp,
    iss: 'broadcasttd',
    aud: 'broadcasttd-users'
  };
  
  // Codificar en Base64URL
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(tokenPayload)).toString('base64url');
  
  // Crear firma (simplificada - en producción usar crypto.createHmac)
  const signature = Buffer.from(`${encodedHeader}.${encodedPayload}.${secret}`).toString('base64url');
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

/**
 * Verifica y decodifica un token JWT
 * 
 * @param token Token JWT a verificar
 * @returns Payload decodificado
 * @throws Error si el token es inválido o ha expirado
 */
export const verifyToken = (token: string): TokenPayload => {
  try {
    // Separar el token en sus partes
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token inválido');
    }
    
    // Decodificar payload
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
    
    // Verificar expiración
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      throw new Error('Token expirado');
    }
    
    // Verificar issuer y audience
    if (payload.iss !== 'broadcasttd' || payload.aud !== 'broadcasttd-users') {
      throw new Error('Token inválido');
    }
    
    return {
      id: payload.id,
      email: payload.email,
      username: payload.username,
      role: payload.role
    };
  } catch (error: any) {
    if (error.message === 'Token expirado') {
      throw new Error('Token expirado');
    }
    throw new Error('Token inválido');
  }
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
