// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('weightapp', ['ionic', 'weightapp.controllers', 'weightapp.factory'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
    })
    .state('app.start', {
      url: '/start',
      views: {
        'menuContent': {
          templateUrl: 'templates/start.html'
        }
      },
      controller: 'AppCtrl'
    })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html'
        }
      },
      controller: 'AppCtrl'
    })
    .state('app.taskSelection', {
      url: '/taskSelection',
      views: {
        'menuContent': {
          templateUrl: 'templates/taskSelection.html'
        }
      },
      controller: 'AppCtrl'
    })
    .state('app.task', {
      url: '/task',
      views: {
        'menuContent': {
          templateUrl: 'templates/task.html'
        }
      },
      controller: 'AppCtrl'
    })
    .state('app.weigh', {
      url: '/weigh',
      views: {
        'menuContent': {
          templateUrl: 'templates/weigh.html'
        }
      },
      controller: 'WeighingCtrl'
    })
    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      },
      controller: 'AppCtrl'
    })
    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html'
        }
      },
      controller: 'AppCtrl'
    })
    .state('app.statistics', {
      url: '/statistics',
      views: {
        'menuContent': {
          templateUrl: 'templates/statistics.html'
        }
      },
      controller: 'AppCtrl'
    })
    .state('app.weighInTask', {
      url: '/weighInTask',
      views: {
        'menuContent': {
          templateUrl: 'templates/weighInTask.html'
        }
      },
      controller: 'AppCtrl'
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/taskSelection');
});
