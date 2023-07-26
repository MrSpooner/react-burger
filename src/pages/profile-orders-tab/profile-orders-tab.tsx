import style from "./profile-orders-tab.module.css";
import {NavLink} from "react-router-dom";
import {useState, useEffect} from "react";
import {useAppDispatch} from '../../utils/useData';
import ProfileOrders from "../profile-orders/profile-orders";
import {getCookie} from "../../utils/cookie";
import {logout} from "../../services/reduxToolkit/user";
import {wsConnectionStart, wsClosed} from "../../services/reduxToolkit/webSocketSlice";

const ProfileOrdersTab = () => {
    const dispatch = useAppDispatch();
    const token = getCookie("token")?.split(" ")?.slice(1)?.join("");

    const [colorText, setColorText] = useState({profile: "text_color_inactive", orders: "text_color_active"});

    const colorProfile = () => {
        setColorText({profile: "text_color_active", orders: "text_color_inactive"});
    };

    const colorOrders = () => {
        setColorText({profile: "text_color_inactive", orders: "text_color_active"});
    };

    const logoutProfile = () => {
        dispatch(logout());
    };

    useEffect(() => {
        dispatch(wsConnectionStart(`wss://norma.nomoreparties.space/orders?token=${token}`));
        return () => {
            dispatch(wsClosed());
        };
    }, []);

    return (
        <>
            <div className={style.main}>
                <div className={style.links}>
                    <NavLink to="/profile" className={style.noDecor}>
                        <span
                            className={`text text_type_main-medium ${colorText.profile}`}
                            onClick={colorProfile}
                        >
                            Профиль
                        </span>
                    </NavLink>

                    <NavLink to="/profile/orders" className={style.noDecor}>
                        <span
                            className={`text text_type_main-medium ${colorText.orders}`}
                            onClick={colorOrders}
                        >
                            История заказов
                        </span>
                    </NavLink>

                    <span
                        className={`text text_type_main-medium text_color_inactive ${style.noDecor}`}
                        onClick={logoutProfile}
                    >
                        Выход
                    </span>

                    <span className={`mt-20 ${style.description}`}>
                        В этом разделе вы можете просмотреть свою историю заказов
                    </span>
                </div>

                <ProfileOrders/>
            </div>
        </>
    );
}

export default ProfileOrdersTab;