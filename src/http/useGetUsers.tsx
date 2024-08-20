import { useQuery } from '@tanstack/react-query';
import { api } from './axios';

const getUsers = async () => {
    const users = await api.get('api/users');
    return users.data;
};

export function useGetUsers() {
    const query = useQuery({
        queryKey: ['users-list'],
        queryFn: getUsers,
    });

    if (query.isError) {
        console.log('Error:', query.error);
    }

    return query;
}
