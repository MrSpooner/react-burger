import reducer, {initialState, getOrder} from './order'

const orderResp = {
    success: true,
    name: '',
    order: {
        number: 1234
    }
}

test('should get order', () => {
    expect(
        reducer(initialState, {
            type: getOrder.fulfilled,
            payload: orderResp,
        })
    ).toEqual({
        ...initialState,
        number: orderResp
    })
})