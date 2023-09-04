import React, { Fragment, useCallback, useEffect, useMemo } from 'react'
import Icons from '../../../shared/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllStores } from '../../../redux/action'
import { storeList } from '../../../api/api'

const LocationList = ({ selectConfigStore, search }) => {

	const dispatch = useDispatch()
	const stores = useSelector(({ store }) => store?.stores)

	const fetchAllStoreData = useCallback(async() => {
		const response = await storeList()
		if(response?.data){
			dispatch(fetchAllStores(response?.data?.data || []))
		}
	}, [dispatch])

	useEffect(() => {
		fetchAllStoreData()
	}, [])

	const searchList = useMemo(() => {
		return stores?.filter(val => {
			if(!search){
				return val
			}else if(String(val?.businessName).toLowerCase().includes(search?.toLowerCase())){
				return val
			}else return null
		})
	}, [search, stores])

	return (
		<div className="mt-6 h-[330px] overflow-auto">
			{ searchList?.length ? <Fragment>
				{searchList.map((val) => (
					<div onClick={() => selectConfigStore(val)} key={val} className="flex items-center mb-6 border border-white hover:border-gray2 p-2 hover:rounded-md cursor-pointer">
						<div className="bg-cultured rounded-full p-[10px]">
							<Icons className="text-black w-5 h-5" id="location" />
						</div>
						<div className="flex flex-col justify-end items-start text-black ml-4">
							<p className="font-medium">{val?.businessName || ''}</p>
							<p className="text-sm text-gray1">
								{val?.address}, {val?.city}, {val?.country} ({val?.zip})
							</p>
						</div>
					</div>
				))}
			</Fragment> : <p className='text-center' >No stores available.</p> }
		</div>
	)
}

export default LocationList
