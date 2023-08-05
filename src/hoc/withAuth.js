import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { getDataFromLocal } from '../utils/localStorage'
import { isTokenActivated } from '../utils/helper'
import Navbar from '../components/home/navbar/navbar'

const withAuth =
	(RenderComponent, NavigateComponent) =>
	({ to, replace, title, ...props }) => {
		
		const token = getDataFromLocal('token')
		return !isTokenActivated(token) ? (
			<Fragment>
				<Helmet>
					<title>Romeospizza - {title || ''}</title>
				</Helmet>
				<Navbar />
				<RenderComponent {...props} />
			</Fragment>
		) : (
			<NavigateComponent {...{ to, replace }} />
		)
	}

export default withAuth
