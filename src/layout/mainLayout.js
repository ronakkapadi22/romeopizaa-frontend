import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import withUser from '../hoc/withUser'

const PrivateLayout = ({ ...props }) => (
	<section className="w-full h-full" {...props}>
		{/* {topbar} */}
		<WithAuthenticatedOutlet {...props} replace {...{ to: '/' }} />
	</section>
)
export default PrivateLayout

const WithAuthenticatedOutlet = withUser(Outlet, Navigate)
