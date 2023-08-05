import React from 'react'
import Login from '../components/auth/login/login'
import Otp from '../components/auth/otp/otp'
import Terms from '../components/auth/terms/terms'
import AllSet from '../components/auth/all-set/all-set'
import Registration from './registration'

const AuthProvider = ({ authKey, ...props }) => {
	switch (authKey) {
		case 'phone_number':
			return <Registration {...props} />
		case 'otp_page':
			return <Otp {...props} />
		case 'terms_condition':
			return <Terms {...props} />
		case 'on_board':
			return <AllSet {...props} />
		default:
			return <Login {...props} />
	}
}

export default AuthProvider
