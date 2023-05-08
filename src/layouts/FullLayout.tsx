import { Outlet } from 'react-router-dom';
import { useMemo } from 'react'
import useCustomizeTheme from 'hooks/useCustomizeTheme';
import useConfiguration from 'hooks/useConfiguration';

const FullLayout = () => {
    const { handleChangeTheme } = useCustomizeTheme()
    const { handleConfiguration } = useConfiguration()
    
    useMemo(() => {
        handleChangeTheme(localStorage.getItem('theme') ?? '')
        handleConfiguration(localStorage.getItem('config') ? JSON.parse(localStorage.getItem('config') as string) : {})
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="bg-primary-light w-full h-screen">
            <Outlet />
        </div>
    )
}

export default FullLayout