import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { useEffect } from 'react'
import MainRoutes from './MainRoute';
import AuthenticationRoutes from './AuthenticationRoutes';


const Routes = () => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('session') && location.pathname !== '/signin') navigate('/signin')
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return useRoutes([AuthenticationRoutes ,MainRoutes]);
}

export default Routes