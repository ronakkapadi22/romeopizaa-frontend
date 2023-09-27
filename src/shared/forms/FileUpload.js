import React from 'react'
import Icons from '../Icons'
import profile from '../../assets/images/user.png'
import { classNames } from '../../utils/helper'

const FileUpload = ({ image, className, handleChange, ...props }) => {
	return (
		<div className={classNames('relative w-[120px] h-[120px]', className)}>
			<img
				alt="profile"
				className="rounded-[50%] w-[120px] h-[120px]"
				src={image || profile}
			/>
			<label className="absolute tracking-wide bg-white cursor-pointer p-[10px] bottom-0 right-0 rounded-[50%]">
				<Icons id="pen" />
				<input
					{...props}
					onChange={handleChange}
					type="file"
					accept='image/*'
					className="hidden"
				/>
			</label>
		</div>
	)
}

export default FileUpload
