import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { classNames } from '../utils/helper'
import Heading from '../shared/heading/Heading'
import Label from '../shared/labels/label'
import Icons from '../shared/Icons'
import Button from '../shared/Buttons/Button'
import banner from '../assets/images/vertical-banner.png'
import PaymentDetails from '../components/payment/payment-details'
import Address from '../components/address/Address'
import { enqueueSnackbar } from 'notistack'
import { addressList, createOrder, createPaymentIntent, getDiscount } from '../api/api'
import { useDispatch, useSelector } from 'react-redux'
import AddressListPopup from '../components/address/AddressList'
import { addOrderDetail, currentAddress, getAllAddressList, isEditAddress, redirectCart, removeItemInCart, updateItemInCart } from '../redux/action'
import Input from '../shared/forms/Input'
import useHistory from '../hooks/useHistory'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutLayout from '../components/payment/Checkout'
import Breadcrump from '../shared/Breadcrump'
import OrderInfo from '../components/orders/orderInfo'
import LoginRequiredPopup from '../components/cart/LoginRequired'

const stripePromise = loadStripe('pk_test_51NdtmWA5wqCNycpnDrogeALWkhd1N4qKvxyKzwEbPairCiiMvKPjB6n4hPTPvKv3o8oBNR4SDtpWJIF6NKM1Dy8400cR3TL7Ku')


const delivery_mode = [
	{
		id: 'Priority',
		name: 'Priority',
		desc: '10-20 min direct to you'
	},
	{
		id: 'Standard',
		name: 'Standard',
		desc: '10-20 min'
	},
	{
		id: 'Schedule',
		name: 'Schedule',
		desc: 'Select a time',
		icon: 'calender'
	}
]

