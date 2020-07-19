const teamsHaveError = (bool) => ({type: 'TEAMS_HAVE_ERROR', haveError: bool});
const teamsAreLoading = (bool) => ({type: 'TEAMS_ARE_LOADING', areLoading: bool});
const teamsFetchDataSuccess = (teams) => ({ type: 'TEAMS_FETCH_DATA_SUCCESS', data: teams});

export function teamsFetchData() {
    return (dispatch) => {
        window.client.getTeams(
            (loading) => {
                dispatch(teamsAreLoading(loading));
            },
            (response) => {
                dispatch(teamsFetchDataSuccess(response));
            },
            (error) => {
                dispatch(teamsHaveError(true));
            }
       );
    };
}
