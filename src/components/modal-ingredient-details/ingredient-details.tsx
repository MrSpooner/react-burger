import React from 'react';
import IngredientStyle from './ingredient-details.module.css';
import PropTypes from "prop-types";

function IngredientDetails(data: any) {
    return (
        <>
            <p className="text text_type_main-large ml-15 mt-15">Детали ингредиента</p>
            <div className={IngredientStyle.elements}>
                <img src={data.data.image_large}/>
                <p className="text text_type_main-medium">{data.data.name}</p>
                <div className={IngredientStyle.stats}>
                    <div className={IngredientStyle.stat}>
                        <p className="text text_type_digits-small text_color_inactive">Калории, ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {data.data.calories}
                        </p>
                    </div>
                    <div className={IngredientStyle.stat}>
                        <p className="text text_type_digits-small text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {data.data.proteins}
                        </p>
                    </div>
                    <div className={IngredientStyle.stat}>
                        <p className="text text_type_digits-small text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {data.data.fat}
                        </p>
                    </div>
                    <div className={IngredientStyle.stat}>
                        <p className="text text_type_digits-small text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {data.data.carbohydrates}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default IngredientDetails;

IngredientDetails.propTypes = {
    data: {
        data: PropTypes.shape({
            image_large: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            proteins: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
        })
    },
};


