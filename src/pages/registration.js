import React, { useState } from 'react'
import Heading from '../shared/heading/Heading'
import Form from '../shared/forms/Form'
import FieldGroup from '../shared/forms/FieldGroup'
import Input from '../shared/forms/Input'
import CountrySelector from '../shared/coutry-selector'
import { registerValidation } from '../utils/validation'
import Button from '../shared/Buttons/Button'
import useHistory from '../hooks/useHistory'
import { sendOtpWithRegister } from '../api/api'
import { useDispatch } from 'react-redux'
import { handlePhoneNumber, setAuthKey, setupAuthData } from '../redux/action'
import { enqueueSnackbar } from 'notistack'

const initialState = {
    country: 'gb',
    countryCode: '+44',
    email: '',
    phoneNumber: '',
    password: '',
    fName: '',
    lName: ''

}

const Registration = ({ ...props }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [registration, setRegistration] = useState(initialState)
    const [error, setError] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState({
        password: false
    })

    const handleToggle = () => {
        setShowPassword({
            password: !showPassword.password
        })
    }

    const handleCoutryCode = (value) => {
        setRegistration({
            ...registration,
            countryCode: value?.code
        })
        setError({
            ...error, 'phoneNumber': registerValidation('phoneNumber', `${value?.code}${registration.phoneNumber}`)
        })
    }

    const handleRegister = async () => {
        setLoading(true)
        try {
            const response = await sendOtpWithRegister(registration)
            if (response?.data) {
                setLoading(false)
                dispatch(
                    handlePhoneNumber({
                        value: `${registration?.countryCode}${registration?.phoneNumber}`,
                        masked: registration?.email,
                        phoneNumber: registration?.phoneNumber
                    })
                )
                enqueueSnackbar(response?.data?.message, {
                    variant: 'success'
                })
                dispatch(setupAuthData({
                    otp: response?.data?.data?.otp || '',
                    countryCode: registration.countryCode,
                    email: registration.email,
                    password: registration.password,
                    phoneNumber: registration.phoneNumber,
                    fName: registration.fName,
                    lName: registration.lName

                }))
                dispatch(setAuthKey('otp_page'))
            }
        } catch (error) {
            setLoading(false)
            if (error?.response?.data) {
                enqueueSnackbar(error?.response?.data?.data?.['phoneNumber']?.[0] || error?.response?.data?.data?.['email']?.[0], {
                    variant: 'error'
                })
            }
            return error
        }
    }

    console.log('error', error)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let error = {}
        Object.keys({ phoneNumber: registration.phoneNumber, email: registration.email, password: registration.password, lName: registration.lName, fName: registration.fName }).forEach((val) => {
            const newVal = val !== 'phoneNumber' ? registration[val] : `${registration.countryCode}${registration[val]}`
            const message = registerValidation(val, newVal, { phone: registration.phoneNumber })
            if (message) {
                error[val] = message
            }
        })
        if (Object.keys(error).length) {
            setError({ ...error, ...error })
            return
        }

        await handleRegister()
    }

    const handleChange = e => {
        const { name, value } = e.target
        const newVal = name !== 'phoneNumber' ? value : `${registration.countryCode}${value}`
        setRegistration({
            ...registration, [name]: name !== 'phoneNumber' ? value : value?.length > 11 ? registration.phoneNumber : value
        })
        setError({
            ...error, [name]: registerValidation(name, newVal, { phone: registration.phoneNumber })
        })
    }

    return (
        <div {...props} className="relative w-full px-4 sm:px-[80px] h-[calc(100vh-40px)] sm:h-[calc(100vh-92px)] flex items-center justify-center">
            <div className="flex justify-center items-center">
                <div className="w-full sm:w-[400px]">
                    <Heading
                        headClass="text-black "
                        {...{
                            tag: 'head_4',
                            text: 'Register with email and phone number.'
                        }}
                    />
                    <Form className="mt-8" handleSubmit={handleSubmit}>
                        <div className='flex flex-col md:flex-row items-center justify-between w-full' >
                            <FieldGroup className='md:mr-2 mb-4 w-full' errorClass='text-sm text-red' error={error['fName']} label="First Name">
                                <Input inputClass='w-full'
                                    {...{
                                        name: 'fName',
                                        value: registration.fName,
                                        type: 'text',
                                        placeholder: 'Enter First Name',
                                        onChange: handleChange,
                                        className: 'sm:min-w-full',
                                        error: error['fName']
                                    }}
                                />
                            </FieldGroup>
                            <FieldGroup className='md:ml-2 mb-4 w-full' errorClass='text-sm text-red' error={error['lName']} label="Last Name">
                                <Input
                                    {...{
                                        name: 'lName',
                                        value: registration.lName,
                                        type: 'text',
                                        placeholder: 'Enter Last Name',
                                        onChange: handleChange,
                                        className: 'sm:min-w-full',
                                        error: error['lName']
                                    }}
                                />
                            </FieldGroup>
                        </div>
                        <FieldGroup errorClass='text-sm text-red' error={error['email']} label="Email" className="mb-4">
                            <Input
                                {...{
                                    name: 'email',
                                    value: registration.email,
                                    type: 'email',
                                    placeholder: 'Enter your email',
                                    onChange: handleChange,
                                    className: 'sm:min-w-full',
                                    error: error['email']
                                }}
                            />
                        </FieldGroup>
                        <FieldGroup errorClass='text-sm text-red' error={error['phoneNumber']} className='mb-4' label="Phone Number">
                            <div className="w-full flex items-center">
                                <CountrySelector
                                    {...{
                                        handleChange: handleCoutryCode,
                                        defaultValue: { coutry: registration.country, code: registration.countryCode }
                                    }}
                                    className="w-[100px] mr-2"
                                />
                                <Input
                                    className="sm:!min-w-[290px]"
                                    type="number"
                                    inputClass='w-full'
                                    placeholder="Enter Phone Number"
                                    name="phoneNumber"
                                    value={registration.phoneNumber}
                                    onChange={handleChange}
                                    error={error['phoneNumber']}
                                />
                            </div>
                        </FieldGroup>
                        <FieldGroup errorClass='text-sm text-red' error={error['password']} label="Password" className="mb-4">
                            <Input
                                {...{
                                    name: 'password',
                                    value: registration.password,
                                    type: showPassword['password'] ? 'text' : 'password',
                                    placeholder: 'Enter Password',
                                    onChange: handleChange,
                                    className: 'sm:min-w-full',
                                    error: error['password'],
                                    withLastIcon: true,
                                    icon: showPassword['password'] ? 'show' : 'hide',
                                    handleToggle
                                }}
                            />
                        </FieldGroup>
                        <Button
                            btnClass="w-full mt-[48px]"
                            type="submit"
                            label={loading ? 'Please wait' : 'Send OTP'}
                            size="large"
                            disabled={loading}
                            apperianceType="primary"
                        />
                    </Form>
                    <p className="text-center font-medium text-gray1">
                        Already have an account?
                        <span
                            onClick={() => history('/login')}
                            className="cursor-pointer ml-1 text-black"
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Registration