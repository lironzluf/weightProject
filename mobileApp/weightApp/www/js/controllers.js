angular.module('weightapp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.socket = {};
  $scope.host = '192.168.0.102';
  $scope.port = 2101;
  $scope.isConnected = false;
  $scope.weight = 0;
  $scope.firstTime = true;
  $scope.data = '';

  $scope.connectToHost = function(host,port){
    if (typeof Socket === 'function') {
      $scope.socket = new Socket();
      $scope.socket.onData = $scope.receiveData;
      $scope.socket.onError = function (errorMessage) {
        alert("Error occured, error: " + errorMessage);
      };
      $scope.socket.onClose = function (hasError) {
        console.log("Socket closed, hasErrors=" + hasError);
        $scope.setDisconnected();
      };
      $scope.socket.open(
        host,
        port,
        $scope.setConnected,
        function (errorMessage) {
          alert("Error during connection, error: " + errorMessage);
        });
    }
    else {
      console.log('Socket is undefined');
    }
  };

  $scope.setConnected = function(){
    $scope.isConnected = true;
    console.log('connected to host ' + $scope.host + ' on port ' + $scope.port);
  };

  $scope.setDisconnected = function(){
    $scope.isConnected = false;
    console.log('disconnected from host ' + $scope.host + ' on port ' + $scope.port);
  };

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.startWeighing = function(){
    $state.go('app.weigh');
    if (!$scope.isConnected) { // CONNECT TO HOST IF NOT ALREADY CONNECTED
      $scope.connectToHost($scope.host, $scope.port);
    }
  };

  $scope.sendCommand = function(command){
    try {
      var bytes = new Uint8Array(command.length + 1);
      for (var i = 0; i < command.length; i++) {
        bytes[i] = command.charCodeAt(i);
      }
      bytes[command.length] = "\r\n".charCodeAt(0);
      $scope.socket.write(bytes, function () {
       // alert('sent successfully');
      }, function (e) {
        alert('error: ' + e)
      });
    }
    catch (e){ alert('Exception: ' + e);}
  };

  $scope.receiveData = function(data){
      var chars = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        chars.push(String.fromCharCode(data[i]));
      }
      var dataString = chars.join("");
      //dataString.split(/(?:\r\n|\r|\n)/g).forEach($scope.handleData);
      $scope.concatData(dataString.replace(/(?:\r\n|\r|\n)/g,''));
      if ($scope.firstTime) {
        $scope.firstTime = false;
        $timeout(function(){
          $scope.handleData();
        },300);
      }
  };

  $scope.concatData = function(data){
    //if ($scope.data.length > 0) {
      $scope.data += data;
    //}
  };

  $scope.handleData = function(){
    if($scope.data && $scope.data.length > 0) {
      if ($scope.data.indexOf('N+') === 0) {
        $scope.data = $scope.data.substring(2);
        if (!isNaN($scope.data)) {
          $scope.weight = parseInt($scope.data);
        }
      }
      else if ($scope.data.indexOf('+') === 0) {
        $scope.data = $scope.data.substring(1);
        if (!isNaN($scope.data)) {
          $scope.weight = parseInt($scope.data);
        }
      }
      else if ($scope.data.toLowerCase().indexOf('ok') > -1) {
        $scope.weight = 0;
      }
      $scope.$apply();
    }
    $scope.firstTime = true;
    $scope.data = '';
  };

  $scope.getWeight = function(){
    console.log('Get weight button clicked');
    if ($scope.isConnected){
      try{
        $scope.sendCommand('GN');
      }
      catch (e){}
    }
  };

  $scope.tare = function(){
    console.log('Tare button clicked');
    if ($scope.isConnected){
      try{
        $scope.sendCommand('ST');
      }
      catch (e){}
    }
  };

  $scope.saveSettings = function(host,port) {
    $scope.host = host;
    $scope.port = port;
    console.log(host +': ' + port);
    $state.go('app.start');
  }
});
