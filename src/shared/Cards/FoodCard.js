import React, { useCallback } from 'react'
import { classNames } from '../../utils/helper'
import Label from '../labels/label'
import Heading from '../heading/Heading'
import Icons from '../Icons'
import { useNavigate } from 'react-router-dom'

const FoodCard = ({ className, data, ...props }) => {

	const navigate = useNavigate()

	const handleItemClick = useCallback((id) => ()=>{
		navigate(`/products/detail/${id}`)
	}, [])

	return (
		<div
			{...props}
			className={classNames(
				'rounded-md cursor-pointer 2xl:min-w-[300px] mb-8 col-span-2 sm:col-span-1',
				className
			)}
			onClick={handleItemClick(data.id)}
		>
			<div className="w-full relative">
				<img src={data.imagepath} alt="food-item" />
				<div className="absolute text-white top-1 p-1 right-1 lg:p-2 lg:top-2 lg:right-2 bg-[rgba(0,0,0,0.4)] rounded-3xl">
					<Icons id="heart-outline" />
				</div>
			</div>
			<div className="flex flex-col-reverse items-baseline mt-2 lg:mt-4 lg:flex-row justify-between lg:items-center">
				<Heading
					tag="head_6"
					headClass="text-base lg:text-lg"
					text={data.name}
				/>
				<Label
					isShowIcon
					icon="star-filled"
					iconClass="text-orange w-[12px] lg:w-4"
					className="px-3 py-1 text-[12px] lg:text-base bg-cultured inline-flex rounded-3xl items-center font-semibold"
					label={'5.0'}
				/>
			</div>
			<div className="flex flex-col lg:flex-row mt-1 text-gray1 text-sm lg:items-center">
				<p>${data.price} Delivery Fee</p>
				<p className="hidden lg:block md:text-[22px] md:mx-[4px] lg:mx-2">•</p>
				<p>35-40 min</p>
			</div>
		</div>
	)
}

export default FoodCard
