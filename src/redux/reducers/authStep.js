import { constant } from '../constant'

const initialState = {
	authKey: 'phone_number',
	phone_number: {
		value: null,
		masked: null
	},
	user_registation: {
		countryCode: "+44",
		email: '',
		password: '',
		fName: '',
		lName: '',
    	phoneNumber: '',
    	otp: '',
    	acceptterms: 1,
    	deviceType: 'WEB',
    	deviceToken : ''
	},
	isOtpExpired: true,
	isAgreeWithTerms: false
}

export const authSteps = (state = initialState, action) => {
	const { payload, type } = action
	switch (type) {
		case constant.SET_AUTH_STEP:
			return {
				...state,
				authKey: payload
			}
		case constant.PHONE_NUMBER:
			return {
				...state,
				phone_number: {
					...state.phone_number,
					...payload
				}
			}
		case constant.IS_AGREE:
			return {
				...state,
				isAgreeWithTerms: payload
			}
		case constant.SET_AUTH_DATA:
			return {
				...state, user_registation: {
					...state.user_registation, ...payload
				}
			}
		case constant.INITIAL:
			return { ...initialState }
		default:
			return state
	}
}
