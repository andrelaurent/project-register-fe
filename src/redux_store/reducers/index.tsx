import { combineReducers } from 'redux'
import loadingReducer from './loading_reducer'
import customizationReducer from './customization_reducer'
import snackbarReducer from './snackbar_reducer'
import permissionReducer from './permission_reducer'
import logReducer from './log_reducer'
import dialogReducer from './dialog_reducer'
import configurationReducer from './configuration_reducer'

const rootReducer = combineReducers({
    loading: loadingReducer,
    customization: customizationReducer,
    snackbar: snackbarReducer,
    permission: permissionReducer,
    log: logReducer,
    dialog: dialogReducer,
    configuration: configurationReducer
})

export default rootReducer