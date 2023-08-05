import React, { lazy, useCallback } from 'react'
import { retry } from '../utils/helper'
import { useSelector } from 'react-redux'
import withUser from '../hoc/withUser'
import { Navigate } from 'react-router-dom'
import withAuth from '../hoc/withAuth'
import withPublic from '../hoc/withFreeAccess'
import ProductDetails from '../pages/product-details'

const AuthProvider = lazy(() => retry(() => import('../pages/register')))
const LoginProvider = lazy(() => retry(() => import('../pages/login')))

//homepage
const HomePage = lazy(() => retry(() => import('../pages/home')))
const SearchFood = lazy(() => retry(() => import('../pages/search-food')))
const ProductCategoryDetail = lazy(() => retry(() => import('../pages/product-categories-detail')))

//userlogged
const Cart = lazy(() => retry(() => import('../pages/cart-detail.js')))
const ProfilePage = lazy(() => retry(() => import('../pages/profile-page')))
const OrdersList = lazy(() => retry(() => import('../pages/order-list')))
const OrderDetail = lazy(() => retry(() => import('../pages/order-detail')))

const useRoutes = () => {
	const authKey = useSelector(({ authSteps }) => authSteps?.authKey)

	const WithUser = {
		Orders: withUser(OrdersList, Navigate),
		Profile: withUser(ProfilePage, Navigate),
		Cart: withUser(Cart, Navigate),
		Order: withUser(OrderDetail, Navigate)
	}

	const Auth = {
		Login: withAuth(LoginProvider, Navigate),
		Register: withAuth(AuthProvider, Navigate)
	}

	const Public = {
		Home: withPublic(HomePage),
		Search: withPublic(SearchFood),
		Detail: withPublic(ProductDetails),
		Product: withPublic(ProductCategoryDetail)
	}

	const routes = [
		{
			id: 'register',
			path: '/register',
			name: 'Registration',
			element: <Auth.Register {...{ authKey, isLoginRoute: false, to: '/', title: 'Registration' }} />,
			isAuth: true,
			exact: true
		},
		{
			id: 'login',
			path: '/login',
			name: 'Login',
			element: <Auth.Login {...{ authKey, isLoginRoute: true, to: '/', title: 'Login' }} />,
			isAuth: true,
			exact: true
		},
		{
			id: 'search-food',
			path: '/search',
			name: 'Search',
			element: <Public.Search {...{title: 'Search'}} />,
			isPublic: true,
			onlyRender: true,
			exact: true
		},
		{
			id: 'order-list',
			path: '/orders',
			name: 'Orders',
			element: <WithUser.Orders replace {...{ to: '/', title: 'Orders' }} />,
			isPrivate: true,
			onlyRender: true,
			exact: true
		},
		{
			id: 'home_page',
			path: '/',
			name: 'Home',
			element: <Public.Home {...{title: 'Home', to: '/'}} />,
			isPublic: true,
			exact: true
		},
		{
			id: 'product_details',
			path: '/products/detail/:id',
			name: 'Product Details',
			element: <Public.Detail {...{title: 'Product Details', to: '/'}} />,
			isPublic: true,
			onlyRenderRoute: true,
			exact: true
		},
		{
			id: 'product_category',
			path: '/products/:id',
			name: 'Product Categories',
			element: <Public.Product {...{title: 'Products', to: '/'}} />,
			isPublic: true,
			exact: true
		},
		{
			id: 'cart',
			path: '/cart',
			name: 'Cart',
			element: (
				<WithUser.Cart
					className="mx-1 my-8 md:m-0 bg-cultured"
					replace
					{...{ to: '/', title: 'Cart' }}
				/>
			),
			isPrivate: true,
			onlyRender: true,
			exact: true
		},
		{
			id: 'order',
			path: '/orders/details',
			name: 'Order',
			element: <WithUser.Order replace {...{ to: '/', title: 'Order Details' }} />,
			isPrivate: true,
			onlyRender: true,
			exact: true
		},
		{
			id: 'profile',
			path: '/profile',
			name: 'Profile',
			element: <WithUser.Profile withSimpleHeader replace {...{ to: '/', title: 'Profile' }} />,
			isPrivate: true,
			exact: true
		}
	]

	const authRoutes = useCallback(
		(isAuthRoute) => {
			return routes.filter(({ isAuth }) => isAuth === isAuthRoute)
		},
		[routes]
	)

	const publicRoute = useCallback(() => {
		return routes.filter((value) => value.isPublic)
	}, [routes])

	const privateRoute = useCallback(
		(isUserLogged) => {
			return routes.filter((value) => value.isPrivate === isUserLogged)
		},
		[routes]
	)

	const onlyRenderRoute = useCallback(() => {
		return routes.filter((value) => value.onlyRender)
	}, [routes])

	return {
		authRoutes,
		onlyRenderRoute,
		publicRoute,
		privateRoute,
		routes
	}
}

export default useRoutes
