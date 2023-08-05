import React from 'react'
import Heading from '../../../shared/heading/Heading'
// import { timing } from '../../../utils/helper'

const Schedule = ({ ...props }) => {
	const { timing } = props
	return (
		<div
			{...props}
			className="col-span-12 md:col-span-6 lg:col-span-4 py-[44px] px-6 md:px-[44px] rounded-md bg-white shadow-[0_2px_12px_0px_rgba(0,0,0,0.3)]"
		>
			<Heading
				tag="head_3"
				headClass="mb-[22px] md:mb-[40px] text-2xl md:text-[32px]"
				text="Opening Hours"
			/>
			{timing?.map(({ id, day, starttime, endtime }) => (
				<div
					key={id}
					className="flex justify-between items-center text-lg mb-6"
				>
					<p>{day}</p>
					{endtime === '' ? (
						<p>{starttime}</p>
					) : (
						<p>{`${starttime} - ${endtime}`}</p>
					)}
				</div>
			))}
		</div>
	)
}

export default Schedule
