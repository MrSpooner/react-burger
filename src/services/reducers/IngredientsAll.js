import {
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_REQUEST,
} from "../actions/ingredientsAll";

const initialState = {
    ingredientsAll: [],
    isIngredientsRequest: false,
    isIngredientsRequestError: false,
};

export const ingredientsAll = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                isIngredientsRequest: true
            };
        }

        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsAll: action.ingredientsAll,
                isIngredientsRequest: false,
                isIngredientsRequestError: false
            };
        }

        case GET_INGREDIENTS_ERROR: {
            return {
                ...state,
                isIngredientsRequest: false,
                isIngredientsRequestError: true
            };
        }

        default: {
            return state;
        }
    }
};