const CartDetail = ({ className, ...props }) => {
	const history = useHistory()
	const customer = useSelector(({ auth }) => auth?.user)
	const isRedirectCartPage = useSelector(({ auth }) => auth?.isRedirectCartPage)
	const cartItems = useSelector(({ order }) => order?.cartItems)
	const storeConfig = useSelector(({ storeConfig }) => storeConfig)
	const cardDetail = useSelector(({ card }) => card)
	const dispatch = useDispatch()
	const [activeKey, setActiveKey] = useState('Standard')
	const [clientSecret, setClientSecret] = useState("")
	const [discountCode, setDiscountCode] = useState("")
	const [tipCode, setTipCode] = useState('$0.00')
	const [discountLoading, setDiscountLoading] = useState(false)
	const [applied, setApplied] = useState(false)
	const [order, setOrder] = useState({})
	const [discountData, setDiscountData] = useState({
		discountAmount: 0
	})
	const [open, setOpen] = useState({
		payment: false,
		address: false,
		checkout: false,
		addressListPopup: false,
		order: false,
		login: false
	})
	const [addList, setAddList] = useState([])
	const [instruction, setInstruction] = useState({
		isShow: false,
		value: ''
	})
	const [selectedAddress, setSelectedAddress] = useState({})
	const [loading, setLoading] = useState(false)

	const appearance = {
		theme: 'stripe'
	}

	const options = {
		clientSecret,
		appearance
	}

	useEffect(() => {
		isRedirectCartPage && dispatch(redirectCart())
	}, [dispatch, isRedirectCartPage])

	const handleActive = (id) => setActiveKey(id)
	const handleToggle = (name, data = {}) => setOpen({ ...open, [name]: !open[name], ...data })

	const handleInstruction = () => setInstruction({ ...instruction, isShow: !instruction?.isShow })

	const subTotal = useMemo(() => {
		return Number(cartItems?.map(val => val?.quantity * val?.price)?.reduce((data, accum) => data + accum, 0))?.toFixed(2)
	}, [cartItems])

	// const totalTax = useMemo(() => {
	// 	return Number(cartItems?.map(val => val?.price)?.reduce((data, accum) => data + accum, 0))?.toFixed(2)
	// }, [cartItems])

	const totalTax = Number(1).toFixed(2)

	const handleChange = (e) => {
		const { value } = e.target
		const val = value?.length > 10 ? discountCode : String(value).split('').map(i => i.toUpperCase()).join('')
		setDiscountCode(val)
		setApplied(false)
		setDiscountData({ discountAmount: 0 })
	}

	console.log('discountData', discountData)

	const handleDiscount = async () => {
		setDiscountLoading(true)
		try {
			const response = await getDiscount({
				storeId: storeConfig?.storeId,
				discountCode
			})
			if (response?.data) {
				setDiscountLoading(false)
				setDiscountData(response?.data?.data)
				setApplied(true)
				enqueueSnackbar('Discount code applied.', {
					variant: 'success'
				})
			}
		} catch (error) {
			setDiscountLoading(false)
			setDiscountData({
				discountAmount: 0
			})
			enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong.', {
				variant: 'error'
			})
			return error
		}
	}

	const fetchAddress = useCallback(async () => {
		try {
			const response = await addressList({
				customerId: customer?.id
			})
			if (response?.data) {
				setAddList(response?.data?.data || [])
				setSelectedAddress(response?.data?.data?.[0] || {})
				dispatch(currentAddress(response?.data?.data?.[0] || {}))
				dispatch(getAllAddressList(response?.data?.data || []))
			}
		} catch (error) {
			if (error?.response?.data?.message === 'No record found.') {
				dispatch(getAllAddressList([]))
				setSelectedAddress({})
				setAddList([])
				return
			}
			return error
		}
	}, [customer, dispatch])

	useEffect(() => {
		customer && fetchAddress()
	}, [customer, open])

	const handleAddress = () => {
		handleToggle(addList?.length ? 'addressListPopup' : 'address')
		dispatch(isEditAddress(false))
	}

	const handleQuantity = (type, id) => {
		const cloneCart = [...cartItems]
		if (type === 'decrease' && cloneCart[id]?.quantity === 1) return
		dispatch(updateItemInCart({
			id,
			data: {
				...cloneCart[id], quantity: type === 'increase' ? cloneCart[id]?.quantity + 1 : cloneCart[id]?.quantity - 1
			}
		}))
	}

	const handleOrderData = async (payload = {}) => {
		setLoading(true)
		try {
			const response = await createOrder(payload)
			if (response?.data) {
				setLoading(false)
				setOrder({
					...response?.data?.data, total: payload?.totalAmount, name: customer?.fullname,
					address: selectedAddress
				})
				dispatch(addOrderDetail(response?.data?.data))
				handleToggle('order', { checkout: false })
			}
		} catch (error) {
			setLoading(false)
			enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong.', {
				variant: 'error'
			})
			return error
		}
	}

	const handleOrder = async ({ paymentData: data }) => {
		const payload = {
			storeId: storeConfig?.storeId,
			customerId: customer?.id,
			customerAddressId: selectedAddress?.id,
			totalQuantity: [...cartItems]?.map(val => (val?.quantity))?.reduce((data, acum) => data + acum, 0),
			totalAmount: Number(subTotal) + Number(totalTax) + 1 - Number(discountData?.discountAmount),
			subTotalAmount: Number(subTotal),
			taxTotalAmount: Number(totalTax),
			discountRate: 0,
			noOfPersons: '1',
			DeliveryType: activeKey,
			tipAmount: Number(String(tipCode).replace('$', '')),
			createFrom: 'WEB',
			discountType: null,
			orderType: 'DiningIn',
			notes: instruction?.value || '',
			stripePid: data?.id || '',
			stripePmid: data?.payment_method || '',
			stripePaymentStatus: data?.status || '',
			order_items: [...cartItems]?.map(({ productId, quantity, price, attributes, modifiers }) => ({
				productId,
				quantity,
				taxTotal: price,
				subTotal: price * quantity,
				discountTotal: 0,
				attributes,
				modifiers
			})),

			"discountRate": 0,
			"discountAmount": 1.00,
			"discountType": "FIX"

		}

		if (Object.keys(discountData).length) {
			payload['discountId'] = discountData?.id,
				payload['discountRate'] = Number(discountData?.discountPercentage),
				payload['discountAmount'] = parseFloat(discountData?.discountAmount),
				payload['discountType'] = discountData?.discountType
		}

		await handleOrderData({ ...payload })
	}

	console.log('tripCode', tipCode.length)

	const handleTipCode = e => {
		const { value } = e.target
		const split = value.split('')
		console.log('split', split, split.filter(val => {
			if (Number(val) !== NaN) return val
			return
		}).join('').split('').filter(data => {
			if (/^[A-Z]*$/.test(data)) {
				return null
			} else if (/^[a-z]*$/.test(data)) {
				return null
			} else return data
		}).join(''))

		const array = split.filter(val => {
			if (Number(val) !== NaN) return val
			return
		}).join('').split('').filter(data => {
			if (/^[A-Z]*$/.test(data)) {
				return null
			} else if (/^[a-z]*$/.test(data)) {
				return null
			} else return data
		}).join('')

		setTipCode(array?.length === 0 ? '$0.00' : value?.length < 6 ? array : tipCode)
	}

	const handlePaymentIntent = async () => {

		if (!customer) {
			return handleToggle('login')
		}

		if (!Object.keys(selectedAddress).length) {
			enqueueSnackbar('Please add delivery address.', { variant: 'error' })
			return handleToggle('address')
		}
		setLoading(true)
		console.log('subTotal', subTotal, totalTax, discountData)
		try {
			const response = await createPaymentIntent({
				amount: (Number(subTotal) + Number(totalTax) + 1 - discountData?.discountAmount || 0) * 100,
				currency: 'gbp',
				metadata: {
					customerId: customer?.id || '',
					items: JSON.stringify([...cartItems]?.map(({ productId, quantity }) => ({
						productId,
						quantity
					})))
				},
				receipt_email: customer?.email || '',
				shipping: {
					name: customer?.fullname || '',
					address: `${selectedAddress?.streetName}, ${selectedAddress?.locality}(${selectedAddress?.postCode}), ${selectedAddress?.country}`
				}
			})

			if (response?.data) {
				setLoading(false)
				setClientSecret(response?.data?.data?.client_secret || '')
				handleToggle('checkout')
			}

		} catch (error) {
			setLoading(false)
			enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong.', {
				variant: 'error'
			})
			return error
		}
	}

	const handleRemoveItem = useCallback((id) => {
		dispatch(removeItemInCart(id))
		enqueueSnackbar('Item removed on basket successfully', {
			variant: 'success'
		})
	}, [dispatch])

	console.log('cardDetail', cardDetail)

	return (
		<div
			{...props}
			className={classNames('mx-4 my-4 !lg:my-8 md:px-20 md:py-16', className)}
		>
			<Breadcrump className="pb-8" />
			<div className="w-full grid grid-cols-12 gap-4 md:gap-8">
				<div className="col-span-12 md:col-span-8 bg-white drop-shadow-md p-8">
					<Heading
						headClass="text-[20px] md:text-[24px] font-semibold mb-6"
						tag="head_4"
						text="Delivery Details"
					/>
					<div className="w-full mb-6">
						<div className="flex justify-between items-center mb-6">
							<p className="text-black flex">
								<Icons id="location" className="w-8 md:w-5 h-5 mr-3" />
								{addList?.length ? `${selectedAddress?.streetName}, ${selectedAddress?.locality}(${selectedAddress?.postCode}), ${selectedAddress?.country}` : "Add address"}
							</p>
							<Label
								label={addList?.length ? "Edit Address" : "Add"} onClick={() => handleAddress()}
								className="px-4 py-1 cursor-pointer bg-cultured rounded-[14px]"
							/>
						</div>
						<div className="flex justify-between items-center mb-6">
							<div className="flex text-black">
								<Icons id="human" className="w-5 h-5 mr-3" />
								<div className="flex flex-col">
									<p className="text-black">Meet at Door</p>
									{instruction?.isShow ? <Input className='!py-1 mt-2' value={instruction?.value} onChange={(e) => setInstruction({ ...instruction, value: e.target.value })} /> : <p className="text-[#369E1C] cursor-pointer font-semibold">
										{!instruction?.value ? 'Add Delivery Instruction' : instruction?.value}
									</p>}
								</div>
							</div>
							<Label onClick={handleInstruction} label={instruction?.isShow ? "Save" : instruction?.value ? "Edit" : "Add"} className="px-4 py-1 cursor-pointer bg-cultured rounded-[14px]" />
						</div>
					</div>
					<hr className="text-cultured" />
					<Heading
						headClass="text-[20px] md:text-[24px] font-semibold my-6"
						tag="head_4"
						text="Delivery Estimate"
					/>
					<div className="grid grid-cols-12 gap-3 w-full mb-6">
						{delivery_mode?.map(({ id, name, icon, desc }) => {
							return (
								<div
									key={id}
									onClick={() => handleActive(id)}
									className={classNames(
										'bg-cultured cursor-pointer col-span-12 md:col-span-6 lg:col-span-4 rounded-[4px] p-4 border',
										activeKey === id ? 'border-gray1' : 'border-cultured'
									)}
								>
									<div className="flex justify-between items-center">
										<div>
											<p className="font-medium">{name}</p>
											<p className="text-gray1">{desc}</p>
										</div>
										<Icons id={icon || ''} />
									</div>
								</div>
							)
						})}
					</div>
					<hr className="text-cultured" />
					{/* <Heading
						headClass="text-[20px] md:text-[24px] font-semibold my-6"
						tag="head_4"
						text="Payment Method"
					/>
					<div className="flex justify-between items-center mb-6">
						<IconButton className="bg-cultured1 w-full flex px-[14px] py-3 rounded justify-between items-center mr-4">
							<div className='flex items-center' >
								<Icons id="card" className="w-5 h-5" />
								<p className="ml-1 md:ml-4">Credit Card</p>
							</div>
							{cardDetail?.card_number ? <p>{String(cardDetail?.card_number).replace(/\d{4}(?= \d{1})/g, '****') || ''}</p> : null}
						</IconButton>
						<Button
							label={cardDetail?.isUpdated ? "Edit" : "Add"}
							btnClass="text-white md:px-12 py-[12px] !rounded"
							onClick={() => handleToggle('payment')}
							apperianceType="primary"
						/>
						{cardDetail?.isUpdated ? <button className={'bg-red py-3 px-4 outline-none border border-red rounded-[4px] ml-1'} >
							<Icons id='trash' className='w-6 h-6 cursor-pointer text-white' /> 
						</button>: null}
					</div>
					<hr className="text-cultured" /> */}
					<Heading
						headClass="text-[20px] md:text-[24px] font-semibold my-6"
						tag="head_4"
						text="Order Summary"
					/>
					<div className="w-full">
						<p className="font-semibold text-sm mb-6">Total {cartItems?.length} Item</p>
						{cartItems.map((data, index) => (
							<div
								key={data?.productId}
								className="flex justify-between md:items-center mb-6"
							>
								<div className="flex w-full">
									<img
										className="w-24 h-24 md:w-20 md:h-20 rounded cursor-pointer"
										src={data?.imagepath || ''}
										alt="cart_item"
										onClick={() => history(`/products/detail/${data?.productId}`)}
									/>
									<div className="flex flex-col md:flex-row md:justify-between w-full md:items-center ml-6">
										<div>
											<Heading
												tag="head_5"
												headClass="text-[18px] md:text-[24px] font-semibold text-black mb-2"
												text={data?.name || ''}
											/>
											<div className='flex items-center'>
												<div className="items-center justify-center px-1 sm:px-3 sm:py-1 flex border-[2px] w-[80px] sm:w-[100px] border-light-gray rounded-3xl mr-2">
													<Icons onClick={() => handleQuantity('decrease', index)}
														className="w-4 h-4 cursor-pointer"
														id="minus"
													/>
													<Heading
														tag="head_6"
														headClass="font-semibold mx-2 sm:mx-3 text-[16px] md:text-[18px]"
														text={data?.quantity}
													/>
													<Icons onClick={() => handleQuantity('increase', index)} className="w-4 h-4 cursor-pointer" id="plus" />
												</div>
												<Icons onClick={() => handleRemoveItem(index)} id='trash' className='w-6 h-6 cursor-pointer text-red' />
											</div>
										</div>
										<Heading
											tag="head_5"
											headClass="mt-1 text-black"
											text={`$ ${Number(data?.quantity * data?.price)?.toFixed(2)}`}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="col-span-12 md:col-span-4 drop-shadow-md">
					<div className="w-full bg-white px-6 pt-8 pb-11">
						<img alt="banner" src={banner} />
						<Heading
							headClass="text-[24px] font-semibold mt-8"
							tag="head_4"
							text="Order total"
						/>
						<div className="mt-6 mb-8">
							<div className="flex justify-between items-center mb-4">
								<p>Subtotal</p>
								<p>$ {subTotal}</p>
							</div>
							<div className="flex justify-between items-center mb-4">
								<p>Tax charge</p>
								<p>$ {totalTax}</p>
							</div>
							<div className="flex justify-between items-center mb-4">
								<p>Delivery charge</p>
								<p>$1.00</p>
							</div>
							<div className="flex justify-between items-center mt-4 mb-4">
								<Input inputClass='w-full mr-2'
									{...{
										name: 'discountCode',
										value: discountCode,
										type: 'text',
										placeholder: 'Discount Code',
										onChange: handleChange,
										className: 'sm:min-w-full',
										error: ''
									}}
								/>
								<Button size='large' onClick={handleDiscount} apperianceType='primary' disabled={discountLoading || applied} label={applied ? 'Applied' : 'Apply'} />
							</div>
						</div>
						<hr className="text-cultured" />
						<div className="mt-[18px]">
							<div className="flex justify-between items-center">
								<p className="font-medium">Add a Tip</p>
								<input className="px-4 rounded-2xl bg-cultured max-w-[80px]" type='text' onChange={handleTipCode} value={tipCode} />
							</div >
							<p className="text-xs text-gray1 my-4">
								100% of your tip goes to your courier. Tips are based on your
								order total of $25.13 before any discounts or promotions.
							</p>
							<hr className="text-cultured" />
							<div className="mt-2 mb-6">
								<div className="flex justify-between items-center text-lg">
									<p>Discount</p>
									<p>{discountData?.discountAmount ? '-' : ''}${Number(discountData?.discountAmount || 0).toFixed(2)}</p>
								</div>
								<div className="flex justify-between items-center mt-6 text-xl font-semibold">
									<p>Total</p>
									<p>${Number(Number(subTotal) + Number(totalTax) + 1.00 - Number(discountData?.discountAmount || 0))?.toFixed(2)}</p>
								</div>
							</div>
							<Button
								btnClass="w-full text-white"
								apperianceType="primary"
								size="large"
								type='button'
								disabled={loading}
								onClick={handlePaymentIntent}
								label={loading ? "Please wait" : "Continue To Payment"}
							/>
						</div >
					</div >
				</div >
			</div >
			<CheckoutLayout {...{ toggle: open.checkout, handleClose: handleToggle, options, stripePromise, clientSecret, handleOrder }} />
			<PaymentDetails {...{ toggle: open.payment, handleClose: handleToggle }} />
			<Address {...{ toggle: open.address, handleClose: handleToggle }} />
			<AddressListPopup {...{ toggle: open.addressListPopup, handleClose: handleToggle }} />
			<LoginRequiredPopup {...{ toggle: open.login, handleClose: handleToggle }} />
			<OrderInfo {...{ toggle: open.order, handleClose: handleToggle, order }} />
		</div >
	)
}

const EmptyCart = ({ className, ...props }) => {
	const history = useHistory()
	const handleRedirect = (path = '/') => history(path)

	return <div {...props} className={classNames('mx-4 my-4 bg-white !lg:my-8 md:px-20 md:py-16', className)}>
		<div className='w-full flex justify-center flex-col items-center' >
			<Icons className='w-80 h-80' id='empty-cart' />
			<Heading tag='head_4' headClass='mt-8' text='Your basket is empty' />
			<Button
				btnClass="mt-4 w-80"
				type="submit"
				onClick={() => handleRedirect('/')}
				label="Continue Shopping"
				size="large"
				apperianceType="primary"
			/>
		</div>
	</div>
}
const CartProvider = ({ isEmpty, ...props }) => {
	return !isEmpty ? <EmptyCart {...props} /> : <CartDetail {...props} />
}
export default CartProvider
