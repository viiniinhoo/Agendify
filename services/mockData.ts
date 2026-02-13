
import { Event, EventStatus, ChecklistTemplate } from '../types';

export const mockEvents: Event[] = [
  {
    id: 'e1',
    user_id: 'u1',
    client_name: 'Carla Dias',
    client_phone: '5511777777777',
    title: 'Casamento Carla & Pedro',
    type: 'Casamento',
    date: '2024-11-15',
    start_time: '18:00',
    location: 'Buffet Mansão Solar',
    status: EventStatus.CONFIRMADO,
    total_amount: 5000,
    paid_amount: 2500,
    notes: 'Levar 3 câmeras e cartões extras.',
    created_at: new Date().toISOString()
  },
  {
    id: 'e2',
    user_id: 'u1',
    client_name: 'Ana Silva',
    client_phone: '5511999999999',
    title: 'Ensaio Externo Ana',
    type: 'Ensaio',
    date: '2024-11-20',
    start_time: '14:00',
    location: 'Parque do Ibirapuera',
    status: EventStatus.ORCADO,
    total_amount: 800,
    paid_amount: 0,
    created_at: new Date().toISOString()
  },
  {
    id: 'e3',
    user_id: 'u1',
    client_name: 'João Santos',
    client_phone: '5511888888888',
    title: 'Aniversário 15 anos Júlia',
    type: 'Festa',
    date: '2024-12-05',
    start_time: '20:00',
    location: 'Espaço Jardim',
    status: EventStatus.CONFIRMADO,
    total_amount: 3500,
    paid_amount: 3500,
    created_at: new Date().toISOString()
  }
];

export const mockTemplates: ChecklistTemplate[] = [
  {
    id: 't1',
    user_id: 'u1',
    name: 'Kit Básico Fotografia',
    description: 'Equipamentos essenciais para qualquer evento',
    items: ['Câmera Principal', 'Lente 24-70mm', 'Cartões de Memória (2x 128GB)', 'Baterias Carregadas (4x)', 'Flash Externo']
  }
];
