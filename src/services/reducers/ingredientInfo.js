import {
    GET_INGREDIENT_INFO,
    DELETE_INGREDIENT_INFO
} from "../actions/ingredientInfo";

const defaultState = {
    item: null
};

export const ingredientInfo = (state = defaultState, action) => {
    switch (action.type) {
        case GET_INGREDIENT_INFO: {
            return {
                ...state,
                item: action.item
            };
        }

        case DELETE_INGREDIENT_INFO: {
            return {
                ...state,
                item: null
            };
        }

        default: {
            return state;
        }
    }
};