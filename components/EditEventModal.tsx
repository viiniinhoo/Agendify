
import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, DollarSign, Briefcase, User, Phone, CheckCircle2 } from 'lucide-react';
import { Event, EventStatus } from '../types';
import CustomDatePicker from './CustomDatePicker';
import CustomTimePicker from './CustomTimePicker';
import CustomStatusSelect from './CustomStatusSelect';
import { AnimatePresence } from 'framer-motion';

interface EditEventModalProps {
    event: Event;
    onClose: () => void;
    onSave: (event: Partial<Event> & { id: string }) => void;
}

const EditEventModal: React.FC<EditEventModalProps> = ({ event, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: event.title,
        type: event.type || 'Casamento',
        date: event.date,
        start_time: event.start_time,
        location: event.location || '',
        client_name: event.client_name || '',
        client_phone: event.client_phone || '',
        total_amount: event.total_amount.toString(),
        status: event.status,
        notes: event.notes || ''
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
        if (!formData.title || !formData.date || !formData.client_name) return;

        onSave({
            id: event.id,
            ...formData,
            total_amount: Number(formData.total_amount) || 0,
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-md">
            <div className="bg-card w-full max-w-lg rounded-t-[32px] sm:rounded-3xl border-t sm:border border-gray-800 shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in duration-300">
                {/* Header mobile */}
                <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-3 sm:hidden" />

                <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/5">
                    <h2 className="text-2xl font-black flex items-center gap-3 tracking-tighter">
                        <div className="bg-accent/10 p-2.5 rounded-2xl text-accent">
                            <Briefcase size={24} strokeWidth={3} />
                        </div>
                        Editar Evento
                    </h2>
                    <button onClick={onClose} className="text-secondary hover:text-white transition-colors bg-white/5 p-2.5 rounded-2xl">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[80vh] no-scrollbar pb-12 sm:pb-8">
                    {/* Título */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-secondary tracking-widest px-1">Título do Evento</label>
                        <div className="relative">
                            <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-accent" size={20} />
                            <input
                                required
                                type="text"
                                placeholder="..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-4 py-4 focus:outline-none focus:border-accent/50 transition-all text-sm font-bold"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Data e Hora */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-secondary tracking-widest px-1">Data</label>
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
                            <label className="text-[10px] font-black uppercase text-secondary tracking-widest px-1">Hora</label>
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

                    {/* Cliente */}
                    <div className="bg-white/5 p-6 rounded-3xl space-y-4 border border-white/5">
                        <h3 className="text-xs font-black uppercase text-accent tracking-widest mb-2">Dados do Cliente</h3>
                        <div className="space-y-4">
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
                            <div className="relative">
                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                                <input
                                    required
                                    type="text"
                                    placeholder="WhatsApp"
                                    className="w-full bg-black/40 border border-white/5 rounded-xl pl-14 pr-4 py-3 focus:outline-none focus:border-accent/50 transition-all text-sm"
                                    value={formData.client_phone}
                                    onChange={e => setFormData({ ...formData, client_phone: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Local e Valor */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-secondary tracking-widest px-1">Local</label>
                            <div className="relative">
                                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-accent" size={20} />
                                <input
                                    type="text"
                                    placeholder="..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-4 py-4 focus:outline-none focus:border-accent/50 transition-all text-sm"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-secondary tracking-widest px-1">Valor Total (R$)</label>
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
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-secondary tracking-widest px-1">Status do Evento</label>
                        <CustomStatusSelect
                            value={formData.status}
                            onChange={(status) => setFormData({ ...formData, status })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent-dark text-black font-black py-5 rounded-2xl transition-all shadow-xl shadow-accent/20 active:scale-[0.98] mt-6 flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
                    >
                        <CheckCircle2 size={24} strokeWidth={3} />
                        Salvar Alterações
                    </button>
                </form>

                <AnimatePresence>
                    {showDatePicker && (
                        <CustomDatePicker
                            value={formData.date}
                            onChange={(date) => setFormData({ ...formData, date })}
                            onClose={() => setShowDatePicker(false)}
                            statusColor={
                                formData.status === EventStatus.ORCADO ? 'text-warning' :
                                    formData.status === EventStatus.CANCELADO ? 'text-destructive' :
                                        formData.status === EventStatus.CONCLUIDO ? 'text-blue-500' :
                                            'text-accent'
                            }
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

export default EditEventModal;
