import { useForm, Controller } from 'react-hook-form';
import { StandardModal } from '../../../components/Modal';
import { StandardNumberInput } from '../../../components/StandardNumberInput';
import { StandardButton } from '../../../components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useBuyCryptoMutation } from '../../../http/useBuyCryptoMutation';
import { StandardSelectInput } from '../../../components/StandardSelectInput';

type QuotationType = {
    expires_in: number;
    fx_rate: string;
    quote_id: string;
};

interface SendQuotationModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedQuotation?: QuotationType;
}

const quotationSchema = z.object({
    usdt: z.string().min(1, 'Campo necessário'),
    real: z.string().min(1, 'Campo necessário'),
    d: z.string().refine((value) => value !== 'Selecione', {
        message: 'Por favor, selecione uma opção válida',
    }),
});

type QuotationFormType = z.infer<typeof quotationSchema>;

export function SendQuotationModal({
    isOpen,
    onClose,
    selectedQuotation,
}: SendQuotationModalProps) {
    const buyCripto = useBuyCryptoMutation();
    const [lastUpdated, setLastUpdated] = useState<'usdt' | 'real'>('usdt');
    const {
        handleSubmit,
        setValue,
        watch,
        control,
        register,
        formState: { errors },
    } = useForm<QuotationFormType>({
        resolver: zodResolver(quotationSchema),
        defaultValues: {
            usdt: '',
            real: '',
            d: 'Selecione',
        },
    });

    const usdt = watch('usdt');
    const real = watch('real');

    useEffect(() => {
        if (!selectedQuotation) return;

        const fxRate = parseFloat(selectedQuotation.fx_rate);
        if (isNaN(fxRate)) return;

        if (lastUpdated === 'usdt' && usdt) {
            const realValue = (parseFloat(usdt) * fxRate).toFixed(2);
            setValue('real', realValue, {
                shouldDirty: true,
                shouldValidate: true,
            });
        } else if (lastUpdated === 'real' && real) {
            const usdtValue = (parseFloat(real) / fxRate).toFixed(2);
            setValue('usdt', usdtValue, {
                shouldDirty: true,
                shouldValidate: true,
            });
        }
    }, [usdt, real, selectedQuotation, lastUpdated, setValue]);

    function handleSendQuotation(data: any) {
        if (!selectedQuotation) return;

        buyCripto.mutate({
            amount: data.usdt,
            quote_id: selectedQuotation.quote_id,
            d: data.d,
        });
    }

    return (
        <StandardModal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(handleSendQuotation)}>
                <Controller
                    control={control}
                    name="usdt"
                    render={({ field: { onChange, value } }) => (
                        <StandardNumberInput
                            error={errors.usdt?.message}
                            onChange={(valueAsString) => {
                                onChange(valueAsString);
                                setLastUpdated('usdt');
                            }}
                            value={value}
                            label="Quantidade UDST"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="real"
                    render={({ field: { onChange, value } }) => (
                        <StandardNumberInput
                            error={errors.real?.message}
                            onChange={(valueAsString) => {
                                onChange(valueAsString);
                                setLastUpdated('real');
                            }}
                            value={value}
                            label="Quantidade R$"
                        />
                    )}
                />
                <StandardSelectInput
                    label="Selecione d0/d1"
                    error={errors.d?.message}
                    options={[
                        { id: '0', option: 'Selecione', value: 'Selecione' },
                        { id: '1', option: 'd0', value: 'd0' },
                        { id: '2', option: 'd1', value: 'd1' },
                    ]}
                    {...register('d')}
                />
                <br />
                <StandardButton label="enviar pedido" type="submit" />
            </form>
        </StandardModal>
    );
}
