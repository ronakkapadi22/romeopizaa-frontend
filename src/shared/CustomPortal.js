import React, { Fragment, useEffect, useRef } from 'react'
import { Portal } from '@reach/portal'
import { classNames } from '../utils/helper'

const CustomPortal = ({
	children,
	animation,
	className,
	handleClose,
	toggle,
	...props
}) => {
	const ref = useRef(null)

	// close drawer when you click on "ESC" key
	useEffect(() => {
		const handleEscape = (event) => {
			if (!toggle) return

			if (event.key === 'Escape') {
				handleClose && handleClose(false)
			}
		}
		document.addEventListener('keyup', handleEscape)
		return () => document.removeEventListener('keyup', handleEscape)
	}, [toggle, handleClose])

	//put focus on drawer dialogue
	useEffect(() => {
		if (!toggle) return
		ref.current?.focus()

		const html = document.documentElement
		const scrollbarWidth = window.innerWidth - html.clientWidth

		html.style.overflow = 'hidden'
		html.style.paddingRight = `${scrollbarWidth}px`

		return () => {
			html.style.overflow = ''
			html.style.paddingRight = ''
		}
	}, [toggle])

	return (
		<Portal>
			{toggle ? (
				<Fragment>
					<div
						{...props}
						className="fixed top-0 left-0 z-30 w-screen h-screen bg-black opacity-50"
					/>
					<div className="fixed top-0 left-0 z-40 w-full h-full m-0 overflow-hidden">
						<div
							aria-modal={true}
							role="dialogue"
							className={classNames(
								'h-full right-0 mx-0 my-0 absolute focus:outline-none',
								className
							)}
							tabIndex={-1}
							ref={ref}
						>
							<div
								className={classNames(
									'relative flex flex-col w-full pointer-events-auto',
									animation
								)}
							>
								{children}
							</div>
						</div>
					</div>
				</Fragment>
			) : null}
		</Portal>
	)
}

export default CustomPortal
