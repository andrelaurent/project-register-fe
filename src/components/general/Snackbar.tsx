import { useDispatch, useSelector } from "react-redux"
import { Snackbar, Alert, Slide } from '@mui/material';
import { SNACKBAR_INACTIVE } from '../../constants/actions';

const SnackbarComponent = () => {
    const { open, snackbarType, message } = useSelector((state:any) => state.snackbar)
    const dispatch = useDispatch()

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        dispatch({ type: SNACKBAR_INACTIVE })
    }

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={5000} TransitionComponent={(props) => <Slide {...props} direction='down' />} open={open} onClose={handleClose}>
            <Alert severity={snackbarType} elevation={3} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarComponent