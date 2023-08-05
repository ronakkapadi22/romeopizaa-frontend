import React from 'react'
import { classNames } from '../../utils/helper'

const TextArea = ({ disabled, ...props }) => {
	return (
		<textarea
			{...{ disabled }}
			{...props}
			className={classNames(
				'resize-none w-full xs:min-w-full placeholder:text-gray2 sm:min-w-[328px] outline-none px-4 py-3 rounded-lg bg-cultured1',
				disabled ? 'placeholder:text-light-gray' : ''
			)}
		/>
	)
}

export default TextArea
