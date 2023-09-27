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

export const fetchAllStores = (payload = []) => {
	return {
		type: constant.STORES,
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

export const addOrderDetail = (payload) => {
	return {
		type: constant.ADD_ORDER,
		payload
	}
}

export const addWish = (payload = {}) => {
	return {
		type: constant.ADD_WISHLIST,
		payload
	}
}

// Cart Item

export const addItemInCart = (payload = {}) => {
	return {
		type: constant.ADD_CART_ITEM,
		payload
	}
}

export const handleOpenCheckoutModal = (payload = {}) => {
	return {
		type: constant.OPEN_CART_MODAL,
		payload
	}
}

export const updateItemInCart = (payload = {}) => {
	return {
		type: constant.UPDATE_CART_ITEM,
		payload
	}
}

export const removeItemInCart = (id) => {
	return {
		type: constant.REMOVE_CART_ITEM,
		payload: id
	}
}

export const clearCartItems = () => {
	return {
		type: constant.CLEAR_CART
	}
}

export const addCard = (payload) => {
	return {
		type: constant.ADD_CARD,
		payload
	}
}

export const addRecentItem = (payload) => {
	return {
		type: constant.ADD_RECENT_SEARCH,
		payload
	}
}

export const deleteCard = () => {
	return {
		type: constant.DELETE_CARD
	}
}

export const setStoreConfig = (payload) => {
	return {
		type: constant.SET_STORE,
		payload
	}
}

export const cancelOrder = (payload) => {
	return {
		type: constant.CANCEL_ORDER,
		payload
	}
}
export const redirectCart = (payload) => {
	return {
		type: constant.IS_REDIRECT,
		payload
	}
}
