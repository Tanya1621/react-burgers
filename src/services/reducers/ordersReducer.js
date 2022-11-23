

const initialState = {
    lastOrders: []
}


export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LAST_ORDERS':
            return {...state, lastOrders: action.orders}
        default:
            return state;
    }

}