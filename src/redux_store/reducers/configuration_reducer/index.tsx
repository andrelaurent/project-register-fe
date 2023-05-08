// action - state management
import * as actionTypes from 'constants/actions';

export const initialState = {
    borderRadius: 5,
    fieldType: '1'
};

// ==============================|| CONFIGURATION REDUCER ||============================== //

const configurationReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case actionTypes.SET_CONFIGURATION:
            return {
                ...state, ...action.payload
            }
        default:
            return state;
    }
};

export default configurationReducer;
