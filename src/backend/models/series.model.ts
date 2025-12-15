import { SeriesStatus } from './enums';

/**
 * Modelo de entidad Series
 * Representa una serie de televisión en la plataforma
 */
export class Series {
  /**
   * Identificador único de la serie (UUID)
   */
  id: string;

  /**
   * Título de la serie
   * @example "Breaking Bad"
   */
  title: string;

  /**
   * Título original en idioma original (opcional)
   * @example "ブレイキング・バッド"
   */
  originalTitle?: string;

  /**
   * Sinopsis/descripción de la serie
   */
  overview: string;

  /**
   * Fecha de estreno
   */
  releaseDate: Date;

  /**
   * Fecha de finalización (opcional, si la serie terminó)
   */
  endDate?: Date;

  /**
   * Estado actual de la serie
   */
  status: SeriesStatus;

  /**
   * URL del póster de la serie
   * @example "https://image.tmdb.org/t/p/w500/poster.jpg"
   */
  posterUrl?: string;

  /**
   * URL de la imagen de fondo
   * @example "https://image.tmdb.org/t/p/original/backdrop.jpg"
   */
  backdropUrl?: string;

  /**
   * Número de temporadas
   * @minimum 1
   */
  numberOfSeasons: number;

  /**
   * Número total de episodios
   * @minimum 1
   */
  numberOfEpisodes: number;

  /**
   * Duración promedio de episodios (en minutos)
   * @example 45
   */
  runtime?: number;

  /**
   * País de origen
   * @example "US"
   */
  originCountry?: string;

  /**
   * Idioma original
   * @example "en"
   */
  originalLanguage?: string;

  /**
   * ID de TMDB (The Movie Database)
   * @example "1396"
   */
  tmdbId?: string;

  /**
   * ID de IMDb
   * @example "tt0903747"
   */
  imdbId?: string;

  /**
   * Rating promedio calculado (0-10)
   * @computed
   */
  averageRating: number;

  /**
   * Número total de valoraciones
   * @computed
   */
  ratingsCount: number;

  /**
   * Fecha de creación del registro
   */
  createdAt: Date;

  /**
   * Fecha de última actualización
   */
  updatedAt: Date;

  constructor(data: Partial<Series>) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.originalTitle = data.originalTitle;
    this.overview = data.overview || '';
    this.releaseDate = data.releaseDate || new Date();
    this.endDate = data.endDate;
    this.status = data.status || SeriesStatus.RETURNING;
    this.posterUrl = data.posterUrl;
    this.backdropUrl = data.backdropUrl;
    this.numberOfSeasons = data.numberOfSeasons || 1;
    this.numberOfEpisodes = data.numberOfEpisodes || 1;
    this.runtime = data.runtime;
    this.originCountry = data.originCountry;
    this.originalLanguage = data.originalLanguage;
    this.tmdbId = data.tmdbId;
    this.imdbId = data.imdbId;
    this.averageRating = data.averageRating || 0;
    this.ratingsCount = data.ratingsCount || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  /**
   * Verifica si la serie está actualmente en emisión
   */
  isCurrentlyAiring(): boolean {
    return this.status === SeriesStatus.RETURNING;
  }

  /**
   * Verifica si la serie ha terminado
   */
  isEnded(): boolean {
    return this.status === SeriesStatus.ENDED;
  }

  /**
   * Obtiene el año de estreno
   */
  get releaseYear(): number {
    return this.releaseDate.getFullYear();
  }

  /**
   * Obtiene una descripción legible del estado
   */
  get statusDisplay(): string {
    const statusMap: Record<SeriesStatus, string> = {
      [SeriesStatus.RETURNING]: 'En emisión',
      [SeriesStatus.ENDED]: 'Finalizada',
      [SeriesStatus.CANCELLED]: 'Cancelada',
      [SeriesStatus.IN_PRODUCTION]: 'En producción',
    };
    return statusMap[this.status] || 'Desconocido';
  }

  /**
   * Obtiene el título a mostrar (original o traducido)
   */
  get displayTitle(): string {
    return this.originalTitle || this.title;
  }

  /**
   * Verifica si la serie tiene buena valoración (>= 7.0)
   */
  isHighlyRated(): boolean {
    return this.averageRating >= 7.0 && this.ratingsCount >= 10;
  }

  /**
   * Actualiza el rating promedio y el contador
   * (Simulación - en un backend real se calcularía desde la BD)
   */
  updateRating(newRating: number, isNewRating: boolean): void {
    if (isNewRating) {
      this.averageRating = (this.averageRating * this.ratingsCount + newRating) / (this.ratingsCount + 1);
      this.ratingsCount += 1;
    } else {
      // Lógica más compleja para actualizar un rating existente
      // Requeriría conocer el rating anterior
    }
  }
}
