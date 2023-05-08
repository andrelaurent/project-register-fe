const initialState = {
    message: '',
    open: false,
}

const loading = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_ACTIVE':
            return state = {...state, open: true}
        case 'LOADING_INACTIVE':
            return state = {...state, open: false}
        default: return state
    }
}

export default loading