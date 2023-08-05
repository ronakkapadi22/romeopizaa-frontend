import React, { Fragment } from 'react'
import { Outlet } from 'react-router'
import Header from '../components/home/navbar/header'
import OfferHeader from '../components/elements/offer-header/OfferHeader'

const OnlyRenderLayout = ({ isShowHeader, ...props }) => {
	return (
		<section className="relative w-full" {...props}>
			<div>
				{isShowHeader ? <Fragment>
					<OfferHeader />
					<Header />
				</Fragment> : null}
				<Outlet {...props} />
			</div>
		</section>
	)
}

export default OnlyRenderLayout
