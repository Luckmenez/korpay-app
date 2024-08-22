import { useMutation } from '@tanstack/react-query';
import { api } from './axios';

const handleBuyCrypto = async ({
    amount,
    quote_id,
    d,
}: {
    amount: string;
    quote_id: string;
    d: string;
}) => {
    return await api.post('api/quotation/buy-crypto', { amount, quote_id, d });
};

export const useBuyCryptoMutation = () => {
    return useMutation({
        mutationFn: handleBuyCrypto,
        onSuccess: (data) => {
            if (data.status === 201) {
                console.log(data.data);
                const message = `Olá, gostaria de solicitar a seguinte compra:\nUSDT: ${data.data.fiat_value}\nValor: ${
                    data.data.crypto_value
                }\nID da Cotação: ${data.data.order_id}`;

                const encodedMessage = encodeURIComponent(message);

                const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodedMessage}`;

                window.open(whatsappUrl, '_blank');
            }
        },
        onError: (error) => {
            console.error('Error buying crypto', error);
        },
    });
};
