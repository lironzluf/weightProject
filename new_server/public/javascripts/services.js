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


        }
    }]);
})(app || {});