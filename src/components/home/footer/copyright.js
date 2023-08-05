import React from 'react'
import Icons from '../../../shared/Icons'

const Copyright = ({ ...props }) => {
	const socials = [
		{
			id: 'facebook',
			icon: 'facebook'
		},
		{
			id: 'twitter',
			icon: 'twitter'
		},
		{
			id: 'linkedin',
			icon: 'linked-in'
		},
		{
			id: 'telegram',
			icon: 'telegram'
		}
	]

	return (
		<div
			{...props}
			className="bg-[#151515] py-3 px-9 md:px-[80px] text-white flex flex-col-reverse md:flex-row justify-between items-start"
		>
			<p className="mt-4 md:mt-0 text-sm ">
				Copyright © romeospizza. All Rights Reserved.
			</p>
			<div className="flex">
				{socials?.map(({ id, icon }) => (
					<Icons
						className="mr-4 cursor-pointer mt-[6px] md:mt-0 md:mr-6 w-[20px] h-[20px]"
						key={id}
						{...{ id: icon }}
					/>
				))}
			</div>
		</div>
	)
}

export default Copyright
