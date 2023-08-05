import React from 'react'
import CustomPortal from '../../shared/CustomPortal'
import CardDetails from './card-details'

const PaymentDetails = ({ toggle, handleClose, ...props }) => {
	return (
		<CustomPortal
			{...props}
			className="relative w-full flex items-center"
			animation="animate-popup-top"
			{...{ toggle }}
		>
			<CardDetails {...{ handleClose }} />
		</CustomPortal>
	)
}

export default PaymentDetails
