import React, { Fragment } from 'react'
import { getDataFromLocal } from '../utils/localStorage'
import { isTokenActivated } from '../utils/helper'
import Navbar from '../components/home/navbar/navbar'
import { Helmet } from 'react-helmet'

const withUser =
	(RenderComponent, NavigateComponent) =>
		({ to, replace, withSimpleHeader, title, ...props }) => {
			const token = getDataFromLocal('token')
			return isTokenActivated(token) ? (
				<Fragment>
					<Helmet>
						<title>Romeospizza - {title || ''}</title>
					</Helmet>
					{withSimpleHeader ? <Navbar /> : null}
					<RenderComponent {...props} />
				</Fragment>
			) : (
				<NavigateComponent {...{ to, replace }} />
			)
		}

export default withUser
