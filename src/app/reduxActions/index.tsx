import { store } from '../store';
import { userSlice } from '../userSlice';

export const updateUser = (userData: any) => {
    store.dispatch(userSlice.actions.setUser(userData));
};

export const clearUser = () => {
    store.dispatch(userSlice.actions.clearUser());
};
