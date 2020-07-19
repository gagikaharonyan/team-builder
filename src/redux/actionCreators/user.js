function userHasError(bool) {
    return {
        type: 'USER_HAS_ERROR',
        hasError: bool
    };
}

function userisLoading(bool) {
    return {
        type: 'USER_IS_LOADING',
        isLoading: bool
    };
}

function userFetchDataSuccess(user) {
    return {
        type: 'USER_FETCH_DATA_SUCCESS',
        data: user
    };
}

export function userLogOut() {
    return {
        type: 'USER_LOG_OUT',
    };
}

export function userFetchData(data) {
    return (dispatch) => {
        window.client.login(data,
            (loading) => {
                dispatch(userisLoading(loading));
            },
            (response) => {
                if(!data.token) {
                    console.log(`SETTING_SESSINO ${response.token}`)
                    window.setSession(response.token)
                }
                dispatch(userFetchDataSuccess(response))
            },
            (error) => {
                dispatch(userHasError(true))
            }
       );
    };
}

export function userFetchLogOut() {
    return (dispatch) => {
        window.client.logOut(() => {
            window.removeSession();
            dispatch(userLogOut());
        })
    }
}
