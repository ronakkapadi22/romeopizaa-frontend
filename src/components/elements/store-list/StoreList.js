import React from 'react'
import { classNames } from '../../../utils/helper'
import Heading from '../../../shared/heading/Heading'
import SearchList from '../../search-food/SearchList'

const StoreList = ({ className, ...props }) => {
    return (
        <div {...props} className={classNames('w-full px-6 lg:px-[44px] xl:px-[80px] py-[48px] bg-white', className)} >
            <div className="flex justify-between items-center">
                <Heading tag="head_2" text='Choose From Trusted Shop' />
                <div className="flex justify-between items-center">
                    <p className="text-black font-medium cursor-pointer underline text-sm md:text-lg mr-4 md:mr-[40px]">
                        Explore All Shop
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-6 mt-[22px] lg:mt-[40px] gap-2 md:gap-4">
                <SearchList className='col-span-6 md:col-span-3 lg:col-span-2' />
                <SearchList className='col-span-6 md:col-span-3 lg:col-span-2' />
                <SearchList className='col-span-6 md:col-span-3 lg:col-span-2' />
            </div>
        </div>
    )
}

export default StoreList