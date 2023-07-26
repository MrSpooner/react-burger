import  React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from '../../utils/useData';
import { ReactNode } from "react";

type TProtectedRoute = {
    onlyUnAuth?: boolean;
    children: ReactNode;
}

const ProtectedRoute: React.FC<TProtectedRoute> = ({onlyUnAuth = false, children}: TProtectedRoute): any => {
    const {isAuth, user} = useAppSelector((store) => store.user);
    const location = useLocation();
    const from = location.state?.from || '/';

    if (!isAuth && !user.email && !user.name && localStorage.getItem("jwt")) {
        return <p>Загрузка...</p>;
    }

    if (onlyUnAuth && isAuth) {
        return <Navigate to={ from } />;
    }

    if (!isAuth && !onlyUnAuth) {
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    return children;
}

export default ProtectedRoute;