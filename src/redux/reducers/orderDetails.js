import { constant } from '../constant'

const initialState = {
	cartItems: [],
	orderData: {},
	currentAddress: {},
	wishLists: {},
	isOpenCheckoutModal: false
}

export const orderDetailData = (state = initialState, action) => {
	const { payload, type } = action
	switch (type) {
		case constant.ADD_ORDER:
			return {
				...state,
				orderData: {
					...state.orderData, ...payload
				}
			}
		case constant.OPEN_CART_MODAL:
			return {
				...state,
				isOpenCheckoutModal: payload
			}
		case constant.ADD_WISHLIST:
			return {
				...state, wishLists: {
					...state.wishLists, ...payload
				}
			}
		case constant.ADD_CART_ITEM:
			return {
				...state, cartItems: [...state.cartItems, { ...payload }]
			}
		case constant.UPDATE_CART_ITEM:
			const cloneCartItem = [...state.cartItems]
			cloneCartItem.splice(payload?.id, 1, payload?.data)
			return {
				...state, cartItems: cloneCartItem
			}
		case constant.REMOVE_CART_ITEM:
			const cloneRemoveCartItem = [...state.cartItems]
			cloneRemoveCartItem.splice(payload, 1)
			return {
				...state, cartItems: cloneRemoveCartItem
			}
		case constant.CURRENT_ADDRESS:
			return {
				...state, currentAddress: payload
			}
		case constant.CLEAR_CART:
			return {
				...state, cartItems: []
			}
		default:
			return state
	}
}
