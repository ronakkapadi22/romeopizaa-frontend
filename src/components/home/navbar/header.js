import React from 'react'
import { classNames } from '../../../utils/helper'
import Icons from '../../../shared/Icons'
import Label from '../../../shared/labels/label'
import Button from '../../../shared/Buttons/Button'
import IconButton from '../../../shared/Buttons/IconButton'
import CustomPortal from '../../../shared/CustomPortal'
import useToggle from '../../../hooks/useToggle'
import { useSelector } from 'react-redux'
import useHistory from '../../../hooks/useHistory'
import AuthDrawer from '../../elements/drawer/auth-drawer'
import CartDrawer from '../../elements/drawer/cart-drawer'

const Header = ({ ...props }) => {
	const auth = useSelector(({ auth }) => auth)
	const history = useHistory()
	const [toggle, setToggle] = useToggle(false)
	const [isOpen, setIsOpen] = useToggle(false)

	const handleToggle = () => setToggle((prev) => !prev)
	const handleCartToggle = () => setIsOpen((prev) => !prev)

	const handleNavigate = (path = '/') => history(path)

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
			<div className="flex items-center">
				<Label
					className="bg-black px-3 py-2 rounded-3xl flex text-white cursor-pointer"
					iconClass="text-white"
					onClick={handleCartToggle}
					label={10}
					isShowIcon
					icon="cart"
				/>
				{!auth?.isLogged ? (
					<Button
						label="Login"
						btnClass="ml-3 hidden lg:block"
						onClick={() => handleNavigate('/login')}
						{...{ size: 'medium', apperianceType: 'secondary' }}
					/>
				) : null}
				<IconButton
					onClick={handleToggle}
					className={classNames(
						'bg-cultured ml-2 p-[10px] rounded-lg',
						auth?.isLogged ? 'block' : 'lg:hidden'
					)}
				>
					<Icons className="w-[20px] h-[20px]" id="menu" />
				</IconButton>
			</div>
			<CustomPortal
				className="flex w-[380px] lg:w-96"
				{...{
					toggle,
					handleClose: handleToggle,
					animation: 'animate-drawer-right'
				}}
			>
				<AuthDrawer {...{ auth, handleToggle }} />
			</CustomPortal>

			{/* cart drawer */}
			<CustomPortal
				className="flex w-full sm:w-[480px] lg:w-[596px]"
				{...{
					toggle: isOpen,
					handleClose: handleCartToggle,
					animation: 'animate-drawer-right'
				}}
			>
				<CartDrawer {...{ handleToggle: handleCartToggle }} />
			</CustomPortal>
		</section>
	)
}

export default Header
