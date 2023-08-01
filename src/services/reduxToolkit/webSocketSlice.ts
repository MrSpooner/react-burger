import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TOrders} from "../../utils/types";

type TWsSliceState = {
    total: number;
    totalToday: number,

    orders: TOrders[],
    userOrders: TOrders[],

    wsConnected: boolean
}

export const initialState: TWsSliceState = {
    total: 0,
    totalToday: 0,

    orders: [],
    userOrders: [],

    wsConnected: false
}

const wsSlice = createSlice({
    name: "wsReducer",
    initialState,
    reducers: {
        wsConnectionStart(state, action) {
        },
        wsConnectionSuccess(state) {
            state.wsConnected = true;
        },
        wsOrders(state, action: PayloadAction<TWsSliceState>) {
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
            state.orders = action.payload.orders;
        },
        wsClosed(state) {
            state.wsConnected = false;
        },
        wsError(state) {
            state.wsConnected = false;
        }
    },
});

export default wsSlice.reducer;
export const {
    wsConnectionStart,
    wsConnectionSuccess,
    wsOrders,
    wsClosed,
    wsError
} = wsSlice.actions;