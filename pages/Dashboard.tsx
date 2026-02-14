
import React from 'react';
import { PageView, Event, EventStatus } from '../types';
import { Plus, Clock, MapPin, DollarSign, Users, Briefcase, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { getDayAndMonth } from '../utils/dateUtils';

interface DashboardProps {
  onNavigate: (view: PageView, id?: string) => void;
  events: Event[];
  onAddEvent: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, events, onAddEvent }) => {
  const nextEvents = events
    .filter(e => e.status !== EventStatus.CONCLUIDO && e.status !== EventStatus.CANCELADO)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const totalRevenue = events.reduce((acc, curr) => acc + curr.total_amount, 0);
  const totalPaid = events.reduce((acc, curr) => acc + curr.paid_amount, 0);
  const totalPending = totalRevenue - totalPaid;

  const chartData = [
    { name: 'Recebido', value: totalPaid, color: '#00ff88' },
    { name: 'Pendente', value: totalPending, color: '#ffaa00' },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-4 space-y-6 max-w-2xl min-h-screen pb-24"
    >
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 variants={itemVariants} className="text-2xl font-black tracking-tighter">
            Agend<span className="text-accent">ify</span>
          </motion.h1>
        </div>
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,255,136,0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddEvent}
          className="bg-accent text-black font-black px-5 py-4 sm:px-8 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,136,0.2)]"
        >
          <Plus size={24} strokeWidth={4} />
          <span className="hidden sm:inline uppercase text-xs tracking-widest">Novo Evento</span>
        </motion.button>
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Eventos', val: events.length, icon: Briefcase, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Contatos', val: new Set(events.map(e => e.client_name)).size, icon: Users, color: 'text-[#00e1ff]', bg: 'bg-[#00e1ff]/10' },
          { label: 'Receita', val: `R$ ${(totalRevenue / 1000).toFixed(1)}k`, icon: DollarSign, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Agenda', val: 'Fev/24', icon: Calendar, color: 'text-warning', bg: 'bg-warning/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-card/40 backdrop-blur-xl p-4 md:p-6 rounded-[24px] md:rounded-[32px] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-5 transition-all shadow-2xl"
          >
            <div className={`${stat.bg} ${stat.color} p-3 md:p-4 rounded-xl md:rounded-2xl shrink-0 shadow-lg`}>
              <stat.icon size={24} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <p className="text-secondary text-[10px] font-black uppercase tracking-widest mb-0.5 md:mb-1 truncate opacity-70">{stat.label}</p>
              <p className="text-xl md:text-2xl font-black tracking-tighter truncate">{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <motion.div variants={itemVariants} className="xl:col-span-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight">Próximos Eventos</h2>
            <button onClick={() => onNavigate('events')} className="text-accent text-[11px] font-bold hover:brightness-110 transition-all">Ver todos</button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 pt-2 hide-scrollbar snap-x">
            {nextEvents.map((event, idx) => {
              const { day, month } = getDayAndMonth(event.date);
              const statusColor = event.status === EventStatus.CONFIRMADO ? '#00ff88' :
                event.status === EventStatus.ORCADO ? '#ffaa00' :
                  event.status === EventStatus.CONCLUIDO ? '#888888' : '#ff4444';

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  onClick={() => onNavigate('event-detail', event.id)}
                  className="min-w-[85%] sm:min-w-[320px] bg-[#181818] rounded-[20px] border border-white/5 p-3.5 shadow-2xl cursor-pointer relative snap-start group"
                >
                  {/* Status Indicator Bar */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    style={{ backgroundColor: statusColor }}
                  />

                  <div className="flex justify-between items-center mb-3 pl-3">
                    {/* Date Block */}
                    <div className="bg-[#1c1c1c] rounded-xl px-2.5 py-1.5 min-w-[50px] flex flex-col items-center justify-center border border-white/5">
                      <span className="text-lg font-black text-white leading-none mb-0.5">{day}</span>
                      <span className="text-[9px] font-black text-secondary uppercase tracking-widest">{month}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
                      <span className="text-[9px] font-black text-secondary uppercase tracking-widest">
                        {event.status === EventStatus.ORCADO ? 'Pendente' :
                          event.status === EventStatus.CONFIRMADO ? 'Confirmado' :
                            event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="pl-3">
                    <h3 className="text-base font-bold text-white group-hover:text-accent transition-colors leading-tight mb-2.5 truncate">
                      {event.title}
                    </h3>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-secondary font-medium text-[10px]">
                        <Clock size={12} className="opacity-40" />
                        <span>{event.start_time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-secondary font-medium text-[10px] truncate">
                        <MapPin size={12} className="opacity-40" />
                        <span className="truncate">{event.location || 'Local...'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            {nextEvents.length === 0 && (
              <div className="w-full py-12 bg-card/40 rounded-[32px] border border-white/5 flex flex-col items-center justify-center text-secondary">
                <Calendar size={40} strokeWidth={1} className="mb-4 opacity-20" />
                <p className="font-medium">Nenhum evento agendado</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="xl:col-span-4 space-y-4">
          <div className="bg-card p-6 rounded-[32px] border border-gray-800/50 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[60px] rounded-full -mr-16 -mt-16 transition-all group-hover:bg-accent/10" />
            <h2 className="text-xl font-black tracking-tight mb-6">Saúde Financeira</h2>
            <div className="h-[180px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#666" fontSize={10} width={60} axisLine={false} tickLine={false} fontWeight="bold" />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '16px', fontWeight: 'bold' }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/[0.03] p-4 rounded-2xl border border-gray-800/50 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">Recebido</p>
                  <p className="text-2xl font-black text-accent tracking-tighter">R$ {totalPaid.toLocaleString('pt-BR')}</p>
                </div>
                <div className="bg-accent/10 p-2 rounded-xl text-accent"><DollarSign size={20} /></div>
              </div>
              <div className="bg-white/[0.03] p-4 rounded-2xl border border-gray-800/50 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">Pendente</p>
                  <p className="text-2xl font-black text-warning tracking-tighter">R$ {totalPending.toLocaleString('pt-BR')}</p>
                </div>
                <div className="bg-warning/10 p-2 rounded-xl text-warning"><Clock size={20} /></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

