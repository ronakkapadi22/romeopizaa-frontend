import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from '../pages/not-found'
import PublicLayout from '../layout/publicLayout'
import AuthLayout from '../layout/authLayout'
import PrivateLayout from '../layout/mainLayout'
import useRoute from '../hooks/useRoutes'
import OnlyRenderLayout from '../layout/onlyRenderLayout'
import { useSelector } from 'react-redux'

const Routing = ({ ...props }) => {
	const { authRoutes, publicRoute, privateRoute, onlyRenderRoute } = useRoute()
	const isUserLogged = useSelector(({ auth }) => auth?.isLogged)

	return (
		<Routes {...props}>
			<Route path="/" element={<OnlyRenderLayout isShowHeader />}>
				{onlyRenderRoute()?.map(({ id, ...otherProps }) => (
					<Route index key={id} {...otherProps} />
				))}
			</Route>
			<Route path="/" element={<PublicLayout isDefaultAccess />}>
				{publicRoute()?.map(({ id, ...otherProps }) => (
					<Route index key={id} {...otherProps} />
				))}
			</Route>
			<Route path="/" element={<AuthLayout />}>
				{authRoutes(true)?.map(({ id, ...otherProps }) => (
					<Route index key={id} {...otherProps} />
				))}
			</Route>
			<Route path="/" element={<PrivateLayout />}>
				{privateRoute(isUserLogged)?.map(({ id, ...otherProps }) => (
					<Route index key={id} {...otherProps} />
				))}
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default Routing
