import React from 'react'
import Icons from '../../../shared/Icons'
import useHistory from '../../../hooks/useHistory'

const Navbar = ({ ...props }) => {

	const history = useHistory()

	return (
		<div
			{...props}
			className="w-full h-[92px] bg-black flex items-center px-8 sm:px-[80px]"
		>
			<div className="flex w-[180px] md:w-full">
				<Icons className='cursor-pointer' onClick={() => history('/')} id="logo" />
			</div>
		</div>
	)
}

export default Navbar
