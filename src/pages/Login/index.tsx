import { Button, Flex, chakra, useDisclosure } from '@chakra-ui/react';
import { StandardInput } from '../../components/input';
import { useLogin } from './hooks/useLogin';
import { Container } from '../../components/Container';
import KorPayLogo from '../../assets/korpay_logo.svg';
import { CreateNewUserModal } from './CreateNewUserModal';
import { ResetPasswordModal } from './ResetPassword';
import { ChangePasswordModal } from './ChangePasswordModal';

export function Login() {
    const { errors, handleLogin, register } = useLogin();
    const {
        isOpen: createNewUserIsOpen,
        onClose: createNewUserOnclose,
        onOpen: createNewUserOnOpen,
    } = useDisclosure();

    const {
        isOpen: resetPasswordIsOpen,
        onClose: resetPasswordOnClose,
        onOpen: resetPasswordOnOpen,
    } = useDisclosure();

    const {
        isOpen: changePasswordIsOpen,
        onClose: changePasswordOnClose,
        onOpen: changePasswordOnOpen,
    } = useDisclosure();

    return (
        <Container>
            <Flex
                flexDir={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                h={'100%'}
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
                            onClick={createNewUserOnOpen}
                        >
                            Criar novo usuário
                        </Button>
                        <Button
                            bg={'transparent'}
                            textColor={'white'}
                            _hover={{ bg: 'transparent' }}
                            onClick={resetPasswordOnOpen}
                        >
                            Resetar senha
                        </Button>
                        <Button
                            bg={'transparent'}
                            textColor={'white'}
                            _hover={{ bg: 'transparent' }}
                            onClick={changePasswordOnOpen}
                        >
                            Mudar de senha
                        </Button>
                    </Flex>
                </chakra.form>
            </Flex>
            <CreateNewUserModal
                isOpen={createNewUserIsOpen}
                onClose={createNewUserOnclose}
            />
            <ResetPasswordModal
                isOpen={resetPasswordIsOpen}
                onClose={resetPasswordOnClose}
            />
            <ChangePasswordModal
                isOpen={changePasswordIsOpen}
                onClose={changePasswordOnClose}
            />
        </Container>
    );
}
