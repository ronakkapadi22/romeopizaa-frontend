import React, { Fragment, useEffect, useState } from "react"
import CustomPortal from "../../shared/CustomPortal"
import Button from "../../shared/Buttons/Button"
import Icons from "../../shared/Icons"
import Heading from "../../shared/heading/Heading"
import useHistory from "../../hooks/useHistory"
import { clearCartItems } from "../../redux/action"
import { useDispatch } from "react-redux"

const OrderContainer = ({ order, handleClose }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [seconds, setSeconds] = useState(15)

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }
            if (seconds === 0) {
                clearInterval(interval)
                handleClose()
                dispatch(clearCartItems())
                history('/')
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [seconds])

    return (
        <div className="relative w-[96%] md:w-[575px] p-8 mx-auto rounded-xl bg-white">
            <div className="w-full flex justify-center items-center flex-col" >
                <Icons className='w-[80px] h-[80px] rounded-[50%] text-white' id='check-right' />
                <Heading tag='head_4' headClass='mt-4' text='Order Placed!' />
                <p>Thank you, {order?.name || ''}</p>
            </div>
            <div className="w-full mx-auto mt-8 sm:w-[450px]" >
                {order?.address?.streetName ? <div className="flex my-4 font-bold justify-between items-center" >
                    <p>Delivery</p>
                    <p>{order?.address?.streetName},{order?.address?.locality}</p>
                </div> : null}
                <div className="flex my-4 font-bold justify-between items-center" >
                    <p>Order ID</p>
                    <p>{order?.orderNumber}</p>
                </div>
                <hr />
                <div className="flex my-4 font-bold justify-between items-center" >
                    <p>Total Amount</p>
                    <p>${Number(order?.total).toFixed(2)}</p>
                </div>
                <Button
                    btnClass="w-full mt-[48px]"
                    type="submit"
                    label='Order Info'
                    size="large"
                    onClick={() => {
                        dispatch(clearCartItems([]))
                        history(`/orders/details/${order?.orderId}`)
                    }}
                    apperianceType="primary"
                />
                <p className="text-center text-gray1 text-[16px] leading-[24px] mt-6">
                    Continue shopping ({`00:${seconds < 10 ? `0${seconds}` : seconds}`})
                </p>
            </div>
        </div>
    )
}

const OrderInfo = ({ toggle, handleClose, order, ...props }) => {
    return <Fragment>
        {toggle ? <CustomPortal
            {...props}
            className="relative w-full flex items-center"
            animation="animate-popup-top"
            {...{ toggle }}
        >
            <OrderContainer {...{ order, handleClose }} />
        </CustomPortal> : null}
    </Fragment>
}

export default OrderInfo