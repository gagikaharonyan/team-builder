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

export function userFetchData(data, rememberMe, onInvalidData) {
    return (dispatch) => {
        window.client.login(data, onInvalidData,
            (loading) => {
                dispatch(userisLoading(loading));
            },
            (response) => {
                if(!data.token) {
                    window.setSession(response.token, rememberMe)
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

export function userProfileEditFetch(data) {
    return (dispatch) => {
        const fetchData = {...data};
        delete fetchData.companies;
        delete fetchData.password;
        delete fetchData.token;
        window.client.editProfile(fetchData,
            (loading) => {
                dispatch(userisLoading(loading));
            },
            () => {
                console.log('success')
                dispatch(userFetchDataSuccess(data))
            },
            (error) => {
                dispatch(userHasError(true))
            }
       );
    };
}
