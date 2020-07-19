const initialState = {
    data: [],
    areLoading: false,
    haveError: false
}

export default function projects (state = initialState, action) {
    switch (action.type) {
        case 'PROJECTS_ARE_LOADING':
            return {...state, areLoading: action.areLoading};

        case 'PROJECTS_FETCH_DATA_SUCCESS':
            
            return {...state, data: action.data};
        case 'PROJECTS_HAVE_ERROR':

            return {...state, haveError: action.haveError};
        case 'PROJECT_VOTING_SUCCESS':
            
            return {...state, data: state.data.map((project => {
                if(project.id == action.id) {
                    return {...project,  votedByMe: action.voteType === 'like'}
                }
                return project
            }))};
        default:
            return state;
            break;
    }
}