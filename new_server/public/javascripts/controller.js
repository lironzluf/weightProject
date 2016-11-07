(function (app) {

    app.controller('MainCtrl', ['$rootScope','$scope', '$window', '$location', '$routeParams', '$route', 'Factory', '$interval', '$timeout', '$document',
        function ($rootScope, $scope, $window, $location, $routeParams, $route, Factory, $interval, $timeout, $document) {

            var mCtrl = this;
            $rootScope.ID = '';
            $rootScope.NAME = '';

            mCtrl.UserList = {};
            mCtrl.OrderList = {};

/*
            mCtrl.deleteCompany = function(){
                $rootScope.layout.loading = true;
                try{
                    Factory.deleteCompany($rootScope.ID,$rootScope.NAME).success(function(){
                    $('#successAlert').fadeIn('slow');
                    }).error(function(e){
                        console.log(e);
                    });
                }
                catch(e){
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.addCompany = function(){
                $rootScope.layout.loading = true;
                try{
                    Factory.addCompany($rootScope.ID,$rootScope.NAME).success(function(){
                        //console.log('success');
                        $('#successAlert').fadeIn('slow');
                    }).error(function(e){
                        console.log(e);
                    });
                }
                catch(e){
                    console.log(e);
                }
                // Reset the form model.
                $rootScope.ID = '';
                $rootScope.NAME = '';
                // Since Angular 1.3, set back to untouched state.
                //mCtrl.form.$setUntouched();
                $rootScope.layout.loading = false;
            };

            mCtrl.updateCompany = function(){
                $rootScope.layout.loading = true;
                try{
                    Factory.updateCompany($rootScope.ID,$rootScope.NAME).success(function(){
                        //console.log('success');
                        $('#successAlert').fadeIn('slow');
                    }).error(function(e){
                        console.log(e);
                    });
                }
                catch(e){
                    console.log(e);
                }
                // Reset the form model.
                $rootScope.ID = '';
                $rootScope.NAME = '';
                // Since Angular 1.3, set back to untouched state.
                //mCtrl.form.$setUntouched();
                $rootScope.layout.loading = false;
            };

            mCtrl.searchCompany = function(){
                $rootScope.layout.loading = true;
                try{
                    mCtrl.CompanyList = {};
                    Factory.searchCompany($rootScope.ID,$rootScope.NAME).success(function(data){
                        console.log(data);
                        if (typeof data != 'undefined') {
                            mCtrl.CompanyList = data;
                            $('#searchResults').fadeIn('slow');
                        }
                    }).error(function(e){
                        console.log(e);
                    });
                }
                catch(e){
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };
            */

            mCtrl.initItemList = function(){
                $('#successAlert').fadeOut('fast');
                $rootScope.layout.loading = true;
                try {
                    mCtrl.PartList = $route.current.locals.initData;
                    //console.log(mCtrl.CompanyList);
                }
                catch (e){
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.initRepairList = function(){
                $('#successAlert').fadeOut('fast');
                $rootScope.layout.loading = true;
                try {
                    mCtrl.RepairList = $route.current.locals.initData;
                    //console.log(mCtrl.CompanyList);
                }
                catch (e){
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.initUserList = function(){
                $('#successAlert').fadeOut('fast');
                $rootScope.layout.loading = true;
                try {
                    var data = $route.current.locals.initData;
                    if (data.status) {
                        mCtrl.UserList = $route.current.locals.initData.data;
                    }
                }
                catch (e){
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };


            mCtrl.initInvoiceList = function(){
                $('#successAlert').fadeOut('fast');
                $rootScope.layout.loading = true;
                try {
                    mCtrl.InvoiceList = $route.current.locals.initData;
                    //console.log(mCtrl.CompanyList);
                }
                catch (e){
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.searchInvoice = function(){
                $rootScope.layout.loading = true;
                try{
                    mCtrl.CompanyList = {};
                    Factory.searchInvoice($rootScope.ID,$rootScope.NAME).success(function(data){
                        //console.log(data);
                        if (typeof data != 'undefined') {
                            mCtrl.InvoiceList = data;
                            $('#searchResults').fadeIn('slow');
                        }
                    }).error(function(e){
                        console.log(e);
                    });
                }
                catch(e){
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            $document.ready(function(){
                //document ready functions
            });

        }]);

    app.controller('HeaderCtrl', ['$rootScope',
        function ($rootScope) {

            $rootScope.menuOpen = false;

            var hCtrl = this;

            hCtrl.sideMenuToggle = function() {


                if ($('#sideBar').hasClass('toggled')){
                        $('#sideBar').removeClass('toggled');
                        $('#mainTemplate .container').css('margin-left','auto');
                        $rootScope.menuOpen = false;
                    }
                else{
                        $('#sideBar').addClass('toggled');
                        $('#mainTemplate .container').css('margin-left','300px');
                        $rootScope.menuOpen = true;
                    }

            };

            hCtrl.toggleDrop = function(event){
                var el = event.target;
                if (el.tagName == 'I')
                    el = $(el).parent().parent();
                var dropMenu = $(el).parent().find('ul');

                
                //$(dropMenu).toggleClass('fadeInDown').css('animation-duration','0.3s').css('webkit-animation-duration','0.3s');
                $(dropMenu).toggleClass('hide');
                //$(dropMenu).hide();
                
            };

            hCtrl.collapseMenu = function(){
                $('.menu-trigger').removeClass('open');
                $('.sub-menu').each(function(){
                    $(this).removeClass('active');
                    $(this).find('ul').addClass('hide');

                })
            };

        }]);


})(app || {});