import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsStyle from './burger-ingredients.module.css';
import BurgerIngredientsTab from '../burger-ingredients-tab/burger-ingredients-tab';
import PropTypes from "prop-types";
import {Data} from "../../utils/prop-types";

function BurgerIngredients(data) {
    const [currentTab, setCurrentTab] = React.useState('buns');
    const setTab = (tab) => {
        setCurrentTab(tab);

        switch (tab) {
            case 'buns':
                bunsRef.current && bunsRef.current.scrollIntoView();

                break;
            case 'sauces':
                saucesRef.current && saucesRef.current.scrollIntoView();

                break;

            case 'fillings':
                fillingsRef.current && fillingsRef.current.scrollIntoView();

                break;
        }
    };


    const buns = data.productData.filter((item) => item.type === 'bun');
    const sauces = data.productData.filter((item) => item.type === 'sauce');
    const fillings = data.productData.filter((item) => item.type === 'main');

    const bunsRef = React.useRef(null);
    const saucesRef = React.useRef(null);
    const fillingsRef = React.useRef(null);

    return (
        <div>
            <p className='text text_type_main-large'>
                Соберите бургер
            </p>

            <div className={IngredientsStyle.tabs}>
                <Tab value='buns' active={currentTab === 'bun'} onClick={setTab}>
                    Булки
                </Tab>
                <Tab value='sauces' active={currentTab === 'sauces'} onClick={setTab}>
                    Соусы
                </Tab>
                <Tab value='fillings' active={currentTab === 'fillings'} onClick={setTab}>
                    Начинки
                </Tab>
            </div>

            <div className={`${IngredientsStyle.tabscontent} custom-scroll`}>
                <BurgerIngredientsTab data={buns} sendRef={bunsRef}>Булки</BurgerIngredientsTab>
                <BurgerIngredientsTab data={sauces} sendRef={saucesRef}>Соусы</BurgerIngredientsTab>
                <BurgerIngredientsTab data={fillings} sendRef={fillingsRef}>Начинки</BurgerIngredientsTab>
            </div>
        </div>
    );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
    productData: PropTypes.arrayOf(PropTypes.shape(Data)).isRequired
};