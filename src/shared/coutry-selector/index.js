import React, { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { classNames, coutryCodeFormatter } from '../../utils/helper'
import { coutryResponse } from '../../api/api'

const CountrySelector = ({
	defaultValue,
	className,
	handleChange,
	...props
}) => {
	const [config, setConfig] = useState({
		coutries: [],
		currentFlag: '',
		value: defaultValue.code,
		loading: false,
		isSkip: false
	})


	const getCoutryCode = async () => {
		setConfig({ ...config, loading: true })
		try {
			const response = await coutryResponse()
			if (response) {
				const flag = coutryCodeFormatter(response).find((val) => val.code === defaultValue.code && val.coutry === defaultValue.coutry)
				console.log('flag', flag)
				setConfig({
					...config,
					value: defaultValue?.code,
					coutries: coutryCodeFormatter(response),
					currentFlag: flag?.coutry,
					loading: false,
					isSkip: true
				})
			}
		} catch (error) {
			setConfig({
				...config,
				loading: false,
				isSkip: false
			})
		}
	}

	const handleCoutryChange = (value) => {
		const { code, coutry } = value
		console.log('country', coutry)
		setConfig({
			...config,
			currentFlag: coutry,
			value: code
		})
		handleChange && handleChange(value)
	}

	useEffect(() => {
		!config.isSkip && getCoutryCode()
	}, [config.isSkip, defaultValue])


	return (
		<Menu
			as="div"
			className={classNames('relative inline-block text-left', className)}
			{...props}
		>
			<Menu.Button className="flex justify-center items-center w-full py-[13px] px-2 bg-cultured1 rounded-lg">
				<div className="flex justify-between items-center mr-2">
					<img
						src={`https://flagcdn.com/${config?.currentFlag}.svg`}
						className="w-7 mr-1"
						alt="flag"
					/>
				</div>
				<p className="text-base font-medium">{config.value}</p>
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
				<Menu.Items className="absolute left-0 z-10 mt-2 w-56 md:origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div
						className={classNames(
							'overflow-auto',
							config.coutries?.length ? 'h-[310px]' : 'h-auto'
						)}
					>
						{config?.coutries?.length ? (
							<Fragment>
								{config?.coutries?.map((value) => (
									<Menu.Item key={value?.coutry}>
										{() => (
											<div
												onClick={() => handleCoutryChange(value)}
												className="text-left cursor-pointer w-full hover:bg-cultured1"
											>
												<div className="py-2 px-4 flex justify-start">
													<div className="flex justify-between items-center mr-2">
														<img
															src={`https://flagcdn.com/${value?.coutry}.svg`}
															className="w-6 mr-1"
															alt="flag"
														/>
													</div>
													<p className="text-base font-medium">
														{value?.name}{' '}
														<span className="text-gray1">{value?.code}</span>
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

export default CountrySelector
