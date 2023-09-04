import React, { Fragment, useCallback } from 'react'
import Heading from '../../shared/heading/Heading'
import Icons from '../../shared/Icons'
import Label from '../../shared/labels/label'
import Button from '../../shared/Buttons/Button'
import CustomPortal from '../../shared/CustomPortal'
import { useDispatch, useSelector } from 'react-redux'
import { enqueueSnackbar } from 'notistack'
import { deleteAddress } from '../../api/api'
import { currentAddress, isEditAddress, removeCurrentAddress } from '../../redux/action'

const AddressList = ({ handleClose, ...props }) => {

    const lists = useSelector(({ address }) => address?.address)
    const dispatch = useDispatch()

    const handleOpenAddress = useCallback((val) => {
        handleClose('address', { addressListPopup: false })
        dispatch(isEditAddress(true))
        dispatch(currentAddress(val))
    }, [dispatch])

    const removeAddress = useCallback(async (id) => {
        try {
            const response = await deleteAddress({
                id: String(id)
            })
            const index = lists.findIndex(val => val?.id === id)
            if (response?.data) {
                dispatch(removeCurrentAddress(index))
                enqueueSnackbar('Address has been removed successfully', {variant: 'success'})
                handleClose('address', { addressListPopup: false, address: false })
            }
        } catch (error) {
            enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong.', {
                variant: 'error'
            })
            return error
        }
    }, [])

    const handleSelectAddress = useCallback((data) => {
        dispatch(currentAddress(data))
        handleClose('address', { addressListPopup: false, address: false })
    }, [dispatch])

    return (
        <div
            {...props}
            className="relative w-[96%] md:w-[575px] p-8 mx-auto rounded-lg bg-white"
        >
            <div className="w-full flex justify-between items-center">
                <Heading tag="head_3" headClass="text-2xl" text="Address List" />
                <Icons
                    id="close"
                    className="cursor-pointer"
                    onClick={() => handleClose('addressListPopup')}
                />
            </div>
            <div className="mt-6 overflow-auto">
                {lists.map((val, index) => (
                    <div className='flex my-4 justify-between items-start' key={val?.id} >
                        <div onClick={() => handleSelectAddress(val)} className="flex items-start mb-6 cursor-pointer">
                            <div className="bg-cultured rounded-full p-[10px]">
                                <Icons className="text-black w-5 h-5" id="location" />
                            </div>
                            <div className="flex flex-col justify-end items-start text-black ml-4">
                                <p className="font-medium">{val?.addressName}</p>
                                <p className="text-sm text-gray1">
                                    {val?.streetName} {val?.locality}
                                </p>
                                <p className='text-sm text-gray1' >
                                    {val?.postCode} ({val?.country})
                                </p>
                            </div>
                        </div>
                        <div className='flex'>
                            <Label isShowIcon icon='pen' onClick={() => handleOpenAddress(val)} className="p-2 cursor-pointer mr-2 bg-[#FFF5E0] text-[#F1A80F] rounded-[14px]" />
                            <Label isShowIcon icon='trash' onClick={() => removeAddress(val?.id, index)} className="p-2 cursor-pointer text-red bg-[#ffd2d2] rounded-[14px]" />
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-full' >
                <Button onClick={() => handleClose('address', { addressListPopup: false })}
                    btnClass="w-full text-white"
                    apperianceType="primary"
                    size="large"
                    label="Add new address"
                />
            </div>
        </div>
    )
}

const AddressListPopup = ({ toggle, handleClose, ...props }) => {
    return <Fragment>
        {toggle ? <CustomPortal {...props} className="relative w-full flex items-center"
            animation="animate-popup-top" {...{ toggle }} >
            <AddressList {...{ handleClose }} />
        </CustomPortal> : null}
    </Fragment>
}

export default AddressListPopup