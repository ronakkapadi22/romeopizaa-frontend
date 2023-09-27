import React, { useState } from 'react'
import Input from '../../../shared/forms/Input'
import Button from '../../../shared/Buttons/Button'
import Form from '../../../shared/forms/Form'
import Heading from '../../../shared/heading/Heading'
import FieldGroup from '../../../shared/forms/FieldGroup'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedUser } from '../../../redux/action'
import { isTokenActivated } from '../../../utils/helper'
import { loginValidation } from '../../../utils/validation'
import { userLogin } from '../../../api/api'
import { enqueueSnackbar } from 'notistack'
import useHistory from '../../../hooks/useHistory'
import { setDataFromLocal } from '../../../utils/localStorage'

const initialState = {
	email: '',
	password: '',
	phoneNumber: '',
	countryCode: '+44',
	country: 'gb'
}

const Login = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState(initialState)
	const cartItems = useSelector(({ order }) => order?.cartItems)
	const [error, setError] = useState({})
	const [showPassword, setShowPassword] = useState({
        password: false
    })

    const handleToggle = () => {
        setShowPassword({
            password: !showPassword.password
        })
    }

	console.log('cartItems', cartItems)

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
		setError({
			...error, [name]: loginValidation(name, value)
		})
	}

	const handleInitialAuth = async () => {
		setLoading(true)
		try {
			const payload = {
				email: formData.email,
				password: formData.password
			}
			const response = await userLogin(payload)
			if (response?.data) {
				setLoading(false)
				enqueueSnackbar(response?.data?.message, {
					variant: 'success'
				})
				dispatch(setLoggedUser({
					token: response?.data?.data?.token,
					isLogged: isTokenActivated(response?.data?.data?.token),
					user: {...response?.data?.data},
					isRedirectCartPage: !!cartItems?.length
				}))
				setDataFromLocal('token', response?.data?.data?.token)
			}
		} catch (error) {
			setLoading(false)
			if (error?.response?.data) {
				enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong.', {
					variant: 'error'
				})
			}
			return error
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		let error = {}
		Object.keys({ email: formData.email, password: formData.password }).forEach((val) => {
			const message = loginValidation(val, formData[val])
			if (message) {
				error[val] = message
			}
		})
		if (Object.keys(error).length) {
			setError({ ...error, ...error })
			return
		}
		await handleInitialAuth()
	}

	return (
		<div className="relative w-full px-4 sm:px-[80px] h-[calc(100vh-92px)] flex items-center justify-center">
			<div className="flex justify-center items-center">
				<div className="w-full sm:w-[400px]">
					<Heading
						headClass="text-black "
						{...{
							tag: 'head_4',
							text: 'Login with email and password.'
						}}
					/>
					<Form className="mt-8" handleSubmit={handleSubmit}>
						<FieldGroup errorClass='text-sm text-red' error={error['email']} label="Email" className="mb-4">
							<Input
								{...{
									name: 'email',
									value: formData.email,
									type: 'email',
									placeholder: 'Enter your email',
									onChange: handleChange,
									className: 'sm:min-w-full',
									error: error['email']
								}}
							/>
						</FieldGroup>
						<FieldGroup errorClass='text-sm text-red' error={error['password']} label="Password" className="mb-4">
							<Input
								{...{
									name: 'password',
									value: formData.password,
									type: showPassword['password'] ? 'text' : 'password',
									placeholder: 'Enter Password',
									onChange: handleChange,
									className: 'sm:min-w-full',
									error: error['password'],
									withLastIcon: true,
									icon: showPassword['password'] ? 'show' : 'hide',
									handleToggle
								}}
							/>
						</FieldGroup>
						<Button
							btnClass="w-full mt-[48px]"
							type="submit"
							label={loading ? 'Please wait' : 'Login'}
							size="large"
							disabled={loading}
							apperianceType="primary"
						/>
					</Form>
					<p className="text-center font-medium text-gray1">
						{"Don't have an account?"}
						<span
							onClick={() => history('/register')}
							className="cursor-pointer ml-1 text-black"
						>
							Register
						</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Login
