angular.module('weightapp.controllers', ['weightapp.factory'])

  .controller('AppCtrl', function ($rootScope, $scope, $ionicModal, $ionicHistory, $ionicPopup, $timeout, $state, AppFactory, $ionicPlatform) {

    /**
     * initApp :: function
     * description: Main function that initializes the app
     */
    $scope.initApp = function () {

      // defaults and inits
      $scope.socket = {};
      $rootScope.host = '192.168.0.101';
      $rootScope.port = 2101;
      $scope.isConnected = false;
      $scope.weight = 0;
      $scope.firstTime = true;
      $scope.data = '';
      $scope.tasks = [];
      $scope.loading = true;
      $scope.myWeights = [];
      $scope.loginData = {};
      $rootScope.user = null;
      $rootScope.userId = -1;

    };

    /**
     * doLogin :: function
     * description: Login Handler function
     */
    $scope.doLogin = function () {

      var userId = $scope.loginData.userId;
      var password = $scope.loginData.password;
      if (userId && password && userId.length > 0 && password.length > 0) {
        AppFactory.loginUser(userId, password)
          .success(function (data) {
            console.log(data);
            if (data.status) {
              $rootScope.userId = data.user._id;
              $rootScope.user = data.user;
              $state.go('app.taskSelection');

              localStorage.userId = $rootScope.userId;
              $rootScope.initTasks();
            }
            else {
              $rootScope.alertPopup("Incorrect Username or Password");
            }
          })
          .error(function (e) {
            console.log(e);
            $rootScope.alertPopup("Error Logging In");
          });
      }
      else {
        $rootScope.alertPopup("Please fill in these required fields");
      }
    };

    /**
     * doLoginByNFC :: function
     * description: NFC Tag Login Handler function
     */
    $rootScope.doLoginByNFC = function (nfc) {
      if ($rootScope.userId === -1) {
        AppFactory.loginUserByNFC(nfc)
          .success(function (data) {
            console.log(data);
            if (data.status) {
              $rootScope.userId = data.user._id;
              $rootScope.user = data.user;
              $state.go('app.taskSelection');
              $scope.loginResult = 'Logged In Successfully';

              localStorage.userId = $rootScope.userId;
              $rootScope.initTasks();
            }
            else {
              $scope.loginResult = 'Incorrect Username or Password';
            }
          })
          .error(function (e) {
            console.log(e);
            $scope.loginResult = 'Error Logging In';
          });
      }
      else {
        $rootScope.alertPopup("Already Logged In");
      }
    };

    /**
     * connectToHost :: function
     * description: Generic function for connecting to a host via TCP Socket
     * @param host
     * @param port
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
            $rootScope.alertPopup("Error during connection", "error: " + errorMessage);
          });
      }
      else {
        console.log('Socket is undefined');
      }
    };

    /**
     * setConnected :: function
     * description: Callback function that sets connection state to true
     */
    $scope.setConnected = function () {
      $scope.isConnected = true;
      console.log('connected to host ' + $rootScope.host + ' on port ' + $rootScope.port);
    };

    /**
     * setDisconnected :: function
     * description: Callback function that sets connection state to false
     */
    $scope.setDisconnected = function () {
      $scope.isConnected = false;
      console.log('disconnected from host ' + $rootScope.host + ' on port ' + $rootScope.port);
    };

    /**
     * connectToIndicator :: function
     * description: Connects to the RAVAS indicator
     */
    $scope.connectToIndicator = function () {
      if (!$scope.isConnected) { // CONNECT TO HOST IF NOT ALREADY CONNECTED
        $scope.connectToHost($rootScope.host, $rootScope.port);
      }
    };

    /**
     * alertPopup :: function
     * description: Generic function for Ionic Alert Popup
     */
    $rootScope.alertPopup = function (title, subtitle, callback) {
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
        if (callback) {
          callback(res);
        }
      });
    };

    /**
     * showLocationPopup :: function
     * description: Show the location confirmation popup when triggered
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
     * description: Checks if the sku inserted from popup is correct
     *              if true: connects to the indicator and refers to weighing screen
     *              else alerts that the sku is wrong
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
        $rootScope.alertPopup("Wrong SKU", "The SKU inserted is incorrect");
      }
    };

    /**
     * backToItem :: function
     * description: returns back to item location view from weighing screen
     */
    $scope.backToItem = function () {
      $state.go('app.task');
    };

    /**
     * startWeighing :: function
     * description: starts the free weighing mode
     */
    $scope.startWeighing = function () {
      $state.go('app.weigh');
      $scope.connectToIndicator();
    };

    /**
     * sendCommand :: function
     * description: Generic function for sending tcp socket commands
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
          alertPopup('Error sending command', e)
        });
      }
      catch (e) {
        alertPopup('Exception', e);
      }
    };

    /**
     * receiveData :: function
     * description: callback function that handles data received from host
     *              gathers data received for 300 msec and then handles it
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
     * description: concatenates data string
     */
    $scope.concatData = function (data) {
      $scope.data += data;
    };


    /**
     * handleData :: function
     * description: Handles data string and updates the weight accordingly
     */
    $scope.handleData = function () {
      if ($scope.data && $scope.data.length > 0) {
        if ($scope.data.indexOf('N+') === 0) { // PC Mode
          $scope.data = $scope.data.substring(2);
          if (!isNaN($scope.data)) {
            $scope.weight = parseFloat($scope.data);
          }
        }
        else if ($scope.data.indexOf('+') === 0) { // Repeating Send Mode
          $scope.data = $scope.data.substring(1);
          if (!isNaN($scope.data)) {
            $scope.weight = parseFloat($scope.data);
          }
        }
        else if ($scope.data.toLowerCase().indexOf('ok') > -1) { // Tare
          $scope.weight = 0;
        }
        $scope.$apply();
      }
      $scope.firstTime = true;
      $scope.data = '';
    };

    /**
     * getWeight :: function
     * description: Sends weight request to the indicator
     */
    $scope.getWeight = function () {
      console.log('Get weight button clicked');
      if ($scope.isConnected) {
        $scope.sendCommand('GN');
      }
    };

    /**
     * goToSettings :: function
     * description: Refers to settings screen
     */
    $scope.goToSettings = function () {
      $state.go('app.settings');
    };

    /**
     * tare :: function
     * description: Sends tare request to the indicator
     */
    $scope.tare = function () {
      console.log('Tare button clicked');
      if ($scope.isConnected) {
        $scope.sendCommand('SR');
        $scope.weight = 0;
      }
    };

    $scope.tareAndGoToTask = function(){
      $scope.tare();
      $state.go('app.task');
    };

    /**
     * saveSettings :: function
     * description: Saves the settings for current and further (localStorage) use
     */
    $scope.saveSettings = function (host, port) {
      if (host && host.length > 0 && port && !isNaN(port)) {
        $rootScope.host = host;
        $rootScope.port = port;
        localStorage.host = host;
        localStorage.port = port;
        console.log('Setings saved, connection is set to: ' + host + ':' + port);
        $ionicHistory.goBack();
      }
      else {
        $rootScope.alertPopup("Settings not saved", "Please review the data inserted");
      }
    };

    /**
     * selectTask :: function
     * description: Selects a task (order) from list, gets its data and refers to task view
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
              $state.go('app.palletZero');
              $scope.connectToIndicator();
            }
            else {
              $rootScope.alertPopup("Task Not Found", "Please refresh and try again");
              console.log('Task not found');
            }

          })
          .error(function (e) {
            $scope.loading = false;
            $rootScope.alertPopup("Error Loading Task Data", "Please try again");
            console.log(e);
          });

      }
    };

    /**
     * sendWeight :: function
     * description: Checks if the weight (from the scale) is within the range of the item's weight
     *              if true: checks if it's the last item in the order
     *                  if true: sets the order as done
     *                  else: continues to the next item
     *              else: notifies an incorrect weight
     */
    $scope.sendWeight = function () {
      var weight = $scope.weight,
        dbWeight = $scope.currentTask[$scope.currentItemIdx].weight;
      console.log('weight: ' + weight);
      console.log('dbWeight: ' + dbWeight);
      console.log('weight/dbWeight: ' + parseFloat(weight) / parseFloat(dbWeight));
      console.log('result: ' + Math.abs(1 - (parseFloat(weight) / parseFloat(dbWeight))));
      if (Math.abs(1 - (parseFloat(weight) / parseFloat(dbWeight))) > 0.1) {
        $rootScope.alertPopup("Incorrect weight", "Please try again");
      }
      else {

        if ($scope.currentItemIdx === $scope.currentTask.length - 1) {

          $state.go('app.taskSelection');
          AppFactory.setOrderAsFinished($scope.currentTaskId)
            .success(function (data) {
              if (data.status) {
                $rootScope.initTasks();
                $rootScope.alertPopup("Task Finished", "Great Job!");
              }
              else {
                $rootScope.alertPopup("Error", "Error updating task. Please try again.");
              }
            })
            .error(function (e) {
              $rootScope.alertPopup("Error", "Error updating task. Please try again.");
              console.log(e);
            });
        }
        else {

          $rootScope.alertPopup("Correct weight", "Proceeding to next item");
          $scope.tare();
          $scope.currentItemIdx++;
          $state.go('app.task');
        }
      }
    };

    /**
     * initTasks :: function
     * description: Gets all the ACTIVE tasks for the current user
     */
    $rootScope.initTasks = function () {
      if ($rootScope.userId !== -1 && $rootScope.user) {
        AppFactory.getOrdersByUsername($rootScope.user.userName)
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
     * initMyWeights :: function
     * decription: Gets all of the users saved weights and refers to myweights view
     */
    $scope.initMyWeights = function () {
      if ($rootScope.userId !== -1 && $rootScope.user) {
        $scope.loading = true;
        $state.go('app.myWeights');
        AppFactory.showAllWeightsByUserName($rootScope.user.userName)
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
     * description: Logs out the current user
     */
    $scope.logout = function () {
      $rootScope.userId = -1;
      $rootScope.user = null;
      $scope.loginData = {};
      $scope.tasks = [];
      localStorage.removeItem('userId');
      $rootScope.alertPopup("Logged out successfully");
      $state.go('app.login');
    };

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
          AppFactory.insertNewWeight($rootScope.user.userName, $scope.weight, latitude, longitude)
            .success(function (data) {
              console.log(data);
              if (data.status) {
                $rootScope.alertPopup("Saved successfully");
              } else {
                $rootScope.alertPopup("Error", "Weight Not Saved");
              }
            })
            .error(function (e) {
              console.log(e);
              $rootScope.alertPopup("Exception", e);
            });
        },
        function (error) {
          $rootScope.alertPopup("Geolocation Error", 'code: ' + error.code + '\n' +
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
     * description: Takes a screenshot and prompts sharing option
     */
    $scope.takeScreenShotAndShare = function () {
      if (navigator.screenshot) {
        var imageLink;
        navigator.screenshot.save(function (error, res) {
          if (error) {
            console.error(error);
          } else {
            imageLink = res.filePath;
            window.plugins.socialsharing.share(null, null, 'file://' + imageLink, null);
          }
        }, 'jpg', 50, 'myScreenShot');
      }
      else {
        $rootScope.alertPopup('Screenshot is disabled','');
      }
    };


    $scope.scanBarcode = function(){
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.barcodeScanner) {
        window.cordova.plugins.barcodeScanner.scan(
          function (result) {
            console.log("We got a barcode\n" +
              "Result: " + result.text + "\n" +
              "Format: " + result.format + "\n" +
              "Cancelled: " + result.cancelled);
            $scope.checkLocation(result.text);
          },
          function (error) {
            $rootScope.alertPopup("Scanning failed: ", error);
          },
          {
            "preferFrontCamera": false, // iOS and Android
            "showFlipCameraButton": true, // iOS and Android
            "prompt": "Place a barcode inside the scan area", // supported on Android only
            "orientation": "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
          }
        );
      }
      else {
        $rootScope.alertPopup("Error","Barcode scanning is disabled for your device");
      }
    };

    if (window.cordova) {
      $ionicPlatform.ready(function () {
        nfc.addTagDiscoveredListener(
          function (nfcEvent) {
            var tag = nfcEvent.tag;
            var tagId = nfc.bytesToHexString(tag.id);
            if (!$rootScope.user) {
              $scope.alertPopup('NFC Detected','Logging in...');
              $rootScope.doLoginByNFC(tagId);
            }
            else {
              $rootScope.alertPopup('NFC Detected', 'User already logged in');
            }
          },
          function () { // success callback
            // alert("Waiting for NDEF tag");
          },
          function (error) { // error callback
            $rootScope.alertPopup("Error adding NDEF listener ", JSON.stringify(error));
          }
        );
      });
    }

    // Trigger App on js load
    $scope.initApp();
  });
