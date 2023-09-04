import React, { useCallback, useEffect, useState, useMemo } from 'react'
import FoodList from '../components/elements/food-list/FoodList'
import { productCategory } from '../api/api'
import { useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import Breadcrump from '../shared/Breadcrump'
import Loader from '../shared/Loader/Loader'

const ProductCategoryDetail = ({ ...props }) => {
	const { id } = useParams()
	const store = useSelector(({ storeConfig }) => storeConfig)
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

	const fetchProductCategory = useCallback(async () => {
		setLoading(true)
		try {
			const response = await productCategory({
				storeId: store?.storeId,
				catId: parseInt(id)
			})
			if (response.data.data) {
				setProducts(response.data?.data || [])
				setLoading(false)
				window.scrollTo(0, 0)
			}
		} catch (error) {
			setLoading(false)
			if (error?.response?.data?.message === 'No record found.') {
				setProducts([])
				return
			}
			enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong.', {
				variant: 'error'
			})
			return error
		}
	}, [store])

	useEffect(() => {
		fetchProductCategory()
	}, [id])


	const productData = useMemo(() => {
		return products.find((item) => item.id == id)
	}, [products])

	if(loading) return <Loader/>

	return (
		<div {...props}>
			{productData ? (
				<>
					<FoodList
						title={productData?.name}
						key={productData?.id}
						productList={productData?.products}
						showBredcrump={<Breadcrump className='mb-8' />}
					/>
				</>
			) : <div className='w-full p-10' >
				<Breadcrump className='mb-8' />
				<p className='text-lg font-semibold text-center' >
					No data found.
				</p>
			</div>
			}
		</div>
	)
}

export default ProductCategoryDetail
