import { constant } from '../constant'

const initialState = {
	storeDetail: {},
	stores: []
}

export const storeData = (state = initialState, action) => {
	const { payload, type } = action
	switch (type) {
		case constant.STORE_DATA:
			return {
				...state,
				storeDetail: payload
			}
		case constant.STORES:
			return { ...state, stores: payload }
		default:
			return state
	}
}
