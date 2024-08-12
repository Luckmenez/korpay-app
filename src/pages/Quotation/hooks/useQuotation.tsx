import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { useStandardToast } from '../../../components/Toast';

interface QuotationType {
    expires_in: number;
    fx_rate: string;
    quote_id: string;
}

export function useQuotation() {
    const navigate = useNavigate();
    const toast = useStandardToast();

    const [quotationState, setQuotationState] = useState<QuotationType>({
        expires_in: 0,
        fx_rate: '',
        quote_id: '',
    });

    const [selectedQuotation, setSelectedQuotation] = useState<QuotationType>();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const socket = io('http://localhost:3000/', {
            withCredentials: true,
            extraHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });

        socket.emit('requestQuotations');

        socket.on('quotationsUpdate', (data) => {
            const quotation = data.data;
            setQuotationState(quotation);
        });

        socket.on('error', (error) => {
            console.error(error.message);
            localStorage.removeItem('auth_token');
            toast('Autenticação inválida, faça login novamente', 'error');
            navigate('/');
            socket.close();
        });

        return () => {
            socket.off('quotationsUpdate');
            socket.close();
        };
    }, []);

    return { quotationState, selectedQuotation, setSelectedQuotation };
}
