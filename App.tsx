
import React, { useState, useEffect } from 'react';
import { PageView, Event } from './types';
import { useAuth } from './hooks/useAuth';
import { useEvents } from './hooks/useEvents';
import { useNotifications } from './components/NotificationProvider';
import { supabase } from './services/supabase';
import DashboardPage from './pages/Dashboard';
import EventsPage from './pages/Events';
import CalendarPage from './pages/Calendar';
import FinancePage from './pages/Finance';
import SettingsPage from './pages/Settings';
import TemplatesPage from './pages/Templates';
import EventDetailPage from './pages/EventDetail';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import AddEventModal from './components/AddEventModal';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { events, isLoading: eventsLoading, addEvent, isAdding, isUpdating } = useEvents();
  const { showToast } = useNotifications();
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const navigateTo = (view: PageView, id?: string) => {
    setCurrentPage(view);
    if (id) setSelectedEventId(id);
    window.scrollTo(0, 0);
  };

  const handleLogin = async () => {
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) setAuthError(error.message);
    } catch (err: any) {
      setAuthError(err.message || 'Erro inesperado ao fazer login');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleAddEvent = async (newEvent: Omit<Event, 'id' | 'user_id' | 'created_at' | 'paid_amount'>) => {
    try {
      await addEvent({
        ...newEvent,
        user_id: user?.id || '',
        paid_amount: 0,
      });
      setIsAddEventOpen(false);
      showToast('Evento agendado com sucesso!');
    } catch (err: any) {
      console.error('Erro ao adicionar evento:', err);
      showToast(err.message || 'Erro ao agendar evento', 'error');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage onNavigate={navigateTo} events={events} onAddEvent={() => setIsAddEventOpen(true)} />;
      case 'events': return <EventsPage onNavigate={navigateTo} events={events} onAddEvent={() => setIsAddEventOpen(true)} />;
      case 'calendar': return <CalendarPage onNavigate={navigateTo} events={events} />;
      case 'finance': return <FinancePage onNavigate={navigateTo} events={events} />;
      case 'templates': return <TemplatesPage onNavigate={navigateTo} />;
      case 'settings': return <SettingsPage onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'event-detail': return <EventDetailPage eventId={selectedEventId} events={events} onBack={() => navigateTo('events')} />;
      default: return <DashboardPage onNavigate={navigateTo} events={events} onAddEvent={() => setIsAddEventOpen(true)} />;
    }
  };

  const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'YOUR_SUPABASE_URL';

  if (isSupabaseConfigured && (authLoading || eventsLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isSupabaseConfigured && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md p-8 bg-card rounded-2xl border border-gray-800 shadow-2xl">
          <h1 className="text-3xl font-bold text-accent mb-6 text-center tracking-tighter">FocusFlow</h1>
          <div className="space-y-4">
            {authError && <p className="text-destructive text-sm text-center bg-destructive/10 py-2 rounded-lg">{authError}</p>}
            <div className="space-y-1">
              <label className="text-xs font-bold text-secondary uppercase px-1">E-mail</label>
              <input
                type="email"
                placeholder="exemplo@email.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-secondary uppercase px-1">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-accent hover:bg-accent-dark text-black font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-2"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white pb-24 lg:pb-0 lg:pl-64">
      <Sidebar currentPage={currentPage} onNavigate={navigateTo} onLogout={handleLogout} />
      <main className="max-w-[1600px] mx-auto transition-all duration-300">
        {renderPage()}
      </main>
      <BottomNav currentPage={currentPage} onNavigate={navigateTo} />

      {isAddEventOpen && (
        <AddEventModal
          isAdding={isAdding}
          onClose={() => setIsAddEventOpen(false)}
          onSave={handleAddEvent}
        />
      )}
    </div>
  );
};

export default App;

