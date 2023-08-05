import React from 'react'
import Icons from '../Icons'
import { classNames } from '../../utils/helper'

const InputRounded = ({
	iconId,
	iconClass,
	disabled,
	name,
	mainClass,
	value,
	...props
}) => {
	return (
		<div className={classNames("relative", mainClass)}>
			<input {...{ name, value, disabled }} {...props} />
			{iconId ? (
				<Icons
					className={classNames(
						'absolute top-[50%] left-4 translate-y-[-50%]',
						iconClass
					)}
					id={iconId}
				/>
			) : null}
		</div>
	)
}

export default InputRounded
