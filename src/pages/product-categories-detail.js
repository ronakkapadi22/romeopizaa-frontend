import React, { useCallback, useEffect, useState, useMemo } from 'react'
import FoodList from '../components/elements/food-list/FoodList'
import { productCategory } from '../api/api'
import { useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

const ProductCategoryDetail = ({ ...props }) => {
	const { id } = useParams()
	const [products, setProducts] = useState([])

	const fetchProductCategory = useCallback(async () => {
		try {
			const response = await productCategory({
				storeId: 1,
				catId1: parseInt(id)
			})
			if (response.data.data) setProducts(response.data?.data)
		} catch (error) {
			if (error?.response?.data) {
				enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong.', {
					variant: 'error'
				})
			}
			return error
		}
	}, [])

	useEffect(() => {
		fetchProductCategory()
	}, [])

	const productData = useMemo(() => {
		return products.find((item) => item.id == id)
	}, [products])

	return (
		<div {...props}>
			{productData ? (
			<FoodList
					title={productData?.name}
					key={productData?.id}
					productList={productData?.products}
				/>
			) : <div className='w-full p-10 font-semibold text-center text-lg' >No data found.</div>}
		</div>
	)
}

export default ProductCategoryDetail
