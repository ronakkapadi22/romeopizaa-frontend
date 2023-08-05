import React, { Suspense, useCallback, useEffect } from 'react'
import Routing from './routes/routing'
import { isTokenActivated } from './utils/helper'
import { clearDataFromLocal, getDataFromLocal } from './utils/localStorage'
import { setLogOutUser, setLoggedUser } from './redux/action'
import { useDispatch } from 'react-redux'
import { enqueueSnackbar } from 'notistack'
import { getProfileDetails } from './api/api'

const App = () => {
	const dispatch = useDispatch()
	const token = getDataFromLocal('token')

	const fetchProfileData = useCallback(async () => {
		try {
			const response = await getProfileDetails({})
			if (response?.data) {
				dispatch(setLoggedUser({
					token,
					isLogged: isTokenActivated(token),
					user: {...response?.data?.data}
				}))
			}
		} catch (error) {
			enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong', {
				variant: 'error'
			})
			return error
		}
	})

	useEffect(() => {
		const isTokenActive = isTokenActivated(token)
		if (!isTokenActive) {
			clearDataFromLocal()
			dispatch(setLogOutUser({}))
		} else {
			return fetchProfileData()
		}
	}, [token])

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<Routing />
		</Suspense>
	)
}

export default App
