import React, { useState } from 'react'
import Provider from '../components/profile/Provider'
import Account from '../components/profile/Account'
import Security from '../components/profile/Security'
import Breadcrump from '../shared/Breadcrump'

const TabChange = ({ name, ...props }) => {
	switch (name) {
		case 'account_info':
			return <Account {...props} />
		case 'security':
			return <Security {...props} />
		default:
			return <Account {...props} />
	}
}

const Profile = ({ ...props }) => {
	const [activeKey, setActiveKey] = useState('account_info')

	const handleTab = (key) => setActiveKey(key)

	return (
		<div
			{...props}
			className="w-full md:h-[calc(100vh-92px)] bg-cultured1 px-8 sm:px-20 pb-9 pt-12"
		>
			<div className="bg-white w-full h-full">
				<Breadcrump className="pb-8 bg-cultured1" />
				<div className="grid grid-cols-12 w-full">
					<div className="col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3">
						<Provider {...{ activeKey, handleTab }} />
					</div>
					<div className="col-span-12 md:col-span-7 lg:col-span-8 xl:col-span-9">
						<TabChange {...{ name: activeKey }} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
