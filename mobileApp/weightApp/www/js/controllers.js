angular.module('weightapp.controllers', ['weightapp.factory'])

  .controller('AppCtrl', function ($scope, $ionicModal, $ionicPopup, $timeout, $state, $ionicHistory, AppFactory) {

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

      if (localStorage.userId) {
        $scope.userId = localStorage.userId;
        console.log('Found userId in localStorage: ' + $scope.userId);
        AppFactory.loginUserById($scope.userId)
          .success(function(data){
            console.log(data);
            if (data.status) {
              $scope.user = data.user;
              $state.go('app.taskSelection');
              $scope.initTasks();
            }
            else {
              $scope.userId = -1;
              $state.go('app.login');
            }
          })
      }

      if (localStorage.host){
        $scope.host = localStorage.host;
      }

      if (localStorage.port){
        $scope.port = localStorage.port;
      }

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
      if (userId && password && userId.length > 0 & password.length > 0) {
        AppFactory.loginUser(userId, password)
          .success(function(data){
            console.log(data);
            if (data.status) {
              $scope.userId = data.user._id;
              $scope.user = data.user;
              $state.go('app.taskSelection');
              $scope.loginResult = 'Logged In Successfully';

              localStorage.userId = $scope.userId;
              $scope.initTasks();
            }
            else {
              $scope.loginResult = 'Incorrect Username or Password';
            }
          })
          .error(function(e){
            console.log(e);
            $scope.loginResult = 'Error Logging In';
          });
      }
      else {
        $scope.loginResult = 'Please fill in these required fields';
      }

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


    $scope.connectToIndicator = function(){
      if (!$scope.isConnected) { // CONNECT TO HOST IF NOT ALREADY CONNECTED
        $scope.connectToHost($scope.host, $scope.port);
      }
    };

    $scope.alertPopup = function(title,subtitle){
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: subtitle,
        buttons: [
          {
            text: 'OK',
            type:'button-assertive'
          }
        ]
      });

      alertPopup.then(function(res) {
       // console.log('Thank you for not eating my delicious ice cream cone');
      });
    };

    $scope.showLocationPopup = function(){
      $scope.locations = {};
      var myPopup = $ionicPopup.show({
        template: '<input type="number" ng-model="locations.inputSku">',
        title: 'Enter SKU Number',
        //subTitle: 'SKU Number',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Check</b>',
            type: 'button-assertive',
            onTap: function(e){
              if (!$scope.locations.inputSku){
                e.preventDefault();
              }
              else {
                return $scope.locations.inputSku;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        if (!isNaN(res)) {
          $scope.checkLocation(res);
        }
      });

      $timeout(function() {
        myPopup.close(); //close the popup after 10 seconds for some reason
      }, 10000);
    };

    $scope.checkLocation = function(input){
      if (input == $scope.currentTask[$scope.currentItemIdx].sku) {
        console.log('sku ok');
        $state.go('app.weighInTask');
        console.log('weight should be: ' + $scope.currentTask[$scope.currentItemIdx].weight);
        $scope.connectToIndicator();
      }
      else {
        console.log('input sku: ' + input);
        console.log('wrong sku, sku is: ' + $scope.currentTask[$scope.currentItemIdx].sku);
        $scope.alertPopup("Wrong SKU","The SKU inserted is incorrect");
      }
    };

    $scope.backToItem = function(){
      $state.go('app.task');
    };

    $scope.startWeighing = function () {
      $state.go('app.weigh');
      $scope.connectToIndicator();
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
      localStorage.host = host;
      localStorage.port = port;
      console.log('Setings saved, connection is set to: ' + host + ':' + port);
      $state.go('app.start');
    };

    $scope.selectTask = function(index){
      var selectedTaskId = $scope.tasks[index];
      if (selectedTaskId) {
        $scope.currentTaskId = selectedTaskId;
        $scope.currentItemIdx = 0;

        AppFactory.getOrderData(selectedTaskId)
          .success(function(data){
            if (data.status){
              $scope.currentTask = data.data;
              console.log('Got task data!');
              console.log($scope.currentTask);
              $state.go('app.task');
            }
            else {
             console.log('Task not found');
            }
          })
          .error(function(e){
            console.log(e);
          });

      }
    };

    $scope.sendWeight = function(){
      var weight = $scope.weight,
          dbWeight = $scope.currentTask[$scope.currentItemIdx].weight;

      if (Math.abs(1 - (weight / dbWeight)) < 0.1) {
        $scope.alertPopup("Incorrect weight", "Please try again");
      }
      else {
        // update task to in-progress
        $scope.tasks.forEach(function(task) {
          if (task === $scope.currentTaskId) {
            task.inProgress = true;
          }
        });

        if ($scope.currentItemIdx === $scope.currentTask.length - 1) {

          $state.go('app.taskSelection');
          AppFactory.setOrderAsFinished($scope.currentTaskId)
            .success(function(data){
              if (data.status) {
                $scope.initTasks();
              }
              else {
                $scope.alertPopup("Error", "Error updating task. Please try again.");
              }
            })
            .error(function(e){
              $scope.alertPopup("Error", "Error updating task. Please try again.");
              console.log(e);
            });
        }
        else {
          $scope.currentItemIdx++;
          $scope.$apply();
        }
      }
    };

    $scope.initTasks = function(){
      console.log('1');
      if ($scope.userId !== -1 && $scope.user) {
        AppFactory.getOrdersByUsername($scope.user.userName)
          .success(function(data){
            if (data.status){
              console.log('Got new tasks');
              console.log(data.data);
             $scope.tasks = data.data;
            }
            else {
              console.log('No tasks');
            }
          })
          .error(function(e){
            console.log(e);
          });
      }
    };
  });
