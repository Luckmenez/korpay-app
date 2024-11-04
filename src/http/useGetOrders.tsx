import { useQuery } from '@tanstack/react-query';
import { api } from './axios';
import { User } from './useGetUserByEmail';

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export type Order = {
    id: number;
    capitual_id: string;
    actual_spread: number;
    amount: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    user: Partial<User>;
    status: OrderStatus;
};

async function handleGetOrders() {
    const response = await api.get(`api/users/orders`);
    return response.data;
}

export const useGetOrders = () => {
    const query = useQuery({
        queryKey: ['orders-list'],
        queryFn: handleGetOrders,
    });

    if (query.isError) {
        console.log('Error:', query.error);
    }

    return query;
};
