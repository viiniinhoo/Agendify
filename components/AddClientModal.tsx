
import React, { useState } from 'react';
import { X, User, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { Client } from '../types';

interface AddClientModalProps {
    onClose: () => void;
    onSave: (client: Omit<Client, 'id' | 'created_at' | 'user_id'>) => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) return;
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-card w-full max-w-md rounded-3xl border border-gray-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-black flex items-center gap-3 tracking-tight">
                        <div className="bg-accent/10 p-2 rounded-xl text-accent">
                            <User size={24} strokeWidth={3} />
                        </div>
                        Novo Cliente
                    </h2>
                    <button onClick={onClose} className="text-secondary hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-secondary tracking-widest">Nome Completo</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                            <input
                                required
                                type="text"
                                placeholder="Ex: Maria Oliveira"
                                className="w-full bg-black border border-gray-800 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-accent"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-secondary tracking-widest">WhatsApp / Telefone</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                            <input
                                required
                                type="text"
                                placeholder="Ex: 11999999999"
                                className="w-full bg-black border border-gray-800 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-accent"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-secondary tracking-widest">E-mail (Opcional)</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                            <input
                                type="email"
                                placeholder="Ex: maria@email.com"
                                className="w-full bg-black border border-gray-800 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-accent"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent-dark text-black font-black py-4 rounded-2xl transition-all shadow-lg shadow-accent/20 active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                    >
                        <CheckCircle2 size={20} strokeWidth={3} />
                        Cadastrar Cliente
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddClientModal;
