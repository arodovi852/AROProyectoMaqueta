/**
 * Middleware de CORS (Cross-Origin Resource Sharing)
 * 
 * Configura los headers necesarios para permitir peticiones
 * desde el frontend Angular hacia el backend
 */

const ALLOWED_ORIGINS = [
  'http://localhost:4200',     // Angular dev server
  'http://localhost:3000',     // Posible frontend alternativo
  'https://tu-dominio.com',    // Producción
];

/**
 * Middleware de CORS
 * 
 * Configura headers para permitir peticiones cross-origin
 */
export const corsMiddleware = (req: any, res: any, next: any): void => {
  const origin = req.headers.origin;

  // Verificar si el origin está en la lista de permitidos
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // En desarrollo, permitir cualquier origin
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  // Headers permitidos
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  // Métodos permitidos
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );

  // Permitir credenciales (cookies, headers de autenticación)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Tiempo de caché para preflight requests (OPTIONS)
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 horas

  // Si es una petición OPTIONS (preflight), responder inmediatamente
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  next();
};

/**
 * Configuración de CORS para Express
 * 
 * Alternativa usando el paquete 'cors':
 * 
 * import cors from 'cors';
 * 
 * const corsOptions = {
 *   origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
 *     if (!origin || ALLOWED_ORIGINS.includes(origin)) {
 *       callback(null, true);
 *     } else {
 *       callback(new Error('Not allowed by CORS'));
 *     }
 *   },
 *   credentials: true,
 *   optionsSuccessStatus: 200,
 * };
 * 
 * app.use(cors(corsOptions));
 */
