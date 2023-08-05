import React from 'react'
import Icons from '../../../shared/Icons'

const LocationList = () => {
	return (
		<div className="mt-6 h-[240px] md:h-[330px] overflow-auto">
			{Array(10)
				.fill(1)
				.map((val) => (
					<div key={val} className="flex items-center mb-6 cursor-pointer">
						<div className="bg-cultured rounded-full p-[10px]">
							<Icons className="text-black w-5 h-5" id="location" />
						</div>
						<div className="flex flex-col justify-end items-start text-black ml-4">
							<p className="font-medium">Training</p>
							<p className="text-sm text-gray1">
								3891 Ranchview Dr. Richardson, California 62639
							</p>
						</div>
					</div>
				))}
		</div>
	)
}

export default LocationList
