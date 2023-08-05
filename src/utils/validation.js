import { isValidPhoneNumber } from 'libphonenumber-js'

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const validation = (name, value, data = null) => {
	if (!value || String(value)?.trim() === '') {
		return 'required'
	}

	switch (name) {
		case 'phone':
		case 'contact':
		case 'phoneNumber':
			if (!isValidPhoneNumber(value)) {
				return 'invalid'
			} else return ''
		case 'otp':
			if (data !== Number(value)) {
				return 'invalid'
			} else return ''
		case 'email':
			if(!emailRegex.test(value)){
				return 'invalid'
			}else return ''
		case 'password':
		case 'old_password':
		case 'new_password':
		case 'confirm_password':
			if(!passwordRegex.test(value)){
				return 'invalid'
			}else return ''
		default:
			return ''
	}
}
