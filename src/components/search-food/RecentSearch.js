import React from 'react'
import Icons from '../../shared/Icons'

const RecentSearch = ({ results, ...props }) => {
	return (
		<div {...props}>
			{results?.map(({ id, result }) => (
				<div key={id} className="flex cursor-pointer mb-4 w-full text-gray2">
					<Icons id="search" />
					<div className="w-full ml-4 pb-4 border-b-[1px] border-gray2">
						<p>{result}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default RecentSearch
