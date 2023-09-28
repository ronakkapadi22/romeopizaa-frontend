import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { classNames, handleScrollToElement } from '../../../utils/helper'
import Icons from '../../../shared/Icons'
import Heading from '../../../shared/heading/Heading'
import useHistory from '../../../hooks/useHistory'

const CustomRightArrow = ({ onClick, ...rest }) => {
	return (
		<button
			className="absolute text-black flex justify-center items-center w-8 h-8 right-0 bg-cultured rounded-3xl"
			{...rest}
			onClick={() => onClick()}
		>
			<Icons id="right" />
		</button>
	)
}

const CustomLeftArrow = ({ onClick, ...rest }) => {
	return (
		<button
			className="absolute text-black flex justify-center items-center w-8 h-8 left-0 bg-cultured rounded-3xl"
			{...rest}
			onClick={() => onClick()}
		>
			<Icons id="left" />
		</button>
	)
}


const Category = ({ className, isSmall, isRedirect, categories, ...props }) => {

	const history = useHistory()

	const handleRedirect = ({id, name}) => {
		handleScrollToElement(String(name).toLowerCase())
		isRedirect && history(`/products/${id}`)
	}
	
	return (
		<div {...props} className={classNames('py-9 w-full', className)}>
			<Carousel
				additionalTransfrom={0}
				arrows
				customLeftArrow={<CustomLeftArrow />}
				customRightArrow={<CustomRightArrow />}
				autoPlaySpeed={3000}
				centerMode={false}
				className="w-full"
				containerClass="w-full"
				dotListClass=""
				draggable
				focusOnSelect={false}
				infinite={false}
				itemClass="border-b-[1px] border-light-gray"
				keyBoardControl
				minimumTouchDrag={40}
				pauseOnHover
				renderArrowsWhenDisabled={false}
				renderButtonGroupOutside={false}
				renderDotsOutside={false}
				responsive={{
					desktop: {
						breakpoint: {
							max: 3000,
							min: 1024
						},
						items: isSmall ? 5 : 6,
						partialVisibilityGutter: 30
					},
					notebook: {
						breakpoint: {
							max: 1024,
							min: 768
						},
						items: 4,
						partialVisibilityGutter: 30
					},
					tablet: {
						breakpoint: {
							max: 768,
							min: 550
						},
						items: 3,
						partialVisibilityGutter: 100
					},
					large_mobile: {
						breakpoint: {
							max: 550,
							min: 430
						},
						items: 2,
						partialVisibilityGutter: 100
					},
					mobile: {
						breakpoint: {
							max: 430,
							min: 0
						},
						items: 1,
						partialVisibilityGutter: 30
					}
				}}
				rewind={false}
				rewindWithAnimation={false}
				rtl={false}
				shouldResetAutoplay
				showDots={false}
				sliderClass=""
				slidesToSlide={1}
				swipeable
			>
				{categories?.map(({ id, name, imagepath }) => (
					<div
						key={id}
						onClick={() => handleRedirect({id, name})}
						className="my-6 cursor-pointer flex justify-center items-center flex-col"
					>
						<div className="w-[90px] sm:w-[102px] h-[90px] sm:h-[102px] rounded-[50%] bg-cultured1 flex items-center justify-center">
							<img className="w-12 sm:w-auto" src={imagepath}/>
						</div>
						<Heading
							headClass="text-[18px] text-center mt-1"
							tag="head_6"
							text={name}
						/>
					</div>
				))}
			</Carousel>
		</div>
	)
}

export default Category
