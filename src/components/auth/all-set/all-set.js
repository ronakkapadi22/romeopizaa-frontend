import React, { useState } from 'react'
import Icons from '../../../shared/Icons'
import IconButton from '../../../shared/Buttons/IconButton'
import Heading from '../../../shared/heading/Heading'
import allset from '../../../assets/images/all-set.png'
import Button from '../../../shared/Buttons/Button'
import { setDataFromLocal } from '../../../utils/localStorage'
import useHistory from '../../../hooks/useHistory'
import { enqueueSnackbar } from 'notistack'
import { deviceVerification } from '../../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedUser } from '../../../redux/action'
import { decodeToken, isTokenActivated } from '../../../utils/helper'

const AllSet = ({ ...props }) => {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const authSession = useSelector(({ authSteps }) => authSteps?.user_registation)
	const cartItems = useSelector(({ order }) => order?.cartItems)
	const history = useHistory()

	const handleOnBoard = async () => {
		setLoading(true)
		try {
			const response = await deviceVerification({ ...authSession })

			if (response?.data) {
				enqueueSnackbar(response?.data?.message, {
					variant: 'success'
				})
				const user = decodeToken(response?.data?.data?.token)
				dispatch(setLoggedUser({
					token: response?.data?.data?.token,
					isLogged: isTokenActivated(response?.data?.data?.token),
					user: { ...user, id: Number(user.sub) },
					isRedirectCartPage: !!cartItems?.length,
					...response?.data?.data
				}))
				setDataFromLocal('token', response?.data?.data?.token)
				setLoading(false)
				history('/')
			}

		} catch (error) {
			setLoading(false)
			enqueueSnackbar(error?.response?.message || 'Somthing went wrong.', {
				variant: 'error'
			})
		}
	}

	return (
		<div
			{...props}
			className="relative w-full px-4 sm:px-[80px] h-[calc(100vh-92px)] flex items-center justify-center"
		>
			<IconButton className="absolute left-4 top-4 bg-cultured rounded-[48px] p-4 sm:top-[80px] sm:left-[80px]">
				<Icons id="left" />
			</IconButton>
			<div className="flex flex-col justify-center w-full xs:w-[400px]">
				<div className="flex justify-start items-center">
					<img src={allset} className="w-[64px] h-[64px]" />
					<Heading tag="head_4" headClass="font-[600] ml-4" text="All Set" />
				</div>
				<p className="my-8">
					{
						"You'll be signed in to your account in a moment. If nothing happens, click Continue."
					}
				</p>
				<hr className="text-light-gray" />
				<Button
					btnClass="w-full mt-[40px]"
					type="button"
					label={loading ? "Please wait" : "Continue"}
					size="large"
					disabled={loading}
					onClick={handleOnBoard}
					apperianceType="primary"
				/>
			</div>
		</div>
	)
}

export default AllSet
