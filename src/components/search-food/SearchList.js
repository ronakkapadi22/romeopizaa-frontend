import React, { useMemo } from 'react'
import searchFood from '../../assets/images/food-list.png'
import Label from '../../shared/labels/label'
import Icons from '../../shared/Icons'
import { classNames } from '../../utils/helper'
import { enqueueSnackbar } from 'notistack'

const SearchList = ({ className, ...props }) => {

    const rating = useMemo(() => {
        return Number(Math.ceil(Math.random() * 5)).toFixed(1)
    }, [])

    const distance = useMemo(() => {
        return Number(Math.ceil(Math.random() * 5)).toFixed(1)
    }, [])

    return (
        <div className={classNames('w-full flex justify-between shadow-md p-2 mb-4 rounded-lg cursor-pointer', className)} {...props} >
            <img alt='search_food' className='w-[120px] mt-[6px] md:w-auto h-[100px] md:h-auto' src={searchFood} />
            <div className='w-full pl-4' >
                <p className='text-lg mb-2' >{props?.businessName || ''}<span className='text-gray2 text-sm'>/ {props?.establishmentType || ''} </span></p>
                <div className='flex' >
                    <Label
                        isShowIcon
                        icon="star-filled"
                        iconClass="text-orange w-[12px] lg:w-4 mr-1"
                        className="px-3 py-1 text-[12px] lg:text-base bg-cultured inline-flex rounded-3xl items-center font-semibold"
                        label={rating}
                    />
                    <p className='text-black flex items-center ml-2' >
                        <Icons id='location-outline' className='mr-[6px]' />
                        <span>{distance} Km</span>
                    </p>
                </div>
                <p onClick={() => enqueueSnackbar('Already selected', {variant: 'success'})} className='text-black flex items-center mt-2' >Select Shop <Icons id='arrow-right' className='arrow-right ml-1' /></p>
            </div>
        </div>
    )
}

export default SearchList