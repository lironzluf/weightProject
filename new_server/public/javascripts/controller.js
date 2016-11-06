(function(app) {

    app.controller('MainCtrl', ['$rootScope', '$scope', '$window', '$location', '$routeParams', '$route', 'Factory', '$interval', '$timeout', '$document',
        function($rootScope, $scope, $window, $location, $routeParams, $route, Factory, $interval, $timeout, $document) {

            var mCtrl = this;
            $rootScope.ID = '';
            $rootScope.NAME = '';

            mCtrl.CompanyList = {};
            mCtrl.BrandList = {};
            mCtrl.PartModels = {};
            mCtrl.PartList = {};
            mCtrl.RepairList = {};
            mCtrl.ClientList = {};
            mCtrl.myWeightList = {};

            mCtrl.initCompanyList = function() {
                $('#successAlert').fadeOut('fast');
                $rootScope.layout.loading = true;
                try {
                    mCtrl.CompanyList = $route.current.locals.initData;
                    //console.log(mCtrl.CompanyList);
                } catch (e) {
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.deleteCompany = function() {
                $rootScope.layout.loading = true;
                try {
                    Factory.deleteCompany($rootScope.ID, $rootScope.NAME).success(function() {
                        $('#successAlert').fadeIn('slow');
                    }).error(function(e) {
                        console.log(e);
                    });
                } catch (e) {
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.addCompany = function() {
                $rootScope.layout.loading = true;
                try {
                    Factory.addCompany($rootScope.ID, $rootScope.NAME).success(function() {
                        //console.log('success');
                        $('#successAlert').fadeIn('slow');
                    }).error(function(e) {
                        console.log(e);
                    });
                } catch (e) {
                    console.log(e);
                }
                // Reset the form model.
                $rootScope.ID = '';
                $rootScope.NAME = '';
                // Since Angular 1.3, set back to untouched state.
                //mCtrl.form.$setUntouched();
                $rootScope.layout.loading = false;
            };

            mCtrl.updateCompany = function() {
                $rootScope.layout.loading = true;
                try {
                    Factory.updateCompany($rootScope.ID, $rootScope.NAME).success(function() {
                        //console.log('success');
                        $('#successAlert').fadeIn('slow');
                    }).error(function(e) {
                        console.log(e);
                    });
                } catch (e) {
                    console.log(e);
                }
                // Reset the form model.
                $rootScope.ID = '';
                $rootScope.NAME = '';
                // Since Angular 1.3, set back to untouched state.
                //mCtrl.form.$setUntouched();
                $rootScope.layout.loading = false;
            };

            mCtrl.searchCompany = function() {
                $rootScope.layout.loading = true;
                try {
                    mCtrl.CompanyList = {};
                    Factory.searchCompany($rootScope.ID, $rootScope.NAME).success(function(data) {
                        console.log(data);
                        if (typeof data != 'undefined') {
                            mCtrl.CompanyList = data;
                            $('#searchResults').fadeIn('slow');
                        }
                    }).error(function(e) {
                        console.log(e);
                    });
                } catch (e) {
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.initBrandList = function() {
                $('#successAlert').fadeOut('fast');
                $rootScope.layout.loading = true;
                try {
                    mCtrl.BrandList = $route.current.locals.initData;
                    //console.log(mCtrl.CompanyList);
                } catch (e) {
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.deleteBrand = function() {
                $rootScope.layout.loading = true;
                try {
                    Factory.deleteBrand($rootScope.ID, $rootScope.NAME).success(function() {
                        $('#successAlert').fadeIn('slow');
                    }).error(function(e) {
                        console.log(e);
                    });
                } catch (e) {
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.addBrand = function() {
                $rootScope.layout.loading = true;
                try {
                    Factory.addBrand($rootScope.ID, $rootScope.NAME).success(function() {
                        //console.log('success');
                        $('#successAlert').fadeIn('slow');
                    }).error(function(e) {
                        console.log(e);
                    });
                } catch (e) {
                    console.log(e);
                }
                // Reset the form model.
                $rootScope.ID = '';
                $rootScope.NAME = '';
                // Since Angular 1.3, set back to untouched state.
                //mCtrl.form.$setUntouched();
                $rootScope.layout.loading = false;
            };

            mCtrl.updateBrand = function() {
                $rootScope.layout.loading = true;
                try {
                    Factory.updateBrand($rootScope.ID, $rootScope.NAME).success(function() {
                        //console.log('success');
                        $('#successAlert').fadeIn('slow');
                    }).error(function(e) {
                        console.log(e);
                    });
                } catch (e) {
                    console.log(e);
                }
                // Reset the form model.
                $rootScope.ID = '';
                $rootScope.NAME = '';
                // Since Angular 1.3, set back to untouched state.
                //mCtrl.form.$setUntouched();
                $rootScope.layout.loading = false;
            };

            mCtrl.searchBrand = function() {
                $rootScope.layout.loading = true;
                try {
                    mCtrl.CompanyList = {};
                    Factory.searchBrand($rootScope.ID, $rootScope.NAME).success(function(data) {
                        //console.log(data);
                        if (typeof data != 'undefined') {
                            mCtrl.BrandList = data;
                            $('#searchResults').fadeIn('slow');
                        }
                    }).error(function(e) {
                        console.log(e);
                    });
                } catch (e) {
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.initPartModels = function() {
                $('#successAlert').fadeOut('fast');
                $rootScope.layout.loading = true;
                try {
                    mCtrl.PartModels = $route.current.locals.initData;
                    //console.log(mCtrl.CompanyList);
                } catch (e) {
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.initPartList = function() {
                $('#successAlert').fadeOut('fast');
                $rootScope.layout.loading = true;
                try {
                    mCtrl.PartList = $route.current.locals.initData;
                    //console.log(mCtrl.CompanyList);
                } catch (e) {
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.initRepairList = function() {
                $('#successAlert').fadeOut('fast');
                $rootScope.layout.loading = true;
                try {
                    mCtrl.RepairList = $route.current.locals.initData;
                    //console.log(mCtrl.CompanyList);
                } catch (e) {
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.initClientList = function() {
                $('#successAlert').fadeOut('fast');
                $rootScope.layout.loading = true;
                try {
                    var data = $route.current.locals.initData;
                    if (data.status) {
                        mCtrl.ClientList = $route.current.locals.initData.data;
                    }
                } catch (e) {
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };


            mCtrl.initmyWeightList = function() {
                $('#successAlert').fadeOut('fast');
                $rootScope.layout.loading = true;
                try {
                    var data = $route.current.locals.initData;
                    if (data.status) {
                        mCtrl.myWeightList = $route.current.locals.initData.data;
                    }
                    //console.log(mCtrl.CompanyList);
                } catch (e) {
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            mCtrl.searchmyWeight = function() {
                $rootScope.layout.loading = true;
                try {
                    mCtrl.CompanyList = {};
                    Factory.searchmyWeight($rootScope.ID, $rootScope.WEIGHT).success(function(data) {
                        //console.log(data);
                        if (typeof data != 'undefined') {
                            mCtrl.myWeightList = data;
                            $('#searchResults').fadeIn('slow');
                        }
                    }).error(function(e) {
                        console.log(e);
                    });
                } catch (e) {
                    console.log(e);
                }
                $rootScope.layout.loading = false;
            };

            $document.ready(function() {
                //document ready functions
            });

        }
    ]);

    app.controller('HeaderCtrl', ['$rootScope',
        function($rootScope) {

            $rootScope.menuOpen = false;

            var hCtrl = this;

            hCtrl.sideMenuToggle = function() {


                if ($('#sideBar').hasClass('toggled')) {
                    $('#sideBar').removeClass('toggled');
                    $('#mainTemplate .container').css('margin-left', 'auto');
                    $rootScope.menuOpen = false;
                } else {
                    $('#sideBar').addClass('toggled');
                    $('#mainTemplate .container').css('margin-left', '300px');
                    $rootScope.menuOpen = true;
                }

            };

            hCtrl.toggleDrop = function(event) {
                var el = event.target;
                if (el.tagName == 'I')
                    el = $(el).parent().parent();
                var dropMenu = $(el).parent().find('ul');


                //$(dropMenu).toggleClass('fadeInDown').css('animation-duration','0.3s').css('webkit-animation-duration','0.3s');
                $(dropMenu).toggleClass('hide');
                //$(dropMenu).hide();

            };

            hCtrl.collapseMenu = function() {
                $('.menu-trigger').removeClass('open');
                $('.sub-menu').each(function() {
                    $(this).removeClass('active');
                    $(this).find('ul').addClass('hide');

                })
            };

        }
    ]);


})(app || {});