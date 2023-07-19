import socketMiddleware from "../services/socketMiddleware/socketMiddleware";
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "../services/reduxToolkit";
import {
    wsConnectionStart,
    wsConnectionSuccess,
    wsOrders,
    wsClosed,
    wsError
} from "../services/reduxToolkit/webSocketSlice";

const wsActions = {
    wsStart: wsConnectionStart,
    onOpen: wsConnectionSuccess,
    onClose: wsClosed,
    onError: wsError,
    onMessage: wsOrders,
};

export type TWsActions = typeof wsActions;

const socketMwOrders = socketMiddleware(wsActions);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(socketMwOrders);
    },
});

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;