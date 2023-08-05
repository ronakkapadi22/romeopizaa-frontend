import { useCallback, useState } from 'react'

const useToggle = (initialState = false) => {
	const [state, setState] = useState(initialState)

	// This function change the boolean value to its opposite value
	const toggle = useCallback(() => setState((state) => !state), [])

	return [state, toggle]
}

export default useToggle
