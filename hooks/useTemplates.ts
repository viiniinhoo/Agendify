
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { ChecklistTemplate } from '../types';

export const useTemplates = () => {
    const queryClient = useQueryClient();

    const fetchTemplates = async () => {
        const { data, error } = await supabase
            .from('checklist_templates')
            .select(`
                *,
                items:checklist_template_items(description)
            `)
            .order('name', { ascending: true });

        if (error) throw error;

        // Transform the nested items into a simple string array to match the type
        return data.map((t: any) => ({
            ...t,
            items: t.items.map((i: any) => i.description)
        })) as ChecklistTemplate[];
    };

    const { data: templates = [], isLoading, error } = useQuery({
        queryKey: ['templates'],
        queryFn: fetchTemplates,
    });

    const addTemplateMutation = useMutation({
        mutationFn: async ({ name, description, items, user_id }: any) => {
            // 1. Create the template head
            const { data: template, error: tError } = await supabase
                .from('checklist_templates')
                .insert([{ name, description, user_id }])
                .select()
                .single();

            if (tError) throw tError;

            // 2. Create the items
            if (items && items.length > 0) {
                const itemPayload = items.map((desc: string, idx: number) => ({
                    template_id: template.id,
                    user_id,
                    description: desc,
                    order: idx
                }));

                const { error: iError } = await supabase
                    .from('checklist_template_items')
                    .insert(itemPayload);

                if (iError) throw iError;
            }

            return template;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['templates'] });
        },
    });

    const deleteTemplateMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('checklist_templates')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['templates'] });
        },
    });

    const updateTemplateMutation = useMutation({
        mutationFn: async ({ id, name, description, items, user_id }: any) => {
            // 1. Update template details
            const { error: tError } = await supabase
                .from('checklist_templates')
                .update({ name, description })
                .eq('id', id);

            if (tError) throw tError;

            // 2. Sync items (Delete all and re-create)
            const { error: dError } = await supabase
                .from('checklist_template_items')
                .delete()
                .eq('template_id', id);

            if (dError) throw dError;

            // 3. Insert new items
            if (items && items.length > 0) {
                const itemPayload = items.map((desc: string, idx: number) => ({
                    template_id: id,
                    user_id,
                    description: desc,
                    order: idx
                }));

                const { error: iError } = await supabase
                    .from('checklist_template_items')
                    .insert(itemPayload);

                if (iError) throw iError;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['templates'] });
        },
    });

    return {
        templates,
        isLoading,
        error,
        addTemplate: addTemplateMutation.mutateAsync,
        updateTemplate: updateTemplateMutation.mutateAsync,
        deleteTemplate: deleteTemplateMutation.mutateAsync,
        isAdding: addTemplateMutation.isPending,
        isUpdating: updateTemplateMutation.isPending
    };
};
