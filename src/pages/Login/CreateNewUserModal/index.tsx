import { Button, chakra } from '@chakra-ui/react';
import { StandardModal } from '../../../components/Modal';
import { StandardInput } from '../../../components/input';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateNewUserMutation } from '../../../http/useCreateNewUserMutation';

interface CreateNewUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const createNewUserSchema = z.object({
    name: z.string().min(3, 'Esse campo é obrigatório'),
    email: z.string().email('Esse campo é obrigatório'),
    password: z.string().min(8, 'Esse campo é obrigatório'),
});

type CreateUserForm = z.infer<typeof createNewUserSchema>;

export function CreateNewUserModal({
    isOpen,
    onClose,
}: CreateNewUserModalProps) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<CreateUserForm>({
        resolver: zodResolver(createNewUserSchema),
    });
    const createNewUser = useCreateNewUserMutation();

    function handleCreateUser(data: CreateUserForm) {
        createNewUser.mutate(data);
    }
    return (
        <StandardModal isOpen={isOpen} onClose={onClose}>
            <chakra.form
                onSubmit={handleSubmit(handleCreateUser)}
                display={'flex'}
                flexDir={'column'}
                gap={'20px'}
            >
                <StandardInput
                    error={errors.name?.message}
                    label="Nome"
                    {...register('name')}
                />
                <StandardInput
                    error={errors.email?.message}
                    label="Email"
                    {...register('email')}
                />
                <StandardInput
                    error={errors.password?.message}
                    label="Senha"
                    {...register('password')}
                />
                <Button mt={'10px'} type="submit">
                    Criar Conta
                </Button>
            </chakra.form>
        </StandardModal>
    );
}
