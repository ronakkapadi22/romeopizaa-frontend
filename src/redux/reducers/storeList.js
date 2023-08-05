import { constant } from '../constant'

const initialState = {
	storeDetail: {}
}

export const storeData = (state = initialState, action) => {
	const { payload, type } = action
	switch (type) {
		case constant.STORE_DATA:
			return {
				...state,
				storeDetail: payload
			}
		default:
			return state
	}
}
