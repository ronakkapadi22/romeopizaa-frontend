import React from 'react'
import { classNames } from '../../utils/helper'

const Heading = ({ tag, text, headClass, ...props }) => {
	switch (tag) {
		case 'head_1':
			return (
				<h1
					className={classNames(
						'font-semibold text-[34px] leading-[51px] md:text-[50px] md:leading-[75px]',
						headClass
					)}
					{...props}
				>
					{text}
				</h1>
			)
		case 'head_2':
			return (
				<h2
					className={classNames(
						'font-semibold text-[24px] leading-[36px] md:text-[40px] md:leading-[60px]',
						headClass
					)}
					{...props}
				>
					{text}
				</h2>
			)
		case 'head_3':
			return (
				<h3
					className={classNames(
						'font-semibold text-[22px] leading-[33px] md:font-medium md:text-[32px] md:leading-[48px]',
						headClass
					)}
					{...props}
				>
					{text}
				</h3>
			)
		case 'head_4':
			return (
				<h4
					className={classNames(
						'font-semibold text-[20px] leading-[30px] md:font-medium md:text-[24px] md:leading-[36px]',
						headClass
					)}
					{...props}
				>
					{text}
				</h4>
			)
		case 'head_5':
			return (
				<h5
					className={classNames(
						'font-semibold text-[18px] leading-[27px] md:font-medium md:text-[20px] md:leading-[30px]',
						headClass
					)}
					{...props}
				>
					{text}
				</h5>
			)
		case 'head_6':
			return (
				<h6
					className={classNames(
						'font-semibold text-[16px] leading-[24px] md:font-medium md:text-[18px] md:leading-[27px]',
						headClass
					)}
					{...props}
				>
					{text}
				</h6>
			)
		default:
	}
}

export default Heading
