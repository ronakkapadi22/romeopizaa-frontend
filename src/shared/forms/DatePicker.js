import React from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/light.css'
import Icons from '../Icons'
import { classNames } from '../../utils/helper'

const CustomInput = ({ value, defaultValue, error, inputRef, ...props }) => {
	return (
		<div className="relative">
			<input
				className={classNames("w-full rounded-lg font-medium bg-cultured1 focus:border focus:border-gray1 placeholder:text-gray2 border border-cultured1 outline-none pl-12 pr-4 py-3",
					error
						? 'border border-[#DC2626] focus:!border-[#DC2626]'
						: 'border border-cultured1 focus:border-gray1')}
				{...props}
				{...{ value }}
				placeholder="10/06/2023"
				defaultValue={defaultValue}
				ref={inputRef}
			/>
			<Icons
				className="absolute top-[50%] left-4 translate-y-[-50%]"
				id="calender"
			/>
		</div>
	)
}

const DatePicker = ({
	className,
	value,
	name,
	label,
	error,
	isHideLabel,
	dateFormat,
	defaultValue,
	handleChange,
	...props
}) => {
	return (
		<div className={classNames(className)}>
			{!isHideLabel ? (
				<span className="text-black font-medium text-base mb-1">{label}</span>
			) : null}
			<Flatpickr
				{...props}
				defaultValue={defaultValue}
				onChange={(data) => handleChange({ target: { name, value: data[0] } })}
				value={value}
				options={{
					dateFormat,
					minDate: Date.now(),
					mode: 'single'
				}}
				render={({ defaultValue, value, ...props }, ref) => {
					return (
						<CustomInput
							{...{ value, error }}
							{...props}
							name="date"
							defaultValue={defaultValue}
							inputRef={ref}
						/>
					)
				}}
			/>
		</div>
	)
}

export default DatePicker
