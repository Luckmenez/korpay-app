import { useForm } from 'react-hook-form';
import { StandardModal } from '../../../components/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { StandardSelectInput } from '../../../components/StandardSelectInput';

import * as z from 'zod';
import { StandardButton } from '../../../components/Button';
import { Flex } from '@chakra-ui/react';

interface UpdateQuotationInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    submitUpdateForm: (data: UpdateStatusData) => void;
}

const schema = z.object({
    status: z.string().min(3, 'Esse campo é obrigatório'),
});

type UpdateStatusData = z.infer<typeof schema>;

export function UpdateQuotationInfoModal({
    isOpen,
    onClose,
    submitUpdateForm,
}: UpdateQuotationInfoModalProps) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<UpdateStatusData>({
        resolver: zodResolver(schema),
    });

    return (
        <StandardModal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(submitUpdateForm)}>
                <Flex flexDir={'column'} gap={'1rem'}>
                    <StandardSelectInput
                        label="Status"
                        error={errors.status?.message}
                        {...register('status')}
                        options={[
                            { id: '1', option: 'Pendente', value: 'PENDING' },
                            {
                                id: '2',
                                option: 'Cancelado',
                                value: 'CANCELLED',
                            },
                            {
                                id: '3',
                                option: 'Completado',
                                value: 'COMPLETED',
                            },
                        ]}
                    />
                    <StandardButton label="Atualizar" type="submit" />
                </Flex>
            </form>
        </StandardModal>
    );
}
