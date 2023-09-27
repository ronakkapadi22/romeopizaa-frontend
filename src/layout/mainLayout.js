import React, { useCallback, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import withUser from '../hoc/withUser'
import { useDispatch, useSelector } from 'react-redux'
import { addressList, storeList } from '../api/api'
import { getAllAddressList, setStoreData } from '../redux/action'
import { enqueueSnackbar } from 'notistack'

const PrivateLayout = ({ ...props }) => {

	const customer = useSelector(({ auth }) => auth?.user)
	const storeConfig = useSelector(({ storeConfig }) => storeConfig)

	const dispatch = useDispatch()
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

	useEffect(() => {
		fetchStoreList()
	}, [])

	const fetchAddress = useCallback(async () => {
		try {
			const response = await addressList({
				customerId: customer?.id
			})
			if (response?.data) {
				dispatch(getAllAddressList(response?.data?.data || []))
			}
		} catch (error) {
			if (error?.response?.data?.message === 'No record found.') {
				dispatch(getAllAddressList([]))
				return
			}
			return error
		}
	}, [customer, dispatch])


	useEffect(() => {
		customer && fetchAddress()
	}, [customer])

	return <section className="w-full h-full" {...props}>
		{/* {topbar} */}
		<WithAuthenticatedOutlet {...props} replace {...{ to: '/' }} />
	</section>
}
export default PrivateLayout

const WithAuthenticatedOutlet = withUser(Outlet, Navigate)
