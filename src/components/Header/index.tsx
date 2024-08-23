import { Button, Flex, Heading } from '@chakra-ui/react';
import { clearUser } from '../../app/userSlice';
import { useNavigate } from 'react-router-dom';

function handleLogout(callback: () => void) {
    clearUser();
    callback();
    localStorage.removeItem('auth_token');
}

export function Header() {
    const navigate = useNavigate();
    return (
        <Flex p={'0.5rem'} justifyContent={'end'}>
            <Heading>
                <Button
                    fontSize={'medium'}
                    color={'white'}
                    bg={'transparent'}
                    onClick={() => handleLogout(() => navigate('/'))}
                    _hover={{ bg: 'transparent' }}
                >
                    Logout
                </Button>
            </Heading>
        </Flex>
    );
}
