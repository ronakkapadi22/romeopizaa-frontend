import React, { useCallback, useEffect, useState } from 'react'
import Heading from '../../../shared/heading/Heading'
import DatePicker from '../../../shared/forms/DatePicker'
import TimePicker from '../../../shared/forms/TimePicker'
import Input from '../../../shared/forms/Input'
import FieldGroup from '../../../shared/forms/FieldGroup'
import Button from '../../../shared/Buttons/Button'
import { validation } from '../../../utils/validation'
import CountrySelector from '../../../shared/coutry-selector'
import Selector from '../../../shared/forms/Selector'
import { enqueueSnackbar } from 'notistack'
import { createTableBooking, getBookingTables } from '../../../api/api'
import { useSelector } from 'react-redux'
import Form from '../../../shared/forms/Form'
import moment from 'moment'

const initialState = {
	name: '',
	person: 1,
	selectedTable: '',
	phoneNumber: '',
	countryCode: '+44',
	country: 'gb',
	date: new Date(),
	time: new Date()
}

const TableBooking = ({ ...props }) => {
	const { storeDetail } = useSelector((store) => store?.store)
	const storeConfig = useSelector(({ storeConfig }) => storeConfig)
	const [loading, setLoading] = useState(false)
	const [tableBooking, setTableBooking] = useState(initialState)
	const [tableList, setTableList] = useState([])
	const [error, setError] = useState({})

	const fetchTableList = useCallback(async () => {
		try {
			const response = await getBookingTables({
				storeId: storeConfig?.storeId
			})
			if (response?.data) {
				setTableList(response?.data?.data)
			}
		} catch (error) {
			if (error?.response?.data) {
				enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong.', {
					variant: 'error'
				})
			}
			return error
		}
	}, [storeDetail])

	useEffect(() => {
		fetchTableList()
	}, [storeDetail?.data?.id])

	const
		handleChange = (e) => {
			const { name, value } = e.target
			const newVal = name !== 'phoneNumber' ? value : `${tableBooking.countryCode}${value}`
			setTableBooking({
				...tableBooking,
				[name]: name !== 'phoneNumber' ? value : value?.length > 11 ? tableBooking.phoneNumber : value,
				person: newVal > 10 ? tableBooking.person : newVal
			})
			setError({ ...error, [name]: validation(name, newVal) })
		}

	const handleCoutryCode = (value) => {
		setTableBooking({
			...tableBooking,
			countryCode: value?.code
		})
		setError({
			...error, 'phoneNumber': validation('phoneNumber', `${value?.code}${tableBooking.phoneNumber}`)
		})
	}

	const generateTableBooking = useCallback(async () => {
		setLoading(true)
		try {
			const payload = {
				storeId: storeConfig?.storeId,
				tableId: Number(tableBooking?.selectedTable),
				name: tableBooking.name,
				person: String(tableBooking.person),
				phoneNumber: String(tableBooking.countryCode + tableBooking.phoneNumber),
				date: moment(tableBooking.date).format('DD/MM/YYYY'),
				time: moment(tableBooking.time).format('hh:mm A')
			}

			const response = await createTableBooking(payload)
			if (response?.data) {
				setLoading(false)
				enqueueSnackbar(response?.data?.message, {
					variant: 'success'
				})
				setTableBooking(initialState)
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
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		let error = {}
		const { person, phoneNumber, countryCode, selectedTable, date, name, time } = tableBooking
		Object.keys({ person, phoneNumber, countryCode, selectedTable, date, name, time }).forEach((val) => {
			const newVal = val !== 'phoneNumber' ? tableBooking[val] : `${countryCode}${tableBooking[val]}`
			const message = validation(val, newVal)
			if (message) {
				error[val] = message
			}
		})
		if (Object.keys(error).length) {
			setError({ ...error, ...error })
			return
		}
		await generateTableBooking()
	}

	return (
		<div
			{...props}
			className="shadow-[0_2px_12px_0px_rgba(0,0,0,0.3)] col-span-12 lg:col-span-5 py-[44px] px-6 md:px-[30px] rounded-md bg-white"
		>
			<Heading
				tag="head_3"
				headClass="mb-[22px] md:mb-[40px] text-2xl md:text-[32px]"
				text="Book a table"
			/>
			<Form handleSubmit={handleSubmit} className='grid grid-cols-6 gap-x-4 md:gap-x-10 lg:gap-x-6 gap-y-4' >
				<FieldGroup label="Select Table" className="mb-4 col-span-6 sm:col-span-3">
					<Selector
						{...{
							className: '!min-w-full',
							name: 'selectedTable',
							value: tableBooking.selectedTable,
							type: 'select',
							placeholder: 'Choose table',
							options: tableList?.map(({ id, seatingCapacity, shapeType }) => ({ id, label: `${shapeType} (${seatingCapacity})`, value: id })),
							onChange: handleChange,
							error: error['selectedTable']
						}}
					/>
				</FieldGroup>
				<FieldGroup label="Name" className="mb-4 col-span-6 sm:col-span-3 ">
					<Input
						{...{
							className: '!min-w-full',
							name: 'name',
							value: tableBooking.name,
							type: 'text',
							placeholder: 'John Doe',
							onChange: handleChange,
							error: error['name']
						}}
					/>
				</FieldGroup>
				<FieldGroup label="Person" className="mb-4 col-span-6 sm:col-span-2 lg:col-span-6 xl:col-span-2">
					<Input className='!min-w-full' inputClass='!min-w-full'
						{...{
							name: 'person',
							value: tableBooking.person,
							type: 'number',
							placeholder: '2 Person',
							onChange: handleChange,
							error: error['person']
						}}
					/>
				</FieldGroup>
				<FieldGroup label="Phone Number" className="mb-4 col-span-6 sm:col-span-4 lg:col-span-6 xl:col-span-4">
					<div className='flex' >
						<CountrySelector
							{...{
								handleChange: handleCoutryCode,
								defaultValue: { coutry: tableBooking.country, code: tableBooking.countryCode }
							}}
							className="w-[100px] mr-2"
						/>
						<Input inputClass='w-full'
							className="sm:!min-w-[200px]"
							maxLength={11}
							type="number"
							placeholder="Enter Phone Number"
							name="phoneNumber"
							value={tableBooking.phoneNumber}
							onChange={handleChange}
							error={error['phoneNumber']}
						/>
					</div>
				</FieldGroup>
				<TimePicker
					className="w-full mb-4 col-span-6 sm:col-span-3"
					{...{
						timeFormat: 'h:i K',
						value: tableBooking.time,
						label: 'Time',
						name: 'time',
						handleChange
					}}
				/>
				<DatePicker
					className="w-full mb-4 col-span-6 sm:col-span-3"
					{...{
						dateFormat: 'd/m/Y',
						value: tableBooking.date,
						label: 'Date',
						name: 'date',
						handleChange,
						error: error['date']
					}}
				/>
				<Button
					btnClass="w-full mt-[20px] col-span-6"
					type="submit"
					label={loading ? "Please wait" : "Book a table"}
					size="large"
					disabled={loading}
					apperianceType="primary"
				/>
			</Form>
		</div>
	)
}

export default TableBooking
