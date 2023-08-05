import React, { useState } from 'react'
import Heading from '../../../shared/heading/Heading'
import DatePicker from '../../../shared/forms/DatePicker'
import TimePicker from '../../../shared/forms/TimePicker'
import Input from '../../../shared/forms/Input'
import FieldGroup from '../../../shared/forms/FieldGroup'
import Button from '../../../shared/Buttons/Button'

const initialState = {
	name: '',
	person: 1,
	date: new Date(),
	time: new Date()
}

const TableBooking = ({ ...props }) => {
	const [tableBooking, setTableBooking] = useState(initialState)

	const handleChange = (e) => {
		const { name, value } = e.target
		setTableBooking({
			...tableBooking,
			[name]: value
		})
	}

	return (
		<div
			{...props}
			id="table-booking"
			className="shadow-[0_2px_12px_0px_rgba(0,0,0,0.3)] col-span-12 lg:col-span-5 py-[44px] px-6 md:px-[44px] rounded-md bg-white"
		>
			<Heading
				tag="head_3"
				headClass="mb-[22px] md:mb-[40px] text-2xl md:text-[32px]"
				text="Book a table"
			/>
			<FieldGroup label="Name" className="mb-4">
				<Input
					{...{
						name: 'name',
						value: tableBooking.name,
						type: 'text',
						placeholder: 'John Doe',
						onChange: handleChange
					}}
				/>
			</FieldGroup>
			<FieldGroup label="Person" className="mb-4">
				<Input
					{...{
						name: 'person',
						value: tableBooking.person,
						type: 'number',
						placeholder: '2 Person',
						onChange: handleChange
					}}
				/>
			</FieldGroup>
			<div className="flex flex-col sm:flex-row justify-between items-center">
				<DatePicker
					className="w-full sm:w-[48%] mb-4 sm:mb-0"
					{...{
						dateFormat: 'd/m/Y',
						value: tableBooking.date,
						label: 'Date',
						name: 'date',
						handleChange
					}}
				/>
				<TimePicker
					className="w-full sm:w-[48%] mb-4 sm:mb-0"
					{...{
						timeFormat: 'h:i K',
						value: tableBooking.time,
						label: 'Time',
						name: 'time',
						handleChange
					}}
				/>
			</div>
			<Button
				btnClass="w-full mt-[34px]"
				type="submit"
				label="Book a table"
				size="large"
				apperianceType="primary"
			/>
		</div>
	)
}

export default TableBooking
