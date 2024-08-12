import { Button, Flex, chakra, useDisclosure } from '@chakra-ui/react';
import { StandardInput } from '../../components/input';
import { useLogin } from './hooks/useLogin';
import { Container } from '../../components/Container';
import KorPayLogo from '../../assets/korpay_logo.svg';
import { CreateNewUserModal } from './CreateNewUserModal';

export function Login() {
    const { errors, handleLogin, register } = useLogin();
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Container>
            <Flex
                h={'100vh'}
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <img src={KorPayLogo} alt="" />
                <chakra.form onSubmit={handleLogin}>
                    <Flex flexDir={'column'} gap={'0.5rem'}>
                        <StandardInput
                            autoComplete="username"
                            error={errors.email?.message}
                            label="email"
                            {...register('email')}
                        />

                        <StandardInput
                            autoComplete="current-password"
                            type="password"
                            error={errors.password?.message}
                            label="password"
                            {...register('password')}
                        />
                        <Button justifySelf={'center'} type="submit">
                            Login
                        </Button>
                        <Button
                            bg={'transparent'}
                            textColor={'white'}
                            _hover={{ bg: 'transparent' }}
                            onClick={onOpen}
                        >
                            Criar novo usuário
                        </Button>
                    </Flex>
                </chakra.form>
            </Flex>
            <CreateNewUserModal isOpen={isOpen} onClose={onClose} />
        </Container>
    );
}
