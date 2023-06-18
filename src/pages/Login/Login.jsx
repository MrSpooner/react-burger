import {Input,Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styleLogin from "./Login.module.css";
import {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, Navigate} from "react-router-dom";
import {login} from "../../services/actions/user";

function Login() {
    const {isAuth} = useSelector((state) => state.user);
    const {state} = useLocation();
    const dispatch = useDispatch();
    const PasswordRef = useRef(null);
    const [inputLogin, setInputLogin] = useState({email: "", password: ""});
    const [type, setType] = useState("ShowIcon");

    if (isAuth) {
        return <Navigate to={state?.from || "/"}/>;
    }

    const submit = (e) => {
        e.preventDefault();
        dispatch(login(inputLogin.email, inputLogin.password));
    };

    const changePasswordLook = () => {
        if (PasswordRef.current.type === "password") {
            setType("HideIcon");
            PasswordRef.current.type = "text";
        } else {
            setType("ShowIcon");
            PasswordRef.current.type = "password";
        }
    };

    const setInput = (e) => {
        setInputLogin({...inputLogin, [e.target.name]: e.target.value});
    };

    return (
        <div className={styleLogin.main}>
            <h3 className="text text_type_main-medium">Вход</h3>

            <form className={styleLogin.form} onSubmit={submit}>
                <Input
                    type={"email"}
                    placeholder={"E-mail"}
                    onChange={setInput}
                    value={inputLogin.email}
                    name={"email"}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                />

                <Input
                    type={"password"}
                    placeholder={"Пароль"}
                    onChange={setInput}
                    icon={type}
                    value={inputLogin.password}
                    name={"password"}
                    error={false}
                    ref={PasswordRef}
                    onIconClick={changePasswordLook}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass='m-5'
                />

                <Button htmlType="submit" type="primary" size="medium">Войти</Button>
            </form>

            <div className={styleLogin.questionsCont}>
                <div className={styleLogin.question}>
                    <span className={styleLogin.text}>Вы - новый пользователь?</span>
                    <Link className={styleLogin.link} to="/register">ㅤЗарегистрироваться</Link>
                </div>

                <div className={styleLogin.question}>
                    <span className={styleLogin.text}>Забыли пароль?</span>
                    <Link className={styleLogin.link} to="/forgot-password">ㅤВосстановить пароль</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;