import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './axios';
import { useStandardToast } from '../components/Toast';

interface CreateUserData {
    email: string;
    spread: string;
    isActive: string;
}

async function handleUpdateSpread(data: CreateUserData) {
    const response = await api.post('api/users/update-spread', {
        email: data.email,
        spread: data.spread,
        isActive: Boolean(data.isActive),
    });
    return response.data;
}

export const useUpdateSpreadMutation = () => {
    const toast = useStandardToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleUpdateSpread,
        onSuccess: () => {
            toast('Atuação realizada com sucesso', 'success');
            queryClient.invalidateQueries({ queryKey: ['users-list'] });
        },
        onError: (error) => {
            toast('Erro ao realizar atuação', 'error');
            console.error(error);
        },
    });
};
