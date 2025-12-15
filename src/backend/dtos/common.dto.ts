/**
 * DTO genérico de respuesta exitosa
 */
export interface SuccessResponseDto<T = any> {
  success: true;
  data: T;
  message?: string;
  timestamp: Date;
}

/**
 * DTO genérico de respuesta de error
 */
export interface ErrorResponseDto {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: Date;
}

/**
 * DTO para respuestas paginadas genéricas
 */
export interface PaginatedResponseDto<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * DTO para parámetros de paginación
 */
export interface PaginationDto {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * DTO para búsqueda genérica
 */
export interface SearchDto extends PaginationDto {
  query: string;
  filters?: Record<string, any>;
}

/**
 * DTO para respuesta de validación
 */
export interface ValidationErrorDto {
  field: string;
  message: string;
  value?: any;
}

/**
 * DTO para operación masiva
 */
export interface BulkOperationDto<T> {
  ids: string[];
  operation: string;
  data?: T;
}

/**
 * DTO de respuesta de operación masiva
 */
export interface BulkOperationResponseDto {
  successCount: number;
  failureCount: number;
  errors: Array<{
    id: string;
    error: string;
  }>;
}
