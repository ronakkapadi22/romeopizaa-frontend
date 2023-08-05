import axios from 'axios'
import { handleLogout } from '../utils/helper'

const instance = axios.create({
	baseURL: 'https://romeospizza.uk/office/public/api/v1'
})

instance.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem('token')
		config.headers.Accept = 'application/json'
		if(token){
			config.headers['Authorization'] = 'Bearer ' + token
		}
		config.headers['Content-Type'] = 'application/json'
		return config
	},
	(error) => Promise.reject(error)
)

instance.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		if ([401, 402, 403].includes(error.response.status)) {
			handleLogout()
		}
		return Promise.reject(error)
	}
)

export default instance
