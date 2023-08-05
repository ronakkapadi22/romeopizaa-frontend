import React from 'react'
import useToggle from '../../../hooks/useToggle'
import { classNames } from '../../../utils/helper'
import IconButton from '../../../shared/Buttons/IconButton'
import Icons from '../../../shared/Icons'
import Label from '../../../shared/labels/label'
import CustomPortal from '../../../shared/CustomPortal'
import FindStore from '../find-store/FindStore'

const OfferHeader = ({ className, ...props }) => {
	const [toggle, handleToggle] = useToggle()

	const handleStoreLocation = () => handleToggle((prev) => !prev)

	return (
		<div
			className={classNames(
				'px-4 md:px-[80px] py-5 lg:py-[9px] bg-black flex justify-between items-center flex-col-reverse md:flex-row',
				className
			)}
			{...props}
		>
			<IconButton
				onClick={handleStoreLocation}
				className="bg-white w-full md:w-auto min-w-[215px] rounded-3xl flex items-center py-1 pl-3 pr-7 mt-3 md:mt-0"
			>
				<Icons id="location" />
				<p className="text-gray1 text-[13px] ml-2">Select Store</p>
			</IconButton>
			<div className="flex flex-col-reverse lg:flex-row items-center md:items-start">
				<Label
					className="flex items-center text-white text-[13px] font-semibold"
					isShowIcon
					iconClass="mr-1"
					icon="discount-orange"
					label="Discount Off 25% only for Burger Item"
				/>
				<div className="flex mb-1 lg:mb-0">
					<Label
						className="flex items-center pr-2 border-r border-white lg:border-none text-white lg:ml-2 text-[13px] font-semibold"
						isShowIcon
						iconClass="mr-1 text-[#FFA323] w-[20px] h-[20px]"
						icon="phone"
						label="800-323-4567"
					/>
					<Label
						className="flex items-center text-white ml-2 text-[13px] font-semibold"
						isShowIcon
						iconClass="mr-1 text-[#FFA323] w-[20px] h-[20px]"
						icon="timer"
						label="Mon-Sun 8:00am - 10:00pm"
					/>
				</div>
			</div>
			<CustomPortal
				animation="animate-popup-top"
				{...{ toggle }}
				className="relative w-full flex items-center"
			>
				<FindStore {...{ handleStoreLocation }} />
			</CustomPortal>
		</div>
	)
}

export default OfferHeader
