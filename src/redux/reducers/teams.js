const initialState = {
    data: [],
    areLoading: false,
    haveError: false
}

export default function teams (state = initialState, action) {
    switch (action.type) {
        case 'TEAMS_ARE_LOADING':
            return {...state, areLoading: action.areLoading};

        case 'TEAMS_FETCH_DATA_SUCCESS':
            
            return {...state, data: action.data};
        case 'TEAMS_HAVE_ERROR':

            return {...state, haveError: action.haveError};
        default:
            return state;
            break;
    }
}