import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import BreadCrumbs from './components/BreadCrumbs';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// project imports
import { SET_MENU, SET_PERMISSIONS } from '../constants/actions';

// assets
import SidebarComponent from './components/SidebarComponent';
import useCustomizeTheme from 'hooks/useCustomizeTheme';
import useConfiguration from 'hooks/useConfiguration';

const MainLayout = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
    const { isOpen, opened } = useSelector((state:any) => state.customization)
    const { handleChangeTheme } = useCustomizeTheme()
    const { handleConfiguration } = useConfiguration()

    useMemo(() => {
        handleChangeTheme(localStorage.getItem('theme') ?? '')
        handleConfiguration(localStorage.getItem('config') ? JSON.parse(localStorage.getItem('config') as string) : {})
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // Handle left drawer
    useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownMd });
    }, [matchDownMd]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const _permission = global.session.role.endpoint_access.filter((a:any) => a.MenuRefer === isOpen[0])
        dispatch({ type: SET_PERMISSIONS, payload: _permission })
    }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="flex">
            <HeaderComponent />
            <div className="flex w-full">
                <SidebarComponent />
                <div className={"w-full sm:p-[16px] md:p-[20px] p-[16px] pt-[30px] bg-primary-light bg-opacity-50 min-h-[calc(100vh_-_5rem)] mt-[5rem] " + (opened ? 'md:ml-0 lg:ml-[16rem]' : '')}>
                    <BreadCrumbs />
                    <div className="py-2"></div>
                    <div className="z-0">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
