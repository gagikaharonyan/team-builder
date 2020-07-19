window.getSession = function() {
  return sessionStorage.getItem('sessionId');
}
window.removeSession = function() {
  delete  window.sessionStorage.sessionId;
}

window.setSession = function(token) {
  sessionStorage.setItem('sessionId', token);
}

window.client = (function() {
  const base = 'https://picsart-bootcamp-2020-api.herokuapp.com';
  const headerWitToken = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'token' : window.getSession()
  }

    function login(data, onLoading, onSuccess, onError) {
      onLoading(true);
      (data.token
        ?fetch(base+'/api/v1/users', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'token' : data.token
          },
          method: 'GET'
        })
        :fetch(base+'/api/v1/users/login', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(data)
        }))
      .then((response) => {
          onLoading(false);

          return checkStatus(response);
      })
      .then(parseJSON)
      .then((response) => onSuccess(response))
      .catch((error) => onError(error));
    }

    function getCompanies(onSuccess) {
      fetch(base+'/api/v1/companies')
      .then(checkStatus)
      .then(parseJSON)
      .then((response) => onSuccess(response))
      .catch((error) => onError(error));
    }

    function register(data, onSuccess) {
      console.log(data)
      fetch(base+'/api/v1/users/register', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      }).then(checkStatus)
      .then(parseJSON)
      .then((response) => onSuccess(response))
    }

    function logOut(onSuccess) {
      fetch(base+'/api/v1/users/logout', {
        headers : {
          token: getSession()
        }
      })
      .then(checkStatus)
      .then(onSuccess);
    }

    function getTopics(onLoading, onSuccess, onError) {
      onLoading(true);

      fetch(base+'/api/v1/topics', {
          headers: headerWitToken,
          method: 'GET'
        })
      .then((response) => {
          onLoading(false);

          return checkStatus(response);
      })
      .then(parseJSON)
      .then((response) => onSuccess(response))
      .catch((error) => onError(error));
    }

    function addTopic(title, onLoading, onSuccess, onError) {
      onLoading(true);

      fetch(base+'/api/v1/topics', {
          headers: headerWitToken,
          method: 'POST',
          body: JSON.stringify({title})
        })
      .then((response) => {
          onLoading(false);

          return checkStatus(response);
      })
      .then(parseJSON)
      .then((response) => onSuccess(response))
      .catch((error) => onError(error));
    }

    function deleteTopic(id, onLoading, onSuccess, onError) {
      onLoading(true);

      fetch(base+'/api/v1/topics/'+id, {
          headers: headerWitToken,
          method: 'DELETE'
        })
      .then((response) => {
          onLoading(false);

          return checkStatus(response);
      })
      .then((response) => onSuccess(response))
      .catch((error) => onError(error));
    }

    function voteTopic(id, type, onLoading, onSuccess, onError) {
      onLoading(true);

      fetch(base+`/api/v1/topics/${id}/voting`, {
          headers: headerWitToken,
          method: 'POST',
          body: JSON.stringify({type})
        })
      .then((response) => {
          onLoading(false);

          return checkStatus(response);
      })
      .then((response) => onSuccess(response))
      .catch((error) => onError(error));
    }
   
    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          const error = new Error(`HTTP Error ${response.statusText}`);
          error.status = response.statusText;
          error.response = response;
          console.log(error);
          throw error;
        }
    }

    function parseJSON(response) {
        return response.json();
    }
    
    return {
        register,
        login,
        logOut,
        getCompanies,
        getTopics,
        addTopic,
        deleteTopic,
        voteTopic,
    };
})();