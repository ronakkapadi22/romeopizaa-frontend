import React from 'react'

const FieldGroup = ({
	children,
	error,
	label,
	isHideLabel,
	isHideError,
	errorClass,
	...props
}) => {
	return (
		<div {...props}>
			{!isHideLabel ? (
				<p className="text-black font-medium text-base mb-1">{label}</p>
			) : null}
			{children}
			{!isHideError ? <p className={errorClass} >{error}</p> : null}
		</div>
	)
}

export default FieldGroup
