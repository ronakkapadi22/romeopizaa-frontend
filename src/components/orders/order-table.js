import React from 'react'
import { classNames, findDataInArray, orders_heading } from '../../utils/helper'
import Heading from '../../shared/heading/Heading'
import useHistory from '../../hooks/useHistory'
import { useSelector } from 'react-redux'

const OrderTable = ({ data, loading, ...props }) => {

  const history = useHistory()
  const handleNavigate = (path = '/') => history(path)
  const updateOrders = useSelector(({ updateOrders }) => updateOrders)

  return (
    <div {...props}>
      <table className="w-full text-left table-auto">
        <thead className="rounded-md bg-cultured1">
          <tr>
            {orders_heading?.map((val, index) => (
              <th
                key={index}
                className={classNames(
                  'py-3',
                  index === 0 ? 'first:rounded-l-md first:rounded-bl-md pl-4' : '',
                  index + 1 === orders_heading?.length
                    ? 'last:rounded-tr-md last:rounded-br-md'
                    : ''
                )}
              >
                <Heading tag='head_6' headClass='text-lg font-medium' text={val} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? <tr>
            <td className='p-4 text-center' colSpan={orders_heading?.length} >Please wait...</td>
          </tr> : <> {
            findDataInArray(data, updateOrders)?.map((val, index) => (
              <tr key={index} className='cursor-pointer' onClick={() => handleNavigate(`/orders/details/${val?.id}`)} >
                <td className={classNames('pl-0 md:pl-4')}>
                  {val?.customer_address ? <div className='mt-6'>
                    <p className='mb-1 text-black' >{val?.customer_address?.streetName}, {val?.customer_address?.locality} ({val?.customer_address?.postCode})</p>
                    <p className='text-gray2 text-sm'>{val?.customer_address?.country}</p>
                  </div> : <div className='mt-6'>
                    <p className='text-black' >No address</p>
                  </div>
                  }
                </td>
                <td>
                  <div className='mt-6'>
                    <p className='mb-1 text-black' >{
                      val?.order_items?.map(item => item.name).join(' + ')
                    }</p>
                    <p className='text-gray2 text-sm'>Total: ${val?.totalAmount}</p>
                  </div>
                </td>
                <td>
                  <p className={classNames('rounded-[36px] px-[10px] py-1 inline-block', val?.orderStatus === 'Canceled' ? "text-red bg-[#fbe0e0]" : "text-orange bg-[#FFF5E0]")} >{val?.orderStatus}</p>
                </td>
              </tr>
            ))
          }</>
          }
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable
