//must deal with crazy node modules soo many 
//also do we just normally install client module stuff into json or does it go into it's own section like dev dep.



var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var db = require('./models').db;
var routes = require('./routes');

// logging middleware
app.use(morgan('dev'));//

// body-parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); //changes library that body parser uses internally to parse things - uses qs when you say extended: true


// nunjucks boilerplate
nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
// statically serve public folder
app.use('/public', express.static(__dirname + '/public'));



app.use('/', routes) //must go before the use function that catches errors

// not found middleware
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    console.error(err);
    next(err);
});


// error-handling middleware
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    console.error(err);
    res.render('error', {err: err});
});

db.sync()
.then(function(){
    console.log("synched with db");
    app.listen(3000, function(){
        console.log("app is listening on port 3000...")
    });
})
.catch(console.error);



//(for json file start:) tells it to update when all these types of files change