(function (app)
{
    // create users factory
    app.factory('Factory', ['$http', '$q', function ($http, $q)
    {
        return {

             deleteCompany: function (ID,NAME)
            {
                return $http({ // ajax http call
                    method: 'POST',
                    url: 'https://weightproject.herokuapp.com/',
                    cache: false,
                    data: {
                        action: 'DeleteCompany',
                        ID: ID,
                        NAME: NAME
                    }
                });
            },
            addCompany: function (ID,NAME)
            {
                return $http({ // ajax http call
                    method: 'POST',
                    url: 'https://weightproject.herokuapp.com/',
                    cache: false,
                    data: {
                        action: 'AddCompany',
                        ID: ID,
                        NAME: NAME
                    }
                });
            },
            updateCompany: function (ID,NAME)
            {
                return $http({ // ajax http call
                    method: 'POST',
                    url: 'https://weightproject.herokuapp.com/',
                    cache: false,
                    data: {
                        action: 'UpdateCompany',
                        ID: ID,
                        NAME: NAME
                    }
                });
            },
            searchCompany: function (ID,NAME)
            {
                return $http({ // ajax http call
                    method: 'POST',
                    url: 'https://weightproject.herokuapp.com/',
                    cache: false,
                    data: {
                        action: 'ShowCompanyById',
                        ID: ID,
                        NAME: NAME
                    }
                });
            },
            deleteBrand: function (ID,NAME)
            {
                return $http({ // ajax http call
                    method: 'POST',
                    url: 'https://weightproject.herokuapp.com/',
                    cache: false,
                    data: {
                        action: 'DeleteBrand',
                        ID: ID,
                        NAME: NAME
                    }
                });
            },
            updateBrand: function (ID,NAME)
            {
                return $http({ // ajax http call
                    method: 'POST',
                    url: 'https://weightproject.herokuapp.com/',
                    cache: false,
                    data: {
                        action: 'UpdateBrand',
                        ID: ID,
                        NAME: NAME
                    }
                });
            },
            addBrand: function (ID,NAME)
            {
                return $http({ // ajax http call
                    method: 'POST',
                    url: 'https://weightproject.herokuapp.com/',
                    cache: false,
                    data: {
                        action: 'AddBrand',
                        ID: ID,
                        NAME: NAME
                    }
                });
            },
            searchBrand: function (ID,NAME)
            {
                return $http({ // ajax http call
                    method: 'POST',
                    url: 'https://weightproject.herokuapp.com/',
                    cache: false,
                    data: {
                        action: 'ShowBrandById',
                        ID: ID,
                        NAME: NAME
                    }
                });
            },
            searchInvoice: function (ID,NAME)
            {
                return $http({ // ajax http call
                    method: 'POST',
                    url: 'https://weightproject.herokuapp.com/',
                    cache: false,
                    data: {
                        action: 'ShowInvoiceById',
                        ID: ID,
                        NAME: NAME
                    }
                });
            }


        }
    }]);
})(app || {});