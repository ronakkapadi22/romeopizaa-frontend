import React from 'react'
import Logo from '../../assets/images/logo_large.png'
import { classNames } from '../../utils/helper'

const Loader = ({ className }) => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <img className={classNames('absolute w-[160px]', className)} src={Logo} />
        <div className="loader">
        </div>
    </div>
  )
}

export default Loader