/**
 * Modelo de entidad List
 * Representa una lista personalizada de series creada por un usuario
 */
export class List {
  /**
   * Identificador único de la lista (UUID)
   */
  id: string;

  /**
   * ID del usuario creador
   */
  userId: string;

  /**
   * Nombre de la lista
   * @example "Mis series favoritas de ciencia ficción"
   */
  name: string;

  /**
   * Descripción de la lista (opcional)
   */
  description?: string;

  /**
   * Indica si la lista es pública
   * @default false
   */
  isPublic: boolean;

  /**
   * Número de series en la lista (computado)
   * @computed
   */
  itemCount: number;

  /**
   * Fecha de creación de la lista
   */
  createdAt: Date;

  /**
   * Fecha de última actualización
   */
  updatedAt: Date;

  constructor(data: Partial<List>) {
    this.id = data.id || '';
    this.userId = data.userId || '';
    this.name = data.name || '';
    this.description = data.description;
    this.isPublic = data.isPublic ?? false;
    this.itemCount = data.itemCount || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  /**
   * Verifica si la lista está vacía
   */
  isEmpty(): boolean {
    return this.itemCount === 0;
  }

  /**
   * Incrementa el contador de items
   */
  incrementItemCount(): void {
    this.itemCount += 1;
    this.updatedAt = new Date();
  }

  /**
   * Decrementa el contador de items
   */
  decrementItemCount(): void {
    if (this.itemCount > 0) {
      this.itemCount -= 1;
      this.updatedAt = new Date();
    }
  }

  /**
   * Actualiza el timestamp de modificación
   */
  touch(): void {
    this.updatedAt = new Date();
  }

  /**
   * Verifica si fue actualizada recientemente (últimos 7 días)
   */
  wasRecentlyUpdated(): boolean {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return this.updatedAt >= sevenDaysAgo;
  }

  /**
   * Verifica si la lista es considerable (>= 10 series)
   */
  isSubstantial(): boolean {
    return this.itemCount >= 10;
  }
}
