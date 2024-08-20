import { useMutation } from '@tanstack/react-query';
import { api } from './axios';

export type User = {
    id: number;
    email: string;
    password: string;
    name: string;
    spread: number;
    role: 'USER' | 'ADMIN';
};

async function handleGetUserByEmail(email: string) {
    const response = await api.get(`api/users/user-by-email/${email}`);
    return response.data;
}

export const useGetUserByEmailMutation = () => {
    const email = localStorage.getItem('email');

    return useMutation({
        mutationFn: () => handleGetUserByEmail(email as string),
    });
};
