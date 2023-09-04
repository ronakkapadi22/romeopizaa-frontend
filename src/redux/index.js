import { combineReducers } from 'redux'
import { userData } from './reducers/auth'
import { authSteps } from './reducers/authStep'
import { storeData } from './reducers/storeList'
import { addressData } from './reducers/address'
import { orderDetailData } from './reducers/orderDetails'
import { cardDetail } from './reducers/card'
import { recentSearch } from './reducers/recentSearch'
import { storeConfig } from './reducers/setStore'
import { updateOrders } from './reducers/updateOrder'

export const rootReducer = combineReducers({
	auth: userData,
	authSteps,
	store: storeData,
	address: addressData,
	order: orderDetailData,
	card: cardDetail,
	recentSearch,
	storeConfig,
	updateOrders
})
