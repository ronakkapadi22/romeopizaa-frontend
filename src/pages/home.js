import React, { useEffect, useState } from 'react'
import Category from '../components/elements/food-category/Category'
import FoodList from '../components/elements/food-list/FoodList'
import Banner from '../components/home/banner/Banner'
import StoreList from '../components/elements/store-list/StoreList'
import { categoryList, fetchProductData } from '../api/api'
import { enqueueSnackbar } from 'notistack'
import { groupBy } from '../utils/helper'

const HomePage = ({ ...props }) => {
	const [category, setCategory] = useState([])
	const [productList, setProductList] = useState({})

	const fetchProductList = async () => {
		try {
			const param = {
				storeId: 1,
				catId1: 1
			}
			const response = await fetchProductData(param)
			if (response.data?.data?.data) {
				setProductList(groupBy(response.data?.data?.data, 'categoryId'))
			}

		} catch (error) {
			enqueueSnackbar(error?.response?.data?.message || 'somthing went wrong.', {
				variant: 'error'
			})
			return error
		}

	}


	const fetchCategoryList = async () => {
		const param = {
			storeId: 0,
			catId1: 0
		}
		try {
			const response = await categoryList(param)
			if (response.data?.data) {

				fetchProductList()
				setCategory(response.data?.data)
			}
		} catch (error) {
			enqueueSnackbar(error?.response?.data?.message || 'somthing went wrong.', {
				variant: 'error'
			})
			return error
		}
	}

	useEffect(() => {
		fetchCategoryList()
	}, [])

	return (
		<div {...props}>
			<Banner />
			<Category
				className="px-6 lg:px-[44px] xl:px-[80px]"
				categories={category}
			/>
			<StoreList />
			{
				Object.keys(productList).map((item) => {
					return (<FoodList title={category?.find(val => String(val.id) === String(item))?.name || ''} key={item} {...{item}} productList={productList[item].slice(0, 4)} />)

				})
			}

		</div>
	)
}

export default HomePage
