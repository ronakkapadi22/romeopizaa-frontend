import React from 'react'
import { classNames, padding, apperiance } from '../../utils/helper'

const Button = ({
	label,
	disabled,
	apperianceType,
	size,
	btnClass,
	...props
}) => {
	return (
		<button
			className={classNames(
				'outline-none px-4 rounded-lg',
				padding[size],
				apperiance[apperianceType],
				btnClass
			)}
			{...{ disabled }}
			{...props}
		>
			{label}
		</button>
	)
}

export default Button
