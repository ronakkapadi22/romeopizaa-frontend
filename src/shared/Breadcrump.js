import React, { Fragment } from 'react'
import Icons from './Icons'
import { classNames } from '../utils/helper'
import useHistory from '../hooks/useHistory'
import { useLocation, useParams } from 'react-router-dom'

const Breadcrump = ({ ...props }) => {
	const path = useLocation()
	const { id } = useParams()
	const history = useHistory()
	const pathSliceData = path.pathname.split('/').filter((val) => !!val)
	const pathSlice = pathSliceData.filter(val => val !== id)

	const handleClick = (index) => {
		if (index + 1 !== pathSlice.length) {
			const path = [pathSlice[index - 1], pathSlice[index]]?.join('/')
			history(`${index === 0 ? '' : '/'}${path}`)
		}
	}

	return (
		<div className="flex" {...props}>
			<div className="flex">
				{pathSlice?.map((val, index) => {
					return (
						<Fragment key={index}>
							<p
								onClick={() => handleClick(index)}
								className={classNames(
									'text-lg capitalize',
									index + 1 !== pathSlice.length
										? 'text-gray1 cursor-pointer'
										: 'text-black'
								)}
							>
								{val}
							</p>
							{index + 1 !== pathSlice.length ? (
								<Icons
									className="w-4 h-4 text-gray1 mx-1 mt-[7px]"
									id="right"
								/>
							) : null}
						</Fragment>
					)
				})}
			</div>
		</div>
	)
}

export default Breadcrump
