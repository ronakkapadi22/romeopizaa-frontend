import { useNavigate } from 'react-router-dom'

const useHistory = () => {
	const history = useNavigate()
	return history
}

export default useHistory
