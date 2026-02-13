
export enum EventStatus {
  ORCADO = 'orcado',
  CONFIRMADO = 'confirmado',
  CONCLUIDO = 'concluido',
  CANCELADO = 'cancelado'
}

export interface Profile {
  id: string;
  name: string;
  created_at: string;
}

export interface Event {
  id: string;
  user_id: string;
  client_name: string;
  client_phone: string;
  title: string;
  type?: string;
  date: string;
  start_time: string;
  end_time?: string;
  location?: string;
  status: EventStatus;
  total_amount: number;
  paid_amount: number;
  notes?: string;
  created_at: string;
}

export interface ChecklistItem {
  id: string;
  event_id: string;
  description: string;
  is_done: boolean;
  order?: number;
}

export interface ChecklistTemplate {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  items: string[]; // List of descriptions
}

export type PageView = 'dashboard' | 'calendar' | 'events' | 'finance' | 'templates' | 'settings' | 'event-detail';
