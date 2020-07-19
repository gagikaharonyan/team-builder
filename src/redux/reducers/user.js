export default function user(state = {data: {}, isLoading: false, isLoggedIn: false, hasError: false, isLogOuting: false}, action) {
    switch (action.type) {
        case 'USER_IS_LOADING':
            return {...state, isLoading: action.isLoading};

        case 'USER_FETCH_DATA_SUCCESS':
            
            return {...state, data: action.data, isLoggedIn: true};
        case 'USER_HAS_ERROR':

            return {...state, hasError: action.hasError};
        case 'USER_LOG_OUT':

            return {...state, data: {}, isLoggedIn: false}

        default:
            return state;
    }
}