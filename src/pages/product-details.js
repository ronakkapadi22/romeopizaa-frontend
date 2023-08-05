import React, { useState, useCallback, useEffect } from 'react'
import Breadcrump from '../shared/Breadcrump'
import Heading from '../shared/heading/Heading'
import Label from '../shared/labels/label'
import TextArea from '../shared/forms/TextArea'
import Icons from '../shared/Icons'
import Button from '../shared/Buttons/Button'
import { useParams } from 'react-router-dom'
import { productDetails } from '../api/api'
import { enqueueSnackbar } from 'notistack'

const ProductDetails = ({ ...props }) => {
	const { id } = useParams()
	const [productDetail, setProductDetail] = useState({})
	console.log('productDetail: ', productDetail)

	const fetchProductDetail = useCallback(async () => {
		try {
			const response = await productDetails({ pId: id })
			if (response.data.data) setProductDetail(response.data?.data)
		} catch (error) {
			if (error?.response?.data) {
				enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong.', {
					variant: 'error'
				})
			}
			return error
		}
	}, [])

	useEffect(() => {
		fetchProductDetail()
	}, [])

	return (
		<div
			{...props}
			className="w-full bg-white px-4 md:px-[80px] sm:px-20 pb-9 pt-12"
		>
			<div className="w-full h-full">
				<Breadcrump className="pb-8" />
				{Object.keys(productDetail)?.length ? <div className="w-full grid grid-cols-12 gap-4 md:gap-8">
					<div className="col-span-12 lg:col-span-6">
						<img
							className="max-w-full mx-auto xl:mx-0 rounded-2xl"
							src={productDetail?.imagepath}
							alt="product_img"
						/>
					</div>
					<div className="col-span-12 lg:col-span-6">
						<div className="lg:max-w-[625px]">
							<div className="w-full">
								<Heading
									tag="head_3"
									headClass="!font-semibold"
									text={productDetail.name}
								/>
								<Heading
									tag="head_4"
									headClass="!font-semibold"
									text={`$${productDetail.price}`}
								/>
								<p className="text-lg text-gray1 mt-4">
									{productDetail?.description}
								</p>
								<Label
									isShowIcon
									icon="star-filled"
									iconClass="text-black w-4"
									className="px-3 py-1 mt-6 text-base lg:text-base bg-cultured inline-flex rounded-3xl items-center font-semibold"
									label={'4.2'}
								/>
							</div>
							{productDetail?.attributes?.map((item) => (
								<div
									key={item.id}
									className="w-full bg-cultured rounded-md p-6 mt-8"
								>
									<div className="flex justify-between items-center">
										<div>
											<Heading
												headClass="!font-semibold"
												tag="head_4"
												text={item.name || ''}
											/>
											<p className="text-gray1 text-lg">{item.description || item?.selectType === 'SINGLE' ? "Choose 1" : ""}</p>
										</div>
										{item.isRequired && (
											<Label
												className="px-[14px] py-[6px] rounded-3xl bg-[#CEF7D0] text-green"
												label="Required"
											/>
										)}
									</div>
									<hr className="mt-6 text-light-gray" />
									<div>
										{item.attributes_items?.map((item) => (
											<div
												key={item.id}
												className="mt-6 flex justify-between items-center"
											>
												<div>
													<p className="text-lg">{item.name}</p>
													<p className="text-lg">+${item.price}</p>
												</div>
												<input className="cursor-pointer" type="radio" />
											</div>
										))}
									</div>
								</div>
							))}

							{productDetail?.modifiers && productDetail?.modifiers?.map((item) => (
								<div
									key={item.id}
									className="w-full bg-cultured rounded-md p-6 mt-8"
								>
									<div className="flex justify-between items-center">
										<div>
											<Heading
												headClass="!font-semibold"
												tag="head_4"
												text={item.name}
											/>
											<p className="text-gray1 text-lg">Choose up to 1</p>
										</div>
										<Label
											className="px-[14px] py-[6px] rounded-3xl bg-[#CEF7D0] text-green"
											label="Required"
										/>
									</div>
									<hr className="mt-6 text-light-gray" />
									{item.modifiers_items && item.modifiers_items?.map((item) => (
										<div key={item.id} className="mt-6">
											<div className="flex justify-between items-center">
												<div>
													<p className="text-lg">{item?.name}</p>
													<p className="text-lg">+${item?.price}</p>
												</div>
												<input className="cursor-pointer" type="checkbox" />
											</div>
										</div>))}
									{/* <div className="mt-6">
										<div className="flex justify-between items-center">
											<div>
												<p className="text-lg">
													Tomato Sauce Base{' '}
													<span className="text-green">Popular</span>
												</p>
											</div>
											<input className="cursor-pointer" type="checkbox" />
										</div>
									</div> */}
								</div>
							))}
							<div className="w-full bg-cultured rounded-md p-6 mt-8">
								<div className="flex justify-between items-center">
									<Heading
										headClass="!font-semibold"
										tag="head_4"
										text="Select Quantity"
									/>
									<div className="items-center justify-center px-1 sm:px-4 sm:py-1 flex border-[2px] w-[80px] sm:w-[100px] border-light-gray rounded-3xl">
										<Icons className="w-4 h-4 cursor-pointer" id="minus" />
										<Heading
											tag="head_6"
											headClass="font-semibold mx-2 sm:mx-3 text-[16px] md:text-[18px]"
											text="1"
										/>
										<Icons className="w-4 h-4 cursor-pointer" id="plus" />
									</div>
								</div>
							</div>

							<div className="mt-6 w-full">
								<Heading
									headClass="!font-semibold mb-4"
									tag="head_4"
									text="Special Instructions"
								/>
								<TextArea
									rows={5}
									placeholder="Add note here. please contact the merchant directly if you have allergy"
								/>
								<p className="text-gray2 text-sm">
									You may be charged for extras.
								</p>
							</div>
							<Button
								btnClass="w-full mt-[48px]"
								type="button"
								label="Add to cart"
								size="large"
								apperianceType="primary"
							/>
						</div>
					</div>
				</div> :
					<div className='w-full p-10 font-semibold text-center text-lg' >No data found.</div>}
			</div>
		</div>
	)
}

export default ProductDetails
