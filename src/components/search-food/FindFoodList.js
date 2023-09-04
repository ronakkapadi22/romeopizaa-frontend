import React, { useState, useCallback, useEffect } from 'react'
import Icons from '../../shared/Icons'
import InputRounded from '../../shared/forms/InputRounded'
import FoodSearch from './FoodSearch'
import { getSearchFood } from '../../api/api'
import { useSelector } from 'react-redux'
import { classNames } from '../../utils/helper'

const FindFoodsStore = ({ handleSearchFood, ...props }) => {

    const storeConfig = useSelector(({storeConfig}) => storeConfig)
    const [loading, setLoading] = useState(false)
    const [storeFood, setStoreFood] = useState({
        food: ''
    })
    const [list, setList] = useState([])

    const handleChange = async (e) => {
        const { name, value } = e.target
        setStoreFood({
            ...storeFood, [name]: value
        })
    }

    const getFoodsList = useCallback(async (search = '') => {
        setLoading(true)
        try {
            const response = await getSearchFood({
                storeId: storeConfig?.storeId,
                q: search
            })
            if (response?.data) {
                setLoading(false)
                setList(response?.data?.data?.data || [])
            }
        } catch (error) {
            setLoading(false)
            setList([])
            return error
        }
    }, [storeFood.food])

        const result = list.filter((val) => {
            if(!storeFood.food){
                return val
            }else if(String(val?.name).toLowerCase().includes(storeFood.food?.toLowerCase())){
                return val
            }else return null
        })

    useEffect(() => {
        getFoodsList('')
    }, [])

    return (
        <div
            {...props}
            className="relative w-[370px] md:w-[575px] px-4 py-8 pb-4 md:p-8 mx-auto rounded-lg bg-white"
        >
            <div className="w-full flex justify-between items-center">
                <InputRounded name="food" mainClass='w-full' value={storeFood.food} onChange={handleChange}
                    className="w-full rounded-[46px] py-3 pl-12 pr-5 outline-none bg-cultured"
                    placeholder="Food,groceries,drinks,etc"
                    iconId="search"
                    iconClass="w-[20px] h-[20px] text-gray2"
                />
                <Icons id="close" className='cursor-pointer ml-4' onClick={handleSearchFood} />
            </div>
            <div className={classNames('mt-8 h-[400px] overflow-auto')} >
                {
                    loading ? <div className='w-full text-xl h-[400px] flex justify-center items-center' >
                        Please wait
                    </div> : result?.length ? <div>
                        {
                            result?.map(({ id, ...data }) => <FoodSearch key={id} {...{ id }} {...data} />)
                        }
                    </div> : <div className='w-full text-xl h-[400px] flex justify-center items-center' >
                        No data found.
                    </div>
                }

            </div>
        </div>
    )
}

export default FindFoodsStore