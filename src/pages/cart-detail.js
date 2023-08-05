import React, { useCallback, useEffect, useState } from 'react'
import { classNames } from '../utils/helper'
import Heading from '../shared/heading/Heading'
import Label from '../shared/labels/label'
import Icons from '../shared/Icons'
import IconButton from '../shared/Buttons/IconButton'
import Button from '../shared/Buttons/Button'
import cartItem from '../assets/images/cart-item.png'
import banner from '../assets/images/vertical-banner.png'
import PaymentDetails from '../components/payment/payment-details'
import Address from '../components/address/Address'
import { enqueueSnackbar } from 'notistack'
import { addressList } from '../api/api'
import { useDispatch, useSelector } from 'react-redux'
import AddressListPopup from '../components/address/AddressList'
import { getAllAddressList, isEditAddress } from '../redux/action'

const delivery_mode = [
	{
		id: 'priority',
		name: 'Priority',
		desc: '10-20 min direct to you'
	},
	{
		id: 'standard',
		name: 'Standard',
		desc: '10-20 min'
	},
	{
		id: 'schedule',
		name: 'Schedule',
		desc: 'Select a time',
		icon: 'calender'
	}
]

const CartDetail = ({ className, ...props }) => {
	const customer = useSelector(({ auth }) => auth?.user)
	const dispatch = useDispatch()
	const [activeKey, setActiveKey] = useState('standard')
	const [open, setOpen] = useState({
		payment: false,
		address: false,
		addressListPopup: false
	})
	const [addList, setAddList] = useState([])

	const handleActive = (id) => setActiveKey(id)
	const handleToggle = (name, data = {}) => setOpen({ ...open, [name]: !open[name], ...data })

	const fetchAddress = useCallback(async () => {
		try {
			const response = await addressList({
				customerId: customer?.id
			})
			if (response?.data) {
				setAddList(response?.data?.data || [])
				dispatch(getAllAddressList(response?.data?.data || []))
			}
		} catch (error) {
			enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong.', {
				variant: 'error'
			})
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

	return (
		<div
			{...props}
			className={classNames('mx-4 my-4 !lg:my-8 md:px-20 md:py-16', className)}
		>
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
								{addList?.length ? "4517 Washington Ave. Manchester, Kentucky" : "Add address"}
							</p>
							<Label
								label={addList?.length ? "Edit" : "Add"} onClick={() => handleAddress()}
								className="px-4 py-1 cursor-pointer bg-cultured rounded-[14px]"
							/>
						</div>
						<div className="flex justify-between items-center mb-6">
							<div className="flex text-black">
								<Icons id="human" className="w-5 h-5 mr-3" />
								<div className="flex flex-col">
									<p className="text-black">Meet at Door</p>
									<p className="text-[#369E1C] cursor-pointer font-semibold">
										Add Delivery Instruction
									</p>
								</div>
							</div>
							<Label label="Edit" className="px-4 py-1 cursor-pointer bg-cultured rounded-[14px]" />
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
					<Heading
						headClass="text-[20px] md:text-[24px] font-semibold my-6"
						tag="head_4"
						text="Payment Method"
					/>
					<div className="flex justify-between items-center mb-6">
						<IconButton className="bg-cultured1 w-full flex px-[14px] py-3 rounded items-center mr-4">
							<Icons id="card" className="w-5 h-5" />
							<p className="ml-1 md:ml-4">Credit Card</p>
						</IconButton>
						<Button
							label="Add"
							btnClass="text-white md:px-12 py-[12px] !rounded"
							onClick={() => handleToggle('payment')}
							apperianceType="primary"
						/>
					</div>
					<hr className="text-cultured" />
					<Heading
						headClass="text-[20px] md:text-[24px] font-semibold my-6"
						tag="head_4"
						text="Order Summary"
					/>
					<div className="w-full">
						<p className="font-semibold text-sm mb-6">Total 2 Item</p>
						{Array(3)
							.fill(1)
							.map((data) => (
								<div
									key={data}
									className="flex justify-between md:items-center mb-6"
								>
									<div className="flex w-full">
										<img
											className="w-24 h-24 md:w-20 md:h-20 rounded"
											src={cartItem}
											alt="cart_item"
										/>
										<div className="flex flex-col md:flex-row md:justify-between w-full md:items-center ml-6">
											<div>
												<Heading
													tag="head_5"
													headClass="text-[18px] md:text-[24px] font-semibold text-black mb-2"
													text="Chili Cheese Fries"
												/>
												<div className="items-center justify-center px-1 sm:px-3 sm:py-1 flex border-[2px] w-[80px] sm:w-[100px] border-light-gray rounded-3xl">
													<Icons
														className="w-4 h-4 cursor-pointer"
														id="minus"
													/>
													<Heading
														tag="head_6"
														headClass="font-semibold mx-2 sm:mx-3 text-[16px] md:text-[18px]"
														text="1"
													/>
													<Icons className="w-4 h-4 cursor-pointer" id="plus" />
												</div>
											</div>
											<Heading
												tag="head_5"
												headClass="text-[18px] md:text-[24px] mt-1 font-semibold text-black"
												text="$3.20"
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
						<div className="mt-6 mb-16">
							<div className="flex justify-between items-center mb-4">
								<p>Subtotal</p>
								<p>$5.40</p>
							</div>
							<div className="flex justify-between items-center mb-4">
								<p>Service charge</p>
								<p>$1.90</p>
							</div>
							<div className="flex justify-between items-center mb-4">
								<p>Delivery charge</p>
								<p>$2.02</p>
							</div>
						</div>
						<hr className="text-cultured" />
						<div className="mt-[18px]">
							<div className="flex justify-between items-center">
								<p className="font-medium">Add a Tip</p>
								<Label className="px-4 rounded-2xl bg-cultured" label="£0.00" />
							</div>
							<p className="text-xs text-gray1 my-4">
								100% of your tip goes to your courier. Tips are based on your
								order total of £25.13 before any discounts or promotions.
							</p>
							<hr className="text-cultured" />
							<div className="mt-2 mb-6">
								<div className="flex justify-between items-center text-lg">
									<p>Discount 20%</p>
									<p>£1.00</p>
								</div>
								<div className="flex justify-between items-center mt-6 text-xl font-semibold">
									<p>Total</p>
									<p>£11.31</p>
								</div>
							</div>
							<Button
								btnClass="w-full text-white"
								apperianceType="primary"
								size="large"
								label="Continue To Payment"
							/>
						</div>
					</div>
				</div>
			</div>
			<PaymentDetails {...{ toggle: open.payment, handleClose: handleToggle }} />
			<Address {...{ toggle: open.address, handleClose: handleToggle }} />
			<AddressListPopup {...{ toggle: open.addressListPopup, handleClose: handleToggle }} />
		</div>
	)
}

export default CartDetail
