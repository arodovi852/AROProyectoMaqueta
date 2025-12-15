/**
 * Utilidad para hashear y verificar contraseñas
 * 
 * Para implementar completamente necesitarás instalar:
 *   npm install bcryptjs
 *   npm install --save-dev @types/bcryptjs
 */

/**
 * Hashea una contraseña usando bcrypt
 * 
 * @param password Contraseña en texto plano
 * @returns Hash de la contraseña
 */
export const hashPassword = async (password: string): Promise<string> => {
  // Implementación simulada con crypto nativo de Node.js
  // En producción real, usar bcryptjs:
  // import bcrypt from 'bcryptjs';
  // return await bcrypt.hash(password, 10);
  
  const crypto = require('crypto');
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
};

/**
 * Verifica una contraseña contra su hash
 * 
 * @param password Contraseña en texto plano
 * @param hash Hash almacenado
 * @returns true si coinciden, false si no
 */
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  // Implementación con crypto nativo de Node.js
  // En producción real, usar bcryptjs:
  // import bcrypt from 'bcryptjs';
  // return await bcrypt.compare(password, hash);
  
  try {
    const crypto = require('crypto');
    const [salt, originalHash] = hash.split(':');
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return originalHash === verifyHash;
  } catch (error) {
    return false;
  }
};

/**
 * Genera una contraseña aleatoria segura
 * 
 * @param length Longitud de la contraseña
 * @returns Contraseña aleatoria
 */
export const generateRandomPassword = (length: number = 12): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
};

/**
 * Valida la fortaleza de una contraseña
 * 
 * @param password Contraseña a validar
 * @returns Objeto con validación y mensajes
 */
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra minúscula');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra mayúscula');
  }

  if (!/\d/.test(password)) {
    errors.push('La contraseña debe contener al menos un número');
  }

  // Opcionalmente, verificar caracteres especiales
  // if (!/[!@#$%^&*]/.test(password)) {
  //   errors.push('La contraseña debe contener al menos un carácter especial');
  // }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
