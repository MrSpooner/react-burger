import React, {ReactNode} from 'react';
import Tab from './burger-ingredients-tab.module.css';
import {useMemo} from "react";
import BurgerDragIngredient from '../burger-drag-ingredient/burger-drag-ingredient'
import { useAppSelector } from '../../utils/useData';
import {TIngredient, TItemIngredient} from "../../utils/types";

type TIngredientBurger = {
    sendRef: React.RefObject<HTMLHeadingElement>;
    data: TIngredient[];
    children?: ReactNode
}

interface ICount {
    [id: string]: number;
}

const BurgerIngredientsTab: React.FC<TIngredientBurger> = (prop: TIngredientBurger) => {
    const ingredient = useAppSelector((state) => state.orderConstructor);

    const ingredientCount = useMemo(() => {
        const count: ICount = {};

        if (ingredient.bun) {
            count[ingredient.bun._id] = 2;
        }

        ingredient.constructorItems.forEach((constructorItem: TItemIngredient) => {
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
                                                                      key={index}/>)}
            </div>
        </div>
    );
}

export default BurgerIngredientsTab;