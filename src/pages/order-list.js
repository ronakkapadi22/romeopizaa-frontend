import React, { useMemo, useState } from 'react'
import Breadcrump from '../shared/Breadcrump'
import Heading from '../shared/heading/Heading'
import InputRounded from '../shared/forms/InputRounded'
import OrderTable from '../components/orders/order-table'
import Pagination from '../shared/Pagination'

const pageSize = 10
const data = Array(200).fill(Math.random())

const OrdersList = ({ ...props }) => {
    const [currentPage, setCurrentPage] = useState(1)

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize
        const lastPageIndex = firstPageIndex + pageSize
        return data.slice(firstPageIndex, lastPageIndex)
    }, [currentPage])

    return (
        <div {...props} className="w-full bg-cultured1 px-8 sm:px-20 pb-9 pt-12">
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
                            iconClass="w-[20px] h-[20px] text-gray2"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <div className="w-[800px] lg:w-auto">
                            <OrderTable {...{ data: currentTableData }} className="mt-8" />
                            <div className="w-full flex justify-center items-center mt-10">
                                <Pagination
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    siblingCount={1}
                                    totalCount={data.length}
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
