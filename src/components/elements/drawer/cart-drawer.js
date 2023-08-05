import React from 'react'
import Icons from '../../../shared/Icons'
import Heading from '../../../shared/heading/Heading'
import CartItem from '../../cart/CartItem'
import Button from '../../../shared/Buttons/Button'

const CartDrawer = ({ handleToggle, ...props }) => {
	return (
		<div {...props} className="relative w-full p-6 bg-white h-full">
			<div className="flex items-center justify-between mb-12">
				<Heading
					tag="head_4"
					headClass="text-black text-[24px] font-medium"
					text="Cart (2)"
				/>
				<Icons
					id="close"
					onClick={handleToggle}
					className="text-black w-5 h-5 cursor-pointer"
				/>
			</div>
			<CartItem className="mt-12" />
			<div className="absolute w-full bottom-0 left-0 p-6">
				<Button
					btnClass="w-full"
					type="button"
					label="Go to checkout"
					size="large"
					apperianceType="primary"
				/>
				<Button
					btnClass="w-full mt-4"
					type="submit"
					label="Continue Shopping"
					size="large"
					apperianceType="secondary"
				/>
			</div>
		</div>
	)
}

export default CartDrawer
