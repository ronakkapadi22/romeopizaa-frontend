import React, { Fragment } from 'react'
import useHistory from '../../hooks/useHistory'
import Button from '../../shared/Buttons/Button'
import CustomPortal from '../../shared/CustomPortal'
import Heading from '../../shared/heading/Heading'
import Icons from '../../shared/Icons'

const LoginRequired = ({handleClose}) => {

    const history = useHistory()

  return (
            <div className="relative w-[96%] md:w-[575px] p-8 mx-auto rounded-xl bg-white">
                <div className="w-full flex justify-between items-center">
                <Heading tag="head_5" headClass="text-2xl" text="Login required!" />
                <Icons
                    id="close"
                    className="cursor-pointer"
                    onClick={() => handleClose('login')}
                />
            </div>
                <p className='text-lg mt-2'>Please login first and then proceed to order.</p>
                <div className='w-full mt-8 flex items-center justify-end'>
                    <Button onClick={() => history('/login')} btnClass='text-white bg-green px-4 py-2' label={'Login'}/>
                    <Button onClick={() => history('/register')} btnClass='text-white bg-orange px-4 py-2 ml-2' label={'Register'}/>
                </div>
            </div>
  )
}

const LoginRequiredPopup = ({toggle, handleClose, ...props}) => {
    return <Fragment>
        {
            toggle ? <CustomPortal
            {...props}
            className="relative w-full flex items-center"
            animation="animate-popup-top"
            {...{ toggle }}
            >
                <LoginRequired {...{ handleClose }} />
            </CustomPortal> : null
        }
    </Fragment>
}

export default LoginRequiredPopup