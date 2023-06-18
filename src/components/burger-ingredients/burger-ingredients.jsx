import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsStyle from './burger-ingredients.module.css';
import BurgerIngredientsTab from '../burger-ingredients-tab/burger-ingredients-tab';
import {useDispatch, useSelector} from "react-redux";
import Modal from "../modal/modal";
import IngredientDetails from "../modal-ingredient-details/ingredient-details";

function BurgerIngredients() {
    const [currentTab, setCurrentTab] = React.useState('buns');
    const [isModal, setModal] = React.useState(false);
    const data = useSelector((state) => state.ingredientInfo.item);

    const openModal = () => {
        setModal(true);
    };
    const closeModal = () => {
        setModal(false);
    }
    const {
        ingredientsAll,
        isIngredientsRequest,
        isIngredientsRequestError
    } = useSelector(store => store.ingredientsAll);
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
            default:
                const tabsPos = tabsRef.current.getBoundingClientRect().top;
                const bunsPos = bunsRef.current.getBoundingClientRect().top;
                const saucesPos = saucesRef.current.getBoundingClientRect().top;
                const fillingsPos = fillingsRef.current.getBoundingClientRect().top;

                if (Math.abs(tabsPos - bunsPos) < Math.abs(tabsPos - saucesPos)) {
                    setCurrentTab('buns')
                } else if (Math.abs(tabsPos - saucesPos) < Math.abs(tabsPos - fillingsPos)) {
                    setCurrentTab('sauces')
                } else {
                    setCurrentTab('fillings')
                }

                break;
        }
    };

    const buns = ingredientsAll.filter((item) => item.type === 'bun');
    const sauces = ingredientsAll.filter((item) => item.type === 'sauce');
    const fillings = ingredientsAll.filter((item) => item.type === 'main');

    const tabsRef = React.useRef(null);
    const bunsRef = React.useRef(null);
    const saucesRef = React.useRef(null);
    const fillingsRef = React.useRef(null);

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

                    <div className={`${IngredientsStyle.tabscontent} custom-scroll`} onScroll={setTab}>
                        <BurgerIngredientsTab data={buns} sendRef={bunsRef} openModal = {openModal}>Булки</BurgerIngredientsTab>
                        <BurgerIngredientsTab data={sauces} sendRef={saucesRef} openModal = {openModal}>Соусы</BurgerIngredientsTab>
                        <BurgerIngredientsTab data={fillings} sendRef={fillingsRef} openModal = {openModal}>Начинки</BurgerIngredientsTab>
                    </div>
                </div>)
            }
            {isModal && (
                <Modal closeModal={closeModal}>
                    <IngredientDetails data = {data}/>
                </Modal>
            )}
        </div>
    );
}

export default BurgerIngredients;