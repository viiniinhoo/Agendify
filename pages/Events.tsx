
import React, { useState, useMemo } from 'react';
import { PageView, Event, EventStatus } from '../types';
import { Plus, Search, Calendar, MapPin, Clock, ExternalLink, Briefcase, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDateFull, getDayAndMonth } from '../utils/dateUtils';

interface EventsPageProps {
  onNavigate: (view: PageView, id?: string) => void;
  events: Event[];
  onAddEvent: () => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ onNavigate, events, onAddEvent }) => {
  const [filter, setFilter] = useState<string>('todos');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Grouping logic
  const groupedEvents = useMemo(() => {
    const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

    const filtered = sorted.filter(e => {
      const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.location?.toLowerCase().includes(search.toLowerCase()) ||
        e.client_name?.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'todos' || e.status === filter;
      return matchesSearch && matchesFilter;
    });

    const groups: { [key: string]: Event[] } = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get start and end of current week
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    filtered.forEach(event => {
      const eventDate = new Date(event.date + 'T12:00:00');
      let groupName = '';

      if (eventDate >= firstDayOfWeek && eventDate <= lastDayOfWeek) {
        groupName = 'ESTA SEMANA';
      } else {
        groupName = eventDate.toLocaleDateString('pt-BR', { month: 'long' }).toUpperCase();
      }

      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(event);
    });

    return groups;
  }, [events, search, filter]);

  const statuses = [
    { id: 'todos', label: 'Todos' },
    { id: EventStatus.ORCADO, label: 'Pendentes' },
    { id: EventStatus.CONFIRMADO, label: 'Confirmados' },
    { id: EventStatus.CONCLUIDO, label: 'Finalizados' },
    { id: EventStatus.CANCELADO, label: 'Cancelados' },
  ];

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case EventStatus.CONFIRMADO: return 'bg-accent';
      case EventStatus.ORCADO: return 'bg-warning';
      case EventStatus.CONCLUIDO: return 'bg-secondary';
      case EventStatus.CANCELADO: return 'bg-destructive';
      default: return 'bg-secondary';
    }
  };

  const getStatusLabel = (status: EventStatus) => {
    switch (status) {
      case EventStatus.ORCADO: return 'PENDENTE';
      case EventStatus.CONFIRMADO: return 'CONFIRMADO';
      case EventStatus.CONCLUIDO: return 'FINALIZADO';
      case EventStatus.CANCELADO: return 'CANCELADO';
      default: return (status as string).toUpperCase();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-4 space-y-4 max-w-2xl min-h-screen pb-24"
    >
      {/* Header compact for mobile */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tighter">Meus <span className="text-accent inline-block">Eventos</span></h1>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAddEvent}
          className="bg-accent text-black p-3 rounded-2xl shadow-lg shadow-accent/20"
        >
          <Plus size={24} strokeWidth={3} />
        </motion.button>
      </div>

      {/* Modern Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/50" size={18} />
          <input
            type="text"
            placeholder="Buscar cliente, tipo ou local..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#121212] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all font-medium placeholder:text-secondary/40"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 rounded-2xl border transition-all ${showFilters ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-[#121212] border-white/5 text-secondary'}`}
        >
          <Filter size={18} />
        </button>
      </div>

      {/* Collapsible Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 pt-2">
              {statuses.map(s => (
                <button
                  key={s.id}
                  onClick={() => setFilter(s.id)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${filter === s.id
                    ? 'bg-accent/10 border-accent/40 text-accent'
                    : 'bg-card/40 border-white/5 text-secondary hover:text-white'
                    }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Events Groups */}
      <div className="space-y-6 pt-1">
        {(Object.entries(groupedEvents) as [string, Event[]][]).map(([groupName, groupEvents]) => (
          <div key={groupName} className="space-y-2">
            <h2 className="text-[10px] font-black tracking-[0.2em] text-accent uppercase opacity-90 px-1">
              {groupName}
            </h2>

            <div className="space-y-3">
              {groupEvents.map((event) => {
                const { day, month } = getDayAndMonth(event.date);
                return (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate('event-detail', event.id)}
                    className="bg-[#181818] rounded-3xl overflow-hidden shadow-xl border border-white/5 relative flex group"
                  >
                    {/* Left Border Status Indicator */}
                    <div className={`w-1 h-full absolute left-0 top-0 ${getStatusColor(event.status)} shadow-[4px_0_15px_-4px_rgba(0,0,0,0.5)]`} />

                    <div className="flex w-full p-3 pl-5 items-center gap-4">
                      {/* Date Block */}
                      <div className="flex flex-col items-center justify-center bg-[#1c1c1c] rounded-xl px-3 py-2 min-w-[64px] border border-white/5">
                        <span className="text-[9px] font-black text-secondary uppercase tracking-widest leading-none mb-1">{month}</span>
                        <span className="text-xl font-black text-white leading-none mb-1">{day}</span>
                        <span className="text-[9px] font-bold text-secondary/60 leading-none">{event.start_time}</span>
                      </div>

                      {/* Info Block */}
                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-start justify-between mb-0.5 gap-2">
                          <h3 className="text-sm font-bold text-white tracking-tight truncate leading-tight">
                            {event.title}
                          </h3>
                          <span className={`${getStatusColor(event.status)}/10 ${getStatusColor(event.status).replace('bg-', 'text-')} text-[8px] font-black px-1.5 py-0.5 rounded-md border ${getStatusColor(event.status).replace('bg-', 'border-')}/20 whitespace-nowrap`}>
                            {getStatusLabel(event.status)}
                          </span>
                        </div>

                        <p className="text-secondary text-xs font-medium truncate mb-1 opacity-80">
                          {event.client_name || 'Sem cliente'}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1.5 text-secondary/60 text-xs truncate mr-4">
                            <MapPin size={12} className="shrink-0" />
                            <span className="truncate">{event.location || 'Local não definido'}</span>
                          </div>
                          <span className="text-sm font-bold text-white shrink-0">
                            R$ {event.total_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(groupedEvents).length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 text-center space-y-6"
        >
          <div className="bg-white/5 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto border border-white/5 text-secondary">
            <Briefcase size={40} strokeWidth={1} />
          </div>
          <div className="space-y-1">
            <p className="text-white font-black text-xl tracking-tight">Nenhum evento aqui.</p>
            <p className="text-secondary text-sm font-medium">Tente buscar por outro termo.</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EventsPage;
