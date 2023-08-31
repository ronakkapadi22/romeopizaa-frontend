import React from 'react'
import Copyright from './copyright'
import Icons from '../../../shared/Icons'
import { useSelector } from 'react-redux'

const Footer = () => {

	const store = useSelector(({store}) => store?.storeDetail)

	return (
		<div className="w-full">
			<div className="grid lg:grid-cols-2 gap-4 p-[36px] md:p-[80px] bg-black ">
				<div className="col-span-16 border bg-black">
					<div className="w-full sm:w-[412px]">
						<Icons id="logo-icon" />
						<p className="text-white text-base mt-8">
							Our feet are on the ground, but our the desi ambitions are to
							above the clouds a Here is how we move to satisfy our
						</p>
					</div>
				</div>
				<div className="lg:col-span-16 text-white">
					<div className="w-full flex flex-wrap">
						<div className="w-full lg:w-1/2 mt-10 lg:mt-0">
							<p className="text-orange text-base mb-6">Quick Links</p>
							<ul className="list-none">
								<li className="mb-[10px]">About us</li>
								<li className="mb-[10px]">Menus</li>
								<li className="mb-[10px]">Shop</li>
								<li className="mb-[10px]">Contact us</li>
								<li className="mb-[10px]">Career</li>
							</ul>
						</div>
						<div className="w-full lg:w-1/2 mt-10 lg:mt-0">
							<p className="text-orange text-base mb-6">Contact Details</p>
							<ul>
								<li className="flex items-center mb-[10px]">
									<Icons className="w-[20px] h-[20px] mr-3" id="phone" />{' '}
									{store?.data?.phone || 800-323-4567}
								</li>
								<li className="flex items-center mb-[10px]">
									<Icons className="w-[20px] h-[20px] mr-3" id="timer" />{' '}
									{`Mon-Sun ${store?.data?.startTime || '8:00AM'} - ${store?.data?.endTime || '10:00PM'}`}
								</li>
								<li className="flex items-center mb-[10px]">
									<Icons className="w-[20px] h-[20px] mr-3" id="email" />{' '}
									{ store?.data?.email || 'info@reneospizza.uk'}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<Copyright />
		</div>
	)
}

export default Footer
