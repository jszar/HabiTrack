const express = require('express')
const app = express()
const port = 3001
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


  function getUsers(){
    connection.query('SELECT username FROM Users;', function(err, rows, fields){
      if (err) throw err;
      console.log(rows[0].username);
      return rows;
    })
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/test', function(req, res){
  res.send('POST request')
  console.log("test")  
})

app.listen(port, () => {
  console.log('Example app listening at http://localhost:${port}')
})

getUsers();
connection.end();



/*
const { spawn } = require('child_process');

function query(){
  return spawn('python', ['./habitrack/src/hello.py']); 
}

const ls = query()
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
*/