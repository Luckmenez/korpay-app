import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { AdminAside } from '../components/AdminAside';
import { AdminHeader } from '../components/AdminHeader';

export function AdminLayout() {
    return (
        <Flex flexDir={'column'} h={'100%'}>
            <AdminHeader />
            <AdminAside>
                <Outlet />
            </AdminAside>
        </Flex>
    );
}
