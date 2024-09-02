import { useMutation } from '@tanstack/react-query';
import { api } from './axios';
import { AxiosError } from 'axios';
import { useStandardToast } from '../components/Toast';

function loginErrorMessageMapper(error: string) {
    const errorMessagesList = ['Usuário inativo', 'Email ou Senha Incorreto'];
    if (!errorMessagesList.includes(error)) {
        return 'Erro ao fazer login';
    }

    return error;
}

interface LoginData {
    email: string;
    password: string;
}

export const handleLogin = async (data: LoginData) => {
    const response = await api.post('api/auth/login', data);
    return response.data;
};

export function useLoginMutation() {
    const toast = useStandardToast();
    return useMutation({
        mutationFn: handleLogin,
        onSuccess: () => {},
        onError: (error: AxiosError<{ message: string }>) => {
            const capturedError = error.response?.data.message || '';
            toast(loginErrorMessageMapper(capturedError), 'error');
        },
    });
}
