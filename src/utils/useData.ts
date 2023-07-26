import React, {useState} from 'react';
import {TIngredient} from "./types";
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {TRootState} from './store';
import type {AppDispatch} from './store';

export function useData<T>(val: T) {
    const [values, setValues] = useState<T>(val);
    const onChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;

        setValues({...values, [name]: value});
    };
    const data = {values, onChanges, setValues}

    return data;
}

type TIngredientCount = TIngredient & { count: number };

export const getPrice = (newObj: TIngredientCount[]): number => {
    const price = newObj.reduce((prev: number, curr: TIngredientCount) => prev + curr.price * curr.count, 0);

    return price;
};

export const getOrderCountIngredients = (ingredientsObj: TIngredient[]): TIngredientCount[] => {
    const result = {} as any;
    let resultObject = {} as any;

    ingredientsObj.forEach((obj) => {
        const key = `${obj._id}`;

        if (!result[key]) {
            result[key] = {...obj, count: 0};
        }

        if (result[key].type === "bun") {
            result[key].count += 2;
        } else {
            result[key].count += 1;
        }
    });

    resultObject = Object.values(result);

    return resultObject;
};

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();