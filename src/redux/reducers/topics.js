const initialState = {
    data: [],
    areLoading: false,
    haveError: false,
    topicIsAdding: false,
    topicAddingSuccess: false
}

export default function topics (state = initialState, action) {
    switch (action.type) {
        case 'TOPICS_ARE_LOADING':
            return {...state, areLoading: action.areLoading};

        case 'TOPICS_FETCH_DATA_SUCCESS':
            
            return {...state, data: action.data};
        case 'TOPICS_HAVE_ERROR':

            return {...state, haveError: action.haveError};
        case 'TOPIC_IS_ADDING':

            return {...state, topicIsAdding: action.topicIsAdding};
        case 'TOPIC_ADDING_SUCCESS':

            return {...state, data: [...state.data, action.newTopic]};
        case 'TOPIC_DELETING_SUCCESS':
        
            return {...state, data: state.data.filter((topic => topic.id !== action.id))};
        case 'TOPIC_VOTING_SUCCESS':
            
            return {...state, data: state.data.map((topic => {
                if(topic.id == action.id) {
                    return action.voteType == 'like'
                    ?{...topic, votingsCount: topic.votingsCount + 1, votedByMe: true}
                    :{...topic, votingsCount: topic.votingsCount - 1, votedByMe: false}
                }
                return topic
            }))};
        default:
            return state;
            break;
    }
}