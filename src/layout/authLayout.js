import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = ({ ...props }) => {

	return (
		<section className="w-full h-full" {...props}>
			<Outlet {...props} replace {...{ to: '/' }} />
		</section>
	)
}
export default AuthLayout
