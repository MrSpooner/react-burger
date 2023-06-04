import React from 'react';
import Tab from './burger-ingredients-tab.module.css';
import PropTypes from "prop-types";
import {Data} from "../../utils/prop-types";
import BurgerDragIngredient from '../burger-drag-ingredient/burger-drag-ingredient'

function BurgerIngredientsTab(prop) {
    return (
        <div>
            <p className="text text_type_main-medium" ref={prop.sendRef}>
                {prop.children}
            </p>

            <div className={Tab.stack}>
                {prop.data.map((item, index) => (
                    <BurgerDragIngredient data = {item} key = {index}/>
                ))}
            </div>
        </div>
    );
}

export default BurgerIngredientsTab;

BurgerIngredientsTab.propTypes = {
    sendRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.any})
    ]).isRequired,
    children: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape(Data)).isRequired,
};
