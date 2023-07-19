import { combineReducers } from "@reduxjs/toolkit";
import wsSlice from './webSocketSlice'
import ingredientsAll from "./ingredientsAll";
import orderConstructor from "./orderConstructor";
import order from "./order";
import user from "./user";

export const rootReducer = combineReducers({
    wsSlice,
    ingredientsAll,
    orderConstructor,
    order,
    user
});