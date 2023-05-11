import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderStyle from './app-header.module.css';

function Header() {
    return (
        <header className={HeaderStyle.header}>
            <div className={HeaderStyle.links}>
                <div className={`${HeaderStyle.item} mt-4 mb-4 ml-5 mr-5`}>
                    <BurgerIcon type="primary"/>
                    <span className="text text_type_main-default ml-2">Конструктор</span>
                </div>

                <div className={`${HeaderStyle.item} mt-4 mb-4 ml-5 mr-5`}>
                    <ListIcon type="primary"/>
                    <span className="text text_type_main-default ml-2">Лента заказов</span>
                </div>
            </div>


            <div className={HeaderStyle.logo}>
                <Logo/>
            </div>

            <div className={`${HeaderStyle.item} mt-4 mb-4 ml-5 mr-5`}>
                <div className={HeaderStyle.item}>
                    <ProfileIcon type="primary"/>
                    <span className="text text_type_main-default ml-2">Личный кабинет</span>
                </div>
            </div>

        </header>
    );
}

export default Header;
