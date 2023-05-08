import * as actionTypes from '../../../constants/actions'

const initialState = {
    awaitComponentData: {
        status: null,
        resolve: null,
        reject: null,
        reset: null
    },
    dialogCustomization: {
        dialogType: 'confirm',
        dialogImage: 'error',
        title: '',
        description: '',
        childrenVar: null
    }
}

const dialogReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case actionTypes.DIALOG_ACTIVE:
            return state = {...state, awaitComponentData: action.awaitComponentData ? action.awaitComponentData : {...state.awaitComponentData}, dialogCustomization: action.dialogCustomization ? action.dialogCustomization : {...state.dialogCustomization}}
        default: return state
    }
}

export default dialogReducer