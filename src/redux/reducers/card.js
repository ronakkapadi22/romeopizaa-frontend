import { constant } from "../constant"

const initialState = {  }

export const cardDetail = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case constant.ADD_CARD:
            return {
                ...state, ...payload
            }
        case constant.DELETE_CARD:
            return { }
        default: return state
    }
}