import React, { useState } from 'react'
import { classNames } from '../../../utils/helper'
import Icons from '../../../shared/Icons'
import Label from '../../../shared/labels/label'
import Button from '../../../shared/Buttons/Button'
import IconButton from '../../../shared/Buttons/IconButton'
import CustomPortal from '../../../shared/CustomPortal'
import useToggle from '../../../hooks/useToggle'
import { useDispatch, useSelector } from 'react-redux'
import useHistory from '../../../hooks/useHistory'
import AuthDrawer from '../../elements/drawer/auth-drawer'
import CartDrawer from '../../elements/drawer/cart-drawer'
import CartItem from '../../cart/CartItem'
import Heading from '../../../shared/heading/Heading'
import { handleOpenCheckoutModal } from '../../../redux/action'

const Header = ({ ...props }) => {
	const auth = useSelector(({ auth }) => auth)
	const dispatch = useDispatch()
	const cartItems = useSelector(({ order }) => order?.cartItems)
	const isOpenCheckoutModal = useSelector(({ order }) => order?.isOpenCheckoutModal)
	const history = useHistory()
	const [toggle, setToggle] = useState(false)
	const [isOpen, setIsOpen] = useToggle(false)

	const handleToggle = (isPopup) => {
		setToggle(isPopup ? !isPopup : !toggle)
		dispatch(handleOpenCheckoutModal(false))
	}
	const handleCartToggle = () => setIsOpen((prev) => !prev)
	const handleNavigate = (path = '/') => history(path)

	const total = Number(cartItems?.map(val => val?.quantity * val?.price)?.reduce((val, accum) => val + accum, 0)).toFixed(2)

	const handleRedirect = (path = '/') => {
		dispatch(handleOpenCheckoutModal(false))
		history(path)
	}

	return (
		<section
			{...props}
			className={classNames(
				'w-full h-[92px] bg-white flex justify-between items-center py-4 px-2 sm:px-[80px] shadow-[0_2px_12px_0px_rgba(0,0,0,0.1)]'
			)}
		>
			<div onClick={() => handleNavigate()} className="flex">
				<Icons
					className="w-[160px] cursor-pointer md:w-full"
					id="header_logo"
				/>
			</div>
			{window.location.pathname !== '/search' ? (
				<IconButton
					onClick={() => handleNavigate('/search')}
					className="bg-cultured hidden w-full md:w-auto min-w-[350px] rounded-3xl lg:flex items-center py-3 pl-4 pr-6"
				>
					<Icons className="text-gray2" id="search" />
					<p className="text-gray1 text-sm ml-2">Food,groceries,drinks,etc</p>
				</IconButton>
			) : null}
			<div className="relative flex items-center">
				<Label
					className={classNames("bg-black px-3 py-2 rounded-3xl flex text-white cursor-pointer", 'relative')}
					iconClass="text-white mr-1"
					onClick={handleCartToggle}
					label={cartItems?.length ? `Basket ${cartItems?.length}` : 'Basket 0'}
					isShowIcon
					{...{ isOpenCheckoutModal }}
					icon="cart"
				>
					{isOpenCheckoutModal ? <div className={classNames('w-[360px] z-[9] bg-white shadow-[0_2px_12px_0px_rgba(0,0,0,0.3)] rounded-lg h-[400px] top-[50px] right-0 absolute', isOpenCheckoutModal ? '-right-[48px] sm:right-0' : '')}>
						<div {...props} className="relative w-full p-4 bg-white overflow-auto h-full rounded-lg ">
							<div className="flex items-center justify-between">
								<Heading
									tag="head_5"
									headClass="text-black text-[24px] font-medium"
									text={`Basket ${cartItems?.length ? `(${cartItems?.length})` : ""}`}
								/>
								<Icons
									id="close"
									onClick={() => dispatch(handleOpenCheckoutModal(false))}
									className="text-black w-5 h-5 cursor-pointer"
								/>
							</div>
							{cartItems?.length ? <CartItem cartList={cartItems} {...{ handleToggle, isPopup: true }} className="mt-4" /> : <div {...props} className={classNames('mx-4 my-4 bg-white')}>
								<div className='w-full flex justify-center flex-col items-center' >
									<Icons className='w-40 h-40' id='empty-cart' />
									<Heading tag='head_4' headClass='mt-4' text='Your basket is empty' />
									<Button
										btnClass="mt-6 w-full"
										type="submit"
										onClick={() => handleRedirect('/')}
										label="Continue Shopping"
										size="large"
										apperianceType="primary"
									/>
								</div>
							</div>}
							{cartItems?.length ? <div className="relative w-full mt-6">
								<Button
									btnClass="w-full"
									type="button"
									onClick={() => handleRedirect('/cart')}
									label={`Go to checkout ${total}`}
									size="large"
									apperianceType="primary"
								/>
							</div> : null}
						</div>
					</div> : null}
				</Label>
				{!auth?.isLogged ? (
					<Button
						label="Login"
						btnClass="ml-3 hidden lg:block"
						onClick={() => handleNavigate('/login')}
						{...{ size: 'medium', apperianceType: 'secondary' }}
					/>
				) : null}
				<IconButton
					onClick={() => handleToggle(false)}
					className={classNames(
						'bg-cultured ml-2 p-[10px] rounded-lg',
						auth?.isLogged ? 'block' : 'lg:hidden'
					)}
				>
					<Icons className="w-[20px] h-[20px]" id="menu" />
				</IconButton>
			</div>
			{toggle ? <CustomPortal
				className="flex w-[380px] lg:w-96"
				{...{
					toggle,
					handleClose: handleToggle,
					animation: 'animate-drawer-right'
				}}
			>
				<AuthDrawer {...{ auth, handleToggle }} />
			</CustomPortal> : null}

			{/* cart drawer */}
			{isOpen ? <CustomPortal
				className="flex w-full sm:w-[480px] lg:w-[596px]"
				{...{
					toggle: isOpen,
					handleClose: handleCartToggle,
					animation: 'animate-drawer-right'
				}}
			>
				<CartDrawer {...{ handleToggle: handleCartToggle }} />
			</CustomPortal> : null}
		</section>
	)
}

export default Header
