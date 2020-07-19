window.getSession = function() {
  return localStorage.getItem('sessionId') || sessionStorage.getItem('sessionId');
}

window.removeSession = function() {
  delete  window.sessionStorage.sessionId;
  delete  window.localStorage.sessionId;
}

window.setSession = function(token, rememberMe) {
  if(rememberMe) {
    localStorage.setItem('sessionId', token);
  } else {
    sessionStorage.setItem('sessionId', token);
  }
}

window.client = (function() {
  const base = 'https://picsart-bootcamp-2020-api.herokuapp.com';
  function setHeadersWithToken() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'token' : window.getSession()
    }
  }

    function login(data, onInvalidData, onLoading, onSuccess, onError) {
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
          if(response.status == '404' || response.status == '401') {
            onInvalidData()
          }
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
      fetch(base+'/api/v1/users/register', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      }).then(checkStatus)
      .then((response) => onSuccess(response))
    }

    function editProfile(data, onLoading, onSuccess, onError) {
      onLoading(true);
      fetch(base+'/api/v1/users/update', {
        headers: setHeadersWithToken(),
        method: 'PUT',
        body: JSON.stringify(data)
      }).then((response) => {
        onLoading(false);
      
        return checkStatus(response)
      })        
      .then((response) => onSuccess(response))
      .catch((error) => onError(error));
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
          headers: setHeadersWithToken(),
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
          headers: setHeadersWithToken(),
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
          headers: setHeadersWithToken(),
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
          headers: setHeadersWithToken(),
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

    function getProjects(onLoading, onSuccess, onError) {
      onLoading(true);

      fetch(base+'/api/v1/projects', {
          headers: setHeadersWithToken(),
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

    function voteProject(id, type, onLoading, onSuccess, onError) {
      onLoading(true);

      fetch(base+`/api/v1/projects/${id}/voting`, {
          headers: setHeadersWithToken(),
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

    function getTeams(onLoading, onSuccess, onError) {
      // onLoading(true);

      // fetch(base+'/api/v1/teams', {
      //     headers: setHeadersWithToken(),
      //     method: 'GET'
      //   })
      // .then((response) => {
      //     onLoading(false);

      //     return checkStatus(response);
      // })
      // .then(parseJSON)
      // .then((response) => onSuccess(response))
      // .catch((error) => onError(error));

      onSuccess([
        {
           id: 1,
           name: 'Editor',
           topic: 'Hooks',
           project: 'Canvas',
           members: [
              {
                  firstName: 'Gagikkk1',
                  lastName: 'Aharonyaaannnnnnnnnnnn',
                  avatarUrl: 'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-9/105478018_1321342364736969_7626231116641582253_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=IoNgCMzf4FoAX-FJQjJ&_nc_ht=scontent.fevn1-4.fna&oh=20367cbc3463ea1cfbf8605f9a2f0412&oe=5F358D07'
              },
              {
                firstName: 'Namte2',
                lastName: 'Lnassmtttte',
                avatarUrl: 'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-9/105478018_1321342364736969_7626231116641582253_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=IoNgCMzf4FoAX-FJQjJ&_nc_ht=scontent.fevn1-4.fna&oh=20367cbc3463ea1cfbf8605f9a2f0412&oe=5F358D07'
            },
            {
              firstName: 'Naasdasdme3',
              lastName: 'Lnassssddme',
              avatarUrl: 'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-9/105478018_1321342364736969_7626231116641582253_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=IoNgCMzf4FoAX-FJQjJ&_nc_ht=scontent.fevn1-4.fna&oh=20367cbc3463ea1cfbf8605f9a2f0412&oe=5F358D07'
            },
            {
              firstName: 'Name4',
              lastName: 'Lnamtttttte',
              avatarUrl: 'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-9/105478018_1321342364736969_7626231116641582253_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=IoNgCMzf4FoAX-FJQjJ&_nc_ht=scontent.fevn1-4.fna&oh=20367cbc3463ea1cfbf8605f9a2f0412&oe=5F358D07'
            }
           ]
        },
        {
          id: 2,
          name: 'Editor',
          topic: 'Hooks',
          project: 'Canvas',
          members: [
             {
                 firstName: 'Gagikkk1',
                 lastName: 'Aharonyaaannnnnnnnnnnn',
                 avatarUrl: 'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-9/105478018_1321342364736969_7626231116641582253_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=IoNgCMzf4FoAX-FJQjJ&_nc_ht=scontent.fevn1-4.fna&oh=20367cbc3463ea1cfbf8605f9a2f0412&oe=5F358D07'
             },
             {
               firstName: 'Namte2',
               lastName: 'Lnassmtttte',
               avatarUrl: 'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-9/105478018_1321342364736969_7626231116641582253_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=IoNgCMzf4FoAX-FJQjJ&_nc_ht=scontent.fevn1-4.fna&oh=20367cbc3463ea1cfbf8605f9a2f0412&oe=5F358D07'
           },
           {
             firstName: 'Naasdasdme3',
             lastName: 'Lnassssddme',
             avatarUrl: 'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-9/105478018_1321342364736969_7626231116641582253_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=IoNgCMzf4FoAX-FJQjJ&_nc_ht=scontent.fevn1-4.fna&oh=20367cbc3463ea1cfbf8605f9a2f0412&oe=5F358D07'
           },
           {
             firstName: 'Name4',
             lastName: 'Lnamtttttte',
             avatarUrl: 'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-9/105478018_1321342364736969_7626231116641582253_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=IoNgCMzf4FoAX-FJQjJ&_nc_ht=scontent.fevn1-4.fna&oh=20367cbc3463ea1cfbf8605f9a2f0412&oe=5F358D07'
           },
           {
            firstName: 'Name4',
            lastName: 'Lnamtttttte',
            avatarUrl: 'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-9/105478018_1321342364736969_7626231116641582253_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=IoNgCMzf4FoAX-FJQjJ&_nc_ht=scontent.fevn1-4.fna&oh=20367cbc3463ea1cfbf8605f9a2f0412&oe=5F358D07'
          }
          ]
       },
       {
        id: 3,
        name: 'Editor',
        topic: 'Hooks',
        project: 'Canvas',
        members: [
           {
               firstName: 'Gagikkk1',
               lastName: 'Aharonyaaannnnnnnnnnnn',
               avatarUrl: 'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-9/105478018_1321342364736969_7626231116641582253_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=IoNgCMzf4FoAX-FJQjJ&_nc_ht=scontent.fevn1-4.fna&oh=20367cbc3463ea1cfbf8605f9a2f0412&oe=5F358D07'
           },
           {
             firstName: 'Namte2',
             lastName: 'Lnassmtttte',
             avatarUrl: 'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-9/105478018_1321342364736969_7626231116641582253_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=IoNgCMzf4FoAX-FJQjJ&_nc_ht=scontent.fevn1-4.fna&oh=20367cbc3463ea1cfbf8605f9a2f0412&oe=5F358D07'
         },
         {
           firstName: 'Naasdasdme3',
           lastName: 'Lnassssddme',
           avatarUrl: 'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-9/105478018_1321342364736969_7626231116641582253_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=IoNgCMzf4FoAX-FJQjJ&_nc_ht=scontent.fevn1-4.fna&oh=20367cbc3463ea1cfbf8605f9a2f0412&oe=5F358D07'
         },
         {
           firstName: 'Name4',
           lastName: 'Lnamtttttte',
           avatarUrl: 'https://scontent.fevn1-4.fna.fbcdn.net/v/t1.0-9/105478018_1321342364736969_7626231116641582253_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=IoNgCMzf4FoAX-FJQjJ&_nc_ht=scontent.fevn1-4.fna&oh=20367cbc3463ea1cfbf8605f9a2f0412&oe=5F358D07'
         }
        ]
     },
        
        
      ])
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
        editProfile,
        getCompanies,
        getTopics,
        addTopic,
        deleteTopic,
        voteTopic,
        getProjects,
        voteProject,
        getTeams,
    };
})();