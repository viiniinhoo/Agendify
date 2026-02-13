
import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Save } from 'lucide-react';

interface ProfileModalProps {
    onClose: () => void;
    userEmail: string;
    onSave: (data: { name: string; phone: string; location: string }) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, userEmail, onSave }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, phone, location });
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-card w-full max-w-lg rounded-3xl border border-gray-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-black flex items-center gap-3 tracking-tight">
                        <div className="bg-blue-500/10 p-2 rounded-xl text-blue-500">
                            <User size={24} strokeWidth={3} />
                        </div>
                        Editar Perfil
                    </h2>
                    <button onClick={onClose} className="text-secondary hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-secondary tracking-widest px-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                            <input
                                disabled
                                type="email"
                                value={userEmail}
                                className="w-full bg-black/50 border border-gray-800 rounded-xl pl-11 pr-4 py-3 focus:outline-none opacity-50 cursor-not-allowed"
                            />
                        </div>
                        <p className="text-[10px] text-secondary px-1 opacity-60">O email não pode ser alterado</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-secondary tracking-widest px-1">Nome Completo</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" size={18} />
                            <input
                                type="text"
                                placeholder="Seu nome completo"
                                className="w-full bg-black border border-gray-800 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-accent"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-secondary tracking-widest px-1">Telefone</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" size={18} />
                            <input
                                type="tel"
                                placeholder="(00) 00000-0000"
                                className="w-full bg-black border border-gray-800 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-accent"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-secondary tracking-widest px-1">Localização</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" size={18} />
                            <input
                                type="text"
                                placeholder="Cidade, Estado"
                                className="w-full bg-black border border-gray-800 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-accent"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent-dark text-black font-black py-4 rounded-2xl transition-all shadow-lg shadow-accent/20 active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                    >
                        <Save size={20} strokeWidth={3} />
                        Salvar Alterações
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;
