import { Flex } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';

export function StandardLayout() {
    return (
        <Flex flexDir={'column'} h={'100%'}>
            <Header />
            <Outlet />
        </Flex>
    );
}
