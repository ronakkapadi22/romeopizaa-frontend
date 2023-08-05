import React from 'react'
import Heading from '../../../shared/heading/Heading'
import { classNames } from '../../../utils/helper'
import FoodCard from '../../../shared/Cards/FoodCard'
import useHistory from '../../../hooks/useHistory'

const FoodList = ({ title, className, item, productList, ...props }) => {
	const history = useHistory()

	return (
		<div
			{...props}
			className={classNames(
				'w-full px-6 lg:px-[44px] xl:px-[80px] py-[48px] bg-white',
				className
			)}
		>
			<div className="flex justify-between items-center">
				<Heading
					tag="head_2"
					headClass="text-2xl md:text-[40px] leading-[60px] md:leading-[60px]"
					text={title}
				/>
				<div onClick={() => history(`/products/${item}`)} className="flex justify-between items-center">
					{item ? <p className="text-black font-medium cursor-pointer underline text-sm md:text-lg">
						See All
					</p> : null}
				</div>
			</div>
			<div className="grid grid-cols-4 mt-[22px] lg:mt-[40px] gap-2 md:gap-6 lg:gap-8 xl:gap-10">
				{productList.map((product, index) => <FoodCard data={product} key={index} />)}
			</div>
		</div>
	)
}

export default FoodList
