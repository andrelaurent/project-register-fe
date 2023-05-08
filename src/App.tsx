import { useEffect } from 'react'
import Router from './routes'

import { CssBaseline, StyledEngineProvider } from '@mui/material';
import NavigationScroll from './layouts/NavigationScroll';
import SnackbarComponent from './components/general/Snackbar';
import SessionModel from './models/SessionModel';
import { useState } from 'react'
import Loadable from './components/Loadable';
import DialogComponent from './components/general/Dialog';

const App = () => {
    const [onload, setOnload] = useState(true)

    useEffect(() => {
        var session:any = localStorage.getItem('session')
        if (session) session = JSON.parse(session)
        global.session = session as SessionModel
        

        let root = document.querySelector(':root') as HTMLElement;
        root.style.setProperty('--primary-light', process.env.REACT_APP_PRIMARY_COLOR_LIGHT ?? '')
        root.style.setProperty('--rounded-main', (localStorage.getItem('borderRadius') ?? '5') + 'px')
        
        setOnload(false)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (onload) return (
        <>
            {
                Loadable()
            }
        </>
    )

    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            <DialogComponent />
            <SnackbarComponent />
            <NavigationScroll>
                <Router />
            </NavigationScroll>
        </StyledEngineProvider>
    )
}

export default App