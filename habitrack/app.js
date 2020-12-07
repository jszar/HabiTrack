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

  var insert = 'INSERT INTO Categories (uID, c_name, type) VALUES (\'' + user + '\', \'' + cat + '\', \'' + type + '\')'
  connection.query(insert, (err, rows) => {
    if (err) throw err;
    res.send('1');
  })  
})

app.get('/api/getCategories', function(req, res){
  let user = req.query.tagId;
  
  var insert = 'SELECT c_name, type FROM Categories WHERE uID=' + user;
  connection.query(insert, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  })  
})

app.get('/api/getHabitInstances', function(req, res){
  let uid = req.query.tagId;
  
  var insert = 'SELECT * FROM HabitInstance hi JOIN Habits h ON hi.hID = h.hID JOIN Categories c ON h.cID = c.cID WHERE c.uID=' + uid + ' ORDER BY priority ASC';
  connection.query(insert, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  })  
})

app.get('/api/addHabit', function(req, res){
  let uid = req.query.tagId;
  let habit = req.query.tagId2;
  let des = req.query.tagId3;
  let prio = req.query.tagId4;
  let cat = req.query.tagId5;

  var getcID = 'SELECT cID FROM Categories WHERE uID=' + uid + ' AND c_name=\'' + cat + '\'';
  connection.query(getcID, (err, rows) => {
    if (err) throw err;
    var insert = 'INSERT INTO Habits (uID, name, description, priority, cID) VALUES (' + uid + ', \'' + habit + '\', \'' + des + '\', ' + prio + ', ' + rows[0].cID + ')';
    connection.query(insert, (err, rows) => {
      if (err) throw err;
      res.send('1');
    })
  })  
})

app.get('/api/addDate', function(req, res){
  let date = req.query.tagId;
  
  var getDate = 'SELECT dID FROM Dates WHERE date=\'' + date + '\'';
  connection.query(getDate, (err, rows) => {
    if (err) throw err;
    let ret = '\'' + rows[0].dID + '\'';
    res.send(ret);
  })  
})

app.get('/api/addHabitInstance', function(req, res){
  let habit = req.query.tagId;
  let dID = req.query.tagId2;
  let checked = req.query.tagId3;
  let uid = req.query.tagId4;

  var gethID = 'SELECT hID FROM Habits WHERE uID=' + uid + ' AND name=\'' + habit + '\'';
  
  connection.query(gethID, (err, rows) => {
    if (err) throw err;
    var insert = 'INSERT INTO HabitInstance (hID, dID, checked) VALUES (' + rows[0].hID + ', '  + dID + ', ' + checked + ')';
    connection.query(insert, (err, rows) => {
      if (err) throw err;
      res.send('1');
    })
  })  
})

app.get('/api/getCategoryCount', function(req, res){
  let user = req.query.tagId;
  connection.query('SELECT COUNT(*) as c FROM Categories WHERE uID=?', user, (err, rows) => {
    if (err) throw err;
    var catNum = rows[0].c.toString();
    res.json(catNum);
  })
})

app.get('/api/getCategoryCountByFreq', function(req, res){
  let user = req.query.tagId;
  let freq = req.query.tagId2;
  var insert = 'SELECT COUNT(*) as c FROM Categories WHERE uID =' + user + ' AND type =' + freq;
  connection.query(insert, (err, rows) => {    if (err) throw err;
    var catNum = rows[0].c.toString();
    res.json(catNum);
  })
})

app.get('/api/getHabitCount', function(req, res){
  let user = req.query.tagId;
  var insert = 'SELECT COUNT(*) as c FROM Habits WHERE uID =' + user;
  connection.query(insert, (err, rows) => {
    if (err) throw err;
    var habNum = rows[0].c.toString();
    res.json(habNum);
  })
})

app.get('/api/getHabitCountByFreq', function(req, res){
  let user = req.query.tagId;
  let freq = req.query.tagId2;
  var insert = 'SELECT COUNT(*) as c FROM Habits JOIN Categories on Habits.cID = Categories.cID WHERE Habits.uID =' + user + ' AND type =' + freq;
  connection.query(insert, (err, rows) => {    if (err) throw err;
    var habNum = rows[0].c.toString();
    res.json(habNum);
  })
})

app.get('/api/getHabitConsistency', function(req, res){
  let user = req.query.tagId;
  var insert = 'select count(*) as c from Habits natural join HabitInstance where checked = 1 and uID = ' + user
  + ' UNION select count(*) as c from Habits natural join HabitInstance where uID = ' + user;
  connection.query(insert, (err, rows) => {
    if (err) throw err;
    if (rows[1].c == 0) res.json(0);
    else {
      var con = (rows[0].c) / rows[1].c;
      res.json(con);
    }
  })
})

app.get('/api/getHabitConsistencyByFreq', function(req, res){
  let user = req.query.tagId;
  let freq = req.query.tagId2;
  var insert = 'select count(*) as c from Habits natural join HabitInstance natural join Categories where checked = 1 and type = ' + freq + ' and uID = ' + user
  + ' UNION select count(*) as c from Habits natural join HabitInstance natural join Categories where type = ' + freq + ' and uID = ' + user;
  connection.query(insert, (err, rows) => {
    if (err) throw err;
    if (rows[1].c == 0) res.json(0);
    else {
      var con = (rows[0].c) / rows[1].c;
      res.json(con);
    }
  })
})

app.get('/api/updateCheck', function(req, res){
  let hid = req.query.tagId;
  let did = req.query.tagId2;
  let check = req.query.tagId3;
  
  var update = 'UPDATE HabitInstance SET checked=' + check + ' WHERE hID=' + hid + ' AND dID=' + did;
  connection.query(update, (err, rows) => {
    if (err) throw err;
    res.send('1');
  })  
})