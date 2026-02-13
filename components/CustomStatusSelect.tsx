import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { EventStatus } from '../types';

interface CustomStatusSelectProps {
    value: EventStatus;
    onChange: (value: EventStatus) => void;
}

const statusOptions = [
    { value: EventStatus.ORCADO, label: 'Orçado', color: 'bg-warning/10 text-warning border-warning/20' },
    { value: EventStatus.CONFIRMADO, label: 'Confirmado', color: 'bg-accent/10 text-accent border-accent/20' },
    { value: EventStatus.CONCLUIDO, label: 'Concluído', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { value: EventStatus.CANCELADO, label: 'Cancelado', color: 'bg-destructive/10 text-destructive border-destructive/20' },
];

const statusColors = {
    [EventStatus.ORCADO]: 'bg-warning',
    [EventStatus.CONFIRMADO]: 'bg-accent',
    [EventStatus.CONCLUIDO]: 'bg-blue-500',
    [EventStatus.CANCELADO]: 'bg-destructive',
};

const CustomStatusSelect: React.FC<CustomStatusSelectProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = statusOptions.find(opt => opt.value === value) || statusOptions[0];

    return (
        <div className="relative">
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-6 pr-4 py-4 flex items-center justify-between focus:outline-none focus:border-accent/50 transition-all text-sm font-bold relative z-50"
            >
                <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${statusColors[selectedOption.value]}`} />
                    {selectedOption.label}
                </span>
                <ChevronDown size={20} className={`text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-gray-800 rounded-2xl overflow-hidden shadow-xl z-50 p-1"
                    >
                        {statusOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-bold mb-1 last:mb-0 ${value === option.value ? 'bg-white/10 text-white' : 'text-secondary hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${statusColors[option.value]}`} />
                                    {option.label}
                                </span>
                                {value === option.value && <Check size={16} className="text-accent" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomStatusSelect;
