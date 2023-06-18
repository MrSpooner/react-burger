import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ element }) => {
    const { isAuth } = useSelector((state) => state.user);

    return isAuth ? element : <Navigate to="/login" />
};

export default ProtectedRoute;