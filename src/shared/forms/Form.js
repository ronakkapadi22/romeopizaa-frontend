import React from 'react'

const Form = ({ children, handleSubmit, ...props }) => {
	return (
		<form onSubmit={handleSubmit} {...props}>
			{children}
		</form>
	)
}

export default Form
