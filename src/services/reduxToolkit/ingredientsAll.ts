import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductData} from "../../utils/burger-api";
import {TIngredient} from '../../utils/types';

interface ISliceState  {
    ingredientsAll: TIngredient[];
    isIngredientsRequest: boolean;
    isIngredientsRequestError: boolean;
}

export const initialState: ISliceState = {
    ingredientsAll: [],
    isIngredientsRequest: false,
    isIngredientsRequestError: false,
}

export const getIngredientsAll = createAsyncThunk(
    "ingredientsAll/getIngredientsAll",
    async () => {
        const response = await getProductData();
        return response.data;
    }
);

const ingredientsAll = createSlice({
    name: "ingredients",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getIngredientsAll.pending, (state) => {
                state.isIngredientsRequest = true;
            })
            .addCase(getIngredientsAll.fulfilled, (state, action) => {
                state.isIngredientsRequest = false;
                state.isIngredientsRequestError = false;
                state.ingredientsAll = state.ingredientsAll.concat(action.payload);
            })
            .addCase(getIngredientsAll.rejected, (state) => {
                state.isIngredientsRequest = false;
                state.isIngredientsRequestError = true;
            });
    },
});

export default ingredientsAll.reducer;