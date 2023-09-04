import { constant } from "../constant"

const initialState = []

export const recentSearch = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case constant.ADD_RECENT_SEARCH:
            return [ ...state, payload ]
        default: return state
    }
}