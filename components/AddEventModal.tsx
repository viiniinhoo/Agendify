
import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, DollarSign, Briefcase, Plus, User, Phone, CheckCircle2, Loader2 } from 'lucide-react';
import { Event, EventStatus } from '../types';
import CustomDatePicker from './CustomDatePicker';
import CustomTimePicker from './CustomTimePicker';
import { AnimatePresence } from 'framer-motion';

interface AddEventModalProps {
  onClose: () => void;
  onSave: (event: Omit<Event, 'id' | 'user_id' | 'created_at' | 'paid_amount'>) => void;
  isAdding?: boolean;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose, onSave, isAdding }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Casamento',
    date: new Date().toISOString().split('T')[0],
    start_time: '09:00',
    location: '',
    client_name: '',
    client_phone: '',
    total_amount: '',
    status: EventStatus.ORCADO,
    notes: ''
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.client_name || isAdding) return;

    onSave({
      ...formData,
      total_amount: Number(formData.total_amount) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-card w-full max-w-lg rounded-t-[32px] sm:rounded-3xl border-t sm:border border-gray-800 shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in duration-300">
        {/* Header com indicador mobile */}
        <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-3 sm:hidden" />

        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/5">
          <h2 className="text-2xl font-black flex items-center gap-3 tracking-tighter">
            <div className="bg-accent/10 p-2.5 rounded-2xl text-accent">
              <Plus size={24} strokeWidth={3} />
            </div>
            Novo Evento
          </h2>
          <button onClick={onClose} className="text-secondary hover:text-white transition-colors bg-white/5 p-2.5 rounded-2xl">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[80vh] no-scrollbar pb-12 sm:pb-8">
          {/* Sessão do Evento */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-secondary tracking-widest px-1">O que vamos fazer?</label>
              <div className="relative">
                <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-accent" size={20} />
                <input
                  required
                  type="text"
                  placeholder="Ex: Ensaio Gestante Maria"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-4 py-4 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all text-sm font-bold"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-secondary tracking-widest px-1">Quando?</label>
                <button
                  type="button"
                  onClick={() => setShowDatePicker(true)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-4 py-4 flex items-center focus:outline-none focus:border-accent/50 transition-all text-base sm:text-sm font-bold relative"
                >
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-accent" size={20} />
                  {formatDisplayDate(formData.date)}
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-secondary tracking-widest px-1">Que horas?</label>
                <button
                  type="button"
                  onClick={() => setShowTimePicker(true)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-4 py-4 flex items-center focus:outline-none focus:border-accent/50 transition-all text-base sm:text-sm font-bold relative"
                >
                  <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-accent" size={20} />
                  {formData.start_time}
                </button>
              </div>
            </div>
          </div>

          {/* Sessão do Cliente (Nova Integração) */}
          <div className="bg-white/5 p-6 rounded-3xl space-y-4 border border-white/5">
            <h3 className="text-xs font-black uppercase text-accent tracking-widest mb-2">Dados do Cliente</h3>

            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <input
                  required
                  type="text"
                  placeholder="Nome do Cliente"
                  className="w-full bg-black/40 border border-white/5 rounded-xl pl-14 pr-4 py-3 focus:outline-none focus:border-accent/50 transition-all text-sm"
                  value={formData.client_name}
                  onChange={e => setFormData({ ...formData, client_name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                <input
                  required
                  type="text"
                  placeholder="WhatsApp (ex: 11999999999)"
                  className="w-full bg-black/40 border border-white/5 rounded-xl pl-14 pr-4 py-3 focus:outline-none focus:border-accent/50 transition-all text-sm"
                  value={formData.client_phone}
                  onChange={e => setFormData({ ...formData, client_phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-secondary tracking-widest px-1">Onde será?</label>
              <div className="relative">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-accent" size={20} />
                <input
                  type="text"
                  placeholder="Local ou Endereço"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-4 py-4 focus:outline-none focus:border-accent/50 transition-all text-sm font-bold"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-secondary tracking-widest px-1">Quanto vamos cobrar?</label>
              <div className="relative">
                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-accent" size={20} />
                <input
                  type="number"
                  placeholder="0,00"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-4 py-4 focus:outline-none focus:border-accent/50 transition-all text-sm font-black"
                  value={formData.total_amount}
                  onChange={e => setFormData({ ...formData, total_amount: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-secondary tracking-widest px-1">Observações (Opcional)</label>
              <textarea
                placeholder="Adicione detalhes importantes sobre o evento..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 focus:outline-none focus:border-accent/50 transition-all text-sm resize-none h-24"
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isAdding}
            className="w-full bg-accent hover:bg-accent-dark text-black font-black py-5 rounded-2xl transition-all shadow-xl shadow-accent/20 active:scale-[0.98] mt-6 flex items-center justify-center gap-3 text-sm uppercase tracking-widest disabled:opacity-50"
          >
            {isAdding ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                Agendando...
              </>
            ) : (
              <>
                <CheckCircle2 size={24} strokeWidth={3} />
                Agendar Evento
              </>
            )}
          </button>
        </form>

        <AnimatePresence>
          {showDatePicker && (
            <CustomDatePicker
              value={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              onClose={() => setShowDatePicker(false)}
            />
          )}
          {showTimePicker && (
            <CustomTimePicker
              value={formData.start_time}
              onChange={(time) => setFormData({ ...formData, start_time: time })}
              onClose={() => setShowTimePicker(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddEventModal;
