import API from './index'

export const userLogin = async (payload) => {
	const response = await API.post('/customer/login', payload)
	return response
}

export const sendOtpWithRegister = async (payload) => {
	const response = await API.post('/customer/register', payload)
	return response
}

export const otpVerificationWithRegister = async (payload) => {
	const response = await API.post('/customer/otpverification', payload)
	return response
}

export const deviceVerification = async (payload) => {
	const response = await API.post('/customer/createaccount', payload)
	return response
}

export const getProfileDetails = async (payload) => {
	const response = await API.post('/customer/profile', payload)
	return response
}

export const updatePassword = async (payload) => {
	const response = await API.post('/customer/passwordupdate', payload)
	return response
}

export const userLogOut = async (payload) => {
	const response = await API.post('/customer/logout', payload)
	return response
}

export const storeList = async (payload) => {
	const response = await API.post('/stores', payload)
	return response
}

export const categoryList = async (payload) => {
	const response = await API.post('/categories', payload)
	return response
}

export const fetchProductData = async (payload) => {
	const response = await API.post('/products', payload)
	return response
}
export const productCategory = async (payload) => {
	const response = await API.post('/categories/products', payload)
	return response
}

export const productDetails = async (payload) => {
	const response = await API.post('/products/details', payload)
	return response
}

export const addressList = async(payload) => {
	const response = await API.post('/customeraddress/list', payload)
	return response
}

export const newAndUpdateAddress = async(payload) => {
	const response = await API.post('/customeraddress/addedit', payload)
	return response
}

export const deleteAddress = async(payload) => {
	const response = await API.post('/customeraddress/delete', payload)
	return response
}

export const coutryResponse = async () => {
	const response = await fetch(
		'https://restcountries.com/v3.1/all?fields=idd,cca2,name',
		{
			method: 'get',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		}
	)
	return await response.json()
}
