import React, { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NotFound from '../pages/not-found'
import Header from '../components/home/navbar/header'
import Footer from '../components/home/footer/footer'
import Booking from '../components/elements/book-table/index'
import OfferHeader from '../components/elements/offer-header/OfferHeader'
import { setStoreConfig, setStoreData } from '../redux/action'
import { enqueueSnackbar } from 'notistack'
import { storeList } from '../api/api'
import { useDispatch, useSelector } from 'react-redux'
import CustomPortal from '../shared/CustomPortal'
import FindStore from '../components/elements/find-store/FindStore'
import useHistory from '../hooks/useHistory'

const PublicLayout = ({ isDefaultAccess, ...props }) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const storeConfig = useSelector(({ storeConfig }) => storeConfig)
	const isRedirectCartPage = useSelector(({ auth }) => auth?.isRedirectCartPage)
	const [toggle, setToggle] = useState({
		stores: false,
		warning: false
	})

	const handleToggle = (name, data = {}) => setToggle({ ...toggle, [name]: !toggle[name], ...data })

	const fetchStoreList = useCallback(async () => {
		try {
			const response = await storeList({ storeId: storeConfig.storeId })
			if (response.data.data)
				dispatch(setStoreData({ data: response.data?.data?.[0] }))
		} catch (error) {
			enqueueSnackbar(error?.response?.data?.message || 'somthing went wrong.', {
				variant: 'error'
			})
			return error
		}
	}, [])

	console.log('auth', isRedirectCartPage)

	useEffect(() => {
		isRedirectCartPage && history('/cart')
	}, [history])

	useEffect(() => {
		storeConfig.storeId && fetchStoreList()
	}, [storeConfig?.storeId])

	const selectConfigStore = (val) => {
		dispatch(setStoreConfig({
			storeId: val?.id
		}))
	}

	return isDefaultAccess ? (
		<section className="relative w-full" {...props}>
			<OfferHeader />
			<Header />
			<Outlet {...props} />
			<Booking />
			<Footer />
			{
				!storeConfig?.storeId ? <CustomPortal
					animation="animate-popup-top"
					{...{ toggle: !storeConfig?.storeId }}
					className="relative w-full flex items-center"
				>
					<FindStore {...{ handleToggle, selectConfigStore }} />
				</CustomPortal> : null}
		</section>
	) : (
		<NotFound />
	)
}

export default PublicLayout
