import React, { useState } from 'react'
import Icons from '../../shared/Icons'
import InputRounded from '../../shared/forms/InputRounded'
import SearchList from './SearchList'
// import SearchList from ''

const FindFoodsStore = ({ handleSearchFood, ...props }) => {

    const [storeFood, setStoreFood] = useState({
        food: ''
    })

    const handleChange = e => {
        const { name, value } = e.target
        setStoreFood({
            ...storeFood, [name]: value
        })
    }

    return (
        <div
            {...props}
            className="relative w-[96%] md:w-[575px] px-4 py-8 pb-4 md:p-8 mx-auto rounded-lg bg-white"
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
            <div className='mt-8' >
                {
                    Array(3).fill(1)?.map((data) => <SearchList key={data} />)
                }
            </div>
        </div>
    )
}

export default FindFoodsStore