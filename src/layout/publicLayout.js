import React, { useCallback, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NotFound from '../pages/not-found'
import Header from '../components/home/navbar/header'
import Footer from '../components/home/footer/footer'
import Booking from '../components/elements/book-table/index'
import OfferHeader from '../components/elements/offer-header/OfferHeader'
import { setStoreData } from '../redux/action'
import { enqueueSnackbar } from 'notistack'
import { storeList } from '../api/api'
import { useDispatch } from 'react-redux'

const PublicLayout = ({ isDefaultAccess, ...props }) => {
	const dispatch = useDispatch()
	const fetchStoreList = useCallback(async () => {
		try {
			const response = await storeList({ storeId1: 1 })
			if (response.data.data)
				dispatch(setStoreData({ data: response.data?.data?.[0] }))
		} catch (error) {
			enqueueSnackbar(error?.response?.data?.message || 'somthing went wrong.', {
				variant: 'error'
			})
			return error
		}
	}, [])

	useEffect(() => {
		fetchStoreList()
	}, [])

	return isDefaultAccess ? (
		<section className="relative w-full" {...props}>
			<OfferHeader />
			<Header />
			<Outlet {...props} />
			<Booking />
			<Footer />
		</section>
	) : (
		<NotFound />
	)
}

export default PublicLayout
