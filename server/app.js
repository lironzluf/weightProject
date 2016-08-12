var express = require('express');
var app = express();
var edge = require('edge');
var port = 12345;
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var db = require('./db');
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add headers for Cross Origin XML HTTP REQUEST
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.post('/', function (request, response) {
       
    var operation = request.body.action;
    var ID = request.body.ID;
    var NAME = request.body.NAME;
    //select
    if (operation == "ShowAllCompanies") {    
       params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "SELECT * FROM companies"
        };
    }
    if (operation == "ShowCompanyById") {
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "SELECT * FROM companies where id='" +ID+"'"
        };
    }
    else if (operation == "ShowAllBrands") {      
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "SELECT * FROM Brands"
        };
    }
    if (operation == "ShowBrandById") {
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "SELECT * FROM Brands where id='" + ID + "'"
        };
    }
    else if (operation == "ShowAllClients") {      
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "SELECT * FROM clients"
        };
    }
    if (operation == "ShowAllInvoice") {
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "SELECT invoice.id, company_id,companies._name,serial_no,date,total_value FROM invoice,companies where invoice.company_id=companies.id"
        };
    }
    if (operation == "ShowInvoiceById") {
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "SELECT invoice.id, company_id,companies._name,serial_no,date,total_value FROM invoice,companies where invoice.company_id=companies.id and invoice.id='" + ID + "'"
        };
    }
    if (operation == "ShowAllParts") {
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "SELECT * FROM parts"
        };
    }
    if (operation == "ShowAllModel_Parts") {
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "SELECT model_parts.id,Brands._name,parts._name as part,models._name as model FROM model_parts,parts,models,brands where parts.id=part_id and model_id=models.id and Brand_id=Brands.id"
        };
    }
    if (operation == "ShowAllRepair_status") {
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "SELECT repair_status.id,repair_id,status._name as status,created_at,updated_at,user_id,users.firstname as userFirstName,users.lastname as userLastName,users.email as userEmail  FROM repair_status,users,status where status.id=status_id and user_id=users.id"
        };
    }
    //insert
    else if (operation == "AddCompany") {
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "INSERT INTO companies(id,_name) VALUES ('" + ID + "','" + NAME +"')"
       
        };
    }
    else if (operation == "AddBrand") {
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "INSERT INTO Brands(id,_name) VALUES ('" + ID + "','" + NAME + "')"
       
        };   
    }
    //update
    else if (operation == "UpdateCompany") {
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "UPDATE companies SET _name = '" + NAME + "' WHERE id ='" + ID + "'"
                 
        };
    }
    else if (operation == "UpdateBrand") {
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "UPDATE Brands SET _name = '" + NAME + "' WHERE id ='" + ID + "'"
                  
        };
    }
    //delete
    else if (operation == "DeleteCompany") {
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "DELETE FROM companies WHERE id='" + ID + "'"
       
        };
    }
    else if (operation == "DeleteBrand") {
        params = {
            connectionString: "Data Source=LIRON-PC\\SQLEXPRESS;Initial Catalog=myDataBase;Integrated Security=True",  
            source: "DELETE FROM Brands WHERE id='" + ID + "'"
       
        };
    }
    
 
    

    var getData = edge.func('sql', params);    
    getData(null, function (error, result) {      
        if (error) { console.log(error); return; }
        if (result) {
            console.log(result);
            var temp = JSON.stringify(result);          
            response.send(temp);
        }
        else {
            console.log("No results");
        }
    });
});

passport.use(new Strategy(
    function(email, password, cb) {
        console.log('in strategy');
        db.users.findByUsername(email, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));

app.use(express.static(__dirname + '/project'));

app.get('/',
    passport.authenticate('basic', { session: false }),
    function(request,response){
        response.json({ username: request.user.username, email: request.user.email });
    }
);

app.listen(12345);
console.log('Server running on port ' + port);