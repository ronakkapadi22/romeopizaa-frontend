import React, { Fragment } from 'react'
import { classNames } from '../../utils/helper'
import Icons from '../Icons'

const Label = ({ children, isShowIcon, icon, label, iconClass, isOpenCheckoutModal, ...props }) => {
	return (
		<Fragment>
			{children ? <div className={classNames(isOpenCheckoutModal ? 'fixed right-[60px] sm:right-[136px]' : 'relative')}>
				<p {...props}>
					{isShowIcon ? (
						<Icons className={iconClass} id={icon} />
					) : null}{' '}
					{label}
				</p>
				{children}
			</div> : <p {...props}>
				{isShowIcon ? (
					<Icons className={iconClass} id={icon} />
				) : null}{' '}
				{label}
			</p>}
		</Fragment>
	)
}

export default Label
