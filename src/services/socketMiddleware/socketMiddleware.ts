import {Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, TWsActions} from "../../utils/store";
import {TRootState} from "../../utils/store";

export const socketMiddleware = (wsActions: TWsActions): Middleware => (store: MiddlewareAPI<AppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;
    let url = "";

    return (next) => (action) => {
        const {dispatch} = store;
        const {wsStart, onOpen, onClose, onError, onMessage} = wsActions;

        if (wsStart.match(action)) {
            url = action.payload;
            socket = new WebSocket(url);
        }

        if (socket) {
            socket.onopen = () => {
                dispatch(onOpen());
            };

            socket.onerror = () => {
                dispatch(onError());
            };

            socket.onmessage = (event) => {
                const {data} = event;
                const dataObj = JSON.parse(data);

                dispatch(onMessage(dataObj));
            };

            socket.onclose = () => {
                dispatch(onClose());
            };
        }

        next(action);
    };
};

export default socketMiddleware;
