import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
    const user = useSelector((state) => state.user.user);

    return (
        <Route
            {...rest}
            element={
                user && allowedRoles.includes(user.role) ? (
                    <Component />
                ) : (
                    <Navigate to="/" replace />
                )
            }
        />
    );
};

export default ProtectedRoute;
