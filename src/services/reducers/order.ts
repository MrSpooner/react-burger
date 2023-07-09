import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR
} from "../actions/order";

const initialState = {
    number: 0,
    orderRequest: false,
    orderRequestError: false
};

export const order = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }

        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                number: action.number,
                orderRequest: false,
                orderRequestError: false
            };
        }

        case GET_ORDER_ERROR: {
            return {
                ...state,
                number: 0,
                orderRequest: false,
                orderRequestError: true
            };
        }

        default: {
            return state;
        }
    }
};