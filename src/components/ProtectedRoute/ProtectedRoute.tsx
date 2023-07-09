import  React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from '../../utils/useData';



const ProtectedRoute: React.FC<any> = (element:any) => {
    const {isAuth} = useAppSelector((store) => store.user);
    const anonymous = false;
    const location = useLocation();
    const from = location.state?.from || '/';

    if (anonymous && isAuth) {
        return <Navigate to={ from } />;
    }

    if (!anonymous && !isAuth) {
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    return element.children;
}

export default ProtectedRoute;