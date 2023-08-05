import React from 'react'
import Heading from '../../shared/heading/Heading'
import Icons from '../../shared/Icons'

const PopularFood = ({ foods, ...props }) => {
	return (
		<div {...props} className="px-0 sm:px-4 w-full my-6">
			<Heading headClass="font-semibold" tag="head_5" text="Popular Food" />
			<div className="mt-6 flex justify-between items-center flex-wrap">
				{foods?.map(({ id, icon, title }) => (
					<div
						key={id}
						className="mb-6 cursor-pointer flex justify-center items-center flex-col"
					>
						<div className="w-[90px] sm:w-[102px] h-[90px] sm:h-[102px] rounded-[50%] bg-cultured1 flex items-center justify-center">
							<Icons className="w-12 sm:w-auto" id={icon} />
						</div>
						<Heading
							headClass="text-[18px] text-center mt-1"
							tag="head_6"
							text={title}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default PopularFood
