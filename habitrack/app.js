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

  /*
  function getUsers(){
    connection.query('SELECT username FROM Users;', function(err, rows, fields){
      if (err) throw err;
      console.log(rows[0].username);
      return rows;
    })
  }
  */
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


app.get('/api/test', function(req, res){
  let user = req.query.tagId;
  connection.query('SELECT username FROM Users WHERE username=?', user, (err, rows) => {
    if (err) throw err;
    console.log(rows[0].username);
    res.send(rows[0].username);
    //return rows;
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