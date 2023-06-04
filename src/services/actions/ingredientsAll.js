import { getProductData } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export function getIngredientsAll() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });

        getProductData()
            .then((response) => {
                if (response.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredientsAll: response.data,
                    });
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: GET_INGREDIENTS_ERROR,
                });
            });
    };
}