import React from 'react'
import useWindowSize from '../../../hooks/useWindow'
import { classNames, handleScrollToElement } from '../../../utils/helper'
import bannerMobile from '../../../assets/images/banner-mobile.png'
import banner from '../../../assets/images/banner.png'
import Heading from '../../../shared/heading/Heading'
import Button from '../../../shared/Buttons/Button'
import { useSelector } from 'react-redux'

const Banner = ({ ...props }) => {
	const { width } = useWindowSize()
	const store = useSelector(({store}) => store?.storeDetail)
	const bannerPath = store?.data?.bannerpath
	const address = store?.data?.address || ''
	const city = store?.data?.city || ''
	const state = store?.data?.state || ''
	const country = store?.data?.country || ''
	const zip = store?.data?.zip || ''

	const handleBanner = () => {
		if(width > 768){
			return store?.data ? bannerPath : banner 
		}else return store?.data ? bannerMobile : bannerMobile 
	}

	console.log('store', store)
 
	return (
		<div className={classNames('w-full relative')} {...props}>
			<img
				className="w-full h-full"
				src={handleBanner()}
				alt="banner"
			/>
			<div className="w-full md:w-[470px] lg:w-1/2 xl:w-[700px] flex flex-col items-center md:items-start md:justify-center absolute top-[44px] sm:top-20 md:top-1/2 md:-translate-y-1/2 px-6 lg:pl-20">
				<Heading
					tag="head_1"
					headClass={classNames("font-semibold text-[34px] md:text-[45px] lg:text-[50px] text-center", store ? 'text-white' : 'text-black')}
					text={store?.data?.businessName || "Feeling Hungry!"}
				/>
				<p className={classNames("text-center md:text-left text-black my-[20px] lg:my-[26px]", store ? 'text-white' : 'text-black')}>
					{
						store ? classNames(address, city, state, zip, country) : "We Bring The Best Test in Our Dishes'. In All Burger Item of 2021 We Are Offering 20% Flat Discount. Don't miss Out!!"
					}
				</p>
				<Button
					size="large"
					btnClass="px-8"
					apperianceType="primary"
					label="Make Reservation"
					onClick={() => handleScrollToElement('table-booking')}
				/>
			</div>
		</div>
	)
}

export default Banner
