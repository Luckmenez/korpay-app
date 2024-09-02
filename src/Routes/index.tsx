import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Quotation } from '../pages/Quotation';
import { Admin } from '../pages/Admin';
import { ProtectedRoutes } from './ProtectedRoutes';
import { StandardLayout } from '../layout/StandardLayout';
import { AdminLayout } from '../layout/AdminLayout';
import { OrderTable } from '../pages/Order';

export function Router() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<StandardLayout />}>
                    <Route
                        path="/quotation"
                        element={
                            <ProtectedRoutes requiredRole="USER">
                                <Quotation />
                            </ProtectedRoutes>
                        }
                    />
                </Route>
                <Route element={<AdminLayout />}>
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoutes requiredRole="ADMIN">
                                <Admin />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/admin/orders"
                        element={
                            <ProtectedRoutes requiredRole="ADMIN">
                                <OrderTable />
                            </ProtectedRoutes>
                        }
                    />
                </Route>
            </Routes>
        </Suspense>
    );
}
