import { Button, chakra, Divider } from '@chakra-ui/react';
import { StandardInput } from '../../../components/input';
import { StandardModal } from '../../../components/Modal';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangePasswordMutation } from '../../../http/useChangePasswordMutation';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const changePasswordSchema = z
    .object({
        email: z.string().email('Esse campo é obrigatório'),
        password: z.string().min(3, 'Esse campo é obrigatório'),
        newPassword: z.string().min(3, 'Esse campo é obrigatório'),
        passwordConfirmation: z.string().min(3, 'Esse campo é obrigatório'),
    })
    .refine((data) => data.newPassword === data.passwordConfirmation, {
        message: 'As senhas não coincidem',
        path: ['passwordConfirmation'],
    });

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export function ChangePasswordModal({
    isOpen,
    onClose,
}: ChangePasswordModalProps) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ChangePasswordForm>({
        resolver: zodResolver(changePasswordSchema),
    });

    const changePassword = useChangePasswordMutation();

    function handleChangePassword(data: ChangePasswordForm) {
        // handle change password
        console.log(data);
        changePassword.mutate(data);
    }
    return (
        <StandardModal isOpen={isOpen} onClose={onClose}>
            <chakra.form
                onSubmit={handleSubmit(handleChangePassword)}
                display={'flex'}
                flexDir={'column'}
                gap={'1rem'}
            >
                <StandardInput
                    {...register('email')}
                    error={errors.email?.message}
                    label="Email"
                    autoComplete="email"
                />
                <StandardInput
                    {...register('password')}
                    error={errors.password?.message}
                    type="password"
                    label="Senha atual"
                    autoComplete="current-password"
                />
                <Divider orientation="horizontal" />
                <StandardInput
                    {...register('newPassword')}
                    error={errors.newPassword?.message}
                    type="password"
                    label="Nova senha"
                    autoComplete="new-password"
                />
                <StandardInput
                    {...register('passwordConfirmation')}
                    error={errors.passwordConfirmation?.message}
                    type="password"
                    label="Confirme a nova senha"
                    autoComplete="new-password"
                />
                <Button type="submit">Alterar senha</Button>
            </chakra.form>
        </StandardModal>
    );
}
