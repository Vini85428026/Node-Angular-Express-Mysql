var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

var mysql = require('mysql');
var connection  = require('express-myconnection');
var app = express();

app.use(bodyParser());

connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password : '123',
     port : 3306, //port mysql
     database:'project_angular',
     multipleStatements : true
   });
connection.connect();

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/contatos/obter', function(req, res) {
  connection.query("select * from lista;", function(err, result){
    if(err){
        console.error(err);
        return;
    }
    res.json(result);
  });
});

app.post('/contatos/editar', function(req,res){
  var id = req.body.id;
  var listas = {
    nome:req.body.nome,
    telefone:req.body.telefone,
    data:req.body.data,
    operadora:req.body.operadora
  };
    
  connection.query("UPDATE lista SET ? where id="+id+";", listas, function(err,result){
    if(err){
      console.error(err);
      return;
    }

    res.json(result);
  });
});


app.post('/contatos', function(req, res) {

    var contato = {
        nome: req.body.nome,
        telefone: req.body.telefone,
        data: req.body.data,
        operadora: req.body.operadora
    };

    connection.query("insert into lista SET ?", contato, function(err, result){
        if(err){
            console.error(err);
            return;
        }   
        res.json(result);
    });  
});

app.post('/contatos/:codigo', function(req, res){
   var codigo = req.params.codigo;
   connection.query("select * from lista where id="+codigo+";", codigo, function(err,result){
      if (err) {
        console.error(err);
        return;
      }
      res.json({result});
   });
});

app.delete('/contatos/:id', function(req, res){ 
  var id = req.params.id;
  connection.query("delete from lista where id="+id+";", id, function(err,result){
    if(err){
      console.error(err);
      return;
    }
    res.json(result);
  });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));    
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
