import { useNavigate } from 'react-router-dom';
import * as zod from 'zod';
import { useLoginMutation } from '../../../http/useLoginMutation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { decodeJwt } from '../../../utils/decodejwt';
import { useStandardToast } from '../../../components/Toast';

const LoginSchema = zod.object({
    email: zod.string().email('Informe um email válido'),
    password: zod.string().min(6, 'Campo requerido'),
});

type LoginSchemaType = zod.infer<typeof LoginSchema>;

export function useLogin() {
    const toast = useStandardToast();
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
    });

    const handleLogin = handleSubmit((data) => {
        try {
            loginMutation.mutate(data, {
                onSuccess: (response) => {
                    try {
                        const decodedToken = decodeJwt(response.auth_token);
                        const userRole = decodedToken.user.role;
                        navigate(
                            userRole === 'ADMIN' ? '/admin' : '/quotation',
                        );
                    } catch (error) {
                        toast('Erro ao fazer login', 'error');
                    }
                },
            });
        } catch (error) {
            toast('Erro ao fazer login', 'error');
            console.error(error);
        }
    });

    return { handleLogin, register, errors };
}
