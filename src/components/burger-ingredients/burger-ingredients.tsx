import React, { UIEvent } from 'react';
import { useRef, useState } from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsStyle from './burger-ingredients.module.css';
import BurgerIngredientsTab from '../burger-ingredients-tab/burger-ingredients-tab';
import { useAppSelector } from '../../utils/useData';
import {TIngredient} from "../../utils/types";

const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = useState<string>('buns');
    const {
        ingredientsAll,
        isIngredientsRequest,
        isIngredientsRequestError
    } = useAppSelector(store => store.ingredientsAll);
    const scrollTab = (value: UIEvent<HTMLDivElement>) => {
        const tab = (value.target as HTMLInputElement).value;

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
            default:
                break;
        }
    };

    const setTab = () => {
        const tabsPos = tabsRef?.current?.getBoundingClientRect().top;
        const bunsPos = bunsRef?.current?.getBoundingClientRect().top;
        const saucesPos = saucesRef?.current?.getBoundingClientRect().top;
        const fillingsPos = fillingsRef?.current?.getBoundingClientRect().top;

        if (tabsPos && bunsPos && saucesPos && fillingsPos) {
            if (Math.abs(tabsPos - bunsPos) < Math.abs(tabsPos - saucesPos)) {
                setCurrentTab('buns')
            } else if (Math.abs(tabsPos - saucesPos) < Math.abs(tabsPos - fillingsPos)) {
                setCurrentTab('sauces')
            } else {
                setCurrentTab('fillings')
            }
        }
    }

    const buns = ingredientsAll.filter((item: TIngredient) => item.type === 'bun');
    const sauces = ingredientsAll.filter((item: TIngredient) => item.type === 'sauce');
    const fillings = ingredientsAll.filter((item: TIngredient) => item.type === 'main');

    const tabsRef = useRef<HTMLHeadingElement>(null);
    const bunsRef = useRef<HTMLHeadingElement>(null);
    const saucesRef = useRef<HTMLHeadingElement>(null);
    const fillingsRef = useRef<HTMLHeadingElement>(null);

    return (
        <div>
            {!isIngredientsRequest && !isIngredientsRequestError && ingredientsAll.length !== 0 &&
                (<div>
                    <p className='text text_type_main-large'>
                        Соберите бургер
                    </p>

                    <div className={IngredientsStyle.tabs} ref={tabsRef}>
                        <Tab value='buns' active={currentTab === 'buns'} onClick={setTab}>
                            Булки
                        </Tab>
                        <Tab value='sauces' active={currentTab === 'sauces'} onClick={setTab}>
                            Соусы
                        </Tab>
                        <Tab value='fillings' active={currentTab === 'fillings'} onClick={setTab}>
                            Начинки
                        </Tab>
                    </div>

                    <div className={`${IngredientsStyle.tabscontent} custom-scroll`} onScroll={scrollTab}>
                        <BurgerIngredientsTab data={buns} sendRef={bunsRef}>Булки</BurgerIngredientsTab>
                        <BurgerIngredientsTab data={sauces} sendRef={saucesRef}>Соусы</BurgerIngredientsTab>
                        <BurgerIngredientsTab data={fillings} sendRef={fillingsRef}>Начинки</BurgerIngredientsTab>
                    </div>
                </div>)
            }
        </div>
    );
}

export default BurgerIngredients;