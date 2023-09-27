import { constant } from '../constant'

const initialState = {}

export const userData = (state = initialState, action) => {
	const { payload, type } = action
	switch (type) {
		case constant.USER_DATA:
			return {
				...state,
				...payload
			}
		case constant.IS_REDIRECT:
			return {
				...state, isRedirectCartPage : false
			}
		case constant.LOG_OUT:
			return {}
		default:
			return state
	}
}
