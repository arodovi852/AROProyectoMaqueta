/**
 * Middleware de validación de DTOs
 * 
 * Valida que el body de la petición cumpla con los requisitos
 * del DTO correspondiente antes de llegar al controlador
 */

/**
 * Valida que los campos requeridos estén presentes
 */
export const validateRequired = (requiredFields: string[]) => {
  return (req: any, res: any, next: any): void => {
    const missingFields: string[] = [];

    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      res.status(400).json({
        success: false,
        message: `Campos requeridos faltantes: ${missingFields.join(', ')}`,
      });
      return;
    }

    next();
  };
};

/**
 * Valida el formato de email
 */
export const validateEmail = (req: any, res: any, next: any): void => {
  const { email } = req.body;

  if (!email) {
    next();
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Formato de email inválido',
    });
    return;
  }

  next();
};

/**
 * Valida que el rating esté entre 0 y 10
 */
export const validateRating = (req: any, res: any, next: any): void => {
  const { rating } = req.body;

  if (rating === undefined || rating === null) {
    next();
    return;
  }

  const ratingNum = parseFloat(rating);

  if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 10) {
    res.status(400).json({
      success: false,
      message: 'El rating debe ser un número entre 0 y 10',
    });
    return;
  }

  next();
};

/**
 * Valida que la contraseña cumpla requisitos mínimos
 */
export const validatePassword = (req: any, res: any, next: any): void => {
  const { password } = req.body;

  if (!password) {
    next();
    return;
  }

  if (password.length < 8) {
    res.status(400).json({
      success: false,
      message: 'La contraseña debe tener al menos 8 caracteres',
    });
    return;
  }

  next();
};

/**
 * Valida paginación
 */
export const validatePagination = (req: any, res: any, next: any): void => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (req.query.page && (isNaN(page) || page < 1)) {
    res.status(400).json({
      success: false,
      message: 'El parámetro page debe ser un número mayor a 0',
    });
    return;
  }

  if (req.query.limit && (isNaN(limit) || limit < 1 || limit > 100)) {
    res.status(400).json({
      success: false,
      message: 'El parámetro limit debe ser un número entre 1 y 100',
    });
    return;
  }

  next();
};
