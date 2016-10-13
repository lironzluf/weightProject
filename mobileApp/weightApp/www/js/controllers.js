angular.module('weightapp.controllers', ['weightapp.factory'])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, $ionicHistory, AppFactory) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.initApp = function(){

      // defaults
      $scope.socket = {};
      $scope.host = '192.168.0.102';
      $scope.port = 2101;
      $scope.isConnected = false;
      $scope.weight = 0;
      $scope.firstTime = true;
      $scope.data = '';
      $scope.tasks = [];
      $scope.userId = -1;

      //debug
      $scope.tasks[0] = {id: 123, items: ['0001','0002']};
      $scope.tasks[1] = {id: 124, items: ['0001','0002']};

      // TODO: get localStorage user-data

    };

    $scope.initApp();

    $scope.$on('$ionicView.enter', function(e) {
      if ($scope.userId === -1) {

        $ionicHistory.nextViewOptions({
          disableBack: true
        });

        // show login template
        $scope.loginData = {};
        $state.go('app.login');

      }
    });

    $scope.doLogin = function(){

      var userId = $scope.loginData.userId;
      var password = $scope.loginData.password;
      if (userId.length > 0 & password.length > 0) {
        AppFactory.loginUser(userId, password)
          .success(function(data){
            console.log(data);
            $state.go('app.taskSelection');
          })
          .error(function(e){
            console.log(e);
          });
      }

      // TODO: set localStorage user-data

      //debug
      /*
      $scope.userId = 1;

      $timeout(function(){
        $state.go('app.taskSelection');
      },1000)
      */
    };

    $scope.connectToHost = function (host, port) {
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

    $scope.setConnected = function () {
      $scope.isConnected = true;
      console.log('connected to host ' + $scope.host + ' on port ' + $scope.port);
    };

    $scope.setDisconnected = function () {
      $scope.isConnected = false;
      console.log('disconnected from host ' + $scope.host + ' on port ' + $scope.port);
    };


    $scope.startWeighing = function () {
      $state.go('app.weigh');
      if (!$scope.isConnected) { // CONNECT TO HOST IF NOT ALREADY CONNECTED
        $scope.connectToHost($scope.host, $scope.port);
      }
    };

    $scope.sendCommand = function (command) {
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
      catch (e) {
        alert('Exception: ' + e);
      }
    };

    $scope.receiveData = function (data) {
      var chars = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        chars.push(String.fromCharCode(data[i]));
      }
      var dataString = chars.join("");
      $scope.concatData(dataString.replace(/(?:\r\n|\r|\n)/g, ''));
      if ($scope.firstTime) {
        $scope.firstTime = false;
        // indicator sends the weight in two "waves" separated by about 100msec each
        $timeout(function () {
          $scope.handleData();
        }, 300);
      }
    };

    $scope.concatData = function (data) {
      $scope.data += data;
    };

    $scope.handleData = function () {
      if ($scope.data && $scope.data.length > 0) {
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

    $scope.getWeight = function () {
      console.log('Get weight button clicked');
      if ($scope.isConnected) {
          $scope.sendCommand('GN');
      }
    };

    $scope.goToSettings = function () {
      $state.go('app.settings');
    };

    $scope.tare = function () {
      console.log('Tare button clicked');
      if ($scope.isConnected) {
          $scope.sendCommand('ST');
      }
    };

    $scope.saveSettings = function (host, port) {
      $scope.host = host;
      $scope.port = port;
      console.log('Setings saved, connection is set to: ' + host + ':' + port);
      $state.go('app.start');
    };

    $scope.selectTask = function(index){
      var selectedTask = $scope.tasks[index];
      if (selectedTask) {
        $scope.currentTask = selectedTask;
        $scope.currentItemIdx = 0;
        $state.go('app.task');
      }
    };

    $scope.sendWeight = function(){
      var weight = $scope.weight,
          dbWeight;

      // debugging
      dbWeight = $scope.weight * 1.01;


      // TODO: http request get weight


      if (Math.abs(1 - (weight / dbWeight)) < 0.1) {
        window.alert("Incorrect weight, please try again");
      }
      else {
        $scope.tasks.forEach(function(task) {
          if (task === $scope.currentTask) {
            task.inProgress = true;
            // TODO: http update task as in progress
          }
        });
        if ($scope.currentItemIdx === $scope.currentTask.items.length - 1) {
          window.alert("Task finished!");
          $state.go('app.taskSelection');
        }
        else {
          $scope.currentItemIdx++;
          $scope.arrivedAtLocation = false;
          $scope.$apply();
        }
      }
    }
  });
