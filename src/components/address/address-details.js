import React, { useCallback, useEffect, useState } from 'react'
import Heading from '../../shared/heading/Heading'
import Icons from '../../shared/Icons'
import Form from '../../shared/forms/Form'
import FieldGroup from '../../shared/forms/FieldGroup'
import Input from '../../shared/forms/Input'
import { coutryResponse, newAndUpdateAddress } from '../../api/api'
import { enqueueSnackbar } from 'notistack'
import Button from '../../shared/Buttons/Button'
import { validation } from '../../utils/validation'
import { useSelector } from 'react-redux'
import CountryList from '../../shared/coutry-selector/CoutryList'

const initialState = {
	addressName: '',
	streetName: '',
	locality: '',
	country: 'United Kingdom',
	postCode: '',
	type: 'BILLING'
}

const AddressDetails = ({ handleClose }) => {
	const customer = useSelector(({ auth }) => auth?.user)
	const address = useSelector(({address}) => address)
	const [formData, setFormData] = useState(initialState)
	const [country, setCoutry] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState({})

	const getCoutryCode = useCallback(async () => {
		try {
			const response = await coutryResponse()
			if (response) {
				setCoutry(response)
			}
		} catch (error) {
			enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong', {
				variant: 'error'
			})
			return error
		}
	}, [])

	useEffect(() => {
		getCoutryCode()
	}, [])

	useEffect(() => {
		address?.isEdit && setFormData(address?.current_address)
	}, [address?.isEdit])

	const handleChange = (e) => {
		const { name, value } = e.target
		const val = name !== 'postCode' ? value : value?.length > 8 ? formData.postCode : String(value).split('').map(i => i.toUpperCase()).join('')
		setFormData({
			...formData, [name]: val
		})
		setError({
			...error, [name]: validation(name, val)
		})
	}

	const submitAddress = async() => {
		try {
			const payload = {
				...formData, customerId: customer?.id
			}
			const response = await newAndUpdateAddress(payload)
			if(response?.data){
				setLoading(false)
				handleClose('address')
				enqueueSnackbar(response?.data?.message, {
					variant: 'success'
				})
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

	const handleSubmit = async(e) => {
		e.preventDefault()
		let error = {}
		Object.keys(formData).forEach((val) => {
			const message = validation(val, formData[val])
			if (message) {
				error[val] = message
			}
		})
		if (Object.keys(error).length) {
			setError({ ...error, ...error })
			return
		}

		if(customer){
			return await submitAddress()
		}
		handleClose('address', {login: true})
	}

	const addressData = [
		{
			id: 'addressName',
			name: 'addressName',
			value: formData.addressName,
			onChange: handleChange,
			placeholder: 'Customer Name',
			type: 'text',
			error: error['addressName'],
			className: 'col-span-12 md:col-span-6',
			isHideLabel: true,
			isHideError: true
		},
		{
			id: 'streetName',
			name: 'streetName',
			value: formData.streetName,
			onChange: handleChange,
			placeholder: 'Block / Flat / Street',
			type: 'text',
			error: error['streetName'],
			className: 'col-span-12 md:col-span-6',
			isHideLabel: true,
			isHideError: true
		},
		{
			id: 'postCode',
			name: 'postCode',
			value: formData.postCode,
			onChange: handleChange,
			placeholder: 'Post Code',
			type: 'text',
			error: error['postCode'],
			className: 'col-span-12 md:col-span-6',
			isHideLabel: true,
			isHideError: true
		},
		{
			id: 'locality',
			name: 'locality',
			value: formData.locality,
			onChange: handleChange,
			placeholder: 'City / State',
			type: 'text',
			error: error['locality'],
			className: 'col-span-12 md:col-span-6',
			isHideLabel: true,
			isHideError: true
		}
	]

	return (
		<div className="relative w-[96%] md:w-[678px] lg:w-[845px] p-8 mx-auto rounded-lg bg-white">
			<div className="w-full flex justify-between items-center">
				<Heading
					tag="head_3"
					headClass="text-2xl lg::text-[32px]"
					text="Delivery address"
				/>
				<Icons id="close" className="cursor-pointer" onClick={() => handleClose('address')} />
			</div>
			<Form className="grid gap-6 grid-cols-12 mt-4" handleSubmit={handleSubmit} >
				{addressData?.map(
					({ id, className, type, isHideError, isHideLabel, ...other }) => (
						<FieldGroup key={id} {...{ isHideError, isHideLabel, className }}>
							<Input className="!min-w-full" {...{ type }} {...other} />
						</FieldGroup>
					)
				)}
				<FieldGroup isHideError isHideLabel {...{ className: 'col-span-12 md:col-span-6' }}>
					<CountryList className="!min-w-full cursor-pointer" {...{
						id: 'country',
						name: 'country',
						value: formData.country,
						handleChange: handleChange,
						placeholder: 'Country',
						type: 'select',
						error: error['country'],
						option: country?.map(({ caa2, name }) => ({ id: caa2, label: name?.common, value: name?.common })).
							sort((a, b) => (a.label < b.label ? -1 : a.label > b.label ? 1 : 0))
					}} />
				</FieldGroup>
				<div className='col-span-12 md:col-span-6' >
					<Button
						btnClass="w-full"
						type="submit"
						label={loading ? 'Please wait' : 'Save'}
						size="large"
						apperianceType="primary"
					/>
				</div>
			</Form>
		</div>
	)
}

export default AddressDetails