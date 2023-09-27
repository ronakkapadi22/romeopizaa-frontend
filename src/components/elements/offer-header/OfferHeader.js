import React, { useState } from 'react'
import { classNames } from '../../../utils/helper'
import IconButton from '../../../shared/Buttons/IconButton'
import Icons from '../../../shared/Icons'
import Label from '../../../shared/labels/label'
import CustomPortal from '../../../shared/CustomPortal'
import FindStore from '../find-store/FindStore'
import { useDispatch, useSelector } from 'react-redux'
import { clearCartItems, setStoreConfig, setStoreData } from '../../../redux/action'
import useHistory from '../../../hooks/useHistory'
import Heading from '../../../shared/heading/Heading'
import { enqueueSnackbar } from 'notistack'

const OfferHeader = ({ className, ...props }) => {

	const dispatch = useDispatch()
	const history = useHistory()
	const store = useSelector(({ store }) => store?.storeDetail)
	const storeConfig = useSelector(({ storeConfig }) => storeConfig)

	const [storeData, setStore] = useState({})
	const [toggle, setToggle] = useState({
		stores: false,
		warning: false
	})

	const handleToggle = (name, data = {}) => setToggle({ ...toggle, [name]: !toggle[name], ...data })

	const selectConfigStore = (val) => {
		if (val?.id === storeConfig?.storeId) {
			enqueueSnackbar('Already selected', {
				variant: 'success'
			})
			handleToggle('stores')
			return
		}
		handleToggle('warning', { warning: true, stores: false })
		setStore({ ...val })
	}

	const handleChangeStore = () => {
		handleToggle('warning', { warning: false, stores: false })
		dispatch(setStoreConfig({
			storeId: storeData?.id
		}))
		dispatch(setStoreData({ data: storeData }))
		dispatch(clearCartItems([]))
		history('/')
		enqueueSnackbar('Store changed successfully', {
			variant: 'success'
		})
	}

	return (
		<div
			className={classNames(
				'px-4 md:px-[80px] py-5 lg:py-[9px] bg-black flex justify-between items-center flex-col-reverse md:flex-row',
				className
			)}
			{...props}
		>
			<IconButton
				onClick={() => handleToggle('stores')}
				className="bg-white w-full md:w-auto min-w-[215px] rounded-3xl flex items-center py-1 pl-3 pr-7 mt-3 md:mt-0"
			>
				<Icons id="location" />
				<p className="text-gray1 text-[13px] ml-2">
					{store?.data?.businessName || 'Select Store'}
				</p>
			</IconButton>
			<div className="flex flex-col-reverse lg:flex-row items-center md:items-start">
				<Label
					className="flex items-center text-white text-[13px] font-semibold"
					isShowIcon
					iconClass="mr-1"
					icon="discount-orange"
					label="Discount Off 25% only for Burger Item"
				/>
				<div className="flex mb-1 lg:mb-0">
					<Label
						className="flex items-center pr-2 border-r border-white lg:border-none text-white lg:ml-2 text-[13px] font-semibold"
						isShowIcon
						iconClass="mr-1 text-[#FFA323] w-[20px] h-[20px]"
						icon="phone"
						label={store?.data?.phone || "800-323-4567"}
					/>
					<Label
						className="flex items-center text-white ml-2 text-[13px] font-semibold"
						isShowIcon
						iconClass="mr-1 text-[#FFA323] w-[20px] h-[20px]"
						icon="timer"
						label={`Mon-Sun ${store?.data?.startTime || '08:00AM'} - ${store?.data?.endTime || '10:00PM'}`}
					/>
				</div>
			</div>
			{toggle.stores ? <CustomPortal
				animation="animate-popup-top"
				{...{ toggle: toggle.stores }}
				className="relative w-full flex items-center"
			>
				<FindStore {...{ handleToggle, selectConfigStore }} />
			</CustomPortal> : null}

			{
				toggle.warning ? <CustomPortal animation="animate-popup-top"
					{...{ toggle: toggle.warning }}
					className="relative w-full flex items-center">
					<div className="relative w-[96%] md:w-[575px] p-8 mx-auto rounded-lg bg-white">
						<div className='w-full' >
							<div className='flex justify-start items-start p-2' >
								<div className='w-full ml-2' >
									<Heading text='Are you sure change the store?' tag='head_4' />
									<p className='text-gray2 text-lg' >Clicking yes will change store with lose previous store data.</p>
								</div>
							</div>
							<div className='mt-8 flex justify-end items-end w-full' >
								<button onClick={() => handleChangeStore()} className='mr-1 outline-none py-3 w-[120px] px-4 rounded-lg bg-green text-white' >
									Yes, change
								</button>
								<button onClick={() => handleToggle('warning', { stores: true })} className='ml-1 outline-none py-3 px-4 w-[120px] rounded-lg bg-red text-white' >Cancel</button>
							</div>
						</div>
					</div>
				</CustomPortal> : null
			}
		</div>
	)
}

export default OfferHeader
