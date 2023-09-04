import React from 'react'

const LinkButton = ({ label, ...props }) => {
	return (
		<p {...props}>{label}</p>
	)
}

export default LinkButton
