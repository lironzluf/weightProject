var app = (function () {

<<<<<<< HEAD
    // create app module
    var app = angular.module('app', ['ngRoute']);

    var date = '23_5_2016';
    // app configuration
    app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        // intercept POST requests, convert to standard form encoding
        $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
            var key, result = [];
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
=======
  // create app module
  var app = angular.module('app', ['ngRoute']);

  var date = '07_11_2016';

  // app configuration
  app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    // intercept POST requests, convert to standard form encoding
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
      var key, result = [];
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
      }
      return result.join("&");
    });

    // set routing
    $routeProvider
      .when('/', {
        templateUrl: './templates/main.html?ver=' + date
      })
      .when('/home', {
        templateUrl: './templates/main.html?ver=' + date
      })
      .when('/login', {
        templateUrl: './templates/login.html?ver=' + date
      })
      .when('/Items/list', {
        templateUrl: './templates/Items/list.html?ver=' + date,
        resolve: {
          initData: function ($q, $http, $route) {
            var defer = $q.defer(); // create a promise object

            $http({ // ajax http call
              method: 'POST',
              url: serverUrl + 'items/showallitems',
              cache: false
            })
              .success(function (data, status) {
                if (status == 200) {
                  defer.resolve(data); // resolve with data
>>>>>>> 346e051a259d8e7b424d04b73f3eb150c7b27a04
                }
            }
            return result.join("&");
        });

        // set routing
        $routeProvider
            .when('/', {
                templateUrl: './templates/main.html?ver=' + date
            })
            .when('/home', {
                templateUrl: './templates/main.html?ver=' + date
            })
            .when('/Companies/list', {
                templateUrl: './templates/Companies/list.html?ver=' + date,
                resolve:
                {
                    initData: function ($q, $http, $route) {
                        var defer = $q.defer(); // create a promise object

                        $http({ // ajax http call
                            method: 'POST',
                            url: 'https://weightproject.herokuapp.com/',
                            cache: false,
                            data: {
                                action: 'ShowAllCompanies',
                                ID: '',
                                NAME: ''
                            }
                        })
                            .success(function (data, status) {
                                if (status == 200) {
                                    defer.resolve(data); // resolve with data
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                            });

                        return defer.promise; // return promise object
                    }
                }
<<<<<<< HEAD
            })
            .when('/Companies/add', {
                templateUrl: './templates/Companies/add.html?ver=' + date
            })
            .when('/Companies/update', {
                templateUrl: './templates/Companies/update.html?ver=' + date
            })
            .when('/Companies/search', {
                templateUrl: './templates/Companies/search.html?ver=' + date
            })
            .when('/Companies/delete', {
                templateUrl: './templates/Companies/delete.html?ver=' + date
            })
            .when('/Brands/list', {
                templateUrl: './templates/Brands/list.html?ver=' + date,
                resolve:
                {
                    initData: function ($q, $http, $route) {
                        var defer = $q.defer(); // create a promise object

                        $http({ // ajax http call
                            method: 'POST',
                            url: 'https://weightproject.herokuapp.com/',
                            cache: false,
                            data: {
                                action: 'ShowAllBrands',
                                ID: '',
                                NAME: ''
                            }
                        })
                            .success(function (data, status) {
                                if (status == 200) {
                                    defer.resolve(data); // resolve with data
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                            });

                        return defer.promise; // return promise object
                    }
                }
            })
            .when('/Brands/add', {
                templateUrl: './templates/Brands/add.html?ver=' + date
            })
            .when('/Brands/search', {
                templateUrl: './templates/Brands/search.html?ver=' + date
            })
            .when('/Brands/update', {
                templateUrl: './templates/Brands/update.html?ver=' + date
            })
            .when('/Brands/delete', {
                templateUrl: './templates/Brands/delete.html?ver=' + date
            })
            .when('/Invoices/search', {
                templateUrl: './templates/Invoices/search.html?ver=' + date
            })
            .when('/Invoices/list', {
                templateUrl: './templates/Invoices/list.html?ver=' + date,
                resolve:
                {
                    initData: function ($q, $http, $route) {
                        var defer = $q.defer(); // create a promise object

                        $http({ // ajax http call
                            method: 'POST',
                            url: 'https://weightproject.herokuapp.com/',
                            cache: false,
                            data: {
                                action: 'ShowAllInvoice',
                                ID: '',
                                NAME: ''
                            }
                        })
                            .success(function (data, status) {
                                if (status == 200) {
                                    defer.resolve(data); // resolve with data
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                            });

                        return defer.promise; // return promise object
                    }
                }
            })
            .when('/clients', {
                templateUrl: './templates/clients.html?ver=' + date,
                resolve:
                {
                    initData: function ($q, $http, $route) {
                        var defer = $q.defer(); // create a promise object

                        $http({ // ajax http call
                            method: 'POST',
                            url: 'http://localhost:3000/users/showallusers',
                            cache: false
                        })
                            .success(function (data, status) {
                                if (status == 200) {
                                    defer.resolve(data); // resolve with data
                                    console.log(data);
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                            });

                        return defer.promise; // return promise object
                    }
                }
            })
            .when('/Parts/part', {
                templateUrl: './templates/Parts/part.html?ver=' + date,
                resolve:
                {
                    initData: function ($q, $http, $route) {
                        var defer = $q.defer(); // create a promise object

                        $http({ // ajax http call
                            method: 'POST',
                            url: 'https://weightproject.herokuapp.com/',
                            cache: false,
                            data: {
                                action: 'ShowAllParts',
                                ID: '',
                                NAME: ''
                            }
                        })
                            .success(function (data, status) {
                                if (status == 200) {
                                    defer.resolve(data); // resolve with data
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                            });

                        return defer.promise; // return promise object
                    }
                }
            })
            .when('/Parts/repair', {
                templateUrl: './templates/Parts/repair.html?ver=' + date,
                resolve:
                {
                    initData: function ($q, $http, $route) {
                        var defer = $q.defer(); // create a promise object

                        $http({ // ajax http call
                            method: 'POST',
                            url: 'https://weightproject.herokuapp.com/',
                            cache: false,
                            data: {
                                action: 'ShowAllRepair_status',
                                ID: '',
                                NAME: ''
                            }
                        })
                            .success(function (data, status) {
                                if (status == 200) {
                                    defer.resolve(data); // resolve with data
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                            });

                        return defer.promise; // return promise object
                    }
                }
            })
            .when('/Parts/model', {
                templateUrl: './templates/Parts/model.html?ver=' + date,
                resolve:
                {
                    initData: function ($q, $http, $route) {
                        var defer = $q.defer(); // create a promise object

                        $http({ // ajax http call
                            method: 'POST',
                            url: 'https://weightproject.herokuapp.com/',
                            cache: false,
                            data: {
                                action: 'ShowAllModel_Parts',
                                ID: '',
                                NAME: ''
                            }
                        })
                            .success(function (data, status) {
                                if (status == 200) {
                                    defer.resolve(data); // resolve with data
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log(data);
                            });

                        return defer.promise; // return promise object
                    }
                }
            })
            .otherwise({
                templateUrl: './templates/404.html?ver=' + date
            });
    }]);

    return app;
=======
              })
              .error(function (data, status, headers, config) {
                console.log(data);
              });

            return defer.promise; // return promise object
          }
        }
      })
      .when('/Users', {
        templateUrl: './templates/Users/list.html?ver=' + date,
        resolve: {
          initData: function ($q, $http, $route) {
            var defer = $q.defer(); // create a promise object

            $http({ // ajax http call
              method: 'POST',
              url: serverUrl + 'users/showallusers',
              cache: false
            })
              .success(function (data, status) {
                if (status == 200) {
                  defer.resolve(data); // resolve with data
                }
              })
              .error(function (data, status, headers, config) {
                console.log(data);
              });

            return defer.promise; // return promise object
          }
        }
      })
      .when('/Users/add', {
        templateUrl: './templates/Users/add.html?ver=' + date
      })
      .otherwise({
        templateUrl: './templates/404.html?ver=' + date
      });
  }])
    .run(function($location,$rootScope,Factory,$timeout){
      $rootScope.layout = {};
      $rootScope.layout.loading = false;
      $rootScope.firstLoad = true;

      $rootScope.$on('$routeChangeSuccess', function() {

        //hide loading gif
        $timeout(function(){
          $rootScope.layout.loading = false;
        }, 500);

      });

      $rootScope.$on('$routeChangeError', function() {
        $rootScope.layout.loading = false;
      });

      $rootScope.$on( "$routeChangeStart", function(event, next, current) {

        $rootScope.formData = {};

        //show loading gif
        $timeout(function(){
          $rootScope.layout.loading = true;
        });

        if ($rootScope.firstLoad && $rootScope.userId !== -1){
          $rootScope.firstLoad = false;
        }
        else {
          $rootScope.$$childHead.hCtrl.sideMenuToggle();
          $rootScope.$$childHead.hCtrl.collapseMenu();
        }

        if ($rootScope.userId === -1) {
          if (next.templateUrl == "/templates/users.html?ver=" + date) { }
          else {
            if (localStorage) {
              if (localStorage.userId) {
                $rootScope.userId = localStorage.userId;
                console.log('Found userId in localStorage: ' + $rootScope.userId);
                Factory.loginUserById($rootScope.userId)
                  .success(function (data) {
                    if (data.status) {
                      if (data.user.securityLevel !== "3") {
                        console.log(data.user.securityLevel);
                        $rootScope.loginData.errMsg = "You don't have permission to enter the admin panel";
                        $rootScope.user = {};
                        $rootScope.userId = -1;
                        $rootScope.userName = '';
                      }
                      else {
                        $rootScope.userId = data.user._id;
                        $rootScope.user = data.user;
                        $rootScope.userName = data.user.userName;
                        localStorage.userId = $rootScope.userId;
                        if (next.templateUrl === "/templates/login.html?ver=" + date)
                        {
                          $location.path('/home');
                        }
                      }
                    }
                    else { // user not found, refer to login
                      $rootScope.userId = -1;
                      $location.path('/login');
                    }
                  })
              }
              else { // user not found, refer to login
                $rootScope.userId = -1;
                $location.path('/login');
              }
            }
            else {
              $location.path("/login");
            }
          }
        }
      });
    });

  return app;
>>>>>>> 346e051a259d8e7b424d04b73f3eb150c7b27a04
})();
