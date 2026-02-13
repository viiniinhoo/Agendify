
import React from 'react';
// Added Event to imports
import { PageView, Event } from '../types';
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Added events to component props type and arguments
const FinancePage: React.FC<{ onNavigate: (v: PageView) => void; events: Event[] }> = ({ onNavigate, events }) => {
  // Use events from props instead of mockEvents
  const total = events.reduce((acc, curr) => acc + curr.total_amount, 0);
  const paid = events.reduce((acc, curr) => acc + curr.paid_amount, 0);
  const pending = total - paid;

  const data = [
    { name: 'Recebido', value: paid, color: '#00ff88' },
    { name: 'Pendente', value: pending, color: '#ffaa00' },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 space-y-8 max-w-5xl">
      <h1 className="text-3xl font-bold">Controle <span className="text-accent">Financeiro</span></h1>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-accent rounded-2xl p-8 text-black shadow-xl shadow-accent/10 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
            <DollarSign size={160} />
          </div>
          <p className="font-bold uppercase tracking-widest text-[10px] opacity-70">Total Recebido</p>
          <h2 className="text-5xl font-black mt-2 tracking-tighter">R$ {paid.toLocaleString('pt-BR')}</h2>
          <div className="mt-6 flex items-center gap-2 text-sm font-bold">
            <TrendingUp size={20} />
            <span>+12.5% este mês</span>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-gray-800 shadow-xl relative overflow-hidden group">
          <p className="font-bold uppercase tracking-widest text-[10px] text-secondary">A Receber</p>
          <h2 className="text-5xl font-black mt-2 tracking-tighter text-warning">R$ {pending.toLocaleString('pt-BR')}</h2>
          <div className="mt-6 flex items-center gap-2 text-sm font-bold text-secondary">
            <Clock size={20} />
            <span>Aguardando pagamentos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Card */}
        <div className="bg-card p-6 rounded-2xl border border-gray-800 space-y-6">
          <h3 className="text-xl font-bold">Distribuição</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-card p-6 rounded-2xl border border-gray-800 space-y-6">
          <h3 className="text-xl font-bold">Pagamentos por Evento</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
            {/* Use events from props instead of mockEvents */}
            {events.map(event => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-gray-800/50">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${event.paid_amount >= event.total_amount ? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'}`}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm truncate max-w-[140px]">{event.title}</p>
                    <p className="text-[10px] text-secondary font-bold truncate opacity-60 mb-1">{event.client_name}</p>
                    <p className="text-[10px] text-secondary uppercase font-bold tracking-wider">
                      {event.paid_amount >= event.total_amount ? 'Quitado' : 'Parcial'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">R$ {event.paid_amount.toLocaleString('pt-BR')}</p>
                  <p className="text-[10px] text-secondary font-bold">de R$ {event.total_amount.toLocaleString('pt-BR')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Clock: React.FC<{ size?: number }> = ({ size = 20 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;

export default FinancePage;
