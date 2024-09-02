import { Box, Button, chakra } from '@chakra-ui/react';
import { StandardModal } from '../../../components/Modal';
import { StandardInput } from '../../../components/input';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResetPasswordMutation } from '../../../http/useResetPasswordMutation';

interface ResetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const resetPasswordSchema = z.object({
    email: z.string().email('Forneça um email válido'),
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordModal({
    isOpen,
    onClose,
}: ResetPasswordModalProps) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ResetPasswordForm>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const passwordReset = useResetPasswordMutation();

    function handleResetPassword(data: ResetPasswordForm) {
        passwordReset.mutate(data);
    }
    return (
        <StandardModal isOpen={isOpen} onClose={onClose}>
            <chakra.form
                onSubmit={handleSubmit(handleResetPassword)}
                display={'flex'}
                flexDir={'column'}
            >
                <StandardInput
                    {...register('email')}
                    error={errors.email?.message}
                    label="Email"
                />
                <Box alignSelf={'end'}>
                    <Button mt={'10px'} type="submit">
                        resetar senha
                    </Button>
                </Box>
            </chakra.form>
        </StandardModal>
    );
}
