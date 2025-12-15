/**
 * Modelo de entidad Watchlist
 * Representa las series que el usuario quiere ver más tarde
 */
export class Watchlist {
  /**
   * Identificador único (UUID)
   */
  id: string;

  /**
   * ID del usuario
   */
  userId: string;

  /**
   * ID de la serie
   */
  seriesId: string;

  /**
   * Fecha en que se agregó a la watchlist
   */
  createdAt: Date;

  constructor(data: Partial<Watchlist>) {
    this.id = data.id || '';
    this.userId = data.userId || '';
    this.seriesId = data.seriesId || '';
    this.createdAt = data.createdAt || new Date();
  }

  /**
   * Verifica si la serie fue agregada recientemente (últimos 7 días)
   */
  isRecentlyAdded(): boolean {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return this.createdAt >= sevenDaysAgo;
  }
}
