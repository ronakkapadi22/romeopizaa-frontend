import React, { Fragment, useCallback, useEffect } from 'react'
import { Outlet } from 'react-router'
import Header from '../components/home/navbar/header'
import OfferHeader from '../components/elements/offer-header/OfferHeader'
import { useDispatch, useSelector } from 'react-redux'
import { enqueueSnackbar } from 'notistack'
import { getAllAddressList, setStoreData } from '../redux/action'
import { addressList, storeList } from '../api/api'

const OnlyRenderLayout = ({ isShowHeader, ...props }) => {

	const dispatch = useDispatch()
	const customer = useSelector(({ auth }) => auth?.user)
    const storeConfig = useSelector(({storeConfig}) => storeConfig)

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

	const fetchAddress = useCallback(async() => {
		try {
			const response = await addressList({
				customerId: customer?.id
			})
			if (response?.data) {
				dispatch(getAllAddressList(response?.data?.data || []))
			}
		} catch (error) {
			if(error?.response?.data?.message === 'No record found.'){
				dispatch(getAllAddressList([]))
				return
			}
			enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong.', {
				variant: 'error'
			})
			return error
		}
	}, [customer, dispatch])


	useEffect(() => {
		customer && fetchAddress()
	}, [customer])

	useEffect(() => {
		fetchStoreList()
	}, [])

	return (
		<section className="relative w-full" {...props}>
			<div>
				{isShowHeader ? <Fragment>
					<OfferHeader />
					<Header />
				</Fragment> : null}
				<Outlet {...props} />
			</div>
		</section>
	)
}

export default OnlyRenderLayout
