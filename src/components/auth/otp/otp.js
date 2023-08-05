import React, { useState } from 'react'
import OtpInput from 'react-otp-input'
import Icons from '../../../shared/Icons'
import IconButton from '../../../shared/Buttons/IconButton'
import Heading from '../../../shared/heading/Heading'
import Form from '../../../shared/forms/Form'
import {
	classNames,
	decodeToken,
	isTokenActivated
} from '../../../utils/helper'
import Button from '../../../shared/Buttons/Button'
import LinkButton from '../../../shared/Buttons/LinkButton'
import { useDispatch, useSelector } from 'react-redux'
import { validation } from '../../../utils/validation'
import { otpVerificationWithRegister } from '../../../api/api'
import { setAuthKey, setLoggedUser } from '../../../redux/action'
import useHistory from '../../../hooks/useHistory'
import { setDataFromLocal } from '../../../utils/localStorage'
import { enqueueSnackbar } from 'notistack'

const Otp = ({ isLoginRoute, ...props }) => {
	const history = useHistory()
	const authSession = useSelector(({ authSteps }) => authSteps?.user_registation)
	const dispatch = useDispatch()
	const [otp, setOtp] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleLogin = (data) => {
		if (isTokenActivated(data?.token)) {
			setDataFromLocal('token', data?.token)
			history('/')
		}
	}

	const handleOtpVerification = async (isLogin) => {
		setLoading(true)
		try {
			const payload = {
				countryCode: authSession?.countryCode,
				phoneNumber: authSession?.phoneNumber,
				email: authSession?.email,
				password: authSession?.password,
				otp: authSession?.otp
			}

			const response = isLogin ? await otpVerificationWithRegister(payload) : await otpVerificationWithRegister(payload)

			if(response?.data){
				const { data } = response?.data
				setLoading(false)
				enqueueSnackbar(response?.data?.message, {
					variant: 'success'
				})
				!isLogin && dispatch(setAuthKey('terms_condition'))
				isLogin && dispatch(
					setLoggedUser({
						token: data?.token,
						isLogged: isTokenActivated(data?.token),
						user: decodeToken(data?.token)
					})
				)
				isLogin && handleLogin(response?.data)
			}

		} catch (error) {
			setLoading(false)
			if (error?.response?.data) {
				enqueueSnackbar(error?.response?.data?.data?.['otp']?.[0], {
					variant: 'error'
				})
			}
			return error
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		let error = {}
		Object.keys({ otp }).forEach(val => {
			const message = validation(val, otp, authSession?.otp)
			if (message) { error[val] = message }
		})
		if (Object.keys(error).length) {
			setError({ ...error, ...error })
			return
		}

		await handleOtpVerification(isLoginRoute)
	}


	const handleChange = (val) => {
		setOtp(val)
		setError(validation('otp', val, authSession?.otp))
	}

	return (
		<div
			className="relative w-full px-4 sm:px-[80px] h-[calc(100vh-92px)] flex items-center justify-center"
			{...props}
		>
			<IconButton className="absolute left-4 top-4 bg-cultured rounded-[48px] p-4 sm:top-[80px] sm:left-[80px]">
				<Icons id="left" />
			</IconButton>
			<div className="flex justify-center items-center">
				<div className="px-2 sm:px-1 w-full xs:w-[375px] sm:w-[400px]">
					<Heading
						headClass="text-black"
						{...{
							tag: 'head_4',
							text: `Enter the 4-digit code sent to you at${authSession?.phone_number?.masked}.`
						}}
					/>
					<Form className="mt-8" handleSubmit={handleSubmit}>
						<div>
							<OtpInput
								containerStyle="justify-between w-full xs:w-[350px] sm:w-[392px]"
								value={otp}
								onChange={handleChange}
								numInputs={4}
								inputType="number"
								inputStyle={classNames(
									'appearance-none py-[10px] sm:py-[18px] border !w-[60px] sm:!w-[74px] text-black text-[24px] px-2 rounded-[12px] bg-cultured focus: outline-none',
									error ? 'border-red' : 'border-cultured'
								)}
								renderInput={(props) => (
									<input className="text-black appearance-none" {...props} />
								)}
							/>
							<Heading
								tag="head_6"
								headClass={classNames(
									'text-[18px] text-red text-center mt-4',
									error ? '' : 'text-white'
								)}
								text={error ? 'Invalid OTP.' : 'Success'}
							/>
							<Button
								size="large"
								label={loading ? 'Please wait' : 'Next'}
								disabled={loading}
								type="submit"
								btnClass="w-full mt-[40px]"
								apperianceType="primary"
							/>
							<p className="text-center text-gray1 text-[16px] leading-[24px] mt-6">
								I didn’t receive a code (0:08)
							</p>
							<LinkButton
								{...{ label: 'Resend' }}
								className="text-[#2873E4] text-lg font-medium text-center cursor-pointer"
							/>
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default Otp
