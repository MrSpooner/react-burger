import React, {useState} from 'react';
import { store } from './store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export function useData<T>(val: T) {
    const [values, setValues] = useState<T>(val);

    const onChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;

        setValues({...values, [name]: value});
    };

    const data = {
        values,
        onChanges,
        setValues
    }

    return data;
}

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<typeof store.getState> = useSelector;