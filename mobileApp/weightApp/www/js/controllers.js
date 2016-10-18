angular.module('weightapp.controllers', ['weightapp.factory'])

  .controller('AppCtrl', function ($scope, $ionicModal, $ionicHistory, $ionicPopup, $timeout, $state, AppFactory, $ionicPlatform) {

    /**
     * initApp :: function
     * description:
     */
    $scope.initApp = function () {

      // defaults
      $scope.socket = {};
      $scope.host = '192.168.0.101';
      $scope.port = 2101;
      $scope.isConnected = false;
      $scope.weight = 0;
      $scope.firstTime = true;
      $scope.data = '';
      $scope.tasks = [];
      $scope.userId = -1;
      $scope.loading = true;
      $scope.myWeights = [];

      if (localStorage.userId) {
        $scope.userId = localStorage.userId;
        console.log('Found userId in localStorage: ' + $scope.userId);
        AppFactory.loginUserById($scope.userId)
          .success(function (data) {
            console.log(data);
            if (data.status) {
              $scope.user = data.user;
              $scope.autoLoginMsg = "Hello " + $scope.user.userName + ", You have been logged in automatically";
              $state.go('app.taskSelection');
              $scope.initTasks();
              $scope.initMyWeights();
            }
            else {
              $scope.userId = -1;
              $state.go('app.login');
            }
          })
      }

      if (localStorage.host) {
        $scope.host = localStorage.host;
      }

      if (localStorage.port) {
        $scope.port = localStorage.port;
      }

    };

    /**
     * ionicView.enter :: Event Handler
     * description:
     */
    $scope.$on('$ionicView.enter', function (e) {
      if ($scope.userId === -1) {

        // show login template
        $scope.loginData = {};
        $state.go('app.login');

      }
    });

    /**
     * doLogin :: function
     * description:
     */
    $scope.doLogin = function () {

      var userId = $scope.loginData.userId;
      var password = $scope.loginData.password;
      if (userId && password && userId.length > 0 & password.length > 0) {
        AppFactory.loginUser(userId, password)
          .success(function (data) {
            console.log(data);
            if (data.status) {
              $scope.userId = data.user._id;
              $scope.user = data.user;
              $state.go('app.taskSelection');

              localStorage.userId = $scope.userId;
              $scope.initTasks();
              $scope.initMyWeights();
            }
            else {
              $scope.alertPopup("Incorrect Username or Password");
            }
          })
          .error(function (e) {
            console.log(e);
            $scope.alertPopup("Error Logging In");
          });
      }
      else {
        $scope.alertPopup("Please fill in these required fields");
      }
    };

    /**
     * doLoginByNFC :: function
     * description:
     */
    $scope.doLoginByNFC = function (nfc) {
      AppFactory.loginUserByNFC(nfc)
        .success(function (data) {
          console.log(data);
          if (data.status) {
            $scope.userId = data.user._id;
            $scope.user = data.user;
            $state.go('app.taskSelection');
            $scope.loginResult = 'Logged In Successfully';

            localStorage.userId = $scope.userId;
            $scope.initTasks();
            $scope.initMyWeights();
          }
          else {
            $scope.loginResult = 'Incorrect Username or Password';
          }
        })
        .error(function (e) {
          console.log(e);
          $scope.loginResult = 'Error Logging In';
        });
    };

    /**
     * connectToHost :: function
     * description:
     */
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
            $scope.alertPopup("Error during connection", "error: " + errorMessage);
          });
      }
      else {
        console.log('Socket is undefined');
      }
    };

    /**
     * setConnected :: function
     * description:
     */
    $scope.setConnected = function () {
      $scope.isConnected = true;
      console.log('connected to host ' + $scope.host + ' on port ' + $scope.port);
    };

    /**
     * setDisconnected :: function
     * description:
     */
    $scope.setDisconnected = function () {
      $scope.isConnected = false;
      console.log('disconnected from host ' + $scope.host + ' on port ' + $scope.port);
    };

    /**
     * connectToIndicator :: function
     * description:
     */
    $scope.connectToIndicator = function () {
      if (!$scope.isConnected) { // CONNECT TO HOST IF NOT ALREADY CONNECTED
        $scope.connectToHost($scope.host, $scope.port);
      }
    };

    /**
     * alertPopup :: function
     * description:
     */
    $scope.alertPopup = function (title, subtitle) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: subtitle,
        buttons: [
          {
            text: 'OK',
            type: 'button-assertive'
          }
        ]
      });

      alertPopup.then(function (res) {
        // console.log('Thank you for not eating my delicious ice cream cone');
      });
    };

    /**
     * showLocationPopup :: function
     * description:
     */
    $scope.showLocationPopup = function () {
      $scope.locations = {};
      var myPopup = $ionicPopup.show({
        template: '<input type="number" ng-model="locations.inputSku">',
        title: 'Enter SKU Number',
        //subTitle: 'SKU Number',
        scope: $scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Check</b>',
            type: 'button-assertive',
            onTap: function (e) {
              if (!$scope.locations.inputSku) {
                e.preventDefault();
              }
              else {
                return $scope.locations.inputSku;
              }
            }
          }
        ]
      });

      myPopup.then(function (res) {
        if (!isNaN(res)) {
          $scope.checkLocation(res);
        }
      });

      $timeout(function () {
        myPopup.close(); //close the popup after 10 seconds for some reason
      }, 10000);
    };

    /**
     * checkLocation :: function
     * description:
     */
    $scope.checkLocation = function (input) {
      if (input == $scope.currentTask[$scope.currentItemIdx].sku) {
        console.log('sku ok');
        $state.go('app.weighInTask');
        console.log('weight should be: ' + $scope.currentTask[$scope.currentItemIdx].weight);
        $scope.connectToIndicator();
      }
      else {
        console.log('input sku: ' + input);
        console.log('wrong sku, sku is: ' + $scope.currentTask[$scope.currentItemIdx].sku);
        $scope.alertPopup("Wrong SKU", "The SKU inserted is incorrect");
      }
    };

    /**
     * backToItem :: function
     * description:
     */
    $scope.backToItem = function () {
      $state.go('app.task');
    };

    /**
     * startWeighing :: function
     * description:
     */
    $scope.startWeighing = function () {
      $state.go('app.weigh');
      $scope.connectToIndicator();
    };

    /**
     * sendCommand :: function
     * description:
     */
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

    /**
     * receiveData :: function
     * description:
     */
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

    /**
     * concatData :: function
     * description:
     */
    $scope.concatData = function (data) {
      $scope.data += data;
    };


    /**
     * handleData :: function
     * description:
     */
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

    /**
     * getWeight :: function
     * description:
     */
    $scope.getWeight = function () {
      console.log('Get weight button clicked');
      if ($scope.isConnected) {
        $scope.sendCommand('GN');
      }
    };

    /**
     * goToSettings :: function
     * description:
     */
    $scope.goToSettings = function () {
      $state.go('app.settings');
    };

    /**
     * tare :: function
     * description:
     */
    $scope.tare = function () {
      console.log('Tare button clicked');
      if ($scope.isConnected) {
        $scope.sendCommand('ST');
      }
    };

    /**
     * saveSettings :: function
     * description:
     */
    $scope.saveSettings = function (host, port) {
      $scope.host = host;
      $scope.port = port;
      localStorage.host = host;
      localStorage.port = port;
      console.log('Setings saved, connection is set to: ' + host + ':' + port);
      $ionicHistory.goBack();
    };

    /**
     * selectTask :: function
     * description:
     */
    $scope.selectTask = function (index) {
      $scope.loading = true;
      var selectedTaskId = $scope.tasks[index];
      if (selectedTaskId) {
        $scope.currentTaskId = selectedTaskId;
        $scope.currentItemIdx = 0;

        AppFactory.getOrderData(selectedTaskId)
          .success(function (data) {
            $scope.loading = false;
            if (data.status) {
              $scope.currentTask = data.data;
              console.log('Got task data!');
              console.log($scope.currentTask);
              $state.go('app.task');
            }
            else {
              console.log('Task not found');
            }

          })
          .error(function (e) {
            $scope.loading = false;
            console.log(e);
          });

      }
    };

    /**
     * sendWeight :: function
     * description:
     */
    $scope.sendWeight = function () {
      var weight = $scope.weight,
        dbWeight = $scope.currentTask[$scope.currentItemIdx].weight;
      console.log('weight: ' + weight);
      console.log('dbWeight: ' + dbWeight);
      console.log('weight/dbWeight: ' + parseFloat(weight) / parseFloat(dbWeight));
      console.log('result: ' + Math.abs(1 - (parseFloat(weight) / parseFloat(dbWeight))));
      if (Math.abs(1 - (parseFloat(weight) / parseFloat(dbWeight))) > 0.1) {
        $scope.alertPopup("Incorrect weight", "Please try again");
      }
      else {

        if ($scope.currentItemIdx === $scope.currentTask.length - 1) {

          $state.go('app.taskSelection');
          AppFactory.setOrderAsFinished($scope.currentTaskId)
            .success(function (data) {
              if (data.status) {
                $scope.initTasks();
                $scope.alertPopup("Task Finished", "Great Job!");
              }
              else {
                $scope.alertPopup("Error", "Error updating task. Please try again.");
              }
            })
            .error(function (e) {
              $scope.alertPopup("Error", "Error updating task. Please try again.");
              console.log(e);
            });
        }
        else {

          $scope.alertPopup("Correct weight", "Proceeding to next item");
          $scope.currentItemIdx++;
          $state.go('app.task');
          //$scope.$apply();
        }
      }
    };

    /**
     * initTasks :: function
     * description:
     */
    $scope.initTasks = function () {
      if ($scope.userId !== -1 && $scope.user) {
        AppFactory.getOrdersByUsername($scope.user.userName)
          .success(function (data) {
            if (data.status) {
              console.log('Got new tasks');
              console.log(data.data);
              $scope.tasks = data.data;
            }
            else {
              console.log('No tasks');
            }
            $scope.loading = false;
            $scope.autoLoginMsg = '';
          })
          .error(function (e) {
            console.log(e);
            $scope.loading = false;
          });
      }
    };

    /**
     *
     */
    $scope.initMyWeights = function () {
      if ($scope.userId !== -1 && $scope.user) {
        AppFactory.showAllWeightsByUserName($scope.user.userName)
          .success(function (data) {
            if (data.status) {
              $scope.myWeights = data.data;
            }
            else {
              console.log('No data in my weights');
            }
            $scope.loading = false;
          })
          .error(function (e) {
            console.log(e);
            $scope.loading = false;
          });
      }
    };

    /**
     * logout :: function
     * description:
     */
    $scope.logout = function () {
      $scope.userId = -1;
      $scope.user = {};
      $scope.loginData = {};
      localStorage.removeItem('userId');
      $scope.alertPopup("Logged out successfully");
      $state.go('app.login');
    };

    /**
     * nfc :: Event Handler
     * description:
     */
    if (window.cordova) {
      $ionicPlatform.ready(function () {
        nfc.addTagDiscoveredListener(
          function (nfcEvent) {
            var tag = nfcEvent.tag;
            var tagId = nfc.bytesToHexString(tag.id);
            $scope.alertPopup('NFC Detected');
            $scope.doLoginByNFC(tagId);
          },
          function () { // success callback
            // alert("Waiting for NDEF tag");
          },
          function (error) { // error callback
            alert("Error adding NDEF listener " + JSON.stringify(error));
          }
        );
      });
    }

    /**
     * saveWeight :: function
     * description: Saving free weight and location for user
     * GPS must be open
     */
    $scope.saveWeight = function () {

      navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          AppFactory.insertNewWeight($scope.user.userName, $scope.weight, latitude, longitude)
            .success(function (data) {
              console.log(data);
              if (data.status) {
                $scope.alertPopup("Saved successfully");
              } else {
                $scope.alertPopup("Error");
              }
            })
            .error(function (e) {
              console.log(e);
              $scope.alertPopup("Error2");
            });
        },
        function (error) {
          alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
        });
    };

    /**
     * selectWeight :: function
     * description:   get GoogleMap by coords
     * @param index
     */
    $scope.selectWeight = function (index) {
      var selectWeightId = $scope.myWeights[index];
      if (selectWeightId) {
        var latitude = selectWeightId.latitude;
        var longitude = selectWeightId.longitude;
        $scope.mapPopup(latitude, longitude);
      }
    };

    /**
     * mapPopup :: function
     * description:
     * @param latitude
     * @param longitude
     */
    $scope.mapPopup = function (latitude, longitude) {
      navigator.vibrate(300);
      var mapPopup = $ionicPopup.alert({
        title: "Google Map",
        template: '<div></div>',
        buttons: [{
          text: 'OK',
          type: 'button-assertive'
        }]
      });
      mapPopup.then(function (res) {
        // console.log('Thank you for not eating my delicious ice cream cone');
      });
      document.getElementsByClassName("popup")[0].style.maxHeight = '100%';
      document.getElementsByClassName("popup")[0].style.height = '400px';
      document.getElementsByClassName("popup")[0].style.maxWidth = '100%';
      document.getElementsByClassName("popup")[0].style.width = '300px';
      document.getElementsByClassName("popup-body")[0].style.height = '100%';
      setTimeout(function () {
        var mapDiv = document.createElement("div");
        mapDiv.setAttribute("id", "map");
        mapDiv.style.height = '100%';
        document.getElementsByClassName("popup-body")[0].appendChild(mapDiv);
        var mapOptions = {
          center: new google.maps.LatLng(0, 0),
          zoom: 1,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var latLong = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({
          position: latLong
        });
        marker.setMap(map);
        map.setZoom(8);
        map.setCenter(marker.getPosition());
      }, 0);
    };
    /**
     * takeScreenShotAndShare :: function
     * description:
     */
    $scope.takeScreenShotAndShare = function () {
      var imageLink;
      navigator.screenshot.save(function (error, res) {
        if (error) {
          console.error(error);
        } else {
          imageLink = res.filePath;
          window.plugins.socialsharing.share(null, null, 'file://' + imageLink, null);
        }
      }, 'jpg', 50, 'myScreenShot');
    };

    $scope.initApp();
  });
