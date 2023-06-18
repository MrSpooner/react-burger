import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "./Profile.module.css";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {logout, updateUser} from "../../services/actions/user";

function Profile() {
    const dispatch = useDispatch();

    const {user} = useSelector((state) => state.user);
    const [icon, setIcon] = useState({name: false, email: false, password: false});
    const [inputProfile, setInputs] = useState({name: "", email: "", password: ""});
    const [buttonsVisible, setButtonsVisible] = useState(false);
    const [colorText, setColorText] = useState({profile: "text_color_active", orders: "text_color_inactive"});

    const colorProfile = () => {setColorText({profile: "text_color_active", orders: "text_color_inactive"})};
    const colorOrders = () => {setColorText({profile: "text_color_inactive", orders: "text_color_active"})};

    const logoutProfile = () => {
        dispatch(logout());
    };

    const iconName = icon.name ? "CloseIcon" : "EditIcon";
    const iconLogin = icon.email ? "CloseIcon" : "EditIcon";
    const iconPassword = icon.password ? "CloseIcon" : "EditIcon";

    const onInputChange = (e) => {
        setInputs({...inputProfile, [e.target.name]: e.target.value});
        setButtonsVisible(true);
        setIcon({...icon, [e.target.name]: true});
    };

    const clearName = () => {
        setInputs({...inputProfile, name: ""});
        setIcon({...icon, name: false});
    };
    const clearLogin = () => {
        setInputs({...inputProfile, email: ""});
        setIcon({...icon, email: false});
    };
    const clearPassword = () => {
        setInputs({...inputProfile, password: ""});
        setIcon({...icon, password: false});
    };

    const resetInputs = () => {
        setInputs({name: user.name, email: user.email, password: ""});
        setButtonsVisible(false);
        setIcon({name: false, email: false, password: false});
    };

    useEffect(() => {
        setInputs({name: user.name, email: user.email, password: ""});
    }, []);

    const changeUserInfo = (e) => {
        e.preventDefault();
        dispatch(updateUser(inputProfile.name, inputProfile.email, inputProfile.password));
        setButtonsVisible(false);
        setIcon({name: false, email: false, password: false});
    };

    return (
        <div className={Style.main}>
            <div className={Style.links}>
                <span
                    className={`text text_type_main-medium ${colorText.profile}`}
                    onClick={colorProfile}
                >
                    Профиль
                </span>

                <NavLink to="/profile/orders" className={Style.noDecor}>
                    <span
                        className={`text text_type_main-medium ${colorText.orders}`}
                        onClick={colorOrders}
                    >
                        История заказов
                    </span>
                </NavLink>

                <span
                    className={`text text_type_main-medium text_color_inactive`}
                    onClick={logoutProfile}
                >
                    Выход
                </span>

                <span className={`mt-20 ${Style.description}`}>
                    В этом разделе вы можете изменить свои персональные данные
                </span>
            </div>

            <div>
                <form className={Style.form} onSubmit={changeUserInfo}>
                    <Input
                        type={"text"}
                        placeholder={"Имя"}
                        onChange={onInputChange}
                        icon={iconName}
                        value={inputProfile.name}
                        name={"name"}
                        error={false}
                        onIconClick={clearName}
                        errorText={"Ошибка"}
                        size={"default"}
                    />

                    <Input
                        type={"text"}
                        placeholder={"Логин"}
                        onChange={onInputChange}
                        icon={iconLogin}
                        value={inputProfile.email}
                        name={"email"}
                        error={false}
                        onIconClick={clearLogin}
                        errorText={"Ошибка"}
                        size={"default"}
                    />

                    <Input
                        type={"password"}
                        placeholder={"Пароль"}
                        onChange={onInputChange}
                        icon={iconPassword}
                        value={inputProfile.password}
                        name={"password"}
                        error={false}
                        onIconClick={clearPassword}
                        errorText={"Ошибка"}
                        size={"default"}
                    />

                    {buttonsVisible && (
                        <div className={Style.buttons}>
                            <span onClick={resetInputs}>Отмена</span>

                            <Button
                                htmlType="submit"
                                type="primary"
                                size="medium"
                            >
                                Сохранить
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Profile;