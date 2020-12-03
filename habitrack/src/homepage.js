import React, {Component} from 'react';
import './topnav.css'
import './modal.css'
import Popup from "reactjs-popup";
var user = localStorage.getItem('currentuser');
let uid = getUserID(user);

function getUserID(username){
  let url = 'http://localhost:3001/api/getUID' + '?tagId=' + user;
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    let uid = parseInt(data, 10);
    localStorage.setItem('currentuserID', data);
    getCategories();
  }).catch(function(error){
    console.error();
  })
}

function getCategories(){
  var uid = localStorage.getItem('currentuserID');
  let url = 'http://localhost:3001/api/getCategories' + '?tagId=' + uid;
  
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    
    let cats = data.split('},');
    
    for(let i = 0; i < cats.length; i++){
      console.log(cats[i])
      let split = cats[i].indexOf('\",\"');
      let name = cats[i].substring(9, split);
      let type = cats[i].substring(split+10, cats[i].lastIndexOf('\"'));
      if(i == 0){
        name = name.substring(1);
      }

      if(type == 'Daily'){
        var x = document.getElementById("dailyCategories")
        var option = document.createElement("option");
        option.value = name;
        option.text = name;
        x.add(option);
      }else if(type == 'Weekly'){
        var x = document.getElementById("weeklyCategories")
        var option = document.createElement("option");
        option.value = name;
        option.text = name;
        x.add(option);
      }else if(type == 'Monthly'){
        var x = document.getElementById("monthlyCategories")
        var option = document.createElement("option");
        option.value = name;
        option.text = name;
        x.add(option);
      }

      
    }
  }).catch(function(error){
    console.error();
  })
}

function addCategoryDaily(category){
  var x = document.getElementById("dailyCategories")
  var option = document.createElement("option");
  option.value = category;
  option.text = category
  x.add(option);
  
  var uid = localStorage.getItem('currentuserID');
  let url = 'http://localhost:3001/api/addCategory' + '?tagId=' + uid + '&tagId2=' + category + '&tagId3=' + 'Daily';
  
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    if(data == 1){
      console.log('OK');
    }
  }).catch(function(error){
    console.error();
  })
}

function addCategoryWeekly(category){
  var x = document.getElementById("weeklyCategories")
  var option = document.createElement("option");
  option.value = category;
  option.text = category
  x.add(option);

  var uid = localStorage.getItem('currentuserID');
  let url = 'http://localhost:3001/api/addCategory' + '?tagId=' + uid + '&tagId2=' + category + '&tagId3=' + 'Weekly';
  
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    if(data == 1){
      console.log('OK');
    }
  }).catch(function(error){
    console.error();
  })
}

function addCategoryMonthly(category){
  var x = document.getElementById("monthlyCategories")
  var option = document.createElement("option");
  option.value = category;
  option.text = category
  x.add(option);

  var uid = localStorage.getItem('currentuserID');
  let url = 'http://localhost:3001/api/addCategory' + '?tagId=' + uid + '&tagId2=' + category + '&tagId3=' + 'Monthly';
  
  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    if(data == 1){
      console.log('OK');
    }
  }).catch(function(error){
    console.error();
  })
}

  class App extends Component {
    render()
    {
        return (
          <div>
            <div class="topnav">
              <a class="active" href="homepage">Home</a>
              <a href="stats">Stats</a>
              <a href="friends">Friends</a>
              <a href="/">Sign Out</a>
            </div>
            <div class="container" align="center">
              <div class="row">
                <div class="col-sm-12">
                  <h1>HabiTracker Homepage</h1>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-sm-4">
                  <div class="row text-center py-4 align-content-between flex-wrap">
                    <div class="col-sm-3 d-flex justify-content-center align-items-center">
                    </div>
                    <div class="col-sm-3 d-flex justify-content-center align-items-center">
                      <h1>Daily</h1>
                    </div>
                    <div class="col-sm-3 d-flex justify-content-center align-items-center">
                    <Popup id="popup1" trigger={<button class="btn btn-primary" id="dailyCat">Add Category</button>} modal>
                    {close => (
                      <div>
                        <input placeholder="New Category" type="text" id="categoryD" name="category"></input>
                        <br/>
                        <br/>
                        <button class="btn btn-primary" onClick={() => addCategoryDaily(document.getElementById("categoryD").value)}>Submit</button>
                      </div>
                    )}
                    </Popup>

                    </div>
                    <div class="col-sm-3 d-flex justify-content-center align-items-center">
                    </div>
                    <br/>
                  </div>

                  <div class="row text-center py-4 align-content-between flex-wrap">
                    <div class="col-sm-2">
                    </div>
                    <div class="col-sm-8 d-flex justify-content-center align-items-center">
                      <select id="dailyCategories" class="form-control">
                        <option value="" disabled selected>Select Category</option>                      
                      </select>
                    </div>
                    <div class="col-sm-2">
                    </div>
                  </div>



                </div>
                <div class="col-sm-4">
                  <div class="row text-center py-4 align-content-between flex-wrap">
                    <div class="col-sm-3 d-flex justify-content-center align-items-center">
                    </div>
                    <div class="col-sm-3 d-flex justify-content-center align-items-center">
                      <h1>Weekly</h1>
                    </div>
                    <div class="col-sm-3 d-flex justify-content-center align-items-center">
                    <Popup id="popup2" trigger={<button class="btn btn-primary" id="weeklyCat">Add Category</button>} modal>
                    {close => (
                      <div>
                        <input placeholder="New Category" type="text" id="categoryW" name="category"></input>
                        <br/>
                        <br/>
                        <button class="btn btn-primary" onClick={() => addCategoryWeekly(document.getElementById("categoryW").value)}>Submit</button>
                      </div>
                    )}
                    </Popup>
                    </div>
                    <div class="col-sm-3 d-flex justify-content-center align-items-center">
                    </div>
                    <br/>
                  </div>

                  <div class="row text-center py-4 align-content-between flex-wrap">
                    <div class="col-sm-2">
                    </div>
                    <div class="col-sm-8 d-flex justify-content-center align-items-center">
                      <select id="weeklyCategories" class="form-control">
                        <option value="" disabled selected>Select Category</option>
                      </select>
                    </div>
                    <div class="col-sm-2">
                    </div>
                  </div>

                </div>
                <div class="col-sm-4">
                  <div class="row text-center py-4 align-content-between flex-wrap">
                    <div class="col-sm-3 d-flex justify-content-center align-items-center">
                    </div>
                    <div class="col-sm-3 d-flex justify-content-center align-items-center">
                      <h1>Monthly</h1>
                    </div>
                    <div class="col-sm-3 d-flex justify-content-center align-items-center">
                    <Popup id="popup3" trigger={<button class="btn btn-primary" id="monthlyCat">Add Category</button>} modal>
                    {close => (
                      <div>
                        <input placeholder="New Category" type="text" id="categoryM" name="category"></input>
                        <br/>
                        <br/>
                        <button class="btn btn-primary" onClick={() => addCategoryMonthly(document.getElementById("categoryM").value)}>Submit</button>
                      </div>
                    )}
                    </Popup>
                    </div>
                      <div class="col-sm-3 d-flex justify-content-center align-items-center">
                    </div>
                    <br/>
                  </div>

                  <div class="row text-center py-4 align-content-between flex-wrap">
                    <div class="col-sm-2">
                    </div>
                    <div class="col-sm-8 d-flex justify-content-center align-items-center">
                      <select id="monthlyCategories" class="form-control">
                        <option value="" disabled selected>Select Category</option>
                      </select>
                    </div>
                    <div class="col-sm-2">
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default App;
