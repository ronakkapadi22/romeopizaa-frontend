import React from 'react'
import usePagination from '../hooks/usePagination'
import { classNames } from '../utils/helper'
import Icons from './Icons'

const Pagination = ({
	onPageChange,
	totalCount,
	siblingCount = 1,
	currentPage,
	pageSize,
	className,
	...props
}) => {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize
	})

	if (currentPage === 0 || paginationRange?.length < 2) {
		return null
	}
	let lastPage = paginationRange[paginationRange?.length - 1]

	const onNext = () => {
		if(currentPage === lastPage) return
		onPageChange(currentPage + 1)
	}
	const onPrevious = () => {
		if(currentPage === 1) return
		onPageChange(currentPage - 1)
	}

	return (
		<ul className={classNames('list-none flex', className)} {...props}>
			{/* Left navigation arrow */}
			<li
				className={classNames('w-9 h-9 flex cursor-pointer justify-center items-center')}
				onClick={onPrevious}
			>
				<Icons className="w-[20px] h-[20px] text-gray2" id="left" />
			</li>
			{paginationRange.map((pageNumber, index) => {
				// If the pageItem is a DOT, render the DOTS unicode character
				if (pageNumber === '...') {
					return (
						<li
							key={index}
							className={classNames(
								'w-9 h-9 cursor-pointer flex justify-center items-center text-black bg-cultured rounded-md mx-3',
								pageNumber === currentPage ? 'text-white bg-[#FFA323]' : ''
							)}
						>
							<Icons className="w-[20px] h-[20px]" id="three-dots" />
						</li>
					)
				}

				// Render our Page Pills
				return (
					<li
						key={index}
						className={classNames(
							'w-9 h-9 cursor-pointer flex justify-center items-center text-black bg-cultured rounded-md mx-3',
							pageNumber === currentPage ? 'text-white !bg-[#FFA323]' : ''
						)}
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</li>
				)
			})}
			{/*  Right Navigation arrow */}
			<li
				className={classNames('w-9 h-9 flex cursor-pointer justify-center items-center')}
				onClick={onNext}
			>
				<Icons className="w-[20px] h-[20px] text-gray2" id="right" />
			</li>
		</ul>
	)
}

export default Pagination
