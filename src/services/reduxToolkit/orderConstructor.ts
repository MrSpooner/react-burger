import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient, TItemIngredient, TConstructorType } from "../../utils/types";

interface IConstructorState {
    bun: TIngredient | null ;
    constructorItems?: TItemIngredient[];
}

const initialState = {
    bun: null,
    constructorItems: [],
} as IConstructorState

const orderConstructor = createSlice({
    name: "orderConstructor",
    initialState,
    reducers: {
        addBun(state: IConstructorState, action: PayloadAction<TIngredient>){
            state.bun = action.payload;
        },
        addOtherIngredient(state: IConstructorState, action: PayloadAction<TItemIngredient>){
            if (state.constructorItems){
                state.constructorItems = [action.payload, ...state.constructorItems];
            }
        },
        deleteIngredient(state: IConstructorState, action: PayloadAction<TConstructorType> ){
            if (state.constructorItems){
                state.constructorItems = [...state.constructorItems].filter(
                    (item) => item.id !== action.payload.myId
                );}
        },
        sortIngredients(state: IConstructorState, action: PayloadAction<{dropItem: any; draggedItem: any}> ){
            if (state.constructorItems){
                const constructorArr = [...state.constructorItems];
                const element = constructorArr[action.payload.dropItem];

                constructorArr.splice(action.payload.dropItem, 1)
                constructorArr.splice(action.payload.draggedItem, 0, element)

                state.constructorItems = [...constructorArr]
            }
        },
        resetConstructor(state: IConstructorState){
            state.constructorItems = [];
            state.bun = null;
        }
    }
})

export default orderConstructor.reducer;

export const {
    addBun,
    addOtherIngredient,
    deleteIngredient,
    sortIngredients,
    resetConstructor
} = orderConstructor.actions;