import React, { useCallback, useEffect, useMemo, useState } from 'react'
// eslint-disable-next-line import/no-unresolved
import Breadcrump from '../shared/Breadcrump'
import Heading from '../shared/heading/Heading'
import Icons from '../shared/Icons'
import Label from '../shared/labels/label'
import { useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { getOrder } from '../api/api'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../shared/Buttons/Button'
import CustomPortal from '../shared/CustomPortal'
import { cancelOrder } from '../redux/action'
import { classNames } from '../utils/helper'
import useHistory from '../hooks/useHistory'

const OrderDetail = ({ ...props }) => {

	const dispatch = useDispatch()
	const history = useHistory()
	const { address } = useSelector(({ address }) => address)
	const updateOrders = useSelector(({ updateOrders }) => updateOrders)
	const cardDetail = useSelector(({ card }) => card)
	const { storeDetail } = useSelector(({ store }) => store)
	const [open, setOpen] = useState({
		cancel: false
	})
	const [order, setOrder] = useState({})
	const { id } = useParams()

	const getOrderInfo = useCallback(async (params_id) => {
		try {
			const response = await getOrder({
				orderId: params_id
			})
			if (response?.data) {
				setOrder(response?.data?.data || {})
			}
		} catch (error) {
			enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong', {
				variant: 'error'
			})
			return error
		}
	}, [])

	useEffect(() => {
		getOrderInfo(id)
	}, [id])

	const handleDeleteOrder = () => {
		dispatch(cancelOrder({
			orderId: id,
			orderStatus: 'Canceled'
		}))
		handleToggle('cancel')
		enqueueSnackbar('Your order has been canceled successfully', {
			variant: 'success'
		})
		history('/orders')
	}

	const orderData = useMemo(() => {
		const clone = { ...order }
		return { ...clone, address: address.find(val => val?.id === clone?.customerAddressId) }
	}, [order, address])

	const handleToggle = (name, data = {}) => setOpen({
		...open, [name]: !open?.[name], ...data
	})

	return (
		<div
			className="w-full bg-cultured1 px-4 md:px-8 sm:px-20 pb-9 pt-12"
			{...props}
		>
			<div className="w-full h-full">
				<Breadcrump className="pb-8" />
				<div className="w-full grid grid-cols-12 gap-4 md:gap-8">
					<div className="col-span-12 md:col-span-8 bg-white drop-shadow-md px-4 py-8 md:p-8">
						<div className="mb-6 flex justify-between items-center">
							<Heading
								headClass="text-[20px] md:text-[24px] font-semibold"
								tag="head_4"
								text="Delivery Details"
							/>
							<Label
								label={updateOrders?.some(val => val?.orderId === String(id)) ? "Canceled" : orderData?.orderStatus}
								className={classNames("px-4 py-1 cursor-pointer rounded-[14px]", updateOrders?.some(val => val?.orderId === String(id)) ? 'text-red bg-[#fbe0e0]' : 'text-orange bg-[#FFF5E0]')}
							/>
						</div>
						<div className="w-full mb-6">
							<div className="flex justify-between items-center mb-6">
								<p className="text-black flex">
									{orderData?.address?.streetName ? <>
										<Icons id="location" className="w-8 md:w-5 h-5 mr-3" />
										{`${orderData?.address?.streetName}, ${orderData?.address?.locality}(${orderData?.address?.postCode}), ${orderData?.address?.country}`}
									</> : null
									}
								</p>
							</div>
							<div className="flex justify-between items-center mb-6">
								<div className="flex text-black">
									<Icons id="human" className="w-5 h-5 mr-3" />
									<div className="flex flex-col">
										<p className="text-black">Meet at Door</p>
										<p className="text-[#369E1C] cursor-pointer font-semibold">
											{orderData?.notes || 'No instruction.'}
										</p>
									</div>
								</div>
							</div>
						</div>
						<hr className="text-cultured" />
						<Heading
							headClass="text-[20px] md:text-[24px] mt-6 mb-2"
							tag="head_4"
							text="Delivery Estimate"
						/>
						<p className="font-medium mb-6">{orderData?.deliveryType || 'Priority'}</p>
						{/* <hr className="text-cultured" />
						<Heading
							headClass="text-[20px] md:text-[24px] font-semibold my-6"
							tag="head_4"
							text="Payment Method"
						/>
						<div className="flex justify-between items-center mb-6">
							<IconButton className="bg-cultured1 w-full flex px-[14px] py-3 rounded items-center">
								<Icons id="card" className="w-5 h-5" />
								<div className="flex justify-between items-center w-full">
									<p className="ml-1 md:ml-4">Credit Card</p>
									{cardDetail?.card_number ? <p>{String(cardDetail?.card_number).replace(/\d{4}(?= \d{1})/g, '****') || ''}</p> : null}
								</div>
							</IconButton>
						</div> */}
						<hr className="text-cultured" />
						<Heading
							headClass="text-[20px] md:text-[24px] font-semibold my-6"
							tag="head_4"
							text="Order Summary"
						/>
						<div className="w-full">
							<p className="font-semibold text-sm mb-6">Total {orderData?.order_items?.length || 0} Item</p>
							{orderData?.order_items?.map((data) => (
								<div
									key={data?.id}
									className="flex justify-between md:items-center mb-6 cursor-pointer"
								>
									<div className="flex w-full">
										<img
											className="w-24 h-24 md:w-20 md:h-20 rounded"
											src={data?.imagepath}
											alt="cart_item"
										/>
										<div className="flex flex-col md:flex-row md:justify-between w-full md:items-center ml-6">
											<div>
												<Heading
													tag="head_5"
													headClass="text-[18px] md:text-[24px] font-semibold text-black mb-2"
													text={data?.name || ''}
												/>
												<p>Qty: {data?.quantity || 0}</p>
											</div>
											<Heading
												tag="head_5"
												headClass="text-[18px] md:text-[24px] mt-1 font-semibold text-black"
												text={`$ ${Number(data?.subTotal).toFixed(2)}`}
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="col-span-12 md:col-span-4 drop-shadow-md">
						<div className="w-full bg-white px-6 pt-8 pb-11">
							<Heading
								headClass="text-[24px] font-semibold"
								tag="head_4"
								text="Order Summary"
							/>
							<div className="mt-6 mb-16">
								<div className="flex justify-between items-center mb-4">
									<p>Subtotal</p>
									<p>$ {Number(orderData?.subTotalAmount).toFixed(2)}</p>
								</div>
								<div className="flex justify-between items-center mb-4">
									<p>Tax charge</p>
									<p>$ {Number(orderData?.taxTotalAmount).toFixed(2)}</p>
								</div>
								<div className="flex justify-between items-center mb-4">
									<p>Delivery charge</p>
									<p>$ {Number(storeDetail?.data?.deliveryCharges || 1).toFixed(2)}</p>
								</div>
							</div>
							<hr className="text-cultured" />
							<div className="mt-[18px]">
								<div className="mt-2 mb-6">
									<div className="flex justify-between items-center text-lg mt-4">
										<p>Discount</p>
										<p>{orderData?.discountAmount ? '-' : ''}${Number(orderData?.discountAmount || 0).toFixed(2)}</p>
									</div>
									<div className="flex justify-between items-center mt-6 text-xl font-semibold">
										<p>Total</p>
										<p>$ {Number(orderData?.totalAmount).toFixed(2)}</p>
									</div>
								</div>
							</div>
							{!updateOrders?.some(val => val?.orderId === String(id)) ? <Button
								btnClass="w-full !border-red !bg-red !text-white md:mt-6"
								apperianceType="primary"
								size="large"
								disabled={updateOrders?.some(val => val?.orderId === String(id))}
								onClick={() => handleToggle('cancel')}
								label={updateOrders?.some(val => val?.orderId === String(id)) ? "Order Canceled" : "Cancel Order"}
							/> : null}
						</div>
					</div>
				</div>
			</div>
			{
				open.cancel ? <CustomPortal animation="animate-popup-top"
					{...{ toggle: open.cancel }}
					className="relative w-full flex items-center">
					<div className="relative w-[96%] md:w-[575px] p-8 mx-auto rounded-lg bg-white">
						<div className='w-full' >
							<div className='flex justify-start items-start p-2' >
								<div className='w-full ml-2' >
									<Heading text='Are you sure delete the order?' tag='head_4' />
								</div>
							</div>
							<div className='mt-8 flex justify-end items-end w-full' >
								<button onClick={() => handleDeleteOrder()} className='mr-1 outline-none py-3 w-[120px] px-4 rounded-lg bg-green text-white' >
									Yes
								</button>
								<button onClick={() => handleToggle('cancel')} className='ml-1 outline-none py-3 px-4 w-[120px] rounded-lg bg-red text-white' >No</button>
							</div>
						</div>
					</div>
				</CustomPortal> : null
			}
		</div>
	)
}

export default OrderDetail
