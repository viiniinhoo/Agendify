
import React, { useState } from 'react';
// Added Event to imports
import { PageView, EventStatus, Event } from '../types';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

interface CalendarPageProps {
  onNavigate: (view: PageView, id?: string) => void;
  // Added events prop
  events: Event[];
}

// Added events to component props
const CalendarPage: React.FC<CalendarPageProps> = ({ onNavigate, events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(year, month);
  const startDay = startDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Use events from props instead of mockEvents
  const eventsOnSelectedDate = events.filter(e => e.date === selectedDate);

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= days; i++) {
    calendarDays.push(i);
  }

  // Use events from props instead of mockEvents
  const hasEvent = (day: number | null) => {
    if (!day) return false;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some(e => e.date === dateStr);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 space-y-8 max-w-6xl">
      <h1 className="text-3xl font-bold">Minha <span className="text-accent">Agenda</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-xl font-bold">{monthNames[month]} {year}</h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white/5 transition-all"><ChevronLeft size={20} /></button>
              <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/5 transition-all"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center p-4 border-b border-gray-800">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(d => (
              <div key={d} className="text-[10px] font-bold uppercase tracking-widest text-secondary py-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 p-4">
            {calendarDays.map((day, idx) => {
              const dateStr = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
              const isSelected = dateStr === selectedDate;
              return (
                <div
                  key={idx}
                  onClick={() => day && setSelectedDate(dateStr)}
                  className={`aspect-square flex flex-col items-center justify-center rounded-xl cursor-pointer relative transition-all ${day ? 'hover:bg-accent/10' : 'cursor-default'
                    } ${isSelected ? 'bg-accent/20 ring-1 ring-accent' : ''}`}
                >
                  {day && (
                    <>
                      <span className={`text-lg font-medium ${isSelected ? 'text-accent' : 'text-white'}`}>{day}</span>
                      {hasEvent(day) && (
                        <div className="absolute bottom-2 w-1.5 h-1.5 bg-accent rounded-full neon-shadow" />
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Eventos */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Eventos do dia</h3>
            <span className="text-secondary text-sm">{new Date(selectedDate).toLocaleDateString('pt-BR')}</span>
          </div>

          <div className="space-y-4">
            {eventsOnSelectedDate.length > 0 ? (
              eventsOnSelectedDate.map(event => (
                <div
                  key={event.id}
                  onClick={() => onNavigate('event-detail', event.id)}
                  className="bg-card p-5 rounded-2xl border border-gray-800 hover:border-accent/40 transition-all cursor-pointer group"
                >
                  <h4 className="font-bold text-lg group-hover:text-accent transition-colors">{event.title}</h4>
                  <p className="text-secondary text-[10px] font-black uppercase tracking-widest opacity-60 truncate">{event.client_name}</p>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center gap-2 text-secondary text-sm">
                      <Clock size={14} className="text-accent" />
                      <span>{event.start_time} - {event.end_time || '??:??'}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-secondary text-sm">
                        <MapPin size={14} className="text-accent" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-card/50 border border-dashed border-gray-800 rounded-2xl p-10 text-center text-secondary">
                <p>Nenhum compromisso para este dia.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
