import React, { useCallback, useEffect, useState } from 'react'
import Heading from '../../shared/heading/Heading'
import Form from '../../shared/forms/Form'
import Button from '../../shared/Buttons/Button'
import FieldGroup from '../../shared/forms/FieldGroup'
import Input from '../../shared/forms/Input'
import FileUpload from '../../shared/forms/FileUpload'
import CountrySelector from '../../shared/coutry-selector'
import { validation } from '../../utils/validation'
import { enqueueSnackbar } from 'notistack'
import { getProfileDetails, updateProfile } from '../../api/api'
import { useSelector } from 'react-redux'

const initialState = {
	profile: null,
	name: '',
	email: '',
	contact: '',
	code: '+44',
	coutry: 'gb'
}

const Account = ({ ...props }) => {
	const { user } = useSelector(({auth}) => auth)
	const [profile, setProfile] = useState(null)
	const [account, setAccount] = useState(initialState)
	const [reset, setReset] = useState(initialState)
	const [error, setError] = useState(initialState)
	const [loading, setLoading] = useState(false)

	console.log('error', error)

	const handleChange = (e) => {
		const { name, value, files, type } = e.target
		const newVal = name !== 'contact' ? value : `${account.code}${value}`
		setAccount({ ...account, [name]: type === 'file' ? files[0] : name !== 'contact' ? value : value?.length > 11 ? account.contact : value }) 
		setError({ ...error, [name]: validation(name, newVal, {phone: account?.contact}) })

		if (type === 'file') {
			const fileReader = new FileReader()
			fileReader.onload = (e) => {
				const { result } = e.target
				setProfile(result)
			}
			fileReader.readAsDataURL(files[0])
		}
	}

	const handleReset = useCallback(() => {
		setAccount({...reset})
		setProfile(user?.profilepath || '')
	}, [reset, user])

	const getProfileData = async () => {
		try {
			const response = await getProfileDetails({})
			if (response?.data) {
				const { data } = response?.data
				setAccount({
					...account, name: data?.fullname?.trim(),
					code: String(data?.countryCode).includes('+') ? data?.countryCode  : '+' + data?.countryCode,
					contact: data?.phoneNumber,
					email: data?.email
				})
				setReset({
					...reset, name: data?.fullname?.trim(),
					code: String(data?.countryCode).includes('+') ? data?.countryCode  : '+' + data?.countryCode,
					contact: data?.phoneNumber,
					email: data?.email
				})
				setProfile(data?.profilepath || '')
			}
		} catch (error) {
			enqueueSnackbar(error?.response?.message || 'Somthing went wrong', {
				variant: 'error'
			})
			return error
		}
	}

	useEffect(() => {
		getProfileData()
	}, [])
	
	const updateProfilePage = async() => {
		setLoading(true)
		try {
			const formData = new FormData()
			account.name.split(' ').forEach((val, index) => {
				index === 0 && formData.append('fName', val)
				index === 1 && formData.append('lName', val)
			})
			formData.append('email', account.email)
			formData.append('phoneNumber', account.contact)
			formData.append('profile_old', user?.profile)
			formData.append('countryCode', account.code)
			console.log('account.profile', account.profile)
			if(account.profile){
				formData.append('profile', account.profile)
			}

			const response = await updateProfile(formData)
			if(response?.data){
				setLoading(false)
				enqueueSnackbar(response?.data?.message, {
					variant: 'success'
				})
			}

		} catch (error) {
			console.log('error', error)
			setLoading(false)
			if (error?.response?.data) {
				enqueueSnackbar(error?.response?.data?.data?.['phoneNumber']?.[0] || error?.response?.data?.data?.['email']?.[0], {
					variant: 'error'
				})
			}
			return error
		}
	}

	const handleSubmit = async(e) => {
		e.preventDefault()
		let error = {}
		// eslint-disable-next-line no-unused-vars
		const { profile, coutry, code, ...other } = account
		Object.keys({...other}).forEach(val => {
			const newVal = val !== 'contact' ? account[val] : `${code}${account[val]}`
			console.log('newVal', newVal)
			const message = validation(val, newVal)
			if (message) { error[val] = message }
		})
		if (Object.keys(error).length) {
			setError({ ...error, ...error })
			return
		}
		await updateProfilePage()
	}

	const handleCoutryCode = (value) => {
		setAccount({
			...account,
			code: value?.code
		})
		setError({
			...error, contact: validation('contact', `${value?.code}${account.contact}`)
		})
	}

	return (
		<div className="w-full py-3 md:py-7 px-4 md:px-12 mb-16 md:mb-0" {...props}>
			<Heading
				tag="head_3"
				headClass="font-semibold text-2xl md:text-[32px]"
				text="Account Info"
			/>
			<Form
				className="mt-6 md:mt-12 w-full mb-6 md:mb-0"
				handleSubmit={handleSubmit}
			>
				<FileUpload
					{...{ name: 'profile', handleChange, image: profile }}
					className="mb-8"
				/>
				<FieldGroup label="Name" className="mb-4">
					<Input
						{...{
							name: 'name',
							value: account.name,
							type: 'text',
							placeholder: 'Full Name',
							onChange: handleChange,
							className: 'sm:min-w-full',
							error: error['name']
						}}
					/>
				</FieldGroup>
				<FieldGroup label="Phone Number" className="mb-4">
					<div className="w-full flex items-center">
						<CountrySelector
							{...{
								handleChange: handleCoutryCode,
								defaultValue: { coutry: account.coutry, code: account.code }
							}}
							className="w-[100px] mr-2"
						/>
						<Input
							{...{
								name: 'contact',
								value: account.contact,
								type: 'number',
								placeholder: 'Phone Number',
								onChange: handleChange,
								className: 'sm:min-w-full',
								error: error['contact'],
								inputClass: 'w-full'
							}}
						/>
					</div>
				</FieldGroup>
				<FieldGroup label="Email" className="mb-4">
					<Input
						{...{
							name: 'email',
							value: account.email,
							type: 'email',
							placeholder: 'Email',
							onChange: handleChange,
							className: 'sm:min-w-full',
							error: error['email']
						}}
					/>
				</FieldGroup>
				<div className="flex mt-8 md:mt-0">
					<Button
						btnClass="md:mt-[40px] w-1/2 md:w-auto mr-4 px-8 md:px-[36px] lg:px-[54px]"
						type="submit"
						disabled={loading}
						label={loading ? "Loading":"Update"}
						size="large"
						apperianceType="primary"
					/>
					<Button
						btnClass="md:mt-[40px] w-1/2 md:w-auto md:px-[36px] lg:px-[54px]"
						type="button"
						label="Cancel"
						onClick={() => handleReset()}
						size="large"
						apperianceType="secondary"
					/>
				</div>
			</Form>
		</div>
	)
}

export default Account
