import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRoutesProps {
    children: React.ReactNode;
    requiredRole: string;
}

export const ProtectedRoutes = ({
    children,
    requiredRole,
}: ProtectedRoutesProps) => {
    const role = useAuth();

    if (!(role === requiredRole)) {
        return <Navigate to="/" replace />;
    }

    return children;
};
