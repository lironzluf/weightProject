/**
 * Created by lzluf on 10/10/16.
 */
angular.module('weightapp.factory', [])
  .factory('AppFactory', function($http) {
      return {
        loginUser: function(userId,password){
          return $http({ // ajax http call
            method: 'POST',
            url: 'http://localhost:3000/users/login',
            cache: false,
            data: {
              userId: userId,
              password: password
            }
          });
        }
      }
  });
