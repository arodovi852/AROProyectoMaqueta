import { Contact } from '../models/contact.model';
import { ContactStatus } from '../models/enums';
import { ContactFilterDto } from '../dtos/contact.dto';

/**
 * Interfaz del repositorio de contactos
 * Define todas las operaciones de acceso a datos para mensajes de contacto
 */
export interface IContactRepository {
  // CRUD básico
  /**
   * Crea un nuevo mensaje de contacto
   */
  create(contact: Contact): Promise<Contact>;

  /**
   * Busca un mensaje de contacto por su ID
   */
  findById(id: string): Promise<Contact | null>;

  /**
   * Busca todos los mensajes de contacto
   */
  findAll(): Promise<Contact[]>;

  /**
   * Actualiza un mensaje de contacto existente
   */
  update(id: string, contact: Partial<Contact>): Promise<Contact>;

  /**
   * Elimina un mensaje de contacto
   */
  delete(id: string): Promise<boolean>;

  // Consultas personalizadas
  /**
   * Busca mensajes por estado
   * @param status - Estado del mensaje
   */
  findByStatus(status: ContactStatus): Promise<Contact[]>;

  /**
   * Busca mensajes nuevos (sin leer)
   */
  findNewMessages(): Promise<Contact[]>;

  /**
   * Busca mensajes en progreso
   */
  findInProgressMessages(): Promise<Contact[]>;

  /**
   * Busca mensajes resueltos
   */
  findResolvedMessages(): Promise<Contact[]>;

  /**
   * Busca mensajes cerrados
   */
  findClosedMessages(): Promise<Contact[]>;

  /**
   * Busca mensajes de un usuario registrado
   * @param userId - ID del usuario
   */
  findByUserId(userId: string): Promise<Contact[]>;

  /**
   * Busca mensajes por email
   * @param email - Email del remitente
   */
  findByEmail(email: string): Promise<Contact[]>;

  /**
   * Busca mensajes en un rango de fechas
   * @param startDate - Fecha de inicio
   * @param endDate - Fecha de fin
   */
  findByDateRange(startDate: Date, endDate: Date): Promise<Contact[]>;

  /**
   * Busca mensajes con texto (nombre, email, asunto, mensaje)
   * @param searchTerm - Término de búsqueda
   */
  searchMessages(searchTerm: string): Promise<Contact[]>;

  /**
   * Busca mensajes con filtros avanzados
   * @param filters - Objeto con filtros
   */
  findWithFilters(filters: ContactFilterDto): Promise<{
    contacts: Contact[];
    total: number;
  }>;

  /**
   * Obtiene mensajes con paginación
   * @param page - Número de página
   * @param limit - Mensajes por página
   * @param sortBy - Campo por el que ordenar
   * @param sortOrder - Orden ascendente o descendente
   */
  findWithPagination(
    page: number,
    limit: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc'
  ): Promise<{
    contacts: Contact[];
    total: number;
    page: number;
    totalPages: number;
  }>;

  /**
   * Obtiene los mensajes más recientes
   * @param limit - Número de mensajes a obtener
   */
  getRecentMessages(limit: number): Promise<Contact[]>;

  /**
   * Obtiene mensajes sin responder
   */
  findUnrespondedMessages(): Promise<Contact[]>;

  /**
   * Obtiene mensajes respondidos
   */
  findRespondedMessages(): Promise<Contact[]>;

  /**
   * Actualiza el estado de un mensaje
   * @param contactId - ID del mensaje
   * @param newStatus - Nuevo estado
   */
  updateStatus(contactId: string, newStatus: ContactStatus): Promise<boolean>;

  /**
   * Marca un mensaje como respondido
   * @param contactId - ID del mensaje
   */
  markAsResponded(contactId: string): Promise<boolean>;

  /**
   * Añade notas internas a un mensaje
   * @param contactId - ID del mensaje
   * @param notes - Notas internas
   */
  addInternalNotes(contactId: string, notes: string): Promise<boolean>;

  /**
   * Cuenta el total de mensajes
   */
  count(): Promise<number>;

  /**
   * Cuenta mensajes por estado
   * @param status - Estado del mensaje
   */
  countByStatus(status: ContactStatus): Promise<number>;

  /**
   * Cuenta mensajes nuevos
   */
  countNewMessages(): Promise<number>;

  /**
   * Cuenta mensajes sin responder
   */
  countUnrespondedMessages(): Promise<number>;

  /**
   * Obtiene estadísticas de mensajes por estado
   */
  getMessageStatsByStatus(): Promise<Record<ContactStatus, number>>;

  /**
   * Calcula el tiempo promedio de respuesta (en horas)
   */
  getAverageResponseTime(): Promise<number>;

  /**
   * Obtiene mensajes que necesitan atención (nuevos > X horas)
   * @param hours - Número de horas
   */
  getMessagesNeedingAttention(hours: number): Promise<Contact[]>;

  /**
   * Obtiene estadísticas mensuales de mensajes
   * @param year - Año
   */
  getMonthlyCo​ntactStats(year: number): Promise<Array<{
    month: number;
    totalMessages: number;
    resolvedMessages: number;
  }>>;

  /**
   * Busca usuarios más frecuentes en contacto
   * @param limit - Número de usuarios a obtener
   */
  getFrequentContacts(limit: number): Promise<Array<{
    email: string;
    name: string;
    messageCount: number;
  }>>;

  /**
   * Archiva mensajes antiguos
   * @param olderThanDays - Número de días
   */
  archiveOldMessages(olderThanDays: number): Promise<number>;
}
