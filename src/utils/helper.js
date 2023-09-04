import jwt_decode from 'jwt-decode'
import { clearDataFromLocal } from './localStorage'
import { store } from '../store'
import { handleInitialAuthStep, setLogOutUser } from '../redux/action'

export const retry = (fetchComponent, retriesLeft = 5, interval = 1000) => {
	return new Promise((resolve, reject) => {
		fetchComponent()
			.then(resolve)
			.catch((error) => {
				setTimeout(() => {
					if (retriesLeft === 1) {
						reject(error)
						return
					}
					retry(fetchComponent, retriesLeft - 1, interval).then(resolve, reject)
				}, interval)
			})
	})
}

export const handleScrollToElement = (id) => {
	const element = document.getElementById(id)
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' })
	}
}

export const isFunction = (fn) => fn === 'function'

export const METHODS = {
	GET: 'get',
	DELETE: 'delete',
	HEAD: 'head',
	OPTIONS: 'options',
	POST: 'post',
	PUT: 'put',
	PATCH: 'patch'
}

export const padding = {
	large: 'py-3',
	medium: 'py-2',
	small: 'py-1'
}

export const apperiance = {
	primary:
		'bg-black text-white hover:bg-gray1 border border-black hover:border-light-gray disabled:bg-cultured disabled:border-cultured disabled:text-gray1',
	secondary:
		'bg-cultured text-black hover:bg-light-gray border border-cultured hover:border-light-gray disabled:bg-cultured disabled:border-cultured disabled:text-gray2'
}

export const uid = () =>
	Date.now().toString(36).toUpperCase() +
	Math.random().toString(36).toUpperCase().substr(2)

export const classNames = (...classes) => classes.filter(Boolean).join(' ')

export const decodeToken = (token) => {
	if (!token) return null
	return jwt_decode(token)
}

export const isTokenActivated = (token) => {
	if (!token) return false
	const decoded = jwt_decode(token)
	return decoded?.exp > Date.now() / 1000
}

export const timing = [
	{
		label: 'Monday',
		value: '09:00-18:00'
	},
	{
		label: 'Tuesday',
		value: '10:00-18:00'
	},
	{
		label: 'Wednesday',
		value: '11:00-18:00'
	},
	{
		label: 'Thrusday',
		value: '12:00-18:00'
	},
	{
		label: 'Friday',
		value: '14:00-18:00'
	},
	{
		label: 'Saturday',
		value: '14:00-18:00'
	},
	{
		label: 'Sunday',
		value: 'Closed'
	}
]

export const popular_food = [
	{
		id: 1,
		icon: 'pizaa',
		title: 'Pizaa'
	},
	{
		id: 2,
		icon: 'burger',
		title: 'Burger'
	},
	{
		id: 3,
		icon: 'chicken',
		title: 'Chicken'
	},
	{
		id: 4,
		icon: 'french-fries',
		title: 'French Fries'
	},
	{
		id: 5,
		icon: 'dessert',
		title: 'Dessert'
	},
	{
		id: 6,
		icon: 'sandwich',
		title: 'Sandwich'
	},
	{
		id: 7,
		icon: 'sandwich',
		title: 'Sandwich'
	},
	{
		id: 8,
		icon: 'sandwich',
		title: 'Sandwich'
	}
]

export const nav_menu = [
	{
		id: 1,
		name: 'Profile',
		icon: 'profile',
		path: '/profile'
	},
	{
		id: 2,
		name: 'Order List',
		icon: 'border-width',
		path: '/orders'
	},
	{
		id: 3,
		name: 'Basket',
		icon: 'text-fill',
		path: '/cart'
	}
]

export const maskedVal = (value = '') => {
	const splitVal = value?.split('')
	const masked = splitVal.splice(0, splitVal.length - 2).map((val) => {
		return val ? '*' : ''
	})
	const unmasked = splitVal.splice(0, 2)
	return [...masked, ...unmasked].join('')
}

export const handleLogout = async () => {
	clearDataFromLocal()
	store.dispatch(setLogOutUser({}))
	store.dispatch(handleInitialAuthStep({}))
}

export const range = (start, end) => {
	const length = end - start + 1
	return Array.from({ length }, (_, idx) => idx + start)
}

export const orders_heading = ['Address', 'Menu', 'Status']

export const expDateFormatter = (value) => {
	if (Number.isInteger(Number(value.replace('/', '')))) {
		const validateCardExp =
			String(value).replace(/\//g, '').substring(0, 2) +
			(String(value).length > 2 ? '/' : '') +
			String(value).replace(/\//g, '').substring(2, 4)
		return validateCardExp
	} else return ''
}

export const cardFormatter = (value) => {
	if (Number.isInteger(Number(value.replace(/ /g, '')))) {
		var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
		var matches = v.match(/\d{4,16}/g)
		var match = (matches && matches[0]) || ''
		var parts = []
		for (let i = 0; i < match.length; i += 4) {
			parts.push(match.substring(i, i + 4))
		}
		if (parts.length) {
			return parts.join(' ')
		} else {
			return value
		}
	} else return value.replace(value.charAt(value.length - 1), '')
}

const handleCode = (data = {}) => {
	if (!data) return {}
	return `${data?.root}${data?.suffixes?.length > 1 ? '' : data?.suffixes?.[0] || ''
		}`
}

export const coutryCodeFormatter = (data = []) => {
	if (!data?.length) return []
	const formatter = data
		?.map((value) => {
			return {
				name: value?.name?.common,
				coutry: String(value?.cca2).toLowerCase(),
				code: handleCode(value?.idd)
			}
		})
		.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
	return formatter
}

export const groupBy = (array, key) => {
	let grouped = array.reduce((accum, data) => {
		if (data[key] === undefined) return accum
		return Object.assign(accum, {
			[data[key]]: (accum[data[key]] || []).concat(data)
		})
	}, {})
	return grouped
}

export const findDataInArray = (mainArray = [], target = []) => {
	if(!mainArray.length && target?.length) return []
	if(!target.length && mainArray.length) return mainArray
	const cloneArray = []
	mainArray.forEach(val => {
		const value = target.find(data => data?.orderId === String(val?.id))
		cloneArray.push({
			...val, ...value
		})
	})
	return cloneArray
}