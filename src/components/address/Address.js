import React from 'react'
import CustomPortal from '../../shared/CustomPortal'
import AddressDetails from './address-details'

const Address = ({ toggle, handleClose, ...props }) => {
    return (
        <CustomPortal {...props} className="relative w-full flex items-center"
            animation="animate-popup-top" {...{ toggle }} >
            <AddressDetails {...{handleClose}} />
        </CustomPortal>
    )
}

export default Address