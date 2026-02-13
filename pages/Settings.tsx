
import React, { useState } from 'react';
import { User, Bell, Shield, Smartphone, HelpCircle, LogOut, ChevronRight, LayoutTemplate } from 'lucide-react';
import { PageView } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../components/NotificationProvider';
import ProfileModal from '../components/ProfileModal';
import PWAModal from '../components/PWAModal';
import HelpModal from '../components/HelpModal';

const SettingsPage: React.FC<{ onNavigate: (v: PageView) => void; onLogout: () => void }> = ({ onNavigate, onLogout }) => {
  const { user } = useAuth();
  const { showToast } = useNotifications();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const sections = [
    { id: 'templates', label: 'Modelos', icon: LayoutTemplate, color: 'text-accent' },
    { id: 'profile', label: 'Perfil', icon: User, color: 'text-blue-500' },
    { id: 'pwa', label: 'Configurações do App (PWA)', icon: Smartphone, color: 'text-warning' },
    { id: 'help', label: 'Ajuda & Suporte', icon: HelpCircle, color: 'text-secondary' },
  ];

  const handleSectionClick = (sectionId: string) => {
    if (sectionId === 'templates') {
      onNavigate('templates');
    } else {
      setActiveModal(sectionId);
    }
  };

  const handleProfileSave = (data: { name: string; phone: string; location: string }) => {
    // TODO: Implement profile update logic with Supabase
    console.log('Profile data:', data);
    showToast('Perfil atualizado com sucesso!');
    setActiveModal(null);
  };

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
            <button
              onClick={() => setActiveModal('profile')}
              className="text-accent text-[9px] font-black uppercase tracking-widest hover:underline"
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-gray-800 divide-y divide-gray-800">
        {sections.map((section, idx) => (
          <button
            key={idx}
            onClick={() => handleSectionClick(section.id)}
            className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-all first:rounded-t-2xl last:rounded-b-2xl group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={`${section.color} p-2 rounded-lg bg-current/10`}>
                <section.icon size={22} />
              </div>
              <span className="font-semibold text-white/90 group-hover:text-white transition-colors">{section.label}</span>
            </div>
            <ChevronRight size={20} className="text-gray-700 group-hover:text-accent transition-colors" />
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

      {/* Modals */}
      {activeModal === 'profile' && (
        <ProfileModal
          onClose={() => setActiveModal(null)}
          userEmail={user?.email || ''}
          onSave={handleProfileSave}
        />
      )}
      {activeModal === 'pwa' && (
        <PWAModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'help' && (
        <HelpModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
};

export default SettingsPage;
