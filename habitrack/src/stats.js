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
getHabConTotal(uid);
getHabConDaily(uid);
getHabConWeekly(uid);
getHabConMonthly(uid);
getNumHabits();

const catNumTotal = localStorage.getItem('catNumTotal');
const catNumDaily = localStorage.getItem('catNumDaily');
const catNumWeekly = localStorage.getItem('catNumWeekly');
const catNumMonthly = localStorage.getItem('catNumMonthly');
const habNumTotal = localStorage.getItem('habNumTotal');
const habNumDaily = localStorage.getItem('habNumDaily');
const habNumWeekly = localStorage.getItem('habNumWeekly');
const habNumMonthly = localStorage.getItem('habNumMonthly');
const habConTotal = localStorage.getItem('habConTotal');
const habConDaily = localStorage.getItem('habConDaily');
const habConWeekly = localStorage.getItem('habConWeekly');
const habConMonthly = localStorage.getItem('habConMonthly');
const numHabits = localStorage.getItem('numHabits');
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
function getHabConTotal(uid){
  let url = 'http://localhost:3001/api/getHabitConsistency?tagId=' + uid;
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    let con = Math.round(data * 10000) / 100;
    localStorage.setItem('habConTotal', con);
  }).catch(function(error){
    console.error();
  })
}
function getHabConDaily(uid){
  let type = '\'Daily\'';
  let url = 'http://localhost:3001/api/getHabitConsistencyByFreq?tagId=' + uid + '&tagId2=' + type;
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    let con = Math.round(data * 10000) / 100;
    localStorage.setItem('habConDaily', con);
  }).catch(function(error){
    console.error();
  })
}
function getHabConWeekly(uid){
  let type = '\'Weekly\'';
  let url = 'http://localhost:3001/api/getHabitConsistencyByFreq?tagId=' + uid + '&tagId2=' + type;
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    let con = Math.round(data * 10000) / 100;
    localStorage.setItem('habConWeekly', con);
  }).catch(function(error){
    console.error();
  })
}
function getHabConMonthly(uid){
  let type = '\'Monthly\'';
  let url = 'http://localhost:3001/api/getHabitConsistencyByFreq?tagId=' + uid + '&tagId2=' + type;
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    let con = Math.round(data * 10000) / 100;
    localStorage.setItem('habConMonthly', con);
  }).catch(function(error){
    console.error();
  })
}
function getNumHabits(){
  let url = 'http://localhost:3001/api/runTransaction';
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    let num = data.substring(1, data.length-1);
    //let res  = num.substring(num.indexOf('\'') +1);
    localStorage.setItem('numHabits', num);
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
              <a href="/">Sign Out</a>
            </div>
                <h1>Stats Page</h1>
                  <hr></hr>
                  <h3>USER STATS</h3>
                  <h4>Username: {user}</h4>
                  <h4>User ID: {uid}</h4>
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
                  <br></br>
                  <h4>Consistency of All Habits: {habConTotal}%</h4>
                  <h4>Consistency of Daily Habits: {habConDaily}%</h4>
                  <h4>Consistency of Weekly Habits: {habConWeekly}%</h4>
                  <h4>Consistency of Monthly Habits: {habConMonthly}%</h4>
                  <hr></hr>
                  <h3>PLATFORM STATS</h3>
                  <h4>Number of Habits Created Across All Users: {numHabits}</h4>
            </div>
        );
    }
}

export default App;
