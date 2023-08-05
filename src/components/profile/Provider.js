import React from 'react'
import Heading from '../../shared/heading/Heading'
import { classNames } from '../../utils/helper'

const tabs = [
	{
		id: 1,
		tabKey: 'account_info',
		label: 'Account info'
	},
	{
		id: 2,
		tabKey: 'security',
		label: 'Security'
	}
]

const Provider = ({ activeKey, handleTab, ...props }) => {
	return (
		<div
			className="w-full flex flex-row md:flex-col px-4 py-4 md:py-8"
			{...props}
		>
			{tabs?.map(({ id, tabKey, label }) => (
				<div
					key={id}
					onClick={() => handleTab(tabKey)}
					className={classNames(
						'w-full cursor-pointer xl:w-[300px] rounded-[4px]',
						activeKey === tabKey ? 'bg-cultured' : ''
					)}
				>
					<Heading
						tag="head_5"
						text={label}
						headClass="font-semibold py-4 px-6 !text-[16px] sm:text-base md:!text-[20px]"
					/>
				</div>
			))}
		</div>
	)
}

export default Provider
