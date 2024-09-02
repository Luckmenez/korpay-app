import { useMutation } from '@tanstack/react-query';
import { api } from './axios';
import { useStandardToast } from '../components/Toast';

interface CreateUserData {
    name: string;
    email: string;
    password: string;
}

async function handleCreateuser(data: CreateUserData) {
    const response = await api.post('api/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
    });
    return response.data;
}

export const useCreateNewUserMutation = () => {
    const toast = useStandardToast();

    return useMutation({
        mutationFn: handleCreateuser,
        onSuccess: () => {
            toast('Usuário criado com sucesso', 'success');
        },
        onError: (error) => {
            toast('Erro ao criar usuário', 'error');
            console.error(error);
        },
    });
};
