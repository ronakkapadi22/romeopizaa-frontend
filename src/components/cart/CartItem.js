import React, { useCallback } from 'react'
import Heading from '../../shared/heading/Heading'
import Icons from '../../shared/Icons'
import { useDispatch } from 'react-redux'
import { removeItemInCart, updateItemInCart } from '../../redux/action'
import useHistory from '../../hooks/useHistory'
import { enqueueSnackbar } from 'notistack'

const CartItem = ({ className, cartList, handleToggle, isPopup, ...props }) => {

	const dispatch = useDispatch()
	const history = useHistory()

	const handleNavigate = useCallback((path = '/') => {
		history(path)
		handleToggle(isPopup)
	}, [history, handleToggle])

	const handleQuantity = (type, id) => {
		const cloneCart = [...cartList]
		if (type === 'decrease' && cloneCart[id]?.quantity === 1) return
		dispatch(updateItemInCart({
			id,
			data: {
				...cloneCart[id], quantity: type === 'increase' ? cloneCart[id]?.quantity + 1 : cloneCart[id]?.quantity - 1
			}
		}))
	}

	const handleRemoveItem = useCallback((id) => {
		dispatch(removeItemInCart(id))
		enqueueSnackbar('Item removed on basket successfully', {
			variant: 'success'
		})
	}, [dispatch])

	return (
		<div {...props} className={className}>
			{cartList.map((data, index) => (
				<div key={data?.productId} className="bg-cultured1 mb-6 last:mb-0">
					<div className="w-full">
						<div className="flex justify-between items-center py-4 px-6">
							<p className="font-semibold text-sm">{data?.quantity} Item</p>
							<Icons id="three-dots" className='cursor-pointer' onClick={() => handleNavigate(`/products/detail/${data?.productId}`)} />
						</div>
						<div className="px-6 flex justify-between items-center mb-3 sm:mb-6">
							<div>
								<Heading
									tag="head_6"
									headClass="mb-[6px] sm:mb-2 font-semibold text-[18px] md:text-[20px]"
									text={data?.name}
								/>
								<div className='flex items-center' >
									<div className="items-center mr-3 justify-center px-1 sm:px-4 sm:py-1 flex border-[2px] w-[80px] sm:w-[100px] border-light-gray rounded-3xl">
										<Icons onClick={() => handleQuantity('decrease', index)} className="w-4 h-4 cursor-pointer" id="minus" />
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
							<img
								alt="cart-img"
								className="w-[70px] md:w-[90px]"
								src={data?.imagepath}
							/>
						</div>
					</div>
					<div className="flex font-semibold text-lg sm:text-xl justify-between items-center bg-cultured rounded p-[14px]">
						<Heading tag="head_5" text="Subtotal" />
						<Heading tag="head_5" text={`$ ${data?.quantity * data?.price}`} />
					</div>
				</div>
			))}
		</div>
	)
}

export default CartItem
