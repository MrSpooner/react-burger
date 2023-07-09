import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd/dist/hooks";
import {GET_INGREDIENT_INFO} from "../../services/actions/ingredientInfo";
import {useDispatch} from "react-redux";
import Style from './burger-drag-ingredient.module.css';
import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {TIngredient} from "../../utils/types";

type TIngredientBurger = {
    count: number;
    data: TIngredient;
    key: number
}

const BurgerDragIngredient: React.FC<TIngredientBurger>  = (data: TIngredientBurger) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [, itemRef] = useDrag({
        type: "ingredients",
        item: data.data
    });
    const item = data.data;

    const onClick = React.useCallback(() => {
        dispatch({type: GET_INGREDIENT_INFO, item});
    }, [dispatch, item]);

    return (
        <Link
            key={data.data._id}
            to={`/ingredient/${data.data._id}`}
            state={{background: location}}
            className={Style.card}
            onClick={onClick}>
            <div ref={itemRef} draggable={true}>

                {data.count && <Counter count={data.count} size="default"/>}

                <img src={data.data.image} alt={data.data.name} className={Style.icon}/>

                <div className={Style.price}>
                    <CurrencyIcon type="primary"/>
                    <span className='text text_type_main-small'>{data.data.price}</span>
                </div>

                <span className='text text_type_main-small'>{data.data.name}</span>
            </div>
        </Link>
    );
};

export default BurgerDragIngredient;