import React, { useEffect, useState } from 'react'
import Heading from '../../shared/heading/Heading'
import Icons from '../../shared/Icons'
import Form from '../../shared/forms/Form'
import Input from '../../shared/forms/Input'
import FieldGroup from '../../shared/forms/FieldGroup'
import { validation } from '../../utils/validation'
import Button from '../../shared/Buttons/Button'
import { cardFormatter, expDateFormatter } from '../../utils/helper'
import CountrySelector from '../../shared/coutry-selector'
import { useDispatch, useSelector } from 'react-redux'
import { addCard } from '../../redux/action'

const initialState = {
	first_name: '',
	last_name: '',
	phone: '',
	email: '',
	card_number: '',
	exp_date: '',
	cvv: ''
}

const CardDetails = ({ handleClose }) => {
	const [formData, setFormData] = useState(initialState)
	const cardDetail = useSelector(({ card }) => card)
	const dispatch = useDispatch()
	const [error, setError] = useState({})
	const [phoneData, setPhoneData] = useState({
		countryCode: '+44',
		country: 'gb'
	})

	const formatter = (name, value) => {
		if (name === 'card_number') return cardFormatter(value)
		if (name === 'exp_date') return expDateFormatter(value)
		if (name === 'cvv') {
			return value?.length <= 3 ? value : formData.cvv
		}
		return value
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		const newVal = name !== 'phone' ? formatter(name, value) : `${phoneData.countryCode}${value}`
		setFormData({
			...formData,
			[name]: formatter(name, value)
		})
		setError({
			...error,
			[name]: validation(name, formatter(name, newVal))
		})
	}

	const handleCoutryCode = (value) => {
		setPhoneData({
			...phoneData,
			countryCode: value?.code
		})
		setError({
			...error, 'phone': validation('phone', `${value?.code}${formData.phone}`)
		})
	}

	const cardData = [
		{
			id: 'first_name',
			name: 'first_name',
			value: formData.first_name,
			onChange: handleChange,
			placeholder: 'First Name',
			type: 'text',
			error: error['first_name'],
			className: 'col-span-12 md:col-span-6',
			isHideLabel: true,
			isHideError: true
		},
		{
			id: 'last_name',
			name: 'last_name',
			value: formData.last_name,
			onChange: handleChange,
			placeholder: 'Last Name',
			type: 'text',
			error: error['last_name'],
			className: 'col-span-12 md:col-span-6',
			isHideLabel: true,
			isHideError: true
		},
		{
			id: 'phone',
			name: 'phone',
			value: formData.phone,
			onChange: handleChange,
			placeholder: 'Phone Number',
			type: 'number',
			error: error['phone'],
			className: 'col-span-12 md:col-span-6',
			isHideLabel: true,
			isHideError: true
		},
		{
			id: 'email',
			name: 'email',
			value: formData.email,
			onChange: handleChange,
			placeholder: 'Email',
			type: 'email',
			error: error['email'],
			className: 'col-span-12 md:col-span-6',
			isHideLabel: true,
			isHideError: true
		},
		{
			id: 'card_number',
			name: 'card_number',
			value: formData.card_number,
			onChange: handleChange,
			placeholder: 'Card Number',
			type: 'text',
			error: error['card_number'],
			className: 'col-span-12',
			isHideLabel: true,
			isHideError: true
		},
		{
			id: 'exp_date',
			name: 'exp_date',
			value: formData.exp_date,
			onChange: handleChange,
			placeholder: 'MM/YY',
			type: 'text',
			error: error['exp_date'],
			className: 'col-span-12 md:col-span-6',
			isHideLabel: true,
			isHideError: true
		},
		{
			id: 'cvv',
			name: 'cvv',
			value: formData.cvv,
			maxlength: 3,
			onChange: handleChange,
			placeholder: 'CVV',
			type: 'number',
			error: error['cvv'],
			className: 'col-span-12 md:col-span-6',
			isHideLabel: true,
			isHideError: true
		}
	]

	useEffect(() => {
		// eslint-disable-next-line no-unused-vars
		const { isUpdated, ...data } = cardDetail
		isUpdated && setFormData({ ...data })
	}, [dispatch, cardDetail])

	const handleSubmit = (e) => {
		e.preventDefault()
		let error = {}
		Object.keys(formData).forEach(val => {
			const newVal = val !== 'phone' ? formData[val] : `${phoneData.countryCode}${formData[val]}`
			const message = validation(val, formatter(val, newVal))
			if (message) {
				error[val] = message
			}
		})
		if (Object.keys(error).length) {
			setError(error)
			return
		}

		dispatch(addCard({ ...formData, isUpdated: !!formData.card_number }))
		handleClose('payment')

	}

	return (
		<div className='className="relative w-[96%] md:w-[678px] lg:w-[845px] p-8 mx-auto rounded-lg bg-white'>
			<div className="w-full flex justify-between items-center">
				<Heading
					tag="head_3"
					headClass="text-2xl lg::text-[32px]"
					text="Card Details"
				/>
				<Icons id="close" className="cursor-pointer" onClick={() => handleClose('payment')} />
			</div>
			<Form handleSubmit={handleSubmit} className="grid gap-6 grid-cols-12 mt-4">
				{cardData?.map(
					({ id, className, isHideError, isHideLabel, ...other }) => (
						<FieldGroup key={id} {...{ isHideError, isHideLabel, className }}>
							{id === 'phone' ? <div className="w-full flex items-center">
								<CountrySelector
									{...{
										handleChange: handleCoutryCode,
										defaultValue: { coutry: phoneData.country, code: phoneData.countryCode }
									}}
									className="w-[100px] mr-2"
								/>
								<Input className="!min-w-full" inputClass="!w-full" {...other} />
							</div> : <Input className="!min-w-full" {...other} />}
						</FieldGroup>
					)
				)}
				<Button
					btnClass="w-full mt-[34px] col-span-12"
					type="submit"
					label={cardDetail?.isUpdated ? 'Update' : 'Submit'}
					size="large"
					apperianceType="primary"
				/>
			</Form>
		</div>
	)
}

export default CardDetails
