import { Button, Flex, Heading, chakra } from '@chakra-ui/react';
import { clearUser } from '../../app/userSlice';
import KorpayLogo from '../../../src/assets/korpay_logo.svg';
import { useNavigate } from 'react-router-dom';

function handleLogout(callback: () => void) {
    clearUser();
    callback();
    localStorage.removeItem('auth_token');
}

export function AdminHeader() {
    const navigate = useNavigate();

    return (
        <Flex p={'0.5rem'}>
            <Heading
                display={'flex'}
                w={'100%'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <chakra.img h={'3rem'} pt={'1rem'} src={KorpayLogo} />
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
