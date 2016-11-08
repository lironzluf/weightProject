(function (app) {

  app.controller('MainCtrl', ['$rootScope', '$scope', '$window', '$location', '$routeParams', '$route', 'Factory', '$interval', '$timeout', '$document',
    function ($rootScope, $scope, $window, $location, $routeParams, $route, Factory, $interval, $timeout, $document) {

      var mCtrl = this;

      if (!$rootScope.user) {
        $rootScope.userName = '';
        $rootScope.userId = -1;
        $rootScope.user = {};
        $rootScope.loginData = {};
      }

      mCtrl.UserList = [];
      mCtrl.OrderList = [];

      mCtrl.initItemList = function () {
        $rootScope.layout.loading = true;
        try {
          mCtrl.ItemList = $route.current.locals.initData.data;
          //console.log(mCtrl.CompanyList);
        }
        catch (e) {
          console.log(e);
        }
        $rootScope.layout.loading = false;
      };


      mCtrl.initUserList = function () {
        $rootScope.layout.loading = true;
        try {
          var data = $route.current.locals.initData;
          if (data.status) {
            mCtrl.UserList = $route.current.locals.initData.data;
          }
        }
        catch (e) {
          console.log(e);
        }
        $rootScope.layout.loading = false;
      };


      mCtrl.initOrderList = function () {
        $rootScope.layout.loading = true;
        try {
          var tempArr = $route.current.locals.initData.data;
          var tempArr2 = [];
          for (var i = 0; i < tempArr.length; i++) {
            tempArr2[tempArr[i].orderNumber] = tempArr[i];
          }
          for (var order in tempArr2) {
            mCtrl.OrderList.push(tempArr2[order]);
          }
        }
        catch (e) {
          console.log(e);
        }
        $rootScope.layout.loading = false;
      };

      mCtrl.doLogin = function () {

        var userId = $rootScope.loginData.userId;
        var password = $rootScope.loginData.password;
        if (userId && password && userId.length > 0 && password.length > 0) {
          Factory.loginUser(userId, password)
            .success(function (data) {
              if (data.status) {
                if (data.user.securityLevel !== "3") {
                  $rootScope.loginData.errMsg = "You don't have permission to enter the admin panel";
                  $rootScope.user = {};
                  $rootScope.userId = -1;
                  $rootScope.userName = '';
                }
                else {
                  $rootScope.userId = data.user._id;
                  $rootScope.user = data.user;
                  $rootScope.userName = data.user.userName;
                  $location.path('/home');
                  localStorage.userId = $rootScope.userId;
                }
              }
              else {
                $rootScope.loginData.errMsg = "Incorrect Username or Password";
              }
            })
            .error(function (e) {
              console.log(e);
              $rootScope.loginData.errMsg = "Error Logging In";
            });
        }
        else {
          $rootScope.loginData.errMsg = "Please fill in these required fields";
        }
      };


      mCtrl.insertNewUser = function () {
        var formData = $rootScope.formData;
        if (formData && formData.userName && formData.password && !isNaN(formData.securityLevel)) {
          Factory.insertNewUser(formData)
            .success(function (data) {
              $rootScope.formData.errMsg = null;
              $rootScope.formData = {};
              $rootScope.formData.successMsg = "Successfully Added";
            })
            .error(function (e) {
              $rootScope.formData.successMsg = null;
              $rootScope.formData.errMsg = "Error inserting new user";
              console.log(e);
            })
        }
        else {
          $rootScope.formData.successMsg = null;
          $rootScope.formData.errMsg = "Please fill all necessary fields";
        }
      };

      $document.ready(function () {
        //document ready functions
      });

    }]);

  app.controller('HeaderCtrl', ['$rootScope',
    function ($rootScope) {

      $rootScope.menuOpen = false;

      var hCtrl = this;

      hCtrl.sideMenuToggle = function () {


        if ($('#sideBar').hasClass('toggled')) {
          $('#sideBar').removeClass('toggled');
          $('#mainTemplate .container').css('margin-left', 'auto');
          $rootScope.menuOpen = false;
        }
        else {
          $('#sideBar').addClass('toggled');
          $('#mainTemplate .container').css('margin-left', '300px');
          $rootScope.menuOpen = true;
        }

      };

      hCtrl.toggleDrop = function (event) {
        var el = event.target;
        if (el.tagName == 'I')
          el = $(el).parent().parent();
        var dropMenu = $(el).parent().find('ul');


        //$(dropMenu).toggleClass('fadeInDown').css('animation-duration','0.3s').css('webkit-animation-duration','0.3s');
        $(dropMenu).toggleClass('hide');
        //$(dropMenu).hide();

      };

      hCtrl.collapseMenu = function () {
        $('.menu-trigger').removeClass('open');
        $('.sub-menu').each(function () {
          $(this).removeClass('active');
          $(this).find('ul').addClass('hide');

        })
      };

      hCtrl.logout = function () {
        $rootScope.userId = -1;
        $rootScope.user = {};
        $rootScope.loginData = {};
        localStorage.removeItem('userId');
      };

    }]);


})(app || {});