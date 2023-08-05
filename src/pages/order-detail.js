import React from 'react'
// eslint-disable-next-line import/no-unresolved
import Breadcrump from '../shared/Breadcrump'
import Heading from '../shared/heading/Heading'
import Button from '../shared/Buttons/Button'
import Icons from '../shared/Icons'
import Label from '../shared/labels/label'
import IconButton from '../shared/Buttons/IconButton'
import cartItem from '../assets/images/cart-item.png'

const OrderDetail = ({ ...props }) => {
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
								label="Preparing"
								className="px-4 py-1 cursor-pointer text-orange bg-[#FFF5E0] rounded-[14px]"
							/>
						</div>
						<div className="w-full mb-6">
							<div className="flex justify-between items-center mb-6">
								<p className="text-black flex">
									<Icons id="location" className="w-8 md:w-5 h-5 mr-3" />
									4517 Washington Ave. Manchester, Kentucky
								</p>
							</div>
							<div className="flex justify-between items-center mb-6">
								<div className="flex text-black">
									<Icons id="human" className="w-5 h-5 mr-3" />
									<div className="flex flex-col">
										<p className="text-black">Meet at Door</p>
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
						<p className="font-medium mb-6">Priority</p>
						<hr className="text-cultured" />
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
									<p>1203 **** ***** ****</p>
								</div>
							</IconButton>
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
												<Heading
													tag="head_5"
													headClass="text-[18px] md:text-[24px] font-semibold text-black mb-2"
													text="Chili Cheese Fries"
												/>
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
							<Heading
								headClass="text-[24px] font-semibold"
								tag="head_4"
								text="Order Summary"
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
							</div>
							<Button
								btnClass="w-full text-white md:mt-[200px]"
								apperianceType="primary"
								size="large"
								label="Ready for Pickup"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OrderDetail
