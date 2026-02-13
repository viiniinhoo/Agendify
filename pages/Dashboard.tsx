
import React from 'react';
import { PageView, Event, EventStatus } from '../types';
import { Plus, Clock, MapPin, DollarSign, Users, Briefcase, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

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
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
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
      className="container mx-auto px-4 lg:px-8 py-6 space-y-8"
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <div>
          <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-black tracking-tightest">
            Agend<span className="text-accent underline decoration-accent/30 underline-offset-8">ify</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="hidden sm:block text-secondary text-sm font-medium mt-3">Sua central de comando freelancer.</motion.p>
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

      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
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
        <motion.div variants={itemVariants} className="xl:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black tracking-tight">Próximos Compromissos</h2>
            <button onClick={() => onNavigate('events')} className="text-accent text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">Ver Agenda</button>
          </div>

          <div className="bg-card rounded-[32px] border border-gray-800/50 divide-y divide-gray-800/30 overflow-hidden shadow-2xl">
            {nextEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                onClick={() => onNavigate('event-detail', event.id)}
                className="p-5 hover:bg-white/[0.02] transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-5 min-w-0 flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-gray-800/50 flex flex-col items-center justify-center shrink-0 group-hover:border-accent/30 transition-colors">
                    <span className="text-[10px] font-black text-secondary uppercase leading-none mb-1">
                      {new Date(event.date).toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
                    </span>
                    <span className="text-xl font-black leading-none">{new Date(event.date).getDate() + 1}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base group-hover:text-accent transition-colors truncate mb-1">{event.title}</h3>
                    <div className="flex items-center gap-4 text-secondary text-xs font-medium">
                      <span className="flex items-center gap-1.5 shrink-0"><Clock size={14} className="text-accent/50" /> {event.start_time}</span>
                      <span className="flex items-center gap-1.5 truncate"><MapPin size={14} className="text-accent/50" /> {event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                  <div className="text-right">
                    <p className="text-base font-black text-white">R$ {event.total_amount.toLocaleString('pt-BR')}</p>
                    <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">Total</p>
                  </div>
                  <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shrink-0 ${event.status === EventStatus.CONFIRMADO ? 'bg-accent/10 text-accent border-accent/20' : 'bg-warning/10 text-warning border-warning/20'
                    }`}>
                    {event.status === EventStatus.ORCADO ? 'ORÇADO' : event.status}
                  </div>
                </div>
              </motion.div>
            ))}
            {nextEvents.length === 0 && (
              <div className="p-12 text-center text-secondary text-sm font-medium">Nenhum evento futuro agendado.</div>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="xl:col-span-4 space-y-6">
          <div className="bg-card p-8 rounded-[32px] border border-gray-800/50 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[60px] rounded-full -mr-16 -mt-16 transition-all group-hover:bg-accent/10" />
            <h2 className="text-xl font-black tracking-tight mb-8">Saúde Financeira</h2>
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

