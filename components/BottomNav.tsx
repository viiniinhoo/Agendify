
import React from 'react';
import { Home, Calendar, Briefcase, DollarSign, LayoutTemplate, Menu } from 'lucide-react';
import { PageView } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomNavProps {
  currentPage: PageView;
  onNavigate: (view: PageView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'calendar', label: 'Agenda', icon: Calendar },
    { id: 'events', label: 'Eventos', icon: Briefcase },
    { id: 'finance', label: 'Financeiro', icon: DollarSign },
    { id: 'settings', label: 'Mais', icon: Menu },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-card/60 backdrop-blur-2xl border-t border-white/5 z-50">
      <div className="flex justify-around items-center h-20 relative px-4 pb-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onNavigate(item.id as PageView)}
              className={`flex flex-col items-center justify-center gap-1.5 w-full h-full transition-colors relative z-10 ${isActive ? 'text-accent' : 'text-secondary opacity-60'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-[1px] inset-x-2 h-[3px] bg-accent shadow-[0_0_20px_rgba(0,255,136,0.8),0_0_40px_rgba(0,255,136,0.4)] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-accent/10' : ''}`}>
                <Icon size={24} strokeWidth={isActive ? 3 : 2} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-accent opacity-100' : 'opacity-50'}`}>{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

