import { useMutation } from '@tanstack/react-query';
import { api } from './axios';
import { AxiosError } from 'axios';
import { useStandardToast } from '../components/Toast';

interface ChangePasswordData {
    email: string;
    password: string;
    newPassword: string;
}

export const handleChangePassword = async (data: ChangePasswordData) => {
    const response = await api.post('api/auth/change-password', data);
    return response.data;
};

export function useChangePasswordMutation() {
    const toast = useStandardToast();

    return useMutation({
        mutationFn: handleChangePassword,
        onSuccess: () => {
            toast('Senha alterada com sucesso!', 'success');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            console.log(error);
            toast('Erro ao alterar senha', 'error');
        },
    });
}
