(function (app)
{
    // create users factory
    app.factory('Factory', ['$http', '$q', function ($http, $q)
    {
        return {
            searchInvoice: function (ID,NAME)
            {
                return $http({ // ajax http call
                    method: 'POST',
                    url: serverUrl,
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