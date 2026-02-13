export const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

export const formatDateFull = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day, 12, 0, 0);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
};

export const getDayAndMonth = (dateString: string) => {
    if (!dateString) return { day: '', month: '' };
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day, 12, 0, 0);
    const monthName = date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
    return { day: day.toString(), month: monthName };
};
