import React from 'react'
import IconButton from '../../../shared/Buttons/IconButton'
import Icons from '../../../shared/Icons'
import terms from '../../../assets/images/terms.png'
import Heading from '../../../shared/heading/Heading'
import Checkbox from '../../../shared/forms/Checkbox'
import Button from '../../../shared/Buttons/Button'
import { useDispatch, useSelector } from 'react-redux'
import { handleTerms, setAuthKey } from '../../../redux/action'

const Terms = ({ ...props }) => {
	const dispatch = useDispatch()
	const isAgree = useSelector(({ authSteps }) => authSteps?.isAgreeWithTerms)

	const handleChange = (e) => {
		const { checked } = e.target
		dispatch(handleTerms(checked))
	}

	const handleOnBoard = () => {
		if (isAgree) {
			dispatch(setAuthKey('on_board'))
		}
	}

	return (
		<div
			{...props}
			className="relative w-full px-4 sm:px-[80px] h-[calc(100vh-92px)] flex items-center justify-center"
		>
			<IconButton className="absolute left-4 top-4 bg-cultured rounded-[48px] p-4 sm:top-[80px] sm:left-[80px]">
				<Icons id="left" />
			</IconButton>
			<div className="flex flex-col justify-center w-full xs:w-[400px]">
				<div className="flex justify-between items-center">
					<img src={terms} id="terms" className="w-[64px] h-[64px]" />
					<Heading
						tag="head_4"
						headClass="font-[600] ml-4"
						text="Accept romeos pizza Terms & Review Privacy Notice"
					/>
				</div>
				<p className="mt-8 mb-12">
					By selecting Agree below, I have reviewed and agree to the{' '}
					<span className="text-[#2873E4]">Terms of Use</span> and acknowledge
					the <span className="text-[#2873E4]">Privacy</span> Notice. I am at
					least 18 years of age
				</p>
				<hr className="text-light-gray" />
				<div className="mt-6 flex items-center">
					<Checkbox
						onChange={handleChange}
						className="mr-4 rounded-none cursor-pointer"
					/>
					<span>I agree</span>
				</div>
				<Button
					btnClass="w-full mt-[40px]"
					type="button"
					label="Next"
					size="large"
					disabled={!isAgree}
					onClick={handleOnBoard}
					apperianceType="primary"
				/>
			</div>
		</div>
	)
}

export default Terms
