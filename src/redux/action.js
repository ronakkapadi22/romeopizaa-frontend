import { constant } from './constant'

export const setLoggedUser = (payload) => {
	return {
		type: constant.USER_DATA,
		payload
	}
}

export const setLogOutUser = (payload = {}) => {
	return {
		type: constant.LOG_OUT,
		payload
	}
}

export const handlePhoneNumber = (payload = {}) => {
	return {
		type: constant.PHONE_NUMBER,
		payload
	}
}

export const setAuthKey = (payload = {}) => {
	return {
		type: constant.SET_AUTH_STEP,
		payload
	}
}

export const setupAuthData = (payload = {}) => {
	return {
		type: constant.SET_AUTH_DATA,
		payload
	}
}

export const handleTerms = (payload = false) => {
	return {
		type: constant.IS_AGREE,
		payload
	}
}

export const setStoreData = (payload = {}) => {
	return {
		type: constant.STORE_DATA,
		payload
	}
}

export const handleInitialAuthStep = (payload = {}) => {
	return {
		type: constant.INITIAL,
		payload
	}
}

export const getAllAddressList = (payload = []) => {
	return {
		type: constant.GET_ADDRESS,
		payload
	}
}

export const updateAddress = (payload = {}) => {
	return {
		type: constant.UPDATE_ADDRESS,
		payload
	}
}

export const removeCurrentAddress = (payload) => {
	return {
		type: constant.DELETE_ADDRESS,
		payload
	}
}

export const isEditAddress = (payload) => {
	return {
		type: constant.IS_EDIT_ADDRESS,
		payload
	}
}

export const currentAddress = (payload) => {
	return {
		type: constant.CURRENT_ADDRESS,
		payload
	}
}
