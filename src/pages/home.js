import React, { useEffect, useState } from 'react'
import Category from '../components/elements/food-category/Category'
import FoodList from '../components/elements/food-list/FoodList'
import Banner from '../components/home/banner/Banner'
// import StoreList from '../components/elements/store-list/StoreList'
import { categoryList, fetchProductData } from '../api/api'
import { enqueueSnackbar } from 'notistack'
import { groupBy } from '../utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderDetail } from '../redux/action'

const HomePage = ({ ...props }) => {
	
	const dispatch = useDispatch()
	const storeConfig = useSelector(({storeConfig}) => storeConfig)
	const [category, setCategory] = useState([])
	const [productList, setProductList] = useState({})

	const fetchProductList = async () => {
		try {
			const param = {
				storeId: storeConfig.storeId
			}
			const response = await fetchProductData(param)
			if (response.data?.data?.data) {
				setProductList(groupBy(response.data?.data?.data, 'categoryId'))
			}

		} catch (error) {
			setProductList({})
			return error
		}

	}

	const fetchCategoryList = async () => {
		try {
			const response = await categoryList({})
			if (response.data?.data) {
				setCategory(response.data?.data)
				window.scrollTo(0, 0)
			}
		} catch (error) {
			console.log('error', error)
			setCategory([])
			enqueueSnackbar(error?.response?.data?.message || 'somthing went wrong.', {
				variant: 'error'
			})
			return error
		}
	}

	useEffect(() => {
		fetchCategoryList()
		fetchProductList()
	}, [dispatch, storeConfig])

	useEffect(() => {
		dispatch(addOrderDetail({orderId : 1}))
	}, [])

	console.log('category', category, productList)

	return (
		<div {...props}>
			<Banner />
			<Category
				className="px-6 lg:px-[44px] xl:px-[80px]"
				categories={category}
			/>
			{/* <StoreList /> */}
			{
				category?.map(({id, name}) => {
					return (<FoodList title={name} item={id} key={id} {...{id, name}} productList={productList[id]?.slice(0, 4)} />)
				})
			}

		</div>
	)
}

export default HomePage
