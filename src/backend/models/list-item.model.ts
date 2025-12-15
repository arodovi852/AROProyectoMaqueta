/**
 * Modelo de entidad ListItem
 * Representa una serie dentro de una lista personalizada
 */
export class ListItem {
  /**
   * Identificador único del item (UUID)
   */
  id: string;

  /**
   * ID de la lista
   */
  listId: string;

  /**
   * ID de la serie
   */
  seriesId: string;

  /**
   * Orden de la serie en la lista
   * @minimum 0
   */
  order: number;

  /**
   * Notas personales sobre por qué está en la lista (opcional)
   * @maxLength 500
   */
  notes?: string;

  /**
   * Fecha de adición a la lista
   */
  createdAt: Date;

  constructor(data: Partial<ListItem>) {
    this.id = data.id || '';
    this.listId = data.listId || '';
    this.seriesId = data.seriesId || '';
    this.order = data.order ?? 0;
    this.notes = data.notes;
    this.createdAt = data.createdAt || new Date();
  }

  /**
   * Verifica si tiene notas
   */
  hasNotes(): boolean {
    return !!this.notes && this.notes.trim().length > 0;
  }

  /**
   * Actualiza el orden
   */
  updateOrder(newOrder: number): void {
    if (newOrder < 0) {
      throw new Error('El orden no puede ser negativo');
    }
    this.order = newOrder;
  }

  /**
   * Verifica si fue agregada recientemente (últimos 7 días)
   */
  isRecentlyAdded(): boolean {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return this.createdAt >= sevenDaysAgo;
  }
}
