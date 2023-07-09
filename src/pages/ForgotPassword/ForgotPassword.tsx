import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "./ForgotPassword.module.css";
import {Link, Navigate, useNavigate, useLocation} from "react-router-dom";
import {requestForgot} from "../../services/actions/user";
import {useData} from "../../utils/useData";
import { useAppDispatch, useAppSelector } from '../../utils/useData';
import React from "react";

function ForgotPassword() {
    const {isAuth} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {values, onChanges} = useData({email: ""});
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/reset-password", {state: {prevPathname: location.pathname}});
        dispatch(requestForgot(values.email));
    };

    if (isAuth) {
        return <Navigate to="/"/>;
    }

    return (
        <div className={Style.main}>
            <h3 className="text text_type_main-medium">Восстановление пароля</h3>

            <form className={Style.form} onSubmit={submit}>
                <Input type={"email"} placeholder={"Укажите e-mail"} onChange={onChanges}
                       value={values.email} name={"email"} error={false}
                       errorText={"Ошибка"} size={"default"}/>

                <Button htmlType="submit" type="primary" size="medium" extraClass='mt-5'>Восстановить</Button>
            </form>

            <div className={Style.question}>
                <span className={Style.text}>Вспомнили пароль?</span>
                <Link className={Style.link} to="/login">ㅤВойти</Link>
            </div>
        </div>
    );
}

export default ForgotPassword;