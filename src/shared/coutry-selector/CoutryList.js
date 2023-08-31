import React, { Fragment, useMemo, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { classNames } from '../../utils/helper'

const CountryList = ({ value, error, disabled, name, placeholder, className, option, handleChange, withIcon, ...props }) => {
	
	const [query, setQuery] = useState('')

	const filterOption = useMemo(() => {
		const clone = [...option]
		return clone.filter(({ label: val }) => {
			if(!val){
				return val
			}else if(val?.toLowerCase()?.includes(query?.toLowerCase())){
				return val
			}else return null
		})
	}, [query, option])

	return (
		<Menu
			as="div"
			className={classNames(
					'relative xs:min-w-full w-full placeholder:text-gray2 sm:min-w-[328px] outline-none rounded-lg bg-cultured1',
					disabled ? 'placeholder:text-light-gray' : '',
					error
						? 'border border-[#DC2626] focus:!border-[#DC2626]'
						: 'border border-cultured1 focus:border-gray1',
					className,
					withIcon ? 'pl-12' : ''
				)}
			{...props}
		>
			<Menu.Button className="flex w-full px-4 py-3 bg-cultured1 rounded-lg">
				<Fragment>{value || placeholder}</Fragment>
			</Menu.Button>

			{/* {dropdown} */}

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute left-0 z-10 mt-1 w-full md:origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<input type='text' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search' className='w-full px-4 py-2 outline-none mb-4' />
					<div
						className={classNames(
							'overflow-auto',
							filterOption?.length ? 'h-[240px]' : 'h-auto'
						)}
					>
						{filterOption?.length ? (
							<Fragment>
								{filterOption?.map(({id, label, value}) => (
									<Menu.Item key={id}>
										{() => (
											<div
												onClick={() => handleChange({target:{name, value}})}
												className="text-left cursor-pointer w-full hover:bg-cultured1"
											>
												<div className="py-2 px-4 flex justify-start">
													<p className="text-base font-medium">
														{label}
													</p>
												</div>
											</div>
										)}
									</Menu.Item>
								))}
							</Fragment>
						) : (
							<Menu.Item className="text-gray-700 block px-4 py-2 text-sm">
								<div>No data.</div>
							</Menu.Item>
						)}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default CountryList
