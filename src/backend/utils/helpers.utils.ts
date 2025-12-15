/**
 * Utilidades varias para el backend
 */

/**
 * Genera un slug a partir de un texto
 * 
 * @param text Texto a convertir en slug
 * @returns Slug (texto-en-minusculas-sin-espacios)
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD') // Normaliza caracteres Unicode
    .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
    .replace(/[^a-z0-9]+/g, '-') // Reemplaza no-alfanuméricos con -
    .replace(/^-+|-+$/g, ''); // Elimina - al inicio y final
};

/**
 * Genera un UUID v4 simple
 * 
 * Para producción, considera usar la librería 'uuid':
 *   npm install uuid
 *   import { v4 as uuidv4 } from 'uuid';
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Formatea una fecha para SQL
 * 
 * @param date Fecha a formatear
 * @returns Fecha en formato YYYY-MM-DD HH:mm:ss
 */
export const formatDateForSQL = (date: Date = new Date()): string => {
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

/**
 * Valida formato de email
 * 
 * @param email Email a validar
 * @returns true si es válido, false si no
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Trunca un texto a un número máximo de caracteres
 * 
 * @param text Texto a truncar
 * @param maxLength Longitud máxima
 * @param suffix Sufijo a agregar (por defecto '...')
 * @returns Texto truncado
 */
export const truncateText = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Sanitiza un string para prevenir inyección SQL básica
 * 
 * NOTA: Siempre usa prepared statements o ORMs con parametrización
 * Esta función es una capa adicional de seguridad
 */
export const sanitizeString = (str: string): string => {
  return str
    .replace(/'/g, "''") // Escapa comillas simples
    .replace(/;/g, '') // Elimina punto y coma
    .replace(/--/g, '') // Elimina comentarios SQL
    .replace(/\/\*/g, '') // Elimina inicio de comentario multilinea
    .replace(/\*\//g, ''); // Elimina fin de comentario multilinea
};

/**
 * Parsea parámetros de paginación de query strings
 * 
 * @param query Objeto query de la petición
 * @returns Objeto con page y limit validados
 */
export const parsePaginationParams = (query: any): { page: number; limit: number } => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20));

  return { page, limit };
};

/**
 * Calcula el offset para paginación SQL
 * 
 * @param page Número de página (1-based)
 * @param limit Elementos por página
 * @returns Offset para la query SQL
 */
export const calculateOffset = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

/**
 * Genera objeto de respuesta paginada estandarizado
 * 
 * @param data Datos de la página actual
 * @param total Total de elementos
 * @param page Página actual
 * @param limit Elementos por página
 * @returns Objeto con datos y metadatos de paginación
 */
export const createPaginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number
) => {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};
