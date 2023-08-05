import React from 'react'
import Icons from '../../../shared/Icons'

const Navbar = ({ ...props }) => {
	return (
		<div
			{...props}
			className="w-full h-[92px] bg-black flex items-center px-8 sm:px-[80px]"
		>
			<div className="flex w-[180px] md:w-full">
				<Icons id="logo" />
			</div>
		</div>
	)
}

export default Navbar
