import { Flex, chakra } from '@chakra-ui/react';
import { AsideOptions } from './AsideOptions';
import { useNavigate } from 'react-router-dom';

interface AdminAsideProps {
    children: React.ReactNode;
}

export function AdminAside({ children }: AdminAsideProps) {
    const navigate = useNavigate();
    return (
        <Flex>
            <chakra.aside
                bg={'primary.100'}
                minW={'20vh'}
                borderRight={'1px solid #FFF'}
                py={'3rem'}
                display={'flex'}
                flexDir={'column'}
                gap={'1rem'}
                minH={'93vh'}
                overflow={'hiden'}
            >
                <AsideOptions
                    onClick={() => navigate('/admin')}
                    label="Usuários"
                />
                <AsideOptions
                    onClick={() => navigate('/admin/orders')}
                    label="Compras"
                />
            </chakra.aside>
            <Flex flex={1} flexDir={'column'} overflowY="auto">
                {children}
            </Flex>
        </Flex>
    );
}
