import React from 'react'
import { classNames } from '../../utils/helper'
import Icons from '../Icons'

const Input = ({
	disabled,
	name,
	inputClass,
	withIcon,
	handleClear,
	clearIcon,
	clearText,
	className,
	icon,
	error,
	withLastIcon,
	handleToggle,
	...props
}) => {
	return (
		<div className={classNames("relative", inputClass)}>
			<input
				{...{ disabled, name }}
				{...props}
				className={classNames(
					'xs:min-w-full w-full placeholder:text-gray2 sm:min-w-[328px] outline-none px-4 py-3 rounded-lg bg-cultured1',
					disabled ? 'placeholder:text-light-gray' : '',
					error
						? 'border border-[#DC2626] focus:!border-[#DC2626]'
						: 'border border-cultured1 focus:border-gray1',
					className,
					withIcon ? 'pl-12' : ''
				)}
			/>
			{withIcon ? <Icons id={icon || 'location'} className='absolute top-1/2 -translate-y-1/2 left-4  ' /> : null}
			{clearIcon ? (
				<Icons onClick={() => handleClear(name)}
					className="text-gray2 absolute top-1/2 -translate-y-1/2 right-4"
					id="close"
				/>
			) : null}
			{
				withLastIcon ? <Icons onClick={() => handleToggle(name)} id={icon || ''} className="text-gray2 cursor-pointer absolute top-1/2 -translate-y-1/2 right-4" /> : null
			}
			{clearText ? (
				<p
					onClick={() => handleClear(name)}
					className="text-gray2 cursor-pointer absolute top-1/2 -translate-y-1/2 right-4"
				>
					Clear
				</p>
			) : null}
		</div>
	)
}

export default Input
