import React, { Fragment, useEffect, useState } from "react"
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements,
    Elements
} from "@stripe/react-stripe-js"
import CustomPortal from "../../shared/CustomPortal"
import Button from "../../shared/Buttons/Button"
import { classNames } from "../../utils/helper"
import Icons from "../../shared/Icons"

const Checkout = ({ handleClose, handleOrder, clientSecret }) => {

    const stripe = useStripe()
    const elements = useElements()
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState('')
    const [orderType, setOrderType] = useState('')

    console.log('orderType', orderType)

    useEffect(() => {
        if (!stripe) {
            return
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            setOrderType(paymentIntent.status)
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!")
                    break
                case "processing":
                    setMessage("Your payment is processing.")
                    break
                default: return 
            }
        })

    }, [stripe])

    const paymentElementOptions = {
        layout: "tabs"
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        setIsLoading(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
            confirmParams:{
                receipt_email: email || ''
            }
        })
        if (paymentIntent || error) {
            if (error) {
                setStatus('error')
                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message)
                } else {
                    setMessage("An unexpected error occurred.")
                    setStatus('error')
                    setOrderType('failed')
                }
            }
            if(paymentIntent || !error){
                if(paymentIntent?.status === 'succeeded'){
                    await handleOrder({ paymentData: paymentIntent })
                }
            }
        }
        setIsLoading(false)
    }

    return (
        <div className='className="w-[90%] md:w-[678px] lg:w-[845px] p-8 mx-auto rounded-lg bg-white'>
            <form id="relative payment-form" onSubmit={handleSubmit}>
				<Icons id="close" className="cursor-pointer float-right" onClick={() => handleClose('checkout')} />
                <LinkAuthenticationElement
                    id="link-authentication-element"
                    onChange={(e) => setEmail(e?.target?.value)}
                />
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <Button
                    label={isLoading ? 'Processing' : 'Pay Now'}
                    size="large"
                    disabled={isLoading || !stripe || !elements}
                    apperianceType="primary"
                    btnClass="w-full mt-[48px]"
                    id="submit">
                </Button>
                {/* Show any error or success messages */}
                {message && <div className={classNames('font-medium', status === 'error' ? '!text-red' : '!text-green' )} id="payment-message">{message}</div>}
            </form>
        </div>
    )
}

const CheckoutLayout = ({ toggle, handleClose, options, stripePromise, clientSecret, handleOrder, ...props }) => {
    return <Fragment>
        {toggle ? <CustomPortal
            {...props}
            className="relative w-full flex items-center"
            animation="animate-popup-top"
            {...{ toggle }}
        >
            {stripePromise && <Elements options={options} stripe={stripePromise} >
                <Checkout {...{ handleClose, handleOrder, clientSecret }} />
            </Elements>}
        </CustomPortal> : null}
    </Fragment>
}

export default CheckoutLayout