import React, { useState, useCallback, useEffect, Fragment, useMemo } from 'react'
import Breadcrump from '../shared/Breadcrump'
import Heading from '../shared/heading/Heading'
import Label from '../shared/labels/label'
import TextArea from '../shared/forms/TextArea'
import Icons from '../shared/Icons'
import Button from '../shared/Buttons/Button'
import { useParams } from 'react-router-dom'
import { productDetails } from '../api/api'
import { enqueueSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { addItemInCart, handleOpenCheckoutModal, updateItemInCart } from '../redux/action'
import Loader from '../shared/Loader/Loader'

const ProductDetails = ({ ...props }) => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const cartItems = useSelector(({ order }) => order?.cartItems)
	const [total, setTotal] = useState({})
	const [productDetail, setProductDetail] = useState({})
	const [alreadyAdded, setAlreadyAdded] = useState(false)
	const [isUpdated, setIsUpdated] = useState(false)
	const [loading, setLoading] = useState(false)
	const [itemData, setItemData] = useState({
		quantity: 1,
		instruction: '',
		attributes: {

		},
		modifiers: {

		}
	})

	const fetchUpdatedData = useCallback((productData) => {
		const clone = [...cartItems]
		if (!clone) return
		const current = clone.find(val => val.productId === Number(id))
		setAlreadyAdded(clone.some(item => item.productId === Number(id)))

		const { attributes } = productData
		let obj = {}
		if(attributes?.length && attributes?.filter(data => data?.name === 'Choose one' || data?.name === 'Choose Your Flavour')?.length){
			const clone = attributes?.filter(data => data?.name === 'Choose one' || data?.name === 'Choose Your Flavour')
			obj = {
				[clone?.[0]?.id]: {
					[clone?.[0]?.attributes_items?.[0]?.id] : clone?.[0]?.attributes_items?.[0]	
				}
			}
			const totalPrice = {}
			const base = {...current?.cloneAttributes, ...current?.cloneModifiers}
			Object.keys(base).forEach(val => {
				const data = Object.values(base[val])
				totalPrice[val] = data?.map(item => (item.price))?.reduce((a, i) => a + i, 0)
			})
			setTotal({[clone?.[0]?.id]: clone?.[0]?.attributes_items?.[0]?.price, ...totalPrice})
		}else {
			const totalPrice = {}
			const base = {...current?.cloneAttributes, ...current?.cloneModifiers}
			Object.keys(base).forEach(val => {
				const data = Object.values(base[val])
				totalPrice[val] = data?.map(item => (item.price))?.reduce((a, i) => a + i, 0)
			})
			setTotal({
				[productData?.id] : productData?.price, ...totalPrice
			})
		}

		setItemData({
			...itemData, quantity: current?.quantity || 1, attributes: {
				selectType: 'SINGLE',
				...obj,
				...current?.cloneAttributes
			}, modifiers: {
				selectType: 'SINGLE',
				...current?.cloneModifiers
			},
			instruction: current?.instruction || ''
		})
	}, [cartItems, id])

	const handleQuantity = (type) => {
		setItemData({
			...itemData, quantity: type === 'decrease' ? itemData?.quantity === 1 ? itemData.quantity : itemData?.quantity - 1 : itemData?.quantity + 1
		})
		setIsUpdated(true)
	}

	const handleSpecialInstruction = e => {
		setItemData({
			...itemData, instruction: e.target.value
		})
		setIsUpdated(true)
	}

	const handleAttributes = (e, item, mainItem) => {
		const { value } = e.target
		const newItem = mainItem.selectType === 'SINGLE' ? {
			...itemData?.attributes, [mainItem?.id]: {
				[value]: item
			}
		} : {
			...itemData.attributes, [mainItem?.id]: {
				...itemData.attributes?.[mainItem?.id], [value]: item
			}
		}

		const prices = mainItem.selectType === 'SINGLE' ? { ...total, [mainItem?.id]: item?.price } : { ...total, [mainItem?.id]: item?.price }
		setTotal({ ...prices })
		setItemData({
			...itemData, attributes: {
				selectType: mainItem.selectType,
				...newItem
			}
		})

		setIsUpdated(true)
	}

	const handleModifiers = (e, item, mainItem) => {
		const { value } = e.target
		const newItem = mainItem.selectType === 'SINGLE' ? {
			...itemData?.modifiers, [mainItem?.id]: {
				[value]: item
			}
		} : {
			...itemData.modifiers, [mainItem?.id]: {
				...itemData.modifiers[mainItem?.id], [value]: itemData.modifiers?.[mainItem?.id]?.[item?.id]?.id === item?.id ? {} : item
			}
		}

		const prices = mainItem.selectType === 'SINGLE' ? { ...total, [mainItem?.id]: item?.price } : { ...total, [mainItem?.id]: Object.values(newItem[mainItem?.id]).map(val => (val.price || 0))?.reduce((val, accum) => val + accum, 0) }
		setTotal({ ...prices })

		setItemData({
			...itemData, modifiers: {
				selectType: mainItem.selectType,
				...newItem
			}
		})
		setIsUpdated(true)
	}

	const fetchProductDetail = useCallback(async () => {
		setLoading(true)
		try {
			const response = await productDetails({ pId: id })
			if (response.data.data) {
				setLoading(false)
				setProductDetail(response.data?.data)
				window.scrollTo(0, 0)
				return response?.data?.data || {}
			}
		} catch (error) {
			if (error?.response?.data) {
				setLoading(false)
				enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong.', {
					variant: 'error'
				})
			}
			return error
		}
	}, [id])

	const handleFetchData = async() => {
		await fetchProductDetail().then(response => {
			fetchUpdatedData(response)
		}) 
	}

	useEffect(() => {
		handleFetchData()
	}, [])

	const handleAddtoCart = () => {
		const { id, imagepath, name } = productDetail
		const cloneCart = [...cartItems]
		const index = cloneCart.findIndex(val => val?.productId === id)
		// eslint-disable-next-line no-unused-vars
		const { selectType: attributeSelectType, ...attributes } = itemData?.attributes
		// eslint-disable-next-line no-unused-vars
		const { selectType: modifierSelectType, ...modifiers } = itemData?.modifiers

		const cloneAttributes = []
		const cloneModifiers = []

		Object.values({ ...attributes })?.forEach((val) => {
			const data = Object.entries(val).map(([, value]) => value)
			const attr = {
				quantity: 1,
				price: data?.[0]?.price,
				pamId: data?.[0]?.pamId,
				paiId: data?.[0]?.id
			}
			cloneAttributes.push(attr)
		})

		Object.keys({ ...modifiers })?.forEach((val) => {
			const data = Object.entries(val).map(([, value]) => value)
			const attr = {
				quantity: 1,
				price: data[0]?.price,
				pamId: data[0]?.pamId,
				paiId: data[0]?.id
			}
			cloneModifiers.push(attr)
		})

		const orderItem = {
			productId: id,
			price: finalTotal,
			name,
			instruction: itemData.instruction,
			imagepath,
			quantity: itemData?.quantity,
			attributes: cloneAttributes,
			modifiers: cloneModifiers,
			cloneAttributes: attributes,
			cloneModifiers: modifiers
		}


		dispatch(alreadyAdded ? updateItemInCart({ id: index, data: { ...orderItem } }) : addItemInCart(orderItem))
		enqueueSnackbar(isUpdated || alreadyAdded ? 'Item updated on basket successfully.' : 'Item added on basket successfully.', {
			variant: 'success'
		})

		dispatch(handleOpenCheckoutModal(true))
	}

	const finalTotal = useMemo(() => {
		const clone = Object.values({ ...total })
		return clone.reduce((val, accum) => val + accum, 0)
	}, [total])

	if (loading) return <Loader />

	return (
		<div
			{...props}
			className="w-full bg-white px-4 md:px-[80px] sm:px-20 pb-9 pt-12"
		>
			<div className="w-full h-full">
				<Breadcrump data={productDetail?.categoryId || ''} className="pb-8" />
				<Fragment>
					{Object.keys(productDetail)?.length ? <div className="w-full grid grid-cols-12 gap-4 md:gap-8">
						<div className="col-span-12 lg:col-span-6">
							<img
								className="max-w-full mx-auto xl:mx-0 rounded-2xl"
								src={productDetail?.imagepath}
								alt="product_img"
							/>
						</div>
						<div className="col-span-12 lg:col-span-6">
							<div className="lg:max-w-[625px]">
								<div className="w-full">
									<Heading
										tag="head_3"
										headClass="!font-semibold"
										text={productDetail.name}
									/>
									<Heading
										tag="head_4"
										headClass="!font-semibold"
										text={`£${productDetail.price}`}
									/>
									<p className="text-lg text-gray1 mt-4">
										{productDetail?.description}
									</p>
									<Label
										isShowIcon
										icon="star-filled"
										iconClass="text-black w-4"
										className="px-3 py-1 mt-6 text-base lg:text-base bg-cultured inline-flex rounded-3xl items-center font-semibold"
										label={'4.2'}
									/>
								</div>
								{productDetail?.attributes?.map((item) => (
									<div
										key={item.id}
										className="w-full bg-cultured rounded-md p-6 mt-8"
									>
										<div className="flex justify-between items-center">
											<div>
												<Heading
													headClass="!font-semibold"
													tag="head_4"
													text={item.name || ''}
												/>
												<p className="text-gray1 text-lg">{item.description || item?.selectType === 'SINGLE' ? "Choose 1" : ""}</p>
											</div>
											{item.isRequired && (
												<Label
													className="px-[14px] py-[6px] rounded-3xl bg-[#CEF7D0] text-green"
													label="Required"
												/>
											)}
										</div>
										<hr className="mt-6 text-light-gray" />
										<div>
											{item.attributes_items?.map((value) => (
												<div
													key={value.id}
													className="mt-6 flex justify-between items-center"
												>
													<div>
														<p className="text-lg">{value.name}</p>
														<p className="text-lg">+£{value.price}</p>
													</div>
													<input checked={itemData.attributes[item?.id]?.[value?.id]?.id == value?.id} value={value?.id} onChange={(e) => handleAttributes(e, value, item)} className="cursor-pointer" type={item?.selectType === 'SINGLE' ? "radio" : "checkbox"} />
												</div>
											))}
										</div>
									</div>
								))}

								{productDetail?.modifiers && productDetail?.modifiers?.map((item) => (
									<div
										key={item.id}
										className="w-full bg-cultured rounded-md p-6 mt-8"
									>
										<div className="flex justify-between items-center">
											<div>
												<Heading
													headClass="!font-semibold"
													tag="head_4"
													text={item.name}
												/>
												<p className="text-gray1 text-lg">Choose up to 1</p>
											</div>
											<Label
												className="px-[14px] py-[6px] rounded-3xl bg-[#CEF7D0] text-green"
												label="Required"
											/>
										</div>
										<hr className="mt-6 text-light-gray" />
										{item.modifiers_items && item.modifiers_items?.map((value) => (
											<div key={value.id} className="mt-6">
												<div className="flex justify-between items-center">
													<div>
														<p className="text-lg">{value?.name}</p>
														<p className="text-lg">+£{value?.price}</p>
													</div>
													<input checked={itemData.modifiers[item?.id]?.[value?.id]?.id == value?.id} onChange={(e) => handleModifiers(e, value, item)} value={value.id} className="cursor-pointer" type={item?.selectType === 'SINGLE' ? "radio" : "checkbox"} />
												</div>
											</div>))}
										{/* <div className="mt-6">
										<div className="flex justify-between items-center">
											<div>
												<p className="text-lg">
													Tomato Sauce Base{' '}
													<span className="text-green">Popular</span>
												</p>
											</div>
											<input className="cursor-pointer" type="checkbox" />
										</div>
									</div> */}
									</div>
								))}
								<div className="w-full bg-cultured rounded-md p-6 mt-8">
									<div className="flex justify-between items-center">
										<Heading
											headClass="!font-semibold"
											tag="head_5"
											text="Select Quantity"
										/>
										<div className="items-center justify-center px-1 sm:px-4 sm:py-1 flex border-[2px] w-[80px] sm:w-[100px] border-light-gray rounded-3xl">
											<Icons className="w-4 h-4 cursor-pointer" onClick={() => handleQuantity('decrease')} id="minus" />
											<Heading
												tag="head_6"
												headClass="font-semibold mx-2 sm:mx-3 text-[16px] md:text-[18px]"
												text={itemData?.quantity}
											/>
											<Icons className="w-4 h-4 cursor-pointer" onClick={() => handleQuantity('increase')} id="plus" />
										</div>
									</div>
								</div>

								<div className="mt-6 w-full">
									<Heading
										headClass="!font-semibold mb-4"
										tag="head_4"
										text="Special Instructions"
									/>
									<TextArea value={itemData.instruction} onChange={handleSpecialInstruction}
										rows={5}
										placeholder="Add note here. please contact the merchant directly if you have allergy"
									/>
									<p className="text-gray2 text-sm">
										You may be charged for extras.
									</p>
								</div>
								<Button
									btnClass="w-full mt-[48px]"
									type="button"
									label={`Add ${itemData.quantity} to order £${Number(finalTotal * itemData.quantity).toFixed(2)}`}
									size="large"
									onClick={handleAddtoCart}
									apperianceType="primary"
								/>
							</div>
						</div>
					</div> :
						<div className='w-full p-10 font-semibold text-center text-lg' >No data found.</div>}
				</Fragment>
			</div>
		</div>
	)
}

export default ProductDetails
