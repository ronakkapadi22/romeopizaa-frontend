import React, { useState } from 'react'
import Heading from '../../shared/heading/Heading'
import Form from '../../shared/forms/Form'
import FieldGroup from '../../shared/forms/FieldGroup'
import Input from '../../shared/forms/Input'
import Button from '../../shared/Buttons/Button'
import { validation } from '../../utils/validation'
import { updatePassword } from '../../api/api'
import { enqueueSnackbar } from 'notistack'

const initialState = {
	old_password: '',
	new_password: '',
	confirm_password: ''
}

const Security = ({ ...props }) => {
	const [security, setSecurity] = useState(initialState)
	const [error, setError] = useState(initialState)
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(initialState)

	const handleChange = (e) => {
		const { name, value } = e.target
		setSecurity({ ...security, [name]: value })
		setError({...error, [name]: validation(name, value)})
	}

	const handleToggle = (name) => {
		setShowPassword({ ...showPassword, [name]: !showPassword[name] })
	}

	const handleCancel = () => {
		setError({})
		setSecurity(initialState)
	}

	const handleSubmit = async(e) => {
		e.preventDefault()
		try {
			let error = {}
            Object.keys(security).forEach(val => {
                const message = validation(val, security[val])
                if (message) { error[val] = message }
            })
            if (Object.keys(error).length) {
                setError({ ...error, ...error })
                return
            }
			setLoading(true)
			const response = await updatePassword({
				old_password: security.old_password,
				new_password: security.new_password
			})

			if(response?.data){
				setLoading(false)
				enqueueSnackbar(response?.data?.message, {
					variant: 'success'
				})
				setSecurity(initialState)
			}

		} catch (error) {
			setLoading(false)
			enqueueSnackbar(error?.response?.data?.message || 'somthing went wrong', {
				variant: 'error'
			})
		}
	}

	return (
		<div className="w-full py-3 md:py-7 px-4 md:px-12 mb-16 md:mb-0" {...props}>
			<Heading
				tag="head_3"
				headClass="font-semibold text-2xl md:text-[32px]"
				text="Security"
			/>
			<Form
				className="mt-6 md:mt-12 w-full mb-6 md:mb-0"
				handleSubmit={handleSubmit}
			>
				<FieldGroup label="Old Password" className="mb-4">
					<Input
						{...{
							name: 'old_password',
							value: security.old_password,
							type: showPassword['old_password'] ? 'text' : 'password',
							placeholder: 'Enter Password',
							onChange: handleChange,
							className: 'sm:min-w-full',
							error: error['old_password'],
							withLastIcon: true,
							icon: showPassword['old_password'] ? 'show':'hide',
							handleToggle
						}}
					/>
				</FieldGroup>
				<FieldGroup label="New Password" className="mb-4">
					<Input
						{...{
							name: 'new_password',
							value: security.new_password,
							type: showPassword['new_password'] ? 'text' : 'password',
							placeholder: 'Enter New Password',
							onChange: handleChange,
							className: 'sm:min-w-full',
							error: error['new_password'],
							withLastIcon: true,
							icon: showPassword['new_password'] ? 'show':'hide',
							handleToggle
						}}
					/>
				</FieldGroup>
				<FieldGroup label="Confirm Password" className="mb-4">
					<Input
						{...{
							name: 'confirm_password',
							value: security.confirm_password,
							type: showPassword['confirm_password'] ? 'text' : 'password',
							placeholder: 'Enter Password',
							onChange: handleChange,
							className: 'sm:min-w-full',
							error: error['confirm_password'],
							withLastIcon: true,
							icon: showPassword['confirm_password'] ? 'show':'hide',
							handleToggle
						}}
					/>
				</FieldGroup>
				<div className="flex mt-8 md:mt-0">
					<Button
						btnClass="md:mt-[40px] w-1/2 md:w-auto mr-4 px-8 md:px-[36px] lg:px-[54px]"
						type="submit"
						label={loading ? "Please wait" : "Save"}
						size="large"
						disabled={loading}
						apperianceType="primary"
					/>
					<Button
						btnClass="md:mt-[40px] w-1/2 md:w-auto md:px-[36px] lg:px-[54px]"
						type="button"
						label="Cancel"
						onClick={handleCancel}
						size="large"
						apperianceType="secondary"
					/>
				</div>
			</Form>
		</div>
	)
}

export default Security
