import React from 'react'

const IconButton = ({ children, ...props }) => {
	return <button {...props}>{children}</button>
}

export default IconButton