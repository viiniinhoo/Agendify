
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { Event } from '../types';

export const useEvents = () => {
    const queryClient = useQueryClient();

    const fetchEvents = async () => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true });

        if (error) throw error;
        return data as Event[];
    };

    const { data: events = [], isLoading, error } = useQuery({
        queryKey: ['events'],
        queryFn: fetchEvents,
    });

    const addEventMutation = useMutation({
        mutationFn: async (newEvent: Omit<Event, 'id' | 'created_at'>) => {
            const { data, error } = await supabase
                .from('events')
                .insert([newEvent])
                .select();

            if (error) throw error;
            return data[0];
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });

    const updateEventMutation = useMutation({
        mutationFn: async (updatedEvent: Partial<Event> & { id: string }) => {
            const { error } = await supabase
                .from('events')
                .update(updatedEvent)
                .eq('id', updatedEvent.id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });

    const deleteEventMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });

    return {
        events,
        isLoading,
        error,
        addEvent: addEventMutation.mutateAsync,
        isAdding: addEventMutation.isPending,
        updateEvent: updateEventMutation.mutateAsync,
        isUpdating: updateEventMutation.isPending,
        deleteEvent: deleteEventMutation.mutateAsync,
        isDeleting: deleteEventMutation.isPending
    };
};
