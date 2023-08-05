import React from 'react'
import Heading from '../../shared/heading/Heading'
import Icons from '../../shared/Icons'
import cartitem from '../../assets/images/cart-item.png'

const CartItem = ({ ...props }) => {
	return (
		<div {...props} className="overflow-auto h-[600px] sm:h-[650px] md:h-[685px]">
			{Array(8)
				.fill(1)
				.map((data) => (
					<div key={data} className="bg-cultured1 mb-6 last:mb-0">
						<div className="w-full">
							<div className="flex justify-between items-center py-4 px-6">
								<p className="font-semibold text-sm">1 Item</p>
								<Icons id="three-dots" />
							</div>
							<div className="px-6 flex justify-between items-center mb-3 sm:mb-6">
								<div>
									<Heading
										tag="head_6"
										headClass="mb-[6px] sm:mb-2 font-semibold text-[18px] md:text-[20px]"
										text="Chili Cheese Fries"
									/>
									<div className="items-center justify-center px-1 sm:px-4 sm:py-1 flex border-[2px] w-[80px] sm:w-[100px] border-light-gray rounded-3xl">
										<Icons className="w-4 h-4 cursor-pointer" id="minus" />
										<Heading
											tag="head_6"
											headClass="font-semibold mx-2 sm:mx-3 text-[16px] md:text-[18px]"
											text="1"
										/>
										<Icons className="w-4 h-4 cursor-pointer" id="plus" />
									</div>
								</div>
								<img
									alt="cart-img"
									className="w-[70px] md:w-auto"
									src={cartitem}
								/>
							</div>
						</div>
						<div className="flex font-semibold text-lg sm:text-xl justify-between items-center bg-cultured rounded p-[14px]">
							<Heading tag="head_5" text="Subtotal" />
							<Heading tag="head_5" text="$3.20" />
						</div>
					</div>
				))}
		</div>
	)
}

export default CartItem
