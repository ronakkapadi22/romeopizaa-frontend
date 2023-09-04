import React from 'react'
import { classNames } from '../../utils/helper'

const Select = ({ options, error, disabled, placeholder, ...props }) => {
	return (
		<select
			{...props}
			{...{ disabled }}
			className={classNames(
				'xs:min-w-full w-full cursor-pointer text-gray1 sm:min-w-[328px] border border-cultured1 outline-none px-4 py-3 rounded-lg bg-cultured1 focus:border focus:border-gray1',
				disabled ? 'text-light-gray' : '',
				error
					? 'border border-[#DC2626] focus:!border-[#DC2626]'
					: 'border border-cultured1 focus:border-gray1'
			)}
		>
			{<option hidden className={disabled ? 'placeholder:text-light-gray' : ''}>
				{placeholder || 'Select'}
			</option>}
			{options?.map(({ label, value }, index) => (
				<option key={index} value={value}>
					{label}
				</option>
			))}
		</select>
	)
}

export default Select
