import React from 'react'
import Login from '../components/auth/login/login'
import Otp from '../components/auth/otp/otp'

const LoginProvider = ({ authKey, isLoginRoute, ...props }) => {
	switch (authKey) {
		case 'phone_number':
			return <Login {...{ isLoginRoute }} {...props} />
		case 'otp_page':
			return <Otp {...{ isLoginRoute }} {...props} />
		default:
			return <Login {...{ isLoginRoute }} {...props} />
	}
}

export default LoginProvider
