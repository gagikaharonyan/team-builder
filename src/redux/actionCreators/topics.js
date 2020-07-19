const topicsHaveError = (bool) => ({type: 'TOPICS_HAVE_ERROR', haveError: bool});
const topicsAreLoading = (bool) => ({type: 'TOPICS_ARE_LOADING', areLoading: bool});
const topicsFetchDataSuccess = (topics) => ({ type: 'TOPICS_FETCH_DATA_SUCCESS', data: topics});
const topicIsAdding = (topicIsAdding) => ({type: 'TOPIC_IS_ADDING', topicIsAdding});
const topicAddingSuccess = (newTopic) => ({type: 'TOPIC_ADDING_SUCCESS', newTopic});
const topicDeletingSuccess = (id) => ({ type: 'TOPIC_DELETING_SUCCESS', id});
const topicVotingSuccess = (id, voteType) => ({type: 'TOPIC_VOTING_SUCCESS', id, voteType})

export function topicsFetchData() {
    return (dispatch) => {
        window.client.getTopics(
            (loading) => {
                dispatch(topicsAreLoading(loading));
            },
            (response) => {
                dispatch(topicsFetchDataSuccess(response));
            },
            (error) => {
                dispatch(topicsHaveError(true));
            }
       );
    };
}

export function fetchNewTopic(title) {
    return (dispatch) => {
        window.client.addTopic(title,
            (loading) => {
                dispatch(topicIsAdding(loading));
            },
            (newTopic) => {
                dispatch(topicAddingSuccess(newTopic));
            },
            (error) => {
                dispatch(topicsHaveError(true));
            }
       );
    }
}

export function fetchDeleteTopic(id) {
    return (dispatch) => {
        window.client.deleteTopic(id,
            (loading) => {
                //dispatch(topicIsAdding(loading));
            },
            () => {
                dispatch(topicDeletingSuccess(id));
            },
            (error) => {
                dispatch(topicsHaveError(true));
            }
       );
    }
}

export function fetchVoteTopic(id, type) {
    return (dispatch) => {
        window.client.voteTopic(id, type,
            (loading) => {
                //dispatch(topicIsAdding(loading));
            },
            () => {
                dispatch(topicVotingSuccess(id, type));
            },
            (error) => {
                dispatch(topicsHaveError(true));
            }
       );
    }
}