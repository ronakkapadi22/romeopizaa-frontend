import { constant } from '../constant'

const initialState = {
	address: [],
    isEdit: false,
    current_address: {}
}

export const addressData = (state = initialState, action) => {
	const { payload, type } = action
	switch (type) {
		case constant.GET_ADDRESS:
			return {
				...state,
				address: payload
			}
        case constant.UPDATE_ADDRESS: 
            const updateClone = [...state.address]
            updateClone[payload?.id] = {...payload}
            return {
                ...state, address: updateClone
            }
        case constant.DELETE_ADDRESS:
            const deleteClone = [...state.address]
            deleteClone.splice(payload, 1)
            return {
                ...state, address: deleteClone
            }
        case constant.IS_EDIT_ADDRESS:
            return { ...state, isEdit: payload }
        case constant.CURRENT_ADDRESS:
            return { ...state, current_address: payload }
		default:
			return state
	}
}
