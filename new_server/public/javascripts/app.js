var app = (function () {
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
            .when('/Orders/list', {
                templateUrl: './templates/Orders/list.html?ver=' + date,
                resolve:
                {
                    initData: function ($q, $http, $route) {
                        var defer = $q.defer(); // create a promise object

                        $http({ // ajax http call
                            method: 'POST',
                            url: serverUrl + 'orders/showallorders',
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
            .when('/users', {
                templateUrl: './templates/users.html?ver=' + date,
                resolve:
                {
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
            .otherwise({
                templateUrl: './templates/404.html?ver=' + date
            });
    }]);

    return app;
})();
