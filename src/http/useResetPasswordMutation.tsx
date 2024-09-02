import { useMutation } from '@tanstack/react-query';
import { api } from './axios';
import { useStandardToast } from '../components/Toast';

interface ResetPasswordData {
    email: string;
}

async function handleResetPassword(data: ResetPasswordData) {
    const response = await api.post('api/auth/reset-password', data);
    return response.data;
}

export const useResetPasswordMutation = () => {
    const toast = useStandardToast();

    return useMutation({
        mutationFn: handleResetPassword,
        onSuccess: () => {
            toast('Senha resetada com sucesso!', 'success');
        },
        onError: (error) => {
            toast('Erro ao resetar senha', 'error');
            console.error(error);
        },
    });
};
