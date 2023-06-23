import React from 'react';
import Header from "../app-header/app-header";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {getUser} from "../../services/actions/user";
import HomePage from "../../pages/HomePage/HomePage";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import Profile from "../../pages/Profile/Profile";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {Routes, Route, useLocation} from "react-router-dom";
import IngredientDetails from "../modal-ingredient-details/ingredient-details";
import {getIngredientsAll} from "../../services/actions/ingredientsAll";
import {useNavigate} from "react-router-dom";
import Modal from "../modal/modal";
import {
    DELETE_INGREDIENT_INFO
} from "../../services/actions/ingredientInfo";

function App() {
    const {isAuth} = useSelector((state) => state.user);
    const location = useLocation();
    let background = location.state && location.state.background;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    React.useEffect(() => {
        dispatch(getIngredientsAll());
    }, [dispatch]);
    React.useEffect(() => {
        if (!isAuth && localStorage.getItem("jwt")) {
            dispatch(getUser());
        }
    }, [localStorage.getItem("jwt"), isAuth, dispatch]);

    const closeModal = () => {
        dispatch({type: DELETE_INGREDIENT_INFO});
        navigate(-1);
    }

    return (
        <>
            <Header/>

            <Routes location={background || location}>
                <Route path="/" element={<HomePage/>}/>
                <Route path='/ingredient/:idCard' element={<IngredientDetails/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path='/profile' element={<ProtectedRoute element={<Profile/>}/>}/>
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
                </Routes>
            )}
        </>
    );
}

export default App;
