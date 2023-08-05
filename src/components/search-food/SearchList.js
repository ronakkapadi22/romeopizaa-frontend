import React from 'react'
import searchFood from '../../assets/images/food-list.png'
import Label from '../../shared/labels/label'
import Icons from '../../shared/Icons'
import { classNames } from '../../utils/helper'

const SearchList = ({ className, ...props }) => {
    return (
        <div className={classNames('w-full flex justify-between shadow-md p-2 mb-4 rounded-lg cursor-pointer', className)} {...props} >
            <img alt='search_food' className='w-[120px] mt-[6px] md:w-auto h-[100px] md:h-auto' src={searchFood} />
            <div className='w-full pl-4' >
                <p className='text-lg mb-2' >Pizza Paradise<span className='text-gray2 text-sm'>/ Cafe,Coffee Shop </span></p>
                <div className='flex' >
                    <Label
                        isShowIcon
                        icon="star-filled"
                        iconClass="text-orange w-[12px] lg:w-4"
                        className="px-3 py-1 text-[12px] lg:text-base bg-cultured inline-flex rounded-3xl items-center font-semibold"
                        label={'5.0'}
                    />
                    <p className='text-black flex items-center ml-2' >
                        <Icons id='location-outline' className='mr-[6px]' />
                        <span>1.5 Km</span>
                    </p>
                </div>
                <p className='text-black flex items-center mt-2' >Select Shop <Icons id='arrow-right' className='arrow-right ml-1' /></p>
            </div>
        </div>
    )
}

export default SearchList