var edge = require('edge');

exports.findByUsername = function(email, cb) {

    params = {
        connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",
        source: "SELECT * FROM Users WHERE email = '" + email + "'"
    };

    var getData = edge.func('sql', params);
    getData(null, function (error, result) {
        if (error) { console.log(error); return; }
        if (result) {
            console.log(result);
            var temp = JSON.stringify(result);
            return cb(null, temp);
        }
        else {
            console.log('errors');
            return cb(null,null);
        }
    });
}