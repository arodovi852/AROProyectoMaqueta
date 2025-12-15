/**
 * Barrel file para exportar todos los controladores
 * 
 * Los controladores implementan los endpoints REST y manejan:
 * - Validación de autenticación (req.user)
 * - Validación de autorización (permisos)
 * - Invocación de servicios de negocio
 * - Respuestas HTTP estandarizadas
 * 
 * Lógica de negocio implementada:
 * - UserSeriesController: No valorar sin haber visto la serie
 * - ReviewController: Solo un review por usuario-serie, debe haber visto la serie
 * - WatchlistController: No duplicados
 * - ListController: Nombres únicos por usuario, solo propietario puede modificar
 * - SeriesController: No eliminar series con valoraciones
 * - GenreController: No eliminar géneros con series asociadas
 * - UserController: Email/username únicos, solo propietario o ADMIN puede modificar
 */

export { SeriesController } from './series.controller';
export { UserSeriesController } from './user-series.controller';
export { ReviewController } from './review.controller';
export { WatchlistController } from './watchlist.controller';
export { ListController } from './list.controller';
export { GenreController } from './genre.controller';
export { UserController } from './user.controller';
