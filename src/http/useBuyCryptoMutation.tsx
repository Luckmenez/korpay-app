import { useMutation } from '@tanstack/react-query';
import { store } from '../app/store';
import { api } from './axios';
import { Box, useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { QuotationErrorMap } from '../utils/quotationErrorMap';

interface ApiErrorResponse {
    message: string;
}

const handleBuyCrypto = async ({
    amount,
    price,
    quote_id,
    d,
    actual_spread,
}: {
    amount: string;
    price: string;
    quote_id: string;
    d: string;
    actual_spread: string;
}) => {
    return await api.post('api/quotation/buy-crypto', {
        amount,
        price,
        quote_id,
        actual_spread,
        d,
        user_id: store.getState().user.profile.id,
    });
};

export const useBuyCryptoMutation = () => {
    const toast = useToast();
    return useMutation({
        mutationFn: handleBuyCrypto,
        onSuccess: (data) => {
            if (data.status === 201) {
                console.log(data.data);
            }
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
            console.log(error);
            toast({
                position: 'top-right',
                render: () => (
                    <Box p={3} color="white" bg="red.500">
                        {QuotationErrorMap(error?.response?.data?.message)}
                    </Box>
                ),
            });
            console.error('Error buying crypto', error);
        },
    });
};
