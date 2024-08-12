import { useMutation } from '@tanstack/react-query';
import { api } from './axios';

interface LoginData {
    email: string;
    password: string;
}

export const handleLogin = async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
};

export function useLoginMutation() {
    return useMutation({
        mutationFn: handleLogin,
        onSuccess: () => {},
        onError: (error) => {
            console.error(error);
        },
    });
}
