import { constant } from "../constant"

const initialState = []

export const updateOrders = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case constant.CANCEL_ORDER:
            return [ ...state, payload ]
        default: return state
    }
}