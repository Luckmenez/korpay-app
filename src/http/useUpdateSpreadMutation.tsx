import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './axios';
import { Box, useToast } from '@chakra-ui/react';

interface CreateUserData {
    spread: string;
    email: string;
}

async function handleUpdateSpread(data: CreateUserData) {
    const response = await api.post('api/users/update-spread', data);
    return response.data;
}

export const useUpdateSpreadMutation = () => {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleUpdateSpread,
        onSuccess: () => {
            toast({
                position: 'top-right',
                render: () => (
                    <Box p={3} color="white" bg="green.500">
                        Update criado com sucesso.
                    </Box>
                ),
            });
            queryClient.invalidateQueries({ queryKey: ['users-list'] });
        },
        onError: (error) => {
            console.error(error);
        },
    });
};
