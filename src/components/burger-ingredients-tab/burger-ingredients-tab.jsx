import React from 'react';
import Tab from './burger-ingredients-tab.module.css';
import PropTypes from "prop-types";
import {Data} from "../../utils/prop-types";
import {useMemo} from "react";
import {useSelector} from "react-redux";
import BurgerDragIngredient from '../burger-drag-ingredient/burger-drag-ingredient'

function BurgerIngredientsTab(prop) {
    const ingredient = useSelector((state) => state.orderConstructor);

    const ingredientCount = useMemo(() => {
        const count = {};

        if (ingredient.bun) {
            count[ingredient.bun._id] = 2;
        }

        ingredient.constructorItems.forEach((constructorItem) => {
            if (count[constructorItem.item._id]) {
                count[constructorItem.item._id] += 1;
            } else {
                count[constructorItem.item._id] = 1;
            }
        });

        return count;
    }, [ingredient]);

    return (
        <div>
            <p className="text text_type_main-medium" ref={prop.sendRef}>
                {prop.children}
            </p>

            <div className={Tab.stack}>
                {prop.data.map((item, index) => <BurgerDragIngredient data={item}
                                                                      count={ingredientCount[item._id]}
                                                                      key={index}
                                                                      openModal={prop.openModal}/>)}
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
    сount: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.shape(Data)).isRequired,
};
