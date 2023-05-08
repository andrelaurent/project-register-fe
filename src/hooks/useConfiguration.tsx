import { SET_CONFIGURATION } from 'constants/actions';
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
const useConfiguration = () => {
    const dispatch = useDispatch()
    const config = useSelector((state:any) => state.configuration)

    const handleConfiguration = useCallback((payload:any) => {
        dispatch({ type: SET_CONFIGURATION, payload })
        
        localStorage.setItem('config', JSON.stringify({...config, ...payload}))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return { config, handleConfiguration }
}

export default useConfiguration