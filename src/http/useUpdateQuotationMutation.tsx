import { useMutation } from '@tanstack/react-query';
import { api } from './axios';
import { useStandardToast } from '../components/Toast';

function updateQuotation(data: any) {
    return api.put('api/quotation/update-status', data);
}

export const useUpdateQuotationMutation = () => {
    const toast = useStandardToast();
    return useMutation({
        mutationFn: updateQuotation,
        onSuccess: () => {
            toast('Cotação atualizada com sucesso', 'success');
        },
        onError: (error: any) => {
            console.log(error);
        },
    });
};
