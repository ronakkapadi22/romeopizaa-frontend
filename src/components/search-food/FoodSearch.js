import React, { useCallback, useMemo } from 'react'
import Label from '../../shared/labels/label'
import Icons from '../../shared/Icons'
import useHistory from '../../hooks/useHistory'
import { classNames } from '../../utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import { addRecentItem } from '../../redux/action'

const FoodSearch = ({ name, imagepath, className, categoriename, id, price, ...props }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const searchList = useSelector((store) => store?.recentSearch)

    
    const handleSearch = useCallback(({id, name, path = '/'}) => {
        if(searchList?.findIndex((item) => item?.id === id) === -1){
            console.log('searchList', searchList)
            dispatch(addRecentItem({id, name}))
        }
        history(path)
    }, [history, dispatch])

    const rating = useMemo(() => {
        return Number(Math.ceil(Math.random() * 5)).toFixed(1)
    }, [])

    return (
        <div onClick={() => handleSearch({id, name, path: `/products/detail/${id}`})} className={classNames('w-full flex justify-between shadow-md p-2 mb-4 rounded-lg cursor-pointer', className)} {...props} >
            <img alt='search_food' className='w-[120px] mt-[6px] h-[100px]' src={imagepath} />
            <div className='w-full pl-4' >
                <p className='text-lg mb-2' >{name}<span className='text-gray2 text-sm'> / {categoriename} </span></p>
                <div className='flex' >
                    <Label
                        isShowIcon
                        icon="star-filled"
                        iconClass="text-orange w-[12px] lg:w-4 mr-1"
                        className="px-3 py-1 text-[12px] lg:text-base bg-cultured inline-flex rounded-3xl items-center font-semibold"
                        label={rating}
                    />
                    <p className='text-black flex items-center ml-2' >
                        <span>$ {Number(price).toFixed(2)}</span>
                    </p>
                </div>
                <p className='text-black flex items-center mt-2' >Select Item <Icons id='arrow-right' className='arrow-right ml-1' /></p>
            </div>
        </div>
    )
}

export default FoodSearch