import React from 'react'
import Icons from '../../../shared/Icons'
import Heading from '../../../shared/heading/Heading'
import CartItem from '../../cart/CartItem'
import Button from '../../../shared/Buttons/Button'
import { useSelector } from 'react-redux'
import useHistory from '../../../hooks/useHistory'
import { classNames } from '../../../utils/helper'

const CartDrawer = ({ handleToggle, ...props }) => {

	const cartItems = useSelector(({ order }) => order?.cartItems)
	const history = useHistory()

	const handleRedirect = (path = '/') => {
		handleToggle()
		history(path)
	}

	return (
		<div {...props} className="relative w-full p-6 bg-white h-full">
			<div className="flex items-center justify-between mb-12">
				<Heading
					tag="head_4"
					headClass="text-black text-[24px] font-medium"
					text={`Basket ${cartItems?.length ? `(${cartItems?.length})` : ""}`}
				/>
				<Icons
					id="close"
					onClick={handleToggle}
					className="text-black w-5 h-5 cursor-pointer"
				/>
			</div>
			{cartItems?.length ? <CartItem cartList={cartItems} {...{ handleToggle }} className="mt-12 overflow-auto h-[600px] sm:h-[650px] md:h-[685px]" /> : <div {...props} className={classNames('mx-4 my-4 bg-white !lg:my-8 md:px-20 md:py-16')}>
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
			</div>}
			{cartItems?.length ? <div className="absolute w-full bottom-0 left-0 p-6">
				<Button
					btnClass="w-full"
					type="button"
					onClick={() => handleRedirect('/cart')}
					label="Go to checkout"
					size="large"
					apperianceType="primary"
				/>
				<Button
					btnClass="w-full mt-4"
					type="submit"
					label="Continue Shopping"
					onClick={() => handleRedirect('/')}
					size="large"
					apperianceType="secondary"
				/>
			</div> : null}
		</div>
	)
}

export default CartDrawer
