import { constant } from "../constant"

const initialState = {
    storeId: null
}

export const storeConfig = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case constant.SET_STORE:
            return {
                ...state, ...payload
            }
        default: return state
    }
}