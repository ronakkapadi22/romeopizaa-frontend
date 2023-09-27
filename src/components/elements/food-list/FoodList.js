import React from 'react'
import Heading from '../../../shared/heading/Heading'
import { classNames } from '../../../utils/helper'
import FoodCard from '../../../shared/Cards/FoodCard'
import useHistory from '../../../hooks/useHistory'

const FoodList = ({ title, className, showBredcrump, item, productList }) => {
	const history = useHistory()
	return (
		<div id={String(title).toLowerCase()}
			className={classNames(
				'w-full px-6 lg:px-[44px] xl:px-[80px] py-[48px] bg-white',
				className
			)}
		>
			{showBredcrump}
			<div className="flex justify-between items-center">
				<Heading
					tag="head_2"
					headClass="text-2xl md:text-[40px] leading-[60px] md:leading-[60px]"
					text={title}
				/>
				{productList?.length ? <div onClick={() => history(`/products/${item}`)} className="flex justify-between items-center">
					{item ? <p className="text-black font-medium cursor-pointer underline text-sm md:text-lg">
						See All
					</p> : null}
				</div> : null}
			</div>
			<div className={classNames(productList?.length ? "grid grid-cols-4 mt-[22px] lg:mt-[40px] gap-2 md:gap-6 lg:gap-8 xl:gap-10" : "")}>
				{productList?.length ? <>
					{productList?.map((product, index) => <FoodCard data={product} key={index} />)}
				</> : <span className='font-medium text-xl'>No data found.</span>}
			</div>
		</div>
	)
}

export default FoodList
