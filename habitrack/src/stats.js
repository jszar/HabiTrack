import React, {Component} from 'react';
import './topnav.css'
var user = localStorage.getItem('currentuser');
let uid = localStorage.getItem('currentuserID');
getCatNumTotal(uid);
getCatNumDaily(uid);
getCatNumWeekly(uid);
getCatNumMonthly(uid);
getHabNumTotal(uid);
getHabNumDaily(uid);
getHabNumWeekly(uid);
getHabNumMonthly(uid);
const catNumTotal = localStorage.getItem('catNumTotal');
const catNumDaily = localStorage.getItem('catNumDaily');
const catNumWeekly = localStorage.getItem('catNumWeekly');
const catNumMonthly = localStorage.getItem('catNumMonthly');
const habNumTotal = localStorage.getItem('habNumTotal');
const habNumDaily = localStorage.getItem('habNumDaily');
const habNumWeekly = localStorage.getItem('habNumWeekly');
const habNumMonthly = localStorage.getItem('habNumMonthly');
//import './App.css';

function getCatNumTotal(uid){
  let url = 'http://localhost:3001/api/GetCategoryCount?tagId=' + uid;
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    console.log(data);
    data = data.slice(1, -1);
    localStorage.setItem('catNumTotal', data);
  }).catch(function(error){
    console.error();
  })
}
function getCatNumDaily(uid){
  let type = '\'Daily\'';
  let url = 'http://localhost:3001/api/getCategoryCountByFreq?tagId=' + uid + '&tagId2=' + type;
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    data = data.slice(1, -1);
    localStorage.setItem('catNumDaily', data);
  }).catch(function(error){
    console.error();
  })
}
function getCatNumWeekly(uid){
  let type = '\'Weekly\'';
  let url = 'http://localhost:3001/api/getCategoryCountByFreq?tagId=' + uid + '&tagId2=' + type;
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    data = data.slice(1, -1);
    localStorage.setItem('catNumWeekly', data);
  }).catch(function(error){
    console.error();
  })
}
function getCatNumMonthly(uid){
  let type = '\'Monthly\'';
  let url = 'http://localhost:3001/api/getCategoryCountByFreq?tagId=' + uid + '&tagId2=' + type;
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    data = data.slice(1, -1);
    localStorage.setItem('catNumMonthly', data);
  }).catch(function(error){
    console.error();
  })
}
function getHabNumTotal(uid){
  let url = 'http://localhost:3001/api/getHabitCount?tagId=' + uid;
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    data = data.slice(1, -1);
    localStorage.setItem('habNumTotal', data);
  }).catch(function(error){
    console.error();
  })
}
function getHabNumDaily(uid){
  let type = '\'Daily\'';
  let url = 'http://localhost:3001/api/getHabitCountByFreq?tagId=' + uid + '&tagId2=' + type;
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    data = data.slice(1, -1);
    localStorage.setItem('habNumDaily', data);
  }).catch(function(error){
    console.error();
  })
}
function getHabNumWeekly(uid){
  let type = '\'Weekly\'';
  let url = 'http://localhost:3001/api/getHabitCountByFreq?tagId=' + uid + '&tagId2=' + type;
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    data = data.slice(1, -1);
    localStorage.setItem('habNumWeekly', data);
  }).catch(function(error){
    console.error();
  })
}
function getHabNumMonthly(uid){
  let type = '\'Monthly\'';
  let url = 'http://localhost:3001/api/getHabitCountByFreq?tagId=' + uid + '&tagId2=' + type;
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    data = data.slice(1, -1);
    localStorage.setItem('habNumMonthly', data);
  }).catch(function(error){
    console.error();
  })
}

  class App extends Component {
    constructor() {
        super();
    }
    render()
    {
        return (
            <div>
            <div class="topnav">
              <a href="homepage">Home</a>
              <a class="active" href="stats">Stats</a>
              <a href="friends">Friends</a>
              <a href="/">Sign Out</a>
            </div>
                <h1>Stats Page</h1>
                  <p>Just...be...patient...</p>
                  <hr></hr>
                  <h3>USER STATS</h3>
                  <h4>Username: {user}</h4>
                  <h4>User ID: {uid}</h4>
                  <h4>Actual Name: </h4>
                  <hr></hr>
                  <h3>CATEGORY STATS</h3>
                  <h4>Total Categories Created: {catNumTotal}</h4>
                  <h4>Total Daily Categories: {catNumDaily}</h4>
                  <h4>Total Weekly Categories: {catNumWeekly}</h4>
                  <h4>Total Monthly Categories: {catNumMonthly}</h4>
                  <hr></hr>
                  <h3>HABIT STATS</h3>
                  <h4>Total Habits Created: {habNumTotal}</h4>
                  <h4>Total Daily Habits: {habNumDaily}</h4>
                  <h4>Total Weekly Habits: {habNumWeekly}</h4>
                  <h4>Total Monthly Habits: {habNumMonthly}</h4>
            </div>
        );
    }
}

export default App;
