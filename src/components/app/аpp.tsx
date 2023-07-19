import React from 'react';
import Header from "../app-header/app-header";
import HomePage from "../../pages/home-page/home-page";
import Login from "../../pages/login/login";
import OrderDetails from "../../pages/order-details/order-details";
import ProfileOrdersTab from "../../pages/profile-orders-tab/profile-orders-tab";
import Feed from "../../pages/feed/feed";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Profile from "../../pages/profile/profile";
import ResetPassword from "../../pages/reset-password/reset-password";
import ProtectedRoute from "../protected-route/protected-route";
import {Routes, Route, useLocation} from "react-router-dom";
import IngredientDetails from "../modal-ingredient-details/ingredient-details";
import {getIngredientsAll} from "../../services/reduxToolkit/ingredientsAll";
import {getUser, refreshToken} from "../../services/reduxToolkit/user";
import {useNavigate} from "react-router-dom";
import Modal from "../modal/modal";
import {useAppDispatch, useAppSelector} from '../../utils/useData';

function App() {
    const {isAuth} = useAppSelector((state) => state.user);
    const location = useLocation();
    let background = location.state && location.state.background;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    React.useEffect(() => {
        dispatch(getIngredientsAll());
    }, [dispatch]);
    React.useEffect(() => {
        if (!isAuth && localStorage.getItem("jwt")) {
            dispatch(refreshToken());
            dispatch(getUser());
        }
    }, [localStorage.getItem("jwt"), isAuth, dispatch]);

    const closeModal = () => {
        navigate(-1);
    }

    return (
        <>
            <Header/>

            <Routes location={background || location}>
                <Route path="/" element={<HomePage/>}/>
                <Route path='/ingredient/:idCard' element={<IngredientDetails/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/feed" element={<Feed/>}/>
                <Route path='/feed/:number' element={<OrderDetails/>}/>
                <Route path="/profile/orders" element={<ProtectedRoute><ProfileOrdersTab/></ProtectedRoute>}/>
                <Route path='/profile/orders/:number' element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                <Route path="*" element={<h1>404</h1>}/>
            </Routes>

            {background && (
                <Routes>
                    <Route
                        path='/ingredient/:idCard'
                        element={
                            <Modal closeModal={closeModal}>
                                <IngredientDetails/>
                            </Modal>
                        }/>

                    <Route
                        path='/feed/:number'
                        element={
                            <Modal closeModal={closeModal}>
                                <OrderDetails/>
                            </Modal>
                        }/>

                    <Route
                        path='/profile/orders/:number'
                        element={
                            <Modal closeModal={closeModal}>
                                <OrderDetails/>
                            </Modal>
                        }/>
                </Routes>
            )}
        </>
    );
}

export default App;
