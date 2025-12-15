import { Genre } from '../models/genre.model';
import { GenreRepository } from '../repositories/genre.repository';
import { CreateGenreDto, UpdateGenreDto, GenreResponseDto, GenreWithStatsDto } from '../dtos/genre.dto';

/**
 * Servicio de Géneros
 */
export class GenreService {
  constructor(private genreRepository: GenreRepository) {}

  async create(dto: CreateGenreDto): Promise<GenreResponseDto> {
    // Verificar que no existe un género con el mismo nombre
    const existing = await this.genreRepository.findByName(dto.name);
    if (existing) {
      throw new Error('Ya existe un género con este nombre');
    }

    const genre = new Genre({ name: dto.name });
    const created = await this.genreRepository.create(genre);
    
    return this.mapToResponseDto(created);
  }

  async findById(id: string): Promise<GenreResponseDto | null> {
    const genre = await this.genreRepository.findById(id);
    return genre ? this.mapToResponseDto(genre) : null;
  }

  async findBySlug(slug: string): Promise<GenreResponseDto | null> {
    const genre = await this.genreRepository.findBySlug(slug);
    return genre ? this.mapToResponseDto(genre) : null;
  }

  async findAll(): Promise<GenreResponseDto[]> {
    const genres = await this.genreRepository.findAll();
    return genres.map(g => this.mapToResponseDto(g));
  }

  async findAllWithStats(): Promise<GenreWithStatsDto[]> {
    return await this.genreRepository.findGenresWithSeriesCount();
  }

  async update(id: string, dto: UpdateGenreDto): Promise<GenreResponseDto> {
    if (dto.name) {
      const existing = await this.genreRepository.findByName(dto.name);
      if (existing && existing.id !== id) {
        throw new Error('Ya existe un género con este nombre');
      }
    }

    const updated = await this.genreRepository.update(id, dto);
    if (!updated) {
      throw new Error('Género no encontrado');
    }

    return this.mapToResponseDto(updated);
  }

  async delete(id: string): Promise<boolean> {
    // Verificar que el género no tenga series asociadas
    const canDelete = await this.genreRepository.canDelete(id);
    if (!canDelete) {
      throw new Error('No se puede eliminar un género que tiene series asociadas');
    }

    return await this.genreRepository.delete(id);
  }

  private mapToResponseDto(genre: Genre): GenreResponseDto {
    return {
      id: genre.id,
      name: genre.name,
      slug: genre.slug,
      createdAt: genre.createdAt,
    };
  }
}
