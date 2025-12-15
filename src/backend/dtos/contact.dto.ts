import { ContactStatus } from '../models/enums';

/**
 * DTO para crear un mensaje de contacto
 */
export interface CreateContactDto {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  userId?: string;
}

/**
 * DTO para actualizar un mensaje de contacto
 */
export interface UpdateContactDto {
  status?: ContactStatus;
  internalNotes?: string;
}

/**
 * DTO de respuesta de mensaje de contacto
 */
export interface ContactResponseDto {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactStatus;
  userId?: string;
  userName?: string;
  createdAt: Date;
  respondedAt?: Date;
  internalNotes?: string;
}

/**
 * DTO para listado de mensajes (versión simplificada)
 */
export interface ContactListItemDto {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: ContactStatus;
  createdAt: Date;
  isResponded: boolean;
}

/**
 * DTO para filtros de mensajes de contacto
 */
export interface ContactFilterDto {
  status?: ContactStatus;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string; // busca en nombre, email, asunto
  sortBy?: 'createdAt' | 'status' | 'name';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * DTO de respuesta paginada de mensajes
 */
export interface ContactPageResponseDto {
  contacts: ContactListItemDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * DTO para responder a un mensaje de contacto
 */
export interface ReplyContactDto {
  contactId: string;
  replyMessage: string;
  sendEmail?: boolean;
}

/**
 * DTO para estadísticas de mensajes
 */
export interface ContactStatsDto {
  totalMessages: number;
  newMessages: number;
  inProgressMessages: number;
  resolvedMessages: number;
  averageResponseTime: number; // en horas
  messagesByStatus: Record<ContactStatus, number>;
}
