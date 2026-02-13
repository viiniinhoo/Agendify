
import React, { useState } from 'react';
import { PageView } from '../types';
import { useTemplates } from '../hooks/useTemplates';
import { useAuth } from '../hooks/useAuth';
import { Plus, LayoutTemplate, Trash2, CheckCircle2, Loader2, Search, ChevronLeft, Edit2, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AddTemplateModal from '../components/AddTemplateModal';

const TemplatesPage: React.FC<{ onNavigate: (v: PageView) => void }> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { templates, isLoading, addTemplate, deleteTemplate, updateTemplate } = useTemplates();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveTemplate = async (data: any) => {
    try {
      if (editingTemplate) {
        await updateTemplate({ ...data, id: editingTemplate.id, user_id: user?.id });
      } else {
        await addTemplate({ ...data, user_id: user?.id });
      }
      setIsAddModalOpen(false);
      setEditingTemplate(null);
    } catch (err) {
      console.error('Erro ao salvar template:', err);
    }
  };

  const openEditModal = (template: any) => {
    setEditingTemplate(template);
    setIsAddModalOpen(true);
    setOpenMenuId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 lg:px-8 py-8 space-y-8 max-w-5xl"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-4">
          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center gap-2 text-secondary hover:text-white transition-all font-bold text-sm uppercase tracking-wider w-fit"
          >
            <ChevronLeft size={20} />
            Configurações
          </button>
          <div>
            <h1 className="text-3xl font-black tracking-tightest">Modelos de <span className="text-accent underline decoration-accent/20 underline-offset-8">Checklist</span></h1>
            <p className="text-secondary text-sm mt-2 font-medium">Automatize seu pré-evento com padrões reutilizáveis.</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditingTemplate(null);
            setIsAddModalOpen(true);
          }}
          className="bg-accent text-black font-black px-6 py-4 rounded-2xl flex items-center justify-center gap-2 w-full md:w-auto transition-all shadow-xl"
        >
          <Plus size={20} strokeWidth={3} />
          <span className="uppercase text-xs tracking-widest">Criar Template</span>
        </motion.button>
      </div>

      <div className="relative group">
        <label htmlFor="template-search" className="sr-only">Buscar modelos</label>
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-accent transition-colors" size={20} />
        <input
          id="template-search"
          type="text"
          placeholder="Buscar por nome ou descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card/40 border border-white/5 rounded-2xl pl-14 pr-4 py-4 focus:outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all shadow-xl font-medium"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4 text-secondary">
            <Loader2 size={40} className="animate-spin text-accent" />
            <p className="font-bold uppercase text-[10px] tracking-widest">Sincronizando modelos...</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template, idx) => (
              <motion.div
                layout
                key={template.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-card/40 backdrop-blur-xl rounded-[32px] border border-white/5 p-8 space-y-6 hover:border-accent/30 transition-all group shadow-2xl relative overflow-hidden"
              >
                <div className="flex items-start justify-between relative z-10">
                  <div className="p-4 bg-accent/10 rounded-2xl text-accent shadow-inner">
                    <LayoutTemplate size={24} strokeWidth={2.5} />
                  </div>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === template.id ? null : template.id);
                      }}
                      className="p-3 rounded-xl bg-white/5 text-secondary border border-white/10 md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-white/10 hover:text-white"
                    >
                      <MoreVertical size={18} />
                    </button>

                    <AnimatePresence>
                      {openMenuId === template.id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpenMenuId(null)}
                          />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute right-0 top-full mt-2 bg-card border border-gray-800 rounded-2xl overflow-hidden shadow-2xl z-50 min-w-[160px]"
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(template);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-blue-500 hover:bg-blue-500/10 transition-all"
                            >
                              <Edit2 size={16} />
                              Editar
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm('Remover este template permanentemente?')) {
                                  deleteTemplate(template.id);
                                  setOpenMenuId(null);
                                }
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-destructive hover:bg-destructive/10 transition-all border-t border-gray-800"
                            >
                              <Trash2 size={16} />
                              Excluir
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-black tracking-tight group-hover:text-accent transition-colors">{template.name}</h3>
                  <p className="text-secondary text-sm mt-2 font-medium line-clamp-2 leading-relaxed opacity-70">
                    {template.description || 'Sem descrição definida.'}
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/5 relative z-10">
                  <p className="text-[10px] font-black uppercase text-secondary tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent" />
                    Itens ({template.items.length})
                  </p>
                  <div className="grid grid-cols-1 gap-2.5">
                    {template.items.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-secondary font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                    {template.items.length > 4 && (
                      <p className="text-xs text-accent font-black uppercase tracking-widest mt-2">+ {template.items.length - 4} outros itens</p>
                    )}
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-accent/10 transition-all rounded-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {!isLoading && filteredTemplates.length === 0 && (
          <div
            onClick={() => {
              setEditingTemplate(null);
              setIsAddModalOpen(true);
            }}
            className="col-span-full bg-card/20 border-2 border-dashed border-white/5 rounded-[32px] p-20 flex flex-col items-center justify-center text-center space-y-6 hover:border-accent/40 hover:bg-accent/5 transition-all cursor-pointer group"
          >
            <div className="p-6 bg-white/5 rounded-3xl text-secondary group-hover:text-accent group-hover:scale-110 transition-all">
              <Plus size={40} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-black text-xl tracking-tight text-white">Nenhum Modelo Ativo</p>
              <p className="text-secondary text-sm font-medium mt-2 max-w-xs mx-auto">Crie seu primeiro checklist reutilizável para agilizar sua rotina de eventos.</p>
            </div>
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <AddTemplateModal
          initialData={editingTemplate}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingTemplate(null);
          }}
          onSave={handleSaveTemplate}
        />
      )}
    </motion.div>
  );
};

export default TemplatesPage;
