import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "./Register.module.css";
import React, {useState, useRef} from "react";
import {Link, Navigate, useLocation} from "react-router-dom";
import {registerUser} from "../../services/actions/user";
import {useData} from "../../utils/useData";
import { useAppDispatch, useAppSelector } from '../../utils/useData';

function Register() {
    const dispatch = useAppDispatch();
    const {isAuth} = useAppSelector((state) => state.user);
    const {state} = useLocation();
    const {values, onChanges} = useData({email: "", password: "", name: ""});
    const [type, setType] = useState<"ShowIcon"| "HideIcon">("ShowIcon");
    const passwordRef = useRef<HTMLInputElement>(null);

    if (isAuth) {
        return <Navigate to={state?.from || "/"}/>;
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
        dispatch(registerUser(values.email, values.password, values.name));
    };

    return (
        <div className={Style.main}>
            <h3 className="text text_type_main-medium">Регистрация</h3>

            <form className={Style.form} onSubmit={submit}>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={onChanges}
                    value={values.name}
                    name={"name"}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass="mt-5"
                />

                <Input
                    type={"email"}
                    placeholder={"E-mail"}
                    onChange={onChanges}
                    value={values.email}
                    name={"email"}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass="mt-5"
                />

                <Input
                    type={"password"}
                    placeholder={"Пароль"}
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

                <div>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        extraClass="mt-5"
                    >
                        Зарегистрироваться
                    </Button>
                </div>
            </form>

            <div className={Style.question}>
                <span className={Style.text}>Уже зарегестрированы?</span>

                <Link className={Style.link} to="/login">ㅤВойти</Link>
            </div>
        </div>
    );
}

export default Register;