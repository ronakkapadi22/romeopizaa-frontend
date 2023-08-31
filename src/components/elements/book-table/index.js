import React from 'react'
import Schedule from './Schedule'
import VisitingCard from './VisitingCard'
import TableBooking from './TableBooking'
import { useSelector } from 'react-redux'

const Booking = ({ ...props }) => {
	const store = useSelector((state) => state.store)
	const availablity = store?.storeDetail?.data?.availability
	return (
		<div id="table-booking"
			className="grid grid-cols-1 gap-5 xl:gap-[30px] lg:grid-cols-12 w-full bg-cultured1 px-6 lg:px-[44px] xl:px-[80px] pt-[70px] pb-6 md:pb-[90px]"
			{...props}
		>
			<TableBooking />
			<Schedule timing={availablity} />
			<VisitingCard />
		</div>
	)
}

export default Booking
