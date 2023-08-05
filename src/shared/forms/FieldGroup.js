import React from 'react'

const FieldGroup = ({
	children,
	error,
	label,
	isHideLabel,
	isHideError,
	...props
}) => {
	return (
		<div {...props}>
			{!isHideLabel ? (
				<p className="text-black font-medium text-base mb-1">{label}</p>
			) : null}
			{children}
			{!isHideError ? <p>{error}</p> : null}
		</div>
	)
}

export default FieldGroup
