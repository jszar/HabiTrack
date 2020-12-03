const express = require("express");
const app = express();
let mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    database: 'habitrackerdb',
    user: 'root',
    password: 'HabiTracker'
});

connection.connect(function(err){
  if(err){
    return console.error('error: ' + err.message);
  }
  console.log('Connected!')
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3001, err => {
  if (!err) {
    console.log(`\nYour application is running on port 3001\n`);
  } else {
    console.err(`\nUnable to start server: ${err}`);
  }
});


app.get('/api/signup', function(req, res){
  let user = req.query.tagId;
  let pass = req.query.tagId2;
  var insert = 'INSERT INTO Users (username, password_hash) VALUES (\'' + user + '\', \'' + pass + '\')'
  connection.query(insert, (err, rows) => {
    if (err) throw err;
    res.send('1');
  })
})

app.get('/api/login', function(req, res){
  let user = req.query.tagId;
  let pass = req.query.tagId2;
  
  connection.query('SELECT password_hash FROM Users WHERE username=?', user, (err, rows) => {
    if (err) throw err;

    if(pass == rows[0].password_hash){
      res.send('1');
    }else{
      res.send('0');
    }
  })  
})

app.get('/api/getUID', function(req, res){
  let user = req.query.tagId;
  
  connection.query('SELECT uID FROM Users WHERE username=?', user, (err, rows) => {
    if (err) throw err;
    var uid = rows[0].uID.toString();
    res.send(uid);
  })  
})

app.get('/api/addCategory', function(req, res){
  let user = req.query.tagId;
  let cat = req.query.tagId2;
  let type = req.query.tagId3;

  var insert = 'INSERT INTO Categories (uID, name, type) VALUES (\'' + user + '\', \'' + cat + '\', \'' + type + '\')'
  connection.query(insert, (err, rows) => {
    if (err) throw err;
    res.send('1');
  })  
})

app.get('/api/getCategories', function(req, res){
  let user = req.query.tagId;
  
  var insert = 'SELECT name, type FROM Categories WHERE uID=' + user;
  connection.query(insert, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  })  
})