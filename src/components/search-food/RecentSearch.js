import React from 'react'
import Icons from '../../shared/Icons'
import useHistory from '../../hooks/useHistory'

const RecentSearch = ({ results, ...props }) => {
	const history = useHistory()
	return (
		<div {...props}>
			{results?.map(({ id, name }) => (
				<div key={id} onClick={() => history(`/products/detail/${id}`)} className="flex cursor-pointer mb-4 w-full text-gray2">
					<Icons id="search" />
					<div className="w-full ml-4 pb-4 border-b-[1px] border-gray2">
						<p>{name}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default RecentSearch
