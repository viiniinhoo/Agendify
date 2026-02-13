
import React from 'react';
import { X, Smartphone, Download, Share2, Chrome, Apple } from 'lucide-react';

interface PWAModalProps {
    onClose: () => void;
}

const PWAModal: React.FC<PWAModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-card w-full max-w-2xl rounded-3xl border border-gray-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-black flex items-center gap-3 tracking-tight">
                        <div className="bg-warning/10 p-2 rounded-xl text-warning">
                            <Smartphone size={24} strokeWidth={3} />
                        </div>
                        Instalar App (PWA)
                    </h2>
                    <button onClick={onClose} className="text-secondary hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
                        <h3 className="font-black text-lg mb-2 text-accent">Por que instalar?</h3>
                        <ul className="space-y-2 text-sm text-secondary">
                            <li className="flex items-start gap-2">
                                <span className="text-accent mt-0.5">✓</span>
                                <span>Acesso rápido direto da tela inicial</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-accent mt-0.5">✓</span>
                                <span>Funciona offline (após primeiro acesso)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-accent mt-0.5">✓</span>
                                <span>Experiência nativa como um app real</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-accent mt-0.5">✓</span>
                                <span>Notificações push (em breve)</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-blue-500/10 p-2 rounded-xl text-blue-500">
                                    <Chrome size={24} />
                                </div>
                                <h3 className="font-black text-lg">Android / Chrome</h3>
                            </div>
                            <ol className="space-y-3 text-sm text-secondary">
                                <li className="flex items-start gap-3">
                                    <span className="bg-accent/10 text-accent font-black text-xs rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">1</span>
                                    <span>Toque no menu (⋮) no canto superior direito</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-accent/10 text-accent font-black text-xs rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">2</span>
                                    <span>Selecione "Adicionar à tela inicial" ou "Instalar app"</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-accent/10 text-accent font-black text-xs rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">3</span>
                                    <span>Confirme a instalação</span>
                                </li>
                            </ol>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-gray-500/10 p-2 rounded-xl text-gray-400">
                                    <Apple size={24} />
                                </div>
                                <h3 className="font-black text-lg">iOS / Safari</h3>
                            </div>
                            <ol className="space-y-3 text-sm text-secondary">
                                <li className="flex items-start gap-3">
                                    <span className="bg-accent/10 text-accent font-black text-xs rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">1</span>
                                    <span>Toque no ícone de compartilhar <Share2 size={14} className="inline" /> na barra inferior</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-accent/10 text-accent font-black text-xs rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">2</span>
                                    <span>Role para baixo e toque em "Adicionar à Tela de Início"</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-accent/10 text-accent font-black text-xs rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">3</span>
                                    <span>Toque em "Adicionar" no canto superior direito</span>
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4">
                        <p className="text-xs text-blue-400 font-medium">
                            💡 <strong>Dica:</strong> Após instalar, você pode abrir o Agendify diretamente da tela inicial do seu dispositivo, como qualquer outro aplicativo!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PWAModal;
