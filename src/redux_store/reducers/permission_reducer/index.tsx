import * as actionTypes from '../../../constants/actions'

const initialState = {
    permissions: []
}

const permissionReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case actionTypes.SET_PERMISSIONS:
            return state = {...state, permissions: action.payload}
        default: return state
    }
}

export default permissionReducer