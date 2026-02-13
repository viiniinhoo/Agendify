
import React, { useState } from 'react';
import { Clock, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CustomTimePickerProps {
    value: string; // HH:mm
    onChange: (value: string) => void;
    onClose: () => void;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({ value, onChange, onClose }) => {
    const [hour, setHour] = useState(value?.split(':')[0] || '12');
    const [minute, setMinute] = useState(value?.split(':')[1] || '00');

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

    const handleConfirm = () => {
        onChange(`${hour}:${minute}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-card border border-gray-800 rounded-3xl w-full max-w-[300px] overflow-hidden shadow-2xl"
            >
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-accent font-black uppercase text-[10px] tracking-widest">
                        <Clock size={14} />
                        Horário
                    </div>
                    <button onClick={onClose} className="text-secondary hover:text-white transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <div className="text-center">
                            <span className="text-[10px] font-black text-secondary uppercase tracking-widest block mb-2">Hora</span>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 min-w-[70px]">
                                <span className="text-3xl font-black text-white">{hour}</span>
                            </div>
                        </div>
                        <span className="text-3xl font-black text-secondary mt-6">:</span>
                        <div className="text-center">
                            <span className="text-[10px] font-black text-secondary uppercase tracking-widest block mb-2">Minuto</span>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 min-w-[70px]">
                                <span className="text-3xl font-black text-white">{minute}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 h-[150px] overflow-y-auto no-scrollbar mask-fade-y">
                            {hours.map(h => (
                                <button
                                    key={h}
                                    onClick={() => setHour(h)}
                                    className={`w-full py-2 rounded-xl text-sm font-bold transition-all ${hour === h ? 'bg-accent text-black' : 'text-secondary hover:bg-white/5'
                                        }`}
                                >
                                    {h}
                                </button>
                            ))}
                        </div>
                        <div className="space-y-2 h-[150px] overflow-y-auto no-scrollbar mask-fade-y">
                            {minutes.map(m => (
                                <button
                                    key={m}
                                    onClick={() => setMinute(m)}
                                    className={`w-full py-2 rounded-xl text-sm font-bold transition-all ${minute === m ? 'bg-accent text-black' : 'text-secondary hover:bg-white/5'
                                        }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleConfirm}
                        className="w-full bg-accent text-black font-black py-4 rounded-2xl mt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-lg shadow-accent/20 active:scale-95 transition-all"
                    >
                        <Check size={18} strokeWidth={3} />
                        Confirmar
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default CustomTimePicker;
