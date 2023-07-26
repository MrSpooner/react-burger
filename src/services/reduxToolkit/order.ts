import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {getChosenOrderReq, getOrderReq} from "../../utils/burger-api";
import {TOrders, TOrdersArr} from "../../utils/types";

type TOrdersState = {
    number: number;
    order: TOrders[];

    orderRequest: boolean;
    orderFailed: boolean;

    chosenOrderRequest?: boolean;
    chosenOrderFailed?: boolean;
}

const initialState: TOrdersState = {
    number: 0,
    order: [],

    orderRequest: false,
    orderFailed: false
}

export const getOrder = createAsyncThunk(
    "order/getOrder",
    async (orderInfo: string[]) => {
        const response = await getOrderReq(orderInfo);

        return response.order.number
    }
)

export const getChosenOrder = createAsyncThunk(
    "order/getChosenOrder",
    getChosenOrderReq
);

const order = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getOrder.pending, (state) => {
                state.orderRequest = true;
            })
            .addCase(getOrder.fulfilled, (state, action: PayloadAction<number>) => {
                state.orderRequest = false;
                state.orderFailed = false;
                state.number = action.payload;
            })
            .addCase(getOrder.rejected, (state) => {
                state.orderRequest = false;
                state.orderFailed = true;
            })
            .addCase(getChosenOrder.pending, (state) => {
                state.chosenOrderRequest = true;
            })
            .addCase(getChosenOrder.fulfilled, (state, action: PayloadAction<TOrdersArr>) => {
                state.chosenOrderRequest = false;
                state.chosenOrderFailed = false;
                state.order = action.payload.orders;
            })
            .addCase(getChosenOrder.rejected, (state) => {
                state.chosenOrderRequest = false;
                state.chosenOrderFailed = true;
            })
    }
});

export default order.reducer;