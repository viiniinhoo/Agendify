import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, LayoutTemplate } from 'lucide-react';
import { ChecklistTemplate } from '../types';

interface CustomTemplateSelectProps {
    templates: ChecklistTemplate[];
    onSelect: (templateId: string) => void;
    isLoading?: boolean;
}

const CustomTemplateSelect: React.FC<CustomTemplateSelectProps> = ({ templates, onSelect, isLoading }) => {
    const [isOpen, setIsOpen] = useState(false);

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
                disabled={isLoading}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3 flex items-center justify-between focus:outline-none focus:border-accent/50 transition-all text-sm font-bold relative z-50 text-secondary hover:text-white"
            >
                <LayoutTemplate className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" size={18} />
                <span className="truncate">
                    {isLoading ? 'Aplicando...' : 'Aplicar Modelo'}
                </span>
                <ChevronDown size={16} className={`text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-gray-800 rounded-2xl overflow-hidden shadow-xl z-50 p-1 max-h-60 overflow-y-auto custom-scrollbar"
                    >
                        {templates.length > 0 ? (
                            templates.map((template) => (
                                <button
                                    key={template.id}
                                    type="button"
                                    onClick={() => {
                                        onSelect(template.id);
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-bold mb-1 last:mb-0 text-secondary hover:bg-white/5 hover:text-white text-left"
                                >
                                    <span className="flex items-center gap-2 truncate">
                                        {template.name}
                                    </span>
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-xs text-secondary text-center opacity-50 font-medium">
                                Nenhum modelo disponível
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomTemplateSelect;
