import * as actionTypes from '../../../constants/actions'

const initialState = {
    message: '',
    snackbarType: 'success',
    open: false
}

const snackbarReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case actionTypes.SNACKBAR_ACTIVE:
            return state = {...state, open: true, message: action.message, snackbarType: action.snackbarType ?? 'error'}
        case actionTypes.SNACKBAR_INACTIVE:
            return state = {...state, open: false}
        default: return state
    }
}

export default snackbarReducer