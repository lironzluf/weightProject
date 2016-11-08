(function (app)
{
    // create users factory
    app.factory('Factory', ['$http', '$q', function ($http, $q)
    {
        return {
            loginUser: function(userName,password){
                return $http({ // ajax http call
                    method: 'POST',
                    url: serverUrl + 'users/login',
                    cache: false,
                    data: {
                        userName: userName,
                        password: password
                    }
                });
            },
            loginUserById: function(userId){
                return $http({ // ajax http call
                    method: 'POST',
                    url: serverUrl + 'users/loginbyid',
                    cache: false,
                    data: {
                        userId: userId
                    }
                });
            },
            insertNewUser: function(user){
                return $http({ // ajax http call
                    method: 'POST',
                    url: serverUrl + 'users/insertnewuser',
                    cache: false,
                    data: {
                        userName: user.userName,
                        password: user.password,
                        nfc: user.nfc,
                        securityLevel: user.securityLevel
                    }
                });
            },
            insertNewUser: function(userName){
                return $http({ // ajax http call
                    method: 'POST',
                    url: serverUrl + 'users/deleteuser',
                    cache: false,
                    data: {
                        userName: userName
                    }
                });
            }
        }
    }]);
})(app || {});