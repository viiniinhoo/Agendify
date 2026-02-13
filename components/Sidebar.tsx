
import React from 'react';
import { Home, Calendar, Briefcase, Users, DollarSign, LayoutTemplate, Settings, LogOut } from 'lucide-react';
import { PageView } from '../types';
import { motion } from 'framer-motion';

interface SidebarProps {
  currentPage: PageView;
  onNavigate: (view: PageView) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'calendar', label: 'Calendário', icon: Calendar },
    { id: 'events', label: 'Eventos', icon: Briefcase },
    { id: 'finance', label: 'Financeiro', icon: DollarSign },
    { id: 'templates', label: 'Templates', icon: LayoutTemplate },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-white/5 flex-col z-50">
      <div className="p-10">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-black text-accent tracking-tighter"
        >
          Agendify
        </motion.h1>
      </div>

      <nav className="flex-1 px-6 space-y-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onNavigate(item.id as PageView)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative group ${isActive
                ? 'text-accent'
                : 'text-secondary opacity-60 hover:opacity-100 hover:text-white'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-accent/5 border border-accent/20 rounded-2xl shadow-[0_0_20px_rgba(0,255,136,0.1)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon size={22} strokeWidth={isActive ? 3 : 2} className={`relative z-10 ${isActive ? 'text-accent' : 'group-hover:scale-110 group-hover:text-accent transition-all'}`} />
              <span className={`relative z-10 text-xs font-black uppercase tracking-widest transition-all ${isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5">
        <motion.button
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-destructive hover:bg-destructive/5 transition-all font-black text-xs uppercase tracking-widest"
        >
          <LogOut size={20} strokeWidth={3} />
          <span>Sair</span>
        </motion.button>
      </div>
    </aside>
  );
};

export default Sidebar;

