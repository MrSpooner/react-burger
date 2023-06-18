import {useState} from 'react';

export function useData(val) {
    const [values, setValues] = useState(val);

    const onChanges = (event) => {
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