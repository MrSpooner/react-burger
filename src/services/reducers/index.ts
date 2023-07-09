import { combineReducers } from 'redux';
import { ingredientsAll } from './IngredientsAll';
import {orderConstructor} from "./orderConstructor";
import { order } from './order';
import { user } from "./user";
import { ingredientInfo } from './ingredientInfo';

export const rootReducer = combineReducers({ingredientsAll, orderConstructor, order, ingredientInfo, user});