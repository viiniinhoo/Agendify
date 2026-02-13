
import React from 'react';
import { User, Bell, Shield, Smartphone, HelpCircle, LogOut, ChevronRight, LayoutTemplate } from 'lucide-react';
import { PageView } from '../types';
import { useAuth } from '../hooks/useAuth';

const SettingsPage: React.FC<{ onNavigate: (v: PageView) => void; onLogout: () => void }> = ({ onNavigate, onLogout }) => {
  const { user } = useAuth();
  const sections = [
    { id: 'templates', label: 'Modelos', icon: LayoutTemplate, color: 'text-accent' },
    { id: 'profile', label: 'Perfil', icon: User, color: 'text-blue-500' },
    { id: 'notifications', label: 'Notificações', icon: Bell, color: 'text-purple-500' },
    { id: 'pwa', label: 'Configurações do App (PWA)', icon: Smartphone, color: 'text-warning' },
    { id: 'help', label: 'Ajuda & Suporte', icon: HelpCircle, color: 'text-secondary' },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 space-y-8 max-w-2xl">
      <h1 className="text-3xl font-bold">Configurações</h1>

      <div className="flex items-center gap-4 p-6 bg-card rounded-2xl border border-gray-800">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-3xl font-black shadow-inner">
          {user?.email?.charAt(0).toUpperCase() || 'F'}
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tight">{user?.email?.split('@')[0] || 'Usuário Agendify'}</h2>
          <p className="text-secondary text-sm font-medium opacity-70">{user?.email || 'premium@agendify.com'}</p>
          <div className="flex gap-4 mt-2">
            <span className="bg-accent/10 text-accent text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">Pro Plan</span>
            <button className="text-accent text-[9px] font-black uppercase tracking-widest hover:underline">Editar Perfil</button>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-gray-800 divide-y divide-gray-800">
        {sections.map((section, idx) => (
          <button
            key={idx}
            onClick={() => section.id === 'templates' ? onNavigate('templates') : null}
            className={`w-full flex items-center justify-between p-5 hover:bg-white/5 transition-all first:rounded-t-2xl last:rounded-b-2xl group ${section.id === 'templates' ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`${section.color} p-2 rounded-lg bg-current/10`}>
                <section.icon size={22} />
              </div>
              <span className="font-semibold text-white/90 group-hover:text-white transition-colors">{section.label}</span>
            </div>
            {section.id === 'templates' && <ChevronRight size={20} className="text-gray-700" />}
          </button>
        ))}
      </div>

      <div className="space-y-6 pt-4">
        <button
          onClick={onLogout}
          className="w-full py-5 bg-destructive/10 text-destructive border border-destructive/20 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-destructive/20 transition-all active:scale-[0.98] shadow-lg shadow-destructive/5"
        >
          <LogOut size={20} strokeWidth={3} />
          Encerrar Sessão
        </button>
        <div className="text-center space-y-1">
          <p className="text-secondary text-[10px] font-black uppercase tracking-widest opacity-40">Agendify v1.0.0 (Beta)</p>
          <p className="text-secondary text-[9px] font-medium opacity-30">Feito com ❤️ por freelancers para freelancers</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
