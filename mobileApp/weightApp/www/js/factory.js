/**
 * Created by lzluf on 10/10/16.
 */
angular.module('weightapp.factory', [])
  .factory('AppFactory', function($http) {
      return {
        loginUser: function(userName,password){
          return $http({ // ajax http call
            method: 'POST',
            url: 'http://localhost:3000/users/login',
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
            url: 'http://localhost:3000/users/loginbyid',
            cache: false,
            data: {
              userId: userId
            }
          });
        }
      }
  });
