import React from 'react'
import { classNames, orders_heading } from '../../utils/helper'
import Heading from '../../shared/heading/Heading'

const OrderTable = ({data, ...props }) => {
  return (
    <div {...props}>
      <table className="w-full text-left table-auto">
        <thead className="rounded-md bg-cultured1">
          <tr>
            {orders_heading?.map((val, index) => (
              <th
                key={val}
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
          {
            data?.map((val) => (
              <tr key={val} >
                <td className={classNames('pl-0 md:pl-4')}>
                  <div className='mt-6'>
                    <p className='mb-1 text-black' >3891 Ranchview Dr. Richardson, California 62639</p>
                    <p className='text-gray2 text-sm'>California</p>
                  </div>
                </td>
                <td>
                  <div className='mt-6'>
                    <p className='mb-1 text-black' >Rabri (1) + Fries</p>
                    <p className='text-gray2 text-sm'>$3.20 +2.20</p>
                  </div>
                </td>
                <td>
                  <p className='text-orange bg-[#FFF5E0] rounded-[36px] px-[10px] py-1 inline-block' >Preparing</p>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable
