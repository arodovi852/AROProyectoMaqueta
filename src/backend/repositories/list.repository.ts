import { List } from '../models/list.model';
import { ListItem } from '../models/list-item.model';
import { PageResponseDto } from '../dtos/common.dto';
import { ListResponseDto, ListWithItemsDto, FilterListsDto } from '../dtos/list.dto';

/**
 * Repositorio para la gestión de Listas
 */
export interface ListRepository {
  // CRUD Básico
  create(list: List): Promise<List>;
  findById(id: string): Promise<List | null>;
  findByIdWithItems(id: string): Promise<ListWithItemsDto | null>;
  update(id: string, list: Partial<List>): Promise<List | null>;
  delete(id: string): Promise<boolean>;

  // Consultas con filtros
  findAll(filter: FilterListsDto): Promise<PageResponseDto<ListResponseDto>>;
  findByUser(userId: string, page: number, limit: number): Promise<PageResponseDto<ListResponseDto>>;
  findPublicLists(page: number, limit: number): Promise<PageResponseDto<ListResponseDto>>;
  
  // Validaciones
  isOwner(listId: string, userId: string): Promise<boolean>;
  existsByUserAndName(userId: string, name: string): Promise<boolean>;
  
  // Items de lista
  addItem(listId: string, item: ListItem): Promise<ListItem>;
  removeItem(listId: string, seriesId: string): Promise<boolean>;
  hasItem(listId: string, seriesId: string): Promise<boolean>;
  getItems(listId: string): Promise<ListItem[]>;
  reorderItems(listId: string, itemOrders: Array<{ itemId: string; order: number }>): Promise<void>;
  
  // Estadísticas
  countByUser(userId: string): Promise<number>;
  getMostPopularLists(limit: number): Promise<ListResponseDto[]>;
}
