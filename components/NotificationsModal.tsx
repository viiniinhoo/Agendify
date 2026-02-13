
import React, { useState } from 'react';
import { X, Bell, Mail, MessageSquare, Calendar, DollarSign } from 'lucide-react';

interface NotificationsModalProps {
    onClose: () => void;
    onSave: (settings: NotificationSettings) => void;
}

interface NotificationSettings {
    emailNotifications: boolean;
    smsNotifications: boolean;
    eventReminders: boolean;
    paymentReminders: boolean;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose, onSave }) => {
    const [settings, setSettings] = useState<NotificationSettings>({
        emailNotifications: true,
        smsNotifications: false,
        eventReminders: true,
        paymentReminders: true,
    });

    const toggleSetting = (key: keyof NotificationSettings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        onSave(settings);
        onClose();
    };

    const options = [
        { key: 'emailNotifications' as keyof NotificationSettings, label: 'Notificações por Email', icon: Mail, description: 'Receba atualizações importantes por email' },
        { key: 'smsNotifications' as keyof NotificationSettings, label: 'Notificações por SMS', icon: MessageSquare, description: 'Alertas via mensagem de texto' },
        { key: 'eventReminders' as keyof NotificationSettings, label: 'Lembretes de Eventos', icon: Calendar, description: 'Notificações antes dos eventos' },
        { key: 'paymentReminders' as keyof NotificationSettings, label: 'Lembretes de Pagamento', icon: DollarSign, description: 'Avisos sobre pagamentos pendentes' },
    ];

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-card w-full max-w-lg rounded-3xl border border-gray-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-black flex items-center gap-3 tracking-tight">
                        <div className="bg-purple-500/10 p-2 rounded-xl text-purple-500">
                            <Bell size={24} strokeWidth={3} />
                        </div>
                        Notificações
                    </h2>
                    <button onClick={onClose} className="text-secondary hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {options.map(option => (
                        <div key={option.key} className="flex items-start justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-start gap-4 flex-1">
                                <div className={`p-2.5 rounded-xl ${settings[option.key] ? 'bg-accent/10 text-accent' : 'bg-white/5 text-secondary'}`}>
                                    <option.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-sm">{option.label}</h3>
                                    <p className="text-xs text-secondary mt-1 opacity-70">{option.description}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting(option.key)}
                                className={`relative w-14 h-7 rounded-full transition-all ${settings[option.key] ? 'bg-accent' : 'bg-gray-700'}`}
                            >
                                <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-lg transition-all ${settings[option.key] ? 'right-0.5' : 'left-0.5'}`} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-gray-800">
                    <button
                        onClick={handleSave}
                        className="w-full bg-accent hover:bg-accent-dark text-black font-black py-4 rounded-2xl transition-all shadow-lg shadow-accent/20 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <Bell size={20} strokeWidth={3} />
                        Salvar Preferências
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationsModal;
