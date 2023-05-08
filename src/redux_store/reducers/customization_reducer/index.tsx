// action - state management
import * as actionTypes from 'constants/actions';

export const initialState = {
    isOpen: [], // for active default menu
    opened: true,
    theme: 'dark',
    loading: true,
    customize: {
        borderRadius: 5
    }
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action:any) => {
    let id;
    switch (action.type) {
        case actionTypes.MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [...id]
            };
        case actionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        case actionTypes.SET_THEME:
            return {
                ...state,
                theme: action.payload
            };
        case actionTypes.SET_CUSTOMIZE:
            return {
                ...state,
                customize: {...state.customize, ...action.payload}
            };
        default:
            return state;
    }
};

export default customizationReducer;
