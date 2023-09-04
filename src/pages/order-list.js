import React, { useCallback, useEffect, useState } from 'react'
import Breadcrump from '../shared/Breadcrump'
import Heading from '../shared/heading/Heading'
import InputRounded from '../shared/forms/InputRounded'
import OrderTable from '../components/orders/order-table'
import Pagination from '../shared/Pagination'
import { enqueueSnackbar } from 'notistack'
import { getAllOrders } from '../api/api'
import { useSelector } from 'react-redux'

const pageSize = 10
const OrdersList = ({ ...props }) => {
    const { address } = useSelector(({address}) => address)
    const [currentPage, setCurrentPage] = useState(1)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    const getOrders = useCallback(async() => {
        setLoading(true)
        try {
            const response = await getAllOrders()
            if(response?.data){
                setOrders(response?.data?.data || [])
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            enqueueSnackbar(error?.response?.data?.message || 'Somthing went wrong.', {
                variant: 'error'
            })
            return error
        }
    }, [])

    useEffect(() => {
        getOrders()
    }, [])

    const ordersData = () => {
        const clone = [...orders]
        const firstPageIndex = (currentPage - 1) * pageSize
        const lastPageIndex = firstPageIndex + pageSize
        const pageData =  clone?.map(val => ({...val, address: address.find(data => data.id === val?.customerAddressId)}))
        return pageData?.slice(firstPageIndex, lastPageIndex)
    }

    
    const searchResult = () => {
        return ordersData()?.filter(val => {
            if(!search){
                return val
            }else if(val?.order_items?.map(item => item.name?.toLowerCase()).join('')?.includes(search.toLowerCase())){
                return val
            }else if(String(val?.address?.streetName).toLowerCase().includes(search.toLowerCase())){
                return val
            }else if(String(val?.address?.locality).toLowerCase().includes(search.toLowerCase())){
                return val
            }else return null
        })
    }
    
    return (
        <div {...props} className="w-full h-[calc(100vh - 142px)] bg-cultured1 px-8 sm:px-20 pb-9 pt-12">
            <div className="bg-white w-full h-full">
                <Breadcrump className="pb-8 bg-cultured1" />
                <div className="p-8">
                    <div className="w-full flex justify-between md:items-center flex-col md:flex-row">
                        <Heading
                            headClass="font-semibold text-[24px] mb-4 md:mb-0"
                            tag="head_4"
                            text="Order List"
                        />
                        <InputRounded
                            className="rounded-[46px] py-3 pl-12 pr-5 outline-none bg-cultured w-full md:w-[400px]"
                            placeholder="Search Order"
                            iconId="search"
                            name='search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            iconClass="w-[20px] h-[20px] text-gray2"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <div className="w-[800px] lg:w-auto">
                            <OrderTable {...{ data: searchResult(), loading}} className="mt-8" />
                            <div className="w-full flex justify-center items-center mt-10">
                                <Pagination
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    siblingCount={1}
                                    totalCount={orders.length}
                                    onPageChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersList
