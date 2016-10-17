/**
 * Created by lzluf on 10/10/16.
 */
angular.module('weightapp.factory', [])
  .factory('AppFactory', function($http) {
      return {
        loginUser: function(userName,password){
          return $http({ // ajax http call
            method: 'POST',
            url: 'https://weightproject.herokuapp.com/users/login',
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
            url: 'https://weightproject.herokuapp.com/users/loginbyid',
            cache: false,
            data: {
              userId: userId
            }
          });
        },
		loginUserByNFC: function(nfc){
          return $http({ // ajax http call
            method: 'POST',
            url: 'https://weightproject.herokuapp.com/users/loginbynfc',
            cache: false,
            data: {
              nfc: nfc
            }
          });
        },
        getOrdersByUsername: function(userName){
          return $http({ // ajax http call
            method: 'POST',
            url: 'https://weightproject.herokuapp.com/orders/showallopenordernumberbyusername',
            cache: false,
            data: {
              userName: userName
            }
          });
        },
        getOrderData: function(orderId){
          return $http({ // ajax http call
            method: 'POST',
            url: 'https://weightproject.herokuapp.com/orders/showallopenordersbyordernumber',
            cache: false,
            data: {
              orderNumber: orderId
            }
          });
        },
        setOrderAsFinished: function(orderId){
          return $http({ // ajax http call
            method: 'POST',
            url: 'https://weightproject.herokuapp.com/orders/multiupdateorder',
            cache: false,
            data: {
              orderNumber: orderId,
              status: 0
            }
          });
        },
		insertNewWeight: function(userName,weight,latitude,longitude){		
          return $http({ // ajax http call
            method: 'POST',
            url: 'https://weightproject.herokuapp.com/weights/insertnewweight',			
            cache: false,
            data: {
              userName: userName,
              weight: weight,
			  latitude: latitude,
			  longitude: longitude,
			  date: Date()
            }
          });
        }
      }
  });
