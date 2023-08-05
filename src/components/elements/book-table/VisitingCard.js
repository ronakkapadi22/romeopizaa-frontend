import React from 'react'
import visiting from '../../../assets/images/visiting-card.png'

const VisitingCard = () => {
	return (
		<div className="col-span-12 md:col-span-6 lg:col-span-3 rounded-md bg-white">
			<img
				className="h-full w-full md:w-[350px] lg:w-full"
				src={visiting}
				alt="visiting-card"
			/>
		</div>
	)
}

export default VisitingCard
