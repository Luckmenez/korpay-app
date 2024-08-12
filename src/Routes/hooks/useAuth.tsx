import { useSelector } from 'react-redux';
import { Profile } from '../../app/userSlice';

export const useAuth = () => {
    const role = useSelector((state: Profile) => state.user?.profile?.role);
    return role;
};
