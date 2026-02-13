
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEvents } from '../hooks/useEvents';
import { useChecklist } from '../hooks/useChecklist';
import { EventStatus, Event } from '../types';
import { ChevronLeft, Calendar, MapPin, Clock, User, Phone, DollarSign, CheckCircle2, MoreVertical, MessageSquare, Plus, Trash2, Loader2, LayoutTemplate, FileText } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import EditEventModal from '../components/EditEventModal';
import CustomTemplateSelect from '../components/CustomTemplateSelect';
import { useTemplates } from '../hooks/useTemplates';
import { useNotifications } from '../components/NotificationProvider';

interface EventDetailProps {
  eventId: string | null;
  events: Event[];
  onBack: () => void;
}

const EventDetailPage: React.FC<EventDetailProps> = ({ eventId, events, onBack }) => {
  const { updateEvent, deleteEvent, isUpdating } = useEvents();
  const { items: checklist, isLoading: isChecklistLoading, updateItem, addItem, addItems, deleteItem, isAdding, isApplying: isApplyingTemplateHook } = useChecklist(eventId);
  const { templates } = useTemplates();
  const { showToast } = useNotifications();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [isApplyingTemplate, setIsApplyingTemplate] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isRegisteringPayment, setIsRegisteringPayment] = useState(false);

  const event = events.find(e => e.id === eventId);
  const clientName = event?.client_name || 'Cliente';
  const clientPhone = event?.client_phone || '';

  const toggleTask = async (id: string, currentStatus: boolean) => {
    try {
      await updateItem({ id, is_done: !currentStatus });
    } catch (err) {
      console.error('Erro ao atualizar checklist:', err);
    }
  };

  const handleAddChecklistItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistItem.trim() || !eventId || isAdding) return;
    try {
      await addItem({
        event_id: eventId,
        description: newChecklistItem.trim(),
        is_done: false,
        order: checklist.length
      });
      setNewChecklistItem('');
    } catch (err: any) {
      console.error('Erro ao adicionar item:', err);
      showToast(err.message || 'Erro ao adicionar item', 'error');
    }
  };

  const handleDeleteEvent = async () => {
    if (!eventId) return;
    if (confirm('Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.')) {
      try {
        await deleteEvent(eventId);
        onBack();
      } catch (err) {
        console.error('Erro ao excluir evento:', err);
      }
    }
  };

  const handleApplyTemplate = async (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template || !eventId) return;

    setIsApplyingTemplate(true);
    try {
      const newItems = template.items.map((desc, idx) => ({
        event_id: eventId,
        description: desc,
        is_done: false,
        order: checklist.length + idx
      }));
      await addItems(newItems);
      showToast('Modelo aplicado com sucesso!');
    } catch (err: any) {
      console.error('Erro ao aplicar template:', err);
      showToast(err.message || 'Erro ao aplicar modelo', 'error');
    } finally {
      setIsApplyingTemplate(false);
    }
  };

  const handleAddPayment = async () => {
    const amount = Number(paymentAmount.replace(',', '.'));
    const remainingBalance = event.total_amount - (event.paid_amount || 0);

    if (!amount || amount <= 0) {
      showToast('O valor deve ser maior que zero', 'error');
      return;
    }

    if (amount > remainingBalance) {
      showToast(`O valor não pode ser maior que o saldo restante (R$ ${remainingBalance.toLocaleString('pt-BR')})`, 'error');
      return;
    }

    try {
      await updateEvent({
        id: event.id,
        paid_amount: (event.paid_amount || 0) + amount
      });
      setPaymentAmount('');
      setIsRegisteringPayment(false);
      showToast(`Recebimento de R$ ${amount.toLocaleString('pt-BR')} registrado!`);
    } catch (err: any) {
      console.error('Erro ao registrar pagamento:', err);
      showToast('Erro ao registrar pagamento', 'error');
    }
  };

  const remainingBalance = event ? event.total_amount - (event.paid_amount || 0) : 0;
  const isPaymentInvalid = !paymentAmount || Number(paymentAmount.replace(',', '.')) <= 0 || Number(paymentAmount.replace(',', '.')) > remainingBalance;

  if (!event) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 size={40} className="animate-spin text-accent" />
    </div>
  );

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-secondary hover:text-white transition-all font-bold text-sm uppercase tracking-wider">
          <ChevronLeft size={20} />
          Voltar
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleDeleteEvent}
            className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive/20 transition-all"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-accent text-black font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95"
          >
            Editar Evento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-card p-6 md:p-8 rounded-3xl border border-gray-800 relative overflow-hidden group">
            <div className="flex flex-col-reverse md:flex-row md:items-start justify-between gap-6 mb-8">
              <div className="space-y-3 flex-1 min-w-0">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight break-words text-white">{event.title}</h1>
                <span className="bg-white/5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-white/70">{event.type || 'Evento'}</span>

              </div>

              <div className="shrink-0 self-start">
                <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 shadow-lg ${event.status === EventStatus.CONFIRMADO ? 'bg-accent/10 text-accent border-accent/20 shadow-accent/5' :
                  event.status === EventStatus.CONCLUIDO ? 'bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-blue-500/5' :
                    event.status === EventStatus.CANCELADO ? 'bg-destructive/10 text-destructive border-destructive/20 shadow-destructive/5' :
                      'bg-warning/10 text-warning border-warning/20 shadow-warning/5'
                  }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${event.status === EventStatus.CONFIRMADO ? 'bg-accent' :
                    event.status === EventStatus.CONCLUIDO ? 'bg-blue-500' :
                      event.status === EventStatus.CANCELADO ? 'bg-destructive' :
                        'bg-warning'
                    }`} />
                  {event.status === EventStatus.ORCADO ? 'ORÇADO' : event.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 text-accent p-2.5 rounded-xl"><Calendar size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Data</p>
                  <p className="font-bold">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 text-accent p-2.5 rounded-xl"><Clock size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Início</p>
                  <p className="font-bold">{event.start_time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 text-accent p-2.5 rounded-xl"><MapPin size={20} /></div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Local</p>
                  <p className="font-bold truncate">{event.location || 'Não definido'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-3xl border border-gray-800 space-y-4">
              <h3 className="font-bold text-lg">Cliente</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-black text-xl text-center">
                  {clientName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-bold truncate">{clientName}</p>
                  <p className="text-secondary text-xs">{clientPhone || 'Sem telefone'}</p>
                </div>
              </div>
              {clientPhone && (
                <button
                  onClick={() => window.open(`https://wa.me/${clientPhone.replace(/\D/g, '')}`, '_blank')}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] font-black py-3 rounded-2xl text-[10px] uppercase tracking-widest border border-[#25D366]/20 transition-all hover:bg-[#25D366]/20"
                >
                  <MessageSquare size={18} />
                  Enviar WhatsApp
                </button>
              )}
            </div>

            <div className="bg-card p-6 rounded-3xl border border-gray-800 space-y-4">
              <h3 className="font-bold text-lg">Financeiro</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-secondary font-black uppercase tracking-widest">Total do Evento</span>
                  <span className="text-xl font-black text-accent">R$ {event.total_amount.toLocaleString('pt-BR')}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-xl border border-gray-800 bg-accent/5">
                    <p className="text-[9px] text-accent font-black uppercase tracking-widest">Recebido</p>
                    <p className="font-bold text-sm">R$ {event.paid_amount.toLocaleString('pt-BR')}</p>
                  </div>
                  <div className="text-center p-3 rounded-xl border border-gray-800 bg-warning/5">
                    <p className="text-[9px] text-warning font-black uppercase tracking-widest">Pendente</p>
                    <p className="font-bold text-sm">R$ {(event.total_amount - event.paid_amount).toLocaleString('pt-BR')}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <AnimatePresence mode="wait">
                    {!isRegisteringPayment ? (
                      <motion.button
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        onClick={() => setIsRegisteringPayment(true)}
                        className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-secondary hover:text-white transition-all"
                      >
                        Registrar Recebimento
                      </motion.button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="space-y-3 p-4 bg-white/5 rounded-2xl border border-white/5"
                      >
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" size={16} />
                          <input
                            autoFocus
                            type="text"
                            inputMode="decimal"
                            placeholder="Valor recebido..."
                            className={`w-full bg-black border rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none font-bold transition-all ${isPaymentInvalid && paymentAmount ? 'border-destructive/50 text-destructive' : 'border-gray-800 focus:border-accent'
                              }`}
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                          />
                          {isPaymentInvalid && paymentAmount && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="text-[9px] text-destructive font-bold uppercase tracking-widest mt-1 ml-1"
                            >
                              {Number(paymentAmount.replace(',', '.')) > remainingBalance
                                ? `O valor excede o saldo de R$ ${remainingBalance.toLocaleString('pt-BR')}`
                                : 'Valor inválido'}
                            </motion.p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsRegisteringPayment(false)}
                            className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-secondary hover:text-white transition-all"
                          >
                            Cancelar
                          </button>
                          <button
                            disabled={isPaymentInvalid || isUpdating}
                            onClick={handleAddPayment}
                            className="flex-[2] py-2 bg-accent text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-accent-dark transition-all disabled:opacity-50"
                          >
                            {isUpdating ? 'Salvando...' : 'Confirmar'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {event.notes && (
            <div className="bg-card p-6 rounded-3xl border border-gray-800 space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-3">
                <FileText size={20} className="text-secondary" />
                Observações
              </h3>
              <p className="text-sm text-secondary leading-relaxed whitespace-pre-wrap">
                {event.notes}
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card p-6 rounded-3xl border border-gray-800 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg">Pré-Evento</h3>
              <span className="text-[10px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded uppercase tracking-widest">
                {checklist.filter(t => t.is_done).length}/{checklist.length} OK
              </span>
            </div>

            <div className="mb-6">
              <CustomTemplateSelect
                templates={templates}
                onSelect={handleApplyTemplate}
                isLoading={isApplyingTemplate}
              />
            </div>

            <div className="space-y-3 flex-1">
              {isChecklistLoading ? (
                <div className="py-10 flex justify-center"><Loader2 size={24} className="animate-spin text-accent" /></div>
              ) : (
                <>
                  {checklist.map(item => (
                    <div
                      key={item.id}
                      onClick={() => toggleTask(item.id, item.is_done)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${item.is_done ? 'bg-accent/5 border-accent/20 opacity-60' : 'bg-white/5 border-gray-800'
                        }`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${item.is_done ? 'bg-accent border-accent text-black' : 'border-gray-700 text-transparent'
                        }`}>
                        <CheckCircle2 size={14} />
                      </div>
                      <span className={`text-sm font-medium flex-1 ${item.is_done ? 'line-through text-secondary' : ''}`}>
                        {item.description}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                        className="p-1.5 text-gray-700 hover:text-destructive transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>

            <form onSubmit={handleAddChecklistItem} className="mt-6 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Novo item..."
                value={newChecklistItem}
                onChange={e => setNewChecklistItem(e.target.value)}
                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={isAdding}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-800 rounded-2xl text-secondary text-sm font-bold hover:border-accent/40 hover:text-accent transition-all disabled:opacity-50"
              >
                {isAdding ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Adicionando...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Adicionar Item
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {
        isEditModalOpen && (
          <EditEventModal
            event={event}
            onClose={() => setIsEditModalOpen(false)}
            onSave={async (updated) => {
              try {
                await updateEvent(updated);
                setIsEditModalOpen(false);
              } catch (err) {
                console.error('Erro ao atualizar evento:', err);
              }
            }}
          />
        )
      }
    </div >
  );
};

export default EventDetailPage;
