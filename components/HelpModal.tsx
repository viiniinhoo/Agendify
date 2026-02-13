
import React from 'react';
import { X, HelpCircle, Book } from 'lucide-react';

interface HelpModalProps {
    onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
    const faqs = [
        {
            question: 'Como adicionar um novo evento?',
            answer: 'Clique no botão "+ Novo Evento" na página de Eventos. Preencha as informações do evento (título, tipo, data, horário, local e valor) e clique em "Criar Evento".'
        },
        {
            question: 'Como editar as informações de um evento?',
            answer: 'Abra os detalhes do evento e clique no botão "Editar Evento" no canto superior direito. Faça as alterações desejadas e salve.'
        },
        {
            question: 'Como excluir um evento?',
            answer: 'Nos detalhes do evento, clique no botão "Excluir Evento". Confirme a exclusão. Atenção: esta ação não pode ser desfeita!'
        },
        {
            question: 'Como filtrar eventos por status?',
            answer: 'Na página de Eventos, use os botões de filtro (Todos, Orçados, Confirmados, Concluídos, Cancelados) para visualizar apenas os eventos do status desejado.'
        },
        {
            question: 'Como criar um template de checklist?',
            answer: 'Vá em Configurações > Modelos e clique em "+ Criar Template". Dê um nome, adicione uma descrição (opcional) e liste os itens do checklist. Clique em "Criar Template" para salvar.'
        },
        {
            question: 'Como editar um template de checklist?',
            answer: 'Vá em Configurações > Modelos, clique no menu (⋮) do template desejado e selecione "Editar". Faça as alterações e clique em "Salvar Alterações".'
        },
        {
            question: 'Como aplicar um template de checklist a um evento?',
            answer: 'Nos detalhes do evento, vá até a seção "Checklist" e selecione o template desejado no menu suspenso "Aplicar Modelo". Os itens serão adicionados automaticamente.'
        },
        {
            question: 'Posso editar os itens do checklist após aplicar um template?',
            answer: 'Sim! Você pode adicionar, editar ou remover itens do checklist a qualquer momento, mesmo após aplicar um template. As alterações não afetam o template original.'
        },
        {
            question: 'Como marcar um item do checklist como concluído?',
            answer: 'Nos detalhes do evento, na seção "Checklist", clique na caixa de seleção ao lado do item para marcá-lo como concluído. Clique novamente para desmarcar.'
        },
        {
            question: 'Como registrar um pagamento?',
            answer: 'Abra os detalhes do evento, vá até a seção "Financeiro" e clique em "Registrar Recebimento". Digite o valor recebido e clique em "Confirmar Pagamento".'
        },
        {
            question: 'Como visualizar o histórico de pagamentos?',
            answer: 'Nos detalhes do evento, na seção "Financeiro", você verá a lista de todos os pagamentos registrados, incluindo data, valor e saldo pendente.'
        },
        {
            question: 'O que significa cada status de evento?',
            answer: 'ORÇADO: Proposta enviada ao cliente. CONFIRMADO: Cliente aceitou e evento está agendado. CONCLUÍDO: Evento foi realizado. CANCELADO: Evento foi cancelado.'
        },
        {
            question: 'Como alterar o status de um evento?',
            answer: 'Abra os detalhes do evento, clique em "Editar Evento" e selecione o novo status no campo "Status". Salve as alterações.'
        },
        {
            question: 'Os dados ficam salvos offline?',
            answer: 'Sim! Após o primeiro acesso, o app funciona offline. Seus dados são sincronizados automaticamente quando você volta online.'
        },
        {
            question: 'Como instalar o app no celular?',
            answer: 'Vá em Configurações > Configurações do App (PWA) e siga as instruções para Android ou iOS. O app ficará disponível na tela inicial do seu dispositivo.'
        },
        {
            question: 'Posso usar o Agendify em vários dispositivos?',
            answer: 'Sim! Faça login com a mesma conta em diferentes dispositivos (celular, tablet, computador). Seus dados serão sincronizados automaticamente.'
        },
        {
            question: 'Como pesquisar um evento específico?',
            answer: 'Na página de Eventos, use a barra de busca no topo para procurar por título ou local do evento. Os resultados são filtrados em tempo real.'
        },
        {
            question: 'Posso adicionar observações ou notas em um evento?',
            answer: 'Sim! Ao criar ou editar um evento, você pode adicionar informações adicionais no campo de descrição ou usar os itens do checklist para anotações específicas.'
        },
    ];

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-card w-full max-w-2xl rounded-3xl border border-gray-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-black flex items-center gap-3 tracking-tight">
                        <div className="bg-secondary/10 p-2 rounded-xl text-secondary">
                            <HelpCircle size={24} strokeWidth={3} />
                        </div>
                        Ajuda & Suporte
                    </h2>
                    <button onClick={onClose} className="text-secondary hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-4">
                        <h3 className="font-black text-lg flex items-center gap-2">
                            <Book size={20} className="text-accent" />
                            Perguntas Frequentes
                        </h3>
                        <div className="space-y-3">
                            {faqs.map((faq, idx) => (
                                <details key={idx} className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden group">
                                    <summary className="p-4 cursor-pointer font-bold text-sm hover:bg-white/5 transition-all list-none flex items-center justify-between">
                                        <span>{faq.question}</span>
                                        <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-4 pb-4 pt-2 text-sm text-secondary border-t border-white/5">
                                        {faq.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;
