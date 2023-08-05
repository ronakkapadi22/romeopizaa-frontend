import { combineReducers } from 'redux'
import { userData } from './reducers/auth'
import { authSteps } from './reducers/authStep'
import { storeData } from './reducers/storeList'
import { addressData } from './reducers/address'

export const rootReducer = combineReducers({
	auth: userData,
	authSteps,
	store: storeData,
	address: addressData
})
