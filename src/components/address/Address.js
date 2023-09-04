import React, { Fragment } from 'react'
import CustomPortal from '../../shared/CustomPortal'
import AddressDetails from './address-details'

const Address = ({ toggle, handleClose, ...props }) => {
    return (
        <Fragment>
            {toggle ? <CustomPortal {...props} className="relative w-full flex items-center"
                animation="animate-popup-top" {...{ toggle }} >
                <AddressDetails {...{ handleClose }} />
            </CustomPortal> : null}
        </Fragment>
    )
}

export default Address