import React, { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Checkout from './Checkout'
import Button from '../../shared/Buttons/Button'

const stripePromise = loadStripe('pk_test_51NdtmWA5wqCNycpnDrogeALWkhd1N4qKvxyKzwEbPairCiiMvKPjB6n4hPTPvKv3o8oBNR4SDtpWJIF6NKM1Dy8400cR3TL7Ku')

const StripeIntent = ({ orderItems, totalAmount, shipping, handleSubmit, loading, ...props }) => {
    const [clientSecret, setClientSecret] = useState("")

    const appearance = {
        theme: 'stripe'
    }

    const options = {
        clientSecret,
        appearance
    }

    return (
        <div {...props} >
            {
                clientSecret ? <Elements options={options} stripe={stripePromise} >
                    <Checkout />
                </Elements> : <Button
                    btnClass="w-full text-white"
                    apperianceType="primary"
                    size="large"
                    type='button'
                    onClick={handleSubmit}
                    label={loading ? "Please wait." : "Continue To Payment"}
                />
            }
        </div>
    )
}

export default StripeIntent