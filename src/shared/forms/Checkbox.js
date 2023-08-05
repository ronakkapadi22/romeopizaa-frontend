import React from 'react'
import { classNames } from '../../utils/helper'

const Checkbox = ({ className, ...props }) => {
	return (
		<input
			className={classNames('accent-black', className)}
			{...props}
			type="checkbox"
		/>
	)
}

export default Checkbox
