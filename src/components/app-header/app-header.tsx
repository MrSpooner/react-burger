import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Style from './app-header.module.css';
import {NavLink, Link, useLocation} from "react-router-dom";

function Header() {
    const current = useLocation().pathname;

    const mainActive = current === '/';
    const feedActive = current === "/feed";
    const profileActive = current === "/profile" || current === "/profile/orders";

    return (
        <header>
            <nav className={Style.header}>
                <NavLink
                    to={{pathname: `/`}}
                    className={mainActive ? Style.active : Style.inactive}
                >
                    <BurgerIcon type={mainActive ? "primary" : "secondary"}/>
                    <span>Конструктор</span>
                </NavLink>

                <NavLink
                    to="/feed"
                    className={feedActive ? Style.active : Style.inactive}
                >
                    <ListIcon type={feedActive ? "primary" : "secondary"}/>
                    <span>Лента заказов</span>
                </NavLink>

                <Link to={{pathname: `/`}}>
                    <Logo />
                </Link>

                <NavLink
                    to={{pathname: `/profile`}}
                    className={profileActive ? Style.active : Style.inactive}
                >
                    <ProfileIcon type={profileActive ? "primary" : "secondary"}/>
                    <span>Личный кабинет</span>
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;
