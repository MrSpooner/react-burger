import reducer, {
    initialState,
    wsConnectionStart,
    wsConnectionSuccess,
    wsOrders,
    wsClosed,
    wsError
} from './webSocketSlice'

test('should start ws connection', () => {
    expect(
        reducer(initialState, {
            type: wsConnectionStart,
        })
    ).toEqual({
        ...initialState
    })
})

test('should get connected', () => {
    expect(
        reducer(initialState, {
            type: wsConnectionSuccess,
        })
    ).toEqual({
        ...initialState,
        wsConnected: true
    })
})

test('should get websocket orders', () => {
    expect(
        reducer(initialState, {
            type: wsOrders,
            payload: {
                orders: [],
                total: 0,
                totalToday: 0
            }
        })
    ).toEqual({
        ...initialState,
        orders: [],
        total: 0,
        totalToday: 0
    })
})

test('should close ws connection', () => {
    expect(
        reducer(initialState, {
            type: wsClosed,
        })
    ).toEqual({
        ...initialState
    })
})

test('should get ws connection error', () => {
    expect(
        reducer(initialState, {
            type: wsError,
        })
    ).toEqual({
        ...initialState
    })
})