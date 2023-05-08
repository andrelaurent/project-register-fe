import * as actionTypes from 'constants/actions'
import ListQueryModel from 'models/ListQueryModel'


const initialState = {
    logListQuery: {
        page: 1,
        offset: 0,
        limit: 10,
        order_by: null,
        desc: null,
        filterModel: {}
    } as ListQueryModel,
    logPathName: ''
}

const logReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case actionTypes.SET_LIST_QUERY:
            return state = {...state, logListQuery: action.payload}
        case actionTypes.SET_LOG_PATHNAME:
            return state = {...state, logPathName: action.payload}
        default: return state
    }
}

export default logReducer