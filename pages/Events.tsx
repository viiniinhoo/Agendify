
import React, { useState } from 'react';
import { PageView, Event, EventStatus } from '../types';
import { Plus, Search, Calendar, MapPin, Clock, ExternalLink, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventsPageProps {
  onNavigate: (view: PageView, id?: string) => void;
  events: Event[];
  onAddEvent: () => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ onNavigate, events, onAddEvent }) => {
  const [filter, setFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'todos' || e.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statuses = [
    { id: 'todos', label: 'Todos' },
    { id: EventStatus.ORCADO, label: 'Orçados' },
    { id: EventStatus.CONFIRMADO, label: 'Confirmados' },
    { id: EventStatus.CONCLUIDO, label: 'Concluídos' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 lg:px-8 py-8 space-y-8 max-w-5xl"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tightest">Meus <span className="text-accent underline decoration-accent/20 underline-offset-8">Eventos</span></h1>
          <p className="text-secondary text-sm mt-2 font-medium">Acompanhe e gerencie seus compromissos.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddEvent}
          className="bg-accent text-black font-black px-6 py-4 rounded-2xl flex items-center justify-center gap-2 w-full md:w-auto transition-all shadow-xl"
        >
          <Plus size={20} strokeWidth={3} />
          <span className="uppercase text-xs tracking-widest">Novo Evento</span>
        </motion.button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="relative flex-1 group">
          <label htmlFor="event-search" className="sr-only">Buscar eventos</label>
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-accent transition-colors" size={20} />
          <input
            id="event-search"
            type="text"
            placeholder="Buscar por título ou local..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card/40 border border-white/5 rounded-2xl pl-14 pr-4 py-4 focus:outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all shadow-xl font-medium"
          />
        </div>
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 lg:pb-0 px-1">
          {statuses.map(s => (
            <button
              key={s.id}
              onClick={() => setFilter(s.id)}
              className={`whitespace-nowrap px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all ${filter === s.id
                ? 'bg-accent/10 border-accent/30 text-accent shadow-[0_0_15px_rgba(0,255,136,0.1)]'
                : 'bg-card/40 border-white/5 text-secondary opacity-60'
                }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event, idx) => (
            <motion.div
              layout
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onNavigate('event-detail', event.id)}
              className="bg-card/40 backdrop-blur-xl rounded-[24px] border border-white/5 p-6 space-y-5 hover:border-accent/30 transition-all cursor-pointer group shadow-2xl relative overflow-hidden"
            >
              <div className="flex justify-between items-start relative z-10">
                <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${event.status === EventStatus.CONFIRMADO ? 'bg-accent/10 text-accent border border-accent/20' :
                  event.status === EventStatus.ORCADO ? 'bg-warning/10 text-warning border border-warning/20' :
                    'bg-blue-400/10 text-blue-400 border border-blue-400/20'
                  }`}>
                  {event.status}
                </span>
                <p className="text-accent font-black text-lg">R$ {event.total_amount.toLocaleString('pt-BR')}</p>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-black group-hover:text-accent transition-colors tracking-tight line-clamp-1">{event.title}</h3>
                <p className="text-secondary text-xs uppercase tracking-widest mt-1 font-bold opacity-60">{event.type}</p>
              </div>

              <div className="space-y-3 pt-5 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-3 text-secondary text-sm font-medium">
                  <div className="bg-accent/10 p-2 rounded-lg text-accent">
                    <Calendar size={14} />
                  </div>
                  <span>{new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3 text-secondary text-sm font-medium">
                  <div className="bg-accent/10 p-2 rounded-lg text-accent">
                    <Clock size={14} />
                  </div>
                  <span>{event.start_time}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-3 text-secondary text-sm font-medium">
                    <div className="bg-accent/10 p-2 rounded-lg text-accent">
                      <MapPin size={14} />
                    </div>
                    <span className="truncate">{event.location}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end relative z-10">
                <div className="text-secondary group-hover:text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all">
                  Ver Detalhes
                  <ExternalLink size={14} />
                </div>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-accent/10 transition-all rounded-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 text-center space-y-6"
        >
          <div className="bg-white/5 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto border border-white/5 text-secondary">
            <Briefcase size={40} strokeWidth={1} />
          </div>
          <div className="space-y-1">
            <p className="text-white font-black text-xl tracking-tight">Nenhum evento encontrado.</p>
            <p className="text-secondary text-sm font-medium">Tente ajustar seus filtros ou busca.</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EventsPage;
