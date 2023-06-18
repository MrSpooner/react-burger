import { Navigate, useLocation } from "react-router-dom";
import { useSelector  } from "react-redux";

export default function ProtectedRoute({element, anonymous = false }) {
    const {isAuth} = useSelector((store) => store.user);

    const location = useLocation();
    const from = location.state?.from || '/';

    if (anonymous && isAuth) {
        return <Navigate to={ from } />;
    }

    if (!anonymous && !isAuth) {
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    return element;
}