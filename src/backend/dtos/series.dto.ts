import { SeriesStatus } from '../models/enums';

/**
 * DTO para crear una nueva serie
 */
export interface CreateSeriesDto {
  title: string;
  originalTitle?: string;
  overview: string;
  releaseDate: Date;
  endDate?: Date;
  status: SeriesStatus;
  posterUrl?: string;
  backdropUrl?: string;
  numberOfSeasons: number;
  numberOfEpisodes: number;
  runtime?: number;
  originCountry?: string;
  originalLanguage?: string;
  tmdbId?: string;
  imdbId?: string;
  genreIds?: string[]; // IDs de géneros a asociar
}

/**
 * DTO para actualizar una serie existente
 */
export interface UpdateSeriesDto {
  title?: string;
  originalTitle?: string;
  overview?: string;
  releaseDate?: Date;
  endDate?: Date;
  status?: SeriesStatus;
  posterUrl?: string;
  backdropUrl?: string;
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
  runtime?: number;
  originCountry?: string;
  originalLanguage?: string;
  tmdbId?: string;
  imdbId?: string;
}

/**
 * DTO de respuesta con información completa de una serie
 */
export interface SeriesResponseDto {
  id: string;
  title: string;
  originalTitle?: string;
  overview: string;
  releaseDate: Date;
  endDate?: Date;
  status: SeriesStatus;
  statusDisplay: string;
  posterUrl?: string;
  backdropUrl?: string;
  numberOfSeasons: number;
  numberOfEpisodes: number;
  runtime?: number;
  originCountry?: string;
  originalLanguage?: string;
  tmdbId?: string;
  imdbId?: string;
  averageRating: number;
  ratingsCount: number;
  genres?: GenreResponseDto[];
  releaseYear: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO de respuesta simplificado para listados
 */
export interface SeriesSummaryDto {
  id: string;
  title: string;
  posterUrl?: string;
  releaseYear: number;
  status: SeriesStatus;
  averageRating: number;
  ratingsCount: number;
  numberOfSeasons: number;
}

/**
 * DTO para filtrar series
 */
export interface FilterSeriesDto {
  title?: string;
  genreIds?: string[];
  status?: SeriesStatus;
  minRating?: number;
  maxRating?: number;
  releaseYear?: number;
  originCountry?: string;
  sortBy?: 'title' | 'releaseDate' | 'averageRating' | 'ratingsCount';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * DTO para respuesta de géneros en serie
 */
export interface GenreResponseDto {
  id: string;
  name: string;
  slug: string;
}
