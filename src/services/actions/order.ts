import {getOrderData} from "../../utils/burger-api";
import {RESET_CONSTRUCTOR} from "./orderConstructor";
import { Dispatch } from 'redux'

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR = "GET_ORDER_ERROR";

export function getOrder(ingredientsId: string[]) {
    return function (dispatch: Dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST,
        });

        getOrderData(ingredientsId)
            .then((response) => {
                if (response.success) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        number: response.order.number,
                    })
                } else {
                    dispatch({
                        type: GET_ORDER_ERROR,
                    });
                }
            })
            .then(() => {dispatch({
                type: RESET_CONSTRUCTOR
            })})
            .catch(() => {
                dispatch({
                    type: GET_ORDER_ERROR,
                });
            });
    };
}