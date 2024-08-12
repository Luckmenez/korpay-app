import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Quotation } from '../pages/Quotation';
import { Admin } from '../pages/Admin';
import { ProtectedRoutes } from './ProtectedRoutes';

export function Router() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/quotation"
                    element={
                        <ProtectedRoutes requiredRole="USER">
                            <Quotation />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoutes requiredRole="ADMIN">
                            <Admin />
                        </ProtectedRoutes>
                    }
                />
            </Routes>
        </Suspense>
    );
}
