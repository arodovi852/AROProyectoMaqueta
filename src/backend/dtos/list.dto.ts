/**
 * DTO para crear una lista
 */
export interface CreateListDto {
  name: string;
  description?: string;
  isPublic?: boolean;
}

/**
 * DTO para actualizar una lista
 */
export interface UpdateListDto {
  name?: string;
  description?: string;
  isPublic?: boolean;
}

/**
 * DTO de respuesta de lista
 */
export interface ListResponseDto {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isPublic: boolean;
  itemCount: number;
  user: {
    id: string;
    username: string;
    displayName: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO de respuesta con items de la lista
 */
export interface ListWithItemsDto extends ListResponseDto {
  items: ListItemResponseDto[];
}

/**
 * DTO para filtrar listas
 */
export interface FilterListsDto {
  userId?: string;
  isPublic?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

/**
 * DTO para item de lista (respuesta)
 */
export interface ListItemResponseDto {
  id: string;
  listId: string;
  seriesId: string;
  order: number;
  notes?: string;
  series: {
    id: string;
    title: string;
    posterUrl?: string;
    releaseYear: number;
    averageRating: number;
  };
  createdAt: Date;
}

/**
 * DTO para agregar una serie a una lista
 */
export interface AddSeriesTo ListDto {
  seriesId: string;
  notes?: string;
}

/**
 * DTO para reordenar items en una lista
 */
export interface ReorderListItemsDto {
  itemOrders: Array<{ itemId: string; order: number }>;
}
