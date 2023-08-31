import { isValidPhoneNumber } from 'libphonenumber-js'

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const validation = (name, value, data = null) => {
	if (!value || String(value)?.trim() === '') {
		return 'Required'
	}

	switch (name) {
		case 'contact':
		case 'phone':
		case 'phoneNumber':
			if (!value || String(value)?.trim() === '') {
				return 'Phone number is required.'
			} else if (value?.length <= 12 && !isValidPhoneNumber(value)) {
				return 'Invalid phone number.'
			} else return ''
		case 'otp':
			if (data !== value) {
				return 'Invalid'
			} else return ''
		case 'email':
			if (!emailRegex.test(value)) {
				return 'Invalid email.'
			} else return ''
		case 'password':
		case 'old_password':
		case 'new_password':
			if (!passwordRegex.test(value)) {
				return 'Password must be at least 8 characters long with 1 uppercase 1 lowercase and 1 special character.'
			} else return ''
		case 'confirm_password':
			if (!passwordRegex.test(value)) {
				return 'Password must be at least 8 characters long with 1 uppercase 1 lowercase and 1 special character.'
			} else if (value !== (data?.password || data?.new_password)) {
				return 'The password and confirmation password do not match.'
			} else return ''
		case 'postCode':
			if (value?.length < 6) {
				return 'Invalid post code.'
			} else if (value?.length > 8) {
				return 'Invalid post code.'
			} else return ''
		default:
			return ''
	}
}

export const loginValidation = (name, value) => {
	switch (name) {
		case 'email':
			if (!value || String(value)?.trim() === '') {
				return 'Please enter your register email address.'
			} else if (!emailRegex.test(value)) {
				return 'Invalid email address.'
			} else return ''
		case 'password':
			if (!value || String(value)?.trim() === '') {
				return 'Please enter your password.'
			} else return ''
		default: return ''
	}
}

export const registerValidation = (name, value, data = {}) => {
	switch (name) {
		case 'email':
			if (!value || String(value)?.trim() === '') {
				return 'Email is required.'
			} else if (!emailRegex.test(value)) {
				return 'Invalid email address.'
			} else return ''
		case 'password':
			if (!value || String(value)?.trim() === '') {
				return 'Password is required.'
			} else return ''
		case 'fName':
			if (!value || String(value)?.trim() === '') {
				return 'First Name is required.'
			} else return ''
		case 'lName':
			if (!value || String(value)?.trim() === '') {
				return 'Last Name is required.'
			} else return ''
		case 'phone':
		case 'contact':
		case 'phoneNumber':
			if (!data?.phone || String(data?.phone)?.trim() === '') {
				return 'Phone number is required.'
			} else if (value?.length <= 12 && !isValidPhoneNumber(value)) {
				return 'Invalid phone number.'
			} else return ''
		default: return ''
	}
}
