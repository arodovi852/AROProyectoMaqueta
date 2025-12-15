import { ContactStatus } from './enums';

/**
 * Modelo de entidad Contact
 * Representa un mensaje de contacto enviado por usuarios o visitantes
 */
export class Contact {
  /**
   * Identificador único del mensaje (UUID)
   */
  id: string;

  /**
   * Nombre de la persona que contacta
   */
  name: string;

  /**
   * Email de contacto
   */
  email: string;

  /**
   * Teléfono de contacto (opcional)
   */
  phone?: string;

  /**
   * Asunto del mensaje
   */
  subject: string;

  /**
   * Mensaje completo
   */
  message: string;

  /**
   * Estado del mensaje
   * @default ContactStatus.NEW
   */
  status: ContactStatus;

  /**
   * ID del usuario registrado (si aplica)
   * null si es un usuario no registrado
   */
  userId?: string;

  /**
   * Fecha de creación del mensaje
   */
  createdAt: Date;

  /**
   * Fecha de respuesta
   */
  respondedAt?: Date;

  /**
   * Notas internas sobre el mensaje
   */
  internalNotes?: string;

  constructor(data: Partial<Contact>) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.email = data.email || '';
    this.phone = data.phone;
    this.subject = data.subject || '';
    this.message = data.message || '';
    this.status = data.status || ContactStatus.NEW;
    this.userId = data.userId;
    this.createdAt = data.createdAt || new Date();
    this.respondedAt = data.respondedAt;
    this.internalNotes = data.internalNotes;
  }

  /**
   * Marca el mensaje como en progreso
   */
  markAsInProgress(): void {
    this.status = ContactStatus.IN_PROGRESS;
  }

  /**
   * Marca el mensaje como resuelto
   */
  markAsResolved(): void {
    this.status = ContactStatus.RESOLVED;
    this.respondedAt = new Date();
  }

  /**
   * Marca el mensaje como cerrado
   */
  markAsClosed(): void {
    this.status = ContactStatus.CLOSED;
    if (!this.respondedAt) {
      this.respondedAt = new Date();
    }
  }

  /**
   * Verifica si el mensaje es nuevo
   */
  isNew(): boolean {
    return this.status === ContactStatus.NEW;
  }

  /**
   * Verifica si el mensaje ha sido respondido
   */
  isResponded(): boolean {
    return !!this.respondedAt;
  }
}
