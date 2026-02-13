
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomDatePickerProps {
    value: string; // YYYY-MM-DD
    onChange: (value: string) => void;
    onClose: () => void;
    statusColor?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, onChange, onClose, statusColor = 'text-accent' }) => {
    const [currentDate, setCurrentDate] = useState(value ? new Date(value + 'T12:00:00') : new Date());

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleSelectDay = (day: number) => {
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const formattedDate = selectedDate.toISOString().split('T')[0];
        onChange(formattedDate);
        onClose();
    };

    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const daysArr = [];
    const totalDays = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const startDay = firstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    // Fill empty spaces
    for (let i = 0; i < startDay; i++) {
        daysArr.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
        daysArr.push(i);
    }

    const isToday = (day: number) => {
        const today = new Date();
        return today.getDate() === day &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear();
    };

    const isSelected = (day: number) => {
        if (!value) return false;
        const [y, m, d] = value.split('-').map(Number);
        return y === currentDate.getFullYear() && m === currentDate.getMonth() + 1 && d === day;
    };

    const getBgColor = () => {
        if (statusColor.includes('warning')) return 'bg-warning';
        if (statusColor.includes('blue')) return 'bg-blue-500';
        if (statusColor.includes('destructive') || statusColor.includes('red')) return 'bg-destructive';
        return 'bg-accent';
    };

    const getTextColor = () => {
        if (statusColor.includes('warning')) return 'text-warning';
        if (statusColor.includes('blue')) return 'text-blue-500';
        if (statusColor.includes('destructive') || statusColor.includes('red')) return 'text-destructive';
        return 'text-accent';
    };

    const activeBg = getBgColor();
    const activeText = getTextColor();

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-card border border-gray-800 rounded-3xl w-full max-w-[340px] overflow-hidden shadow-2xl"
            >
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <div className={`flex items-center gap-2 font-black uppercase text-[10px] tracking-widest ${activeText}`}>
                        <CalendarIcon size={14} />
                        Selecionar Data
                    </div>
                    <button onClick={onClose} className="text-secondary hover:text-white transition-all">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-black text-sm">
                            {monthNames[currentDate.getMonth()]} <span className="opacity-40">{currentDate.getFullYear()}</span>
                        </h3>
                        <div className="flex gap-1">
                            <button onClick={handlePrevMonth} className="p-2 hover:bg-white/5 rounded-xl transition-all text-secondary">
                                <ChevronLeft size={18} />
                            </button>
                            <button onClick={handleNextMonth} className="p-2 hover:bg-white/5 rounded-xl transition-all text-secondary">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
                            <div key={d} className="text-center text-[10px] font-black text-secondary/40 py-2">{d}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {daysArr.map((day, idx) => (
                            <div key={idx} className="aspect-square">
                                {day !== null ? (
                                    <button
                                        onClick={() => handleSelectDay(day)}
                                        className={`w-full h-full rounded-xl text-xs font-bold transition-all flex items-center justify-center
                      ${isSelected(day) ? `${activeBg} text-white shadow-lg shadow-current/20 scale-110` :
                                                isToday(day) ? `bg-white/10 ${activeText} border border-white/10` :
                                                    'text-secondary hover:bg-white/5 hover:text-white'}
                    `}
                                    >
                                        {day}
                                    </button>
                                ) : <div className="w-full h-full" />}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CustomDatePicker;
