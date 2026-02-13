
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { ChecklistItem } from '../types';

export const useChecklist = (eventId: string | null) => {
    const queryClient = useQueryClient();

    const fetchChecklist = async () => {
        if (!eventId) return [];
        const { data, error } = await supabase
            .from('checklist_items')
            .select('*')
            .eq('event_id', eventId)
            .order('order', { ascending: true });

        if (error) throw error;
        return data as ChecklistItem[];
    };

    const { data: items = [], isLoading, error } = useQuery({
        queryKey: ['checklist', eventId],
        queryFn: fetchChecklist,
        enabled: !!eventId,
    });

    const addItemMutation = useMutation({
        mutationFn: async (newItem: Omit<ChecklistItem, 'id'>) => {
            const { data, error } = await supabase
                .from('checklist_items')
                .insert([newItem])
                .select();

            if (error) throw error;
            return data[0];
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['checklist', eventId] });
        },
    });

    const addItemsMutation = useMutation({
        mutationFn: async (items: Omit<ChecklistItem, 'id'>[]) => {
            const { data, error } = await supabase
                .from('checklist_items')
                .insert(items)
                .select();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['checklist', eventId] });
        },
    });

    const updateItemMutation = useMutation({
        mutationFn: async (updatedItem: Partial<ChecklistItem> & { id: string }) => {
            const { error } = await supabase
                .from('checklist_items')
                .update(updatedItem)
                .eq('id', updatedItem.id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['checklist', eventId] });
        },
    });

    const deleteItemMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('checklist_items')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['checklist', eventId] });
        },
    });

    return {
        items,
        isLoading,
        error,
        addItem: addItemMutation.mutateAsync,
        addItems: addItemsMutation.mutateAsync,
        updateItem: updateItemMutation.mutateAsync,
        deleteItem: deleteItemMutation.mutateAsync,
        isAdding: addItemMutation.isPending,
        isApplying: addItemsMutation.isPending,
    };
};
