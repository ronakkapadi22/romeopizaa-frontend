import React, { useEffect, useState } from 'react'
import Heading from '../../shared/heading/Heading'
import Form from '../../shared/forms/Form'
import Button from '../../shared/Buttons/Button'
import FieldGroup from '../../shared/forms/FieldGroup'
import Input from '../../shared/forms/Input'
import FileUpload from '../../shared/forms/FileUpload'
import CountrySelector from '../../shared/coutry-selector'
import { validation } from '../../utils/validation'
import { enqueueSnackbar } from 'notistack'
import { getProfileDetails } from '../../api/api'

const initialState = {
	profile: '',
	name: '',
	email: '',
	contact: '',
	code: '+91',
	coutry: ''
}

const Account = ({ ...props }) => {
	const [profile, setProfile] = useState(null)
	const [account, setAccount] = useState(initialState)
	const [error, setError] = useState(initialState)

	const handleChange = (e) => {
		const { name, value, files, type } = e.target
		const newVal = name !== 'contact' ? value : `${account.code}${value}`
		setAccount({ ...account, [name]: type === 'file' ? files[0] : value })
		setError({ ...error, [name]: validation(name, newVal) })

		if (type === 'file') {
			const fileReader = new FileReader()
			fileReader.onload = (e) => {
				const { result } = e.target
				setProfile(result)
			}
			fileReader.readAsDataURL(files[0])
		}
	}

	const getProfileData = async() => {
		try {
			const response = await getProfileDetails({})
			if(response?.data){
				const { data } = response?.data
				setAccount({
					...account, name: data?.fullname?.trim(),
					code: '+'+data?.countryCode,
					contact: data?.phoneNumber,
					email: data?.email,
					profile: data?.profilepath

				})
			}
		} catch (error) {
			enqueueSnackbar(error?.response?.message || 'Somthing went wrong', {
				variant: 'error'
			})
		}
	}

	useEffect(() => {
		getProfileData()
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		try {
			let error = {}
            Object.keys(account).forEach(val => {
				const newVal = val !== 'contact' ? account[val] : `${account.code}${account[val]}`
                const message = validation(val, newVal)
                if (message) { error[val] = message }
            })
            if (Object.keys(error).length) {
                setError({ ...error, ...error })
                return
            }
		} catch (error) {
			
		}
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
							placeholder: 'Darlene Robertson',
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
								placeholder: '9876543210',
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
							placeholder: 'darlenerobertson@gmail.com',
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
						label="Update"
						size="large"
						apperianceType="primary"
					/>
					<Button
						btnClass="md:mt-[40px] w-1/2 md:w-auto md:px-[36px] lg:px-[54px]"
						type="button"
						label="Cancel"
						size="large"
						apperianceType="secondary"
					/>
				</div>
			</Form>
		</div>
	)
}

export default Account
