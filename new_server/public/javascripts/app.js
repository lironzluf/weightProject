var app = (function () {

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
                            url: 'http://localhost:12345/',
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
                            url: 'http://localhost:12345/',
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
                            url: 'http://localhost:12345/',
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
                            url: 'http://localhost:12345/',
                            cache: false,
                            data: {
                                action: 'ShowAllClients',
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
            .when('/Parts/part', {
                templateUrl: './templates/Parts/part.html?ver=' + date,
                resolve:
                {
                    initData: function ($q, $http, $route) {
                        var defer = $q.defer(); // create a promise object

                        $http({ // ajax http call
                            method: 'POST',
                            url: 'http://localhost:12345/',
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
                            url: 'http://localhost:12345/',
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
                            url: 'http://localhost:12345/',
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
})();
