import React from 'react'
import Icons from '../Icons'

const Label = ({ isShowIcon, icon, label, iconClass, ...props }) => {
	return (
		<p {...props}>
			{isShowIcon ? (
				<Icons className={iconClass} id={icon} />
			) : null}{' '}
			{label}
		</p>
	)
}

export default Label
