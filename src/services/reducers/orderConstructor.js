import {
    ADD_BUNS,
    ADD_ITEMS,
    DELETE_CONSTRUCTOR_ITEM,
    SORT_CONSTRUCTOR_ITEMS,
    RESET_CONSTRUCTOR
} from "../actions/orderConstructor";

const initialState = {
    bun: [],
    constructorItems: []
};

export const orderConstructor = (store = initialState, action) => {
    switch (action.type) {
        case ADD_BUNS:
            return {
                ...store,
                bun: action.bun,
            };

        case ADD_ITEMS:
            return {
                ...store,
                constructorItems: [...store.constructorItems, action.constructorItems],
            };

        case DELETE_CONSTRUCTOR_ITEM:
            return {
                ...store,
                constructorItems: [...store.constructorItems].filter(item => action.data.myId !== item.id)
            };

        case RESET_CONSTRUCTOR:
            return {
                ...store,
                bun: [],
                constructorItems: []
            };

        case SORT_CONSTRUCTOR_ITEMS: {
            const constructorArr = [...store.constructorItems];

            constructorArr.splice(action.data.dropItem, 0, constructorArr.splice(action.data.draggedItem, 1)[0]);

            return {
                ...store,
                constructorItems: constructorArr,
            };
        }

        default:
            return store;
    }
};