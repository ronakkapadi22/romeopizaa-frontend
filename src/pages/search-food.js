import React, { useEffect, useState } from 'react'
import InputRounded from '../shared/forms/InputRounded'
import Heading from '../shared/heading/Heading'
import RecentSearch from '../components/search-food/RecentSearch'
import { recent } from '../utils/helper'
import Category from '../components/elements/food-category/Category'
import CustomPortal from '../shared/CustomPortal'
import useToggle from '../hooks/useToggle'
import FindFoodsStore from '../components/search-food/FindFoodList'
import { categoryList } from '../api/api'

const SearchFood = ({ ...props }) => {

    const [toggle, handleToggle] = useToggle(false)
    const [category, setCategory] = useState([])

    const fetchCategoryList = async () => {
		const param = {
			storeId: 0,
			catId1: 0
		}
		try {
			const response = await categoryList(param)
			if (response.data) setCategory(response.data?.data)
		} catch (error) {
			console.log('error', error)
		}
	}

	useEffect(() => {
		fetchCategoryList()
	}, [])

    const handleSearchFood = () => handleToggle(prev => !prev)

    return (
        <div className="w-full py-8 sm:py-[54px] px-6 sm:px-16" {...props}>
            <div className="w-full lg:w-[920px] mx-auto">
                <InputRounded
                    className="w-full rounded-[46px] py-3 pl-12 pr-5 outline-none bg-cultured cursor-pointer"
                    placeholder="Food,groceries,drinks,etc"
                    iconId="search"
                    onClick={handleSearchFood}
                    iconClass="w-[20px] h-[20px] text-gray2"
                />
                <div className="px-0 sm:px-4 w-full my-6">
                    <Heading
                        headClass="font-semibold"
                        tag="head_5"
                        text="Recent Searches"
                    />
                    <RecentSearch results={[...recent]} className="mt-6" />
                </div>
                <div className="px-0 sm:px-4 w-full my-6">
                    <Heading
                        headClass="font-semibold"
                        tag="head_5"
                        text="Popular Food"
                    />
                    <Category categories={category} isSmall  className="md:px-6 !py-2" />
                </div>
            </div>
            <CustomPortal
                animation="animate-popup-top"
                {...{ toggle }}
                className="relative w-full flex items-center"
            >
                <FindFoodsStore {...{handleSearchFood}} />
            </CustomPortal>
        </div>
    )
}

export default SearchFood