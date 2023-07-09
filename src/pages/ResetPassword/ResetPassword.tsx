import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "./ResetPassword.module.css";
import React, {useState, useRef} from "react";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {resetPassword} from "../../services/actions/user";
import {useData} from "../../utils/useData";
import { useAppDispatch, useAppSelector } from '../../utils/useData';

function ResetPassword() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const isPrevForgot = location.state?.prevPathname === '/forgot-password';
    const {isAuth} = useAppSelector((state) => state.user);
    const {state} = useLocation();
    const passwordRef = useRef<HTMLInputElement>(null);
    const {values, onChanges} = useData({password: "", code: ""});
    const [type, setType] = useState<"ShowIcon"| "HideIcon">("ShowIcon");

    if (isAuth) {
        return <Navigate to={state?.from || "/"}/>;
    }

    if (!isPrevForgot) {
        return <Navigate to="/login"/>;
    }

    const changePasswordLook = () => {
        if (passwordRef.current) {
            if (passwordRef.current.type === "password") {
                passwordRef.current.type = "text";
                setType("HideIcon");
            } else {
                passwordRef.current.type = "password";
                setType("ShowIcon");
            }
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(resetPassword(values.password, values.code));
        navigate("/login");
    };

    return (
        <div className={Style.main}>
            <h3 className="text text_type_main-medium">Восстановление пароля</h3>

            <form className={Style.form} onSubmit={submit}>
                <Input
                    type={"password"}
                    placeholder={"Введите новый пароль"}
                    onChange={onChanges}
                    icon={type}
                    value={values.password}
                    name={"password"}
                    error={false}
                    ref={passwordRef}
                    onIconClick={changePasswordLook}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass="mt-5"
                />

                <Input
                    type={"text"}
                    placeholder={"Введите код из письма"}
                    onChange={onChanges}
                    value={values.code}
                    name={"code"}
                    error={false}
                    onIconClick={changePasswordLook}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass="mt-5"
                />

                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass="mt-5"
                >
                    Сохранить
                </Button>
            </form>

            <div className={Style.question}>
                <p className={Style.text}>Вспомнили пароль?</p>

                <Link className={Style.link} to="/login">ㅤВойти</Link>
            </div>
        </div>
    );
}

export default ResetPassword;
