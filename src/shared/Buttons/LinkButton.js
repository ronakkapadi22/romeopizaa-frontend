import React from 'react'

const LinkButton = ({ onClick, label, ...props }) => {
	return (
		<p onClick={onClick && onClick()} {...props}>
			{label}
		</p>
	)
}

export default LinkButton
