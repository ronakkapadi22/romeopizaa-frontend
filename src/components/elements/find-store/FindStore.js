import React, { useState } from 'react'
import Heading from '../../../shared/heading/Heading'
import Icons from '../../../shared/Icons'
import FieldGroup from '../../../shared/forms/FieldGroup'
import Input from '../../../shared/forms/Input'
import LocationList from '../location/locationList'

const FindStore = ({ handleStoreLocation, ...props }) => {
	const [storeLocation, setStoreLocation] = useState({
		store: ''
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setStoreLocation({
			...storeLocation,
			[name]: value
		})
	}

	const handleClear = (name) => {
		setStoreLocation({
			...storeLocation,
			[name]: ''
		})
	}

	return (
		<div
			{...props}
			className="relative w-[96%] md:w-[575px] p-8 mx-auto rounded-lg bg-white"
		>
			<div className="w-full flex justify-between items-center">
				<Heading tag="head_3" headClass="text-2xl" text="Select Store " />
				<Icons
					id="close"
					className="cursor-pointer"
					onClick={handleStoreLocation}
				/>
			</div>
			<FieldGroup className="mt-4" isHideError isHideLabel>
				<Input
					type="text"
					placeholder="Titas of Manila "
					name="store"
					value={storeLocation.store}
					onChange={handleChange}
					handleClear={handleClear}
					withIcon
					clearText
				/>
			</FieldGroup>
			<LocationList />
		</div>
	)
}

export default FindStore
