import { useMutation } from '@tanstack/react-query';
import { api } from './axios';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';

interface LoginData {
    email: string;
    password: string;
}

export const handleLogin = async (data: LoginData) => {
    const response = await api.post('api/auth/login', data);
    return response.data;
};

export function useLoginMutation() {
    const toast = useToast();
    return useMutation({
        mutationFn: handleLogin,
        onSuccess: () => {},
        onError: (error: AxiosError<{ message: string }>) => {
            console.log(error);
            toast({
                title: error.response?.data?.message,
                position: 'top-right',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        },
    });
}
