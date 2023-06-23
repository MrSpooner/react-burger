import React from 'react';
import IngredientStyle from './ingredient-details.module.css';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

function IngredientDetails() {
    const {idCard} = useParams();
    const {ingredientsAll} = useSelector((state) => state.ingredientsAll);
    const item = ingredientsAll.length && ingredientsAll.find(
        (ingredient) => ingredient._id === idCard
    );

    return (
        <div>
            {item &&
                (<div className={IngredientStyle.card}>
                    <p className="text text_type_main-large ml-5 mt-5">Детали ингредиента</p>
                    <div className={IngredientStyle.elements}>
                        <img src={item.image_large}/>
                        <p className="text text_type_main-medium">{item.name}</p>
                        <div className={IngredientStyle.stats}>
                            <div className={IngredientStyle.stat}>
                                <p className="text text_type_digits-small text_color_inactive">Калории, ккал</p>
                                <p className="text text_type_digits-default text_color_inactive">
                                    {item.calories}
                                </p>
                            </div>
                            <div className={IngredientStyle.stat}>
                                <p className="text text_type_digits-small text_color_inactive">Белки, г</p>
                                <p className="text text_type_digits-default text_color_inactive">
                                    {item.proteins}
                                </p>
                            </div>
                            <div className={IngredientStyle.stat}>
                                <p className="text text_type_digits-small text_color_inactive">Жиры, г</p>
                                <p className="text text_type_digits-default text_color_inactive">
                                    {item.fat}
                                </p>
                            </div>
                            <div className={IngredientStyle.stat}>
                                <p className="text text_type_digits-small text_color_inactive">Углеводы, г</p>
                                <p className="text text_type_digits-default text_color_inactive">
                                    {item.carbohydrates}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
}

export default IngredientDetails;