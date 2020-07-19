const projectsHaveError = (bool) => ({type: 'PROJECTS_HAVE_ERROR', haveError: bool});
const projectsAreLoading = (bool) => ({type: 'PROJECTS_ARE_LOADING', areLoading: bool});
const projectsFetchDataSuccess = (projects) => ({ type: 'PROJECTS_FETCH_DATA_SUCCESS', data: projects});
const projectVotingSuccess = (id, voteType) => ({type: 'PROJECT_VOTING_SUCCESS', id, voteType})

export function projectsFetchData() {
    return (dispatch) => {
        window.client.getProjects(
            (loading) => {
                dispatch(projectsAreLoading(loading));
            },
            (response) => {
                dispatch(projectsFetchDataSuccess(response));
            },
            (error) => {
                dispatch(projectsHaveError(true));
            }
       );
    };
}

export function fetchVoteProject(id, type) {
    return (dispatch) => {
        window.client.voteProject(id, type,
            (loading) => {
                //dispatch(topicIsAdding(loading));
            },
            () => {
                dispatch(projectVotingSuccess(id, type));
            },
            (error) => {
                dispatch(projectsHaveError(true));
            }
       );
    }
}