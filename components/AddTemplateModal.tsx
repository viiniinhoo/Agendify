
import React, { useState } from 'react';
import { X, LayoutTemplate, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface AddTemplateModalProps {
    onClose: () => void;
    onSave: (template: { name: string; description: string; items: string[] }) => void;
    initialData?: { name: string; description: string; items: string[] };
}

const AddTemplateModal: React.FC<AddTemplateModalProps> = ({ onClose, onSave, initialData }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [items, setItems] = useState<string[]>(initialData?.items || ['']);

    const handleAddItem = () => setItems([...items, '']);
    const handleRemoveItem = (index: number) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const handleItemChange = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index] = value;
        setItems(newItems);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || items.filter(i => i.trim()).length === 0) return;
        onSave({
            name,
            description,
            items: items.filter(i => i.trim() !== '')
        });
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-card w-full max-w-lg rounded-3xl border border-gray-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-black flex items-center gap-3 tracking-tight">
                        <div className="bg-accent/10 p-2 rounded-xl text-accent">
                            <LayoutTemplate size={24} strokeWidth={3} />
                        </div>
                        {initialData ? 'Editar Template' : 'Novo Template'}
                    </h2>
                    <button onClick={onClose} className="text-secondary hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[80vh] no-scrollbar">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-secondary tracking-widest px-1">Nome do Template</label>
                        <input
                            required
                            type="text"
                            placeholder="Ex: Checklist Casamento Standard"
                            className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-secondary tracking-widest px-1">Descrição (Opcional)</label>
                        <textarea
                            placeholder="Para que serve este checklist?"
                            className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-accent resize-none h-20"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-xs font-bold uppercase text-secondary tracking-widest">Itens do Checklist</label>
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="text-accent text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:brightness-110"
                            >
                                <Plus size={14} /> Adicionar
                            </button>
                        </div>

                        <div className="space-y-2">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        required
                                        type="text"
                                        placeholder={`Item #${idx + 1}`}
                                        className="flex-1 bg-black border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                                        value={item}
                                        onChange={e => handleItemChange(idx, e.target.value)}
                                    />
                                    {items.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveItem(idx)}
                                            className="p-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl hover:bg-destructive/20 transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent-dark text-black font-black py-4 rounded-2xl transition-all shadow-lg shadow-accent/20 active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                    >
                        <CheckCircle2 size={20} strokeWidth={3} />
                        {initialData ? 'Salvar Alterações' : 'Criar Template'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTemplateModal;
