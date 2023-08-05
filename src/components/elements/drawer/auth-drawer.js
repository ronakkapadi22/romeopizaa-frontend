import React from 'react'
import Button from '../../../shared/Buttons/Button'
import Label from '../../../shared/labels/label'
import Heading from '../../../shared/heading/Heading'
import Icons from '../../../shared/Icons'
// import profile from '../../../assets/images/profile.png'
import { handleLogout, nav_menu } from '../../../utils/helper'
import useHistory from '../../../hooks/useHistory'

const AuthDrawer = ({ auth, handleToggle, ...props }) => {
	const history = useHistory()
	console.log('auth', auth.user)

	const handleNavigate = (path = '/') => history(path)

	const handleLogOutUser = () => {
		handleLogout()
		handleToggle()
		history('/')
	}

	const handleProvider = (isLogged) => {
		if (isLogged) {
			return (
				<>
					<div className="flex items-center">
						<div className="rounded-full w-[76px] h-[76px]">
							<Icons id="profile-icon" />
						</div>
						{/* <img
					alt="profile"
					src={profile}
					className="rounded-full w-[76px] h-[76px]"
				/> */}
						<div className="flex flex-col ml-6">
							<Heading
								tag="head_6"
								headClass="text-black text-lg font-medium"
								text={auth.user?.fullname || ''}
							/>
							<p className="text-gray2 text-base">{auth.user.phoneNumber}</p>
						</div>
					</div>
					<div className="mt-16 mb-24">
						{nav_menu?.map(({ id, name, icon, path }) => (
							<Label
								isShowIcon
								className="flex mb-8 cursor-pointer"
								iconClass="w-[24px] h-[24px] text-black"
								key={id}
								{...{ icon, label: name }}
								onClick={() => handleNavigate(path)}
							/>
						))}
					</div>
					<hr className="bg-light-gray" />
					<div className="mt-8">
						<Button
							btnClass="text-gray2 !px-2 text-lg"
							type="button"
							label="Log out"
							onClick={handleLogOutUser}
						/>
					</div>
				</>
			)
		} else
			return (
				<div className="w-full">
					<Button
						btnClass="w-full mb-2 mt-[48px]"
						type="button"
						onClick={() => handleNavigate('/login')}
						label="Login"
						size="large"
						apperianceType="primary"
					/>
					<p className="text-center font-medium text-gray1">
						{"Don't have an account?"}
						<span
							onClick={() => handleNavigate('/register')}
							className="cursor-pointer ml-1 text-black"
						>
							Register
						</span>
					</p>
				</div>
			)
	}

	return (
		<div {...props} className="relative w-full p-8 bg-white h-full">
			<Icons
				id="close"
				onClick={handleToggle}
				className="text-black w-5 h-5 absolute top-6 right-6 cursor-pointer"
			/>
			{handleProvider(auth.isLogged)}
		</div>
	)
}

export default AuthDrawer
