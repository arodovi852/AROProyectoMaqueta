import { List } from '../models/list.model';
import { ListItem } from '../models/list-item.model';
import { ListRepository } from '../repositories/list.repository';
import { SeriesRepository } from '../repositories/series.repository';
import { CreateListDto, UpdateListDto, FilterListsDto, ListResponseDto, ListWithItemsDto, AddSeriesToListDto, ReorderListItemsDto } from '../dtos/list.dto';
import { PageResponseDto } from '../dtos/common.dto';

/**
 * Servicio de Lists
 * Lógica: nombre único por usuario, solo el dueño puede modificar, no duplicar series
 */
export class ListService {
  constructor(
    private listRepository: ListRepository,
    private seriesRepository: SeriesRepository
  ) {}

  /**
   * Crea una nueva lista
   * REGLA: Nombre único por usuario
   */
  async create(userId: string, dto: CreateListDto): Promise<ListResponseDto> {
    // Verificar que el nombre es único para el usuario
    const exists = await this.listRepository.existsByUserAndName(userId, dto.name);
    if (exists) {
      throw new Error('Ya tienes una lista con este nombre');
    }

    const list = new List({
      userId,
      name: dto.name,
      description: dto.description,
      isPublic: dto.isPublic ?? false,
      itemCount: 0,
    });

    const created = await this.listRepository.create(list);
    
    return this.mapToResponseDto(created);
  }

  /**
   * Actualiza una lista
   * REGLA: Solo el dueño puede modificar
   */
  async update(userId: string, listId: string, dto: UpdateListDto): Promise<ListResponseDto> {
    // Verificar ownership
    const isOwner = await this.listRepository.isOwner(listId, userId);
    if (!isOwner) {
      throw new Error('No tienes permiso para modificar esta lista');
    }

    // Si se está actualizando el nombre, verificar que sea único
    if (dto.name) {
      const exists = await this.listRepository.existsByUserAndName(userId, dto.name);
      if (exists) {
        const currentList = await this.listRepository.findById(listId);
        if (currentList && currentList.name !== dto.name) {
          throw new Error('Ya tienes una lista con este nombre');
        }
      }
    }

    const updated = await this.listRepository.update(listId, dto);
    if (!updated) {
      throw new Error('Lista no encontrada');
    }

    return this.mapToResponseDto(updated);
  }

  /**
   * Elimina una lista
   * REGLA: Solo el dueño puede eliminar
   */
  async delete(userId: string, listId: string): Promise<boolean> {
    const isOwner = await this.listRepository.isOwner(listId, userId);
    if (!isOwner) {
      throw new Error('No tienes permiso para eliminar esta lista');
    }

    return await this.listRepository.delete(listId);
  }

  /**
   * Obtiene una lista por ID con sus items
   */
  async findById(listId: string, userId?: string): Promise<ListWithItemsDto | null> {
    const list = await this.listRepository.findByIdWithItems(listId);
    
    if (!list) return null;

    // Si la lista es privada, solo el dueño puede verla
    if (!list.isPublic && userId !== list.userId) {
      throw new Error('Esta lista es privada');
    }

    return list;
  }

  /**
   * Obtiene listas con filtros
   */
  async findAll(filter: FilterListsDto): Promise<PageResponseDto<ListResponseDto>> {
    return await this.listRepository.findAll(filter);
  }

  /**
   * Obtiene las listas de un usuario
   */
  async getUserLists(userId: string, page: number = 1, limit: number = 20): Promise<PageResponseDto<ListResponseDto>> {
    return await this.listRepository.findByUser(userId, page, limit);
  }

  /**
   * Obtiene listas públicas
   */
  async getPublicLists(page: number = 1, limit: number = 20): Promise<PageResponseDto<ListResponseDto>> {
    return await this.listRepository.findPublicLists(page, limit);
  }

  /**
   * Agrega una serie a una lista
   * REGLAS: Solo el dueño, no duplicar series
   */
  async addSeries(userId: string, listId: string, dto: AddSeriesToListDto): Promise<ListItem> {
    // Verificar ownership
    const isOwner = await this.listRepository.isOwner(listId, userId);
    if (!isOwner) {
      throw new Error('No tienes permiso para modificar esta lista');
    }

    // Verificar que la serie existe
    const series = await this.seriesRepository.findById(dto.seriesId);
    if (!series) {
      throw new Error('Serie no encontrada');
    }

    // Verificar que la serie no está ya en la lista
    const hasItem = await this.listRepository.hasItem(listId, dto.seriesId);
    if (hasItem) {
      throw new Error('Esta serie ya está en tu lista');
    }

    // Obtener el siguiente orden
    const currentItems = await this.listRepository.getItems(listId);
    const nextOrder = currentItems.length;

    const listItem = new ListItem({
      listId,
      seriesId: dto.seriesId,
      order: nextOrder,
      notes: dto.notes,
    });

    return await this.listRepository.addItem(listId, listItem);
  }

  /**
   * Elimina una serie de una lista
   * REGLA: Solo el dueño
   */
  async removeSeries(userId: string, listId: string, seriesId: string): Promise<boolean> {
    const isOwner = await this.listRepository.isOwner(listId, userId);
    if (!isOwner) {
      throw new Error('No tienes permiso para modificar esta lista');
    }

    const hasItem = await this.listRepository.hasItem(listId, seriesId);
    if (!hasItem) {
      throw new Error('Esta serie no está en tu lista');
    }

    return await this.listRepository.removeItem(listId, seriesId);
  }

  /**
   * Reordena los items de una lista
   * REGLA: Solo el dueño
   */
  async reorderItems(userId: string, listId: string, dto: ReorderListItemsDto): Promise<void> {
    const isOwner = await this.listRepository.isOwner(listId, userId);
    if (!isOwner) {
      throw new Error('No tienes permiso para modificar esta lista');
    }

    await this.listRepository.reorderItems(listId, dto.itemOrders);
  }

  /**
   * Obtiene las listas más populares
   */
  async getMostPopular(limit: number = 10): Promise<ListResponseDto[]> {
    return await this.listRepository.getMostPopularLists(limit);
  }

  /**
   * Mapea a DTO de respuesta
   */
  private mapToResponseDto(list: List): ListResponseDto {
    return {
      id: list.id,
      userId: list.userId,
      name: list.name,
      description: list.description,
      isPublic: list.isPublic,
      itemCount: list.itemCount,
      user: {
        id: list.userId,
        username: 'username', // Se obtendría del UserRepository
        displayName: 'Display Name',
      },
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    };
  }
}
