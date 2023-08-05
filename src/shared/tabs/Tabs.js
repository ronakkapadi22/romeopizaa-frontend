import React from 'react'
import { classNames } from '../../utils/helper'

const Tabs = ({ tabs, activeKey, setActiveKey, ...props }) => {
	return (
		<div
			{...props}
			className="bg-cultured inline rounded-3xl pt-[4px] pb-[5px] pr-[4px]"
		>
			{tabs?.map((data) => (
				<span
					key={data?.activeKey}
					onClick={() => setActiveKey(data?.activeKey)}
					className={classNames(
						'text-black px-4 py-1 ml-[4px] rounded-3xl text-sm font-semibold cursor-pointer',
						data.activeKey === activeKey ? 'bg-white' : ''
					)}
				>
					{data?.tab}
				</span>
			))}
		</div>
	)
}

export default Tabs
