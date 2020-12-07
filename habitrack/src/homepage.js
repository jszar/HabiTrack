import React, {Component} from 'react';
import './homepage.css'
import './topnav.css'
import './modal.css'
import Popup from "reactjs-popup";
var user = localStorage.getItem('currentuser');
let uid = getUserID(user);
getCurrentDate();
var date = localStorage.getItem('currentDate');

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

function getCurrentDate(){
  var d = new Date();
  let date = d.getMonth()+1 + '/' + d.getDate();
  localStorage.setItem('currentDate', date);
}

function getCategories(){
  var uid = localStorage.getItem('currentuserID');
  let url = 'http://localhost:3001/api/getCategories' + '?tagId=' + uid;

  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){

    let cats = data.split('},');

    for(let i = 0; i < cats.length; i++){
      let split = cats[i].indexOf('\",\"');
      let name = cats[i].substring(11, split);
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

function clearHabits(type){
  if(type == 'Daily'){
    var list = document.getElementById("dailyHabitList");
  }else if(type == 'Weekly'){
    var list = document.getElementById("weeklyHabitList");
  }else{
    var list = document.getElementById("monthlyHabitList");
  }
  while(list.hasChildNodes()){
    list.removeChild(list.firstChild);
  }
}

function getHabitInstances(cat, type){
  var uid = localStorage.getItem('currentuserID');
  let url = 'http://localhost:3001/api/getHabitInstances' + '?tagId=' + uid;

  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    if(type=='Daily'){
      clearHabits('Daily');
      for(let i = 0; i < data.length; i++){
        if(data[i]['type'] == 'Daily' && data[i]['c_name'] == cat){
          var ul = document.getElementById("dailyHabitList");
          var li = document.createElement("li");
          var uid = localStorage.getItem('currentuserID');
          let id = uid + '_' + data[i]['hID'] + '_' + data[i]['name'];
          console.log(data[i]);
          console.log(data[i]['checked']);
          if(data[i]['checked'] == 1){
            li.innerHTML = data[i]['name'] + "<br/><input class='' type='checkbox' id='" + id + "' value='' checked>" + "<br/><small><b>Description:<b/> " + data[i]['description'] + "<br/>Priority: " + data[i]['priority'] + "</small>";
          }else{
            li.innerHTML = data[i]['name'] + "<br/><input class='' type='checkbox' id='" + id + "' value=''>" + "<br/><small><b>Description:<b/> " + data[i]['description'] + "<br/>Priority: " + data[i]['priority'] + "</small>";
          }
          ul.appendChild(li)
          
          var cb = document.getElementById(id);
          cb.addEventListener('click', () => {
            console.log(cb.checked);
            let url = 'http://localhost:3001/api/updateCheck' + '?tagId=' + data[i]['hID'] + '&tagId2=' + data[i]['dID'] + '&tagId3=' + cb.checked;
            console.log(url);
            fetch(url).then(function(response){
              return response.text();
            }).then(function(data){
              if(data == '1'){
                console.log('UPDATED');
              }
            }).catch(function(error){
              console.error();
            })
          })
        }
      }
    }else if(type=='Weekly'){
      clearHabits('Weekly');
      for(let i = 0; i < data.length; i++){
        if(data[i]['type'] == 'Weekly' && data[i]['c_name'] == cat){
          var ul = document.getElementById("weeklyHabitList");
          var li = document.createElement("li");
          var uid = localStorage.getItem('currentuserID');
          let id = uid + '_' + data[i]['hID'] + '_' + data[i]['name'];
          if(data[i]['checked'] == 1){
            li.innerHTML = data[i]['name'] + "<br/><input class='' type='checkbox' id='" + id + "' value='' checked>" + "<br/><small><b>Description:<b/> " + data[i]['description'] + "<br/>Priority: " + data[i]['priority'] + "</small>";
          }else{
            li.innerHTML = data[i]['name'] + "<br/><input class='' type='checkbox' id='" + id + "' value=''>" + "<br/><small><b>Description:<b/> " + data[i]['description'] + "<br/>Priority: " + data[i]['priority'] + "</small>";
          }          
          ul.appendChild(li)

          var cb = document.getElementById(id);
          cb.addEventListener('click', () => {
            console.log(cb.checked);
            let url = 'http://localhost:3001/api/updateCheck' + '?tagId=' + data[i]['hID'] + '&tagId2=' + data[i]['dID'] + '&tagId3=' + cb.checked;
            fetch(url).then(function(response){
              return response.text();
            }).then(function(data){
              if(data == '1'){
                console.log('UPDATED');
              }
            }).catch(function(error){
              console.error();
            })
          })
        }
      }
    }else if(type=='Monthly'){
      clearHabits('Monthly');
      for(let i = 0; i < data.length; i++){
        if(data[i]['type'] == 'Monthly' && data[i]['c_name'] == cat){
          var ul = document.getElementById("monthlyHabitList");
          var li = document.createElement("li");
          var uid = localStorage.getItem('currentuserID');
          let id = uid + '_' + data[i]['hID'] + '_' + data[i]['name'];
          if(data[i]['checked'] == 1){
            li.innerHTML = data[i]['name'] + "<br/><input class='' type='checkbox' id='" + id + "' value='' checked>" + "<br/><small><b>Description:<b/> " + data[i]['description'] + "<br/>Priority: " + data[i]['priority'] + "</small>";
          }else{
            li.innerHTML = data[i]['name'] + "<br/><input class='' type='checkbox' id='" + id + "' value=''>" + "<br/><small><b>Description:<b/> " + data[i]['description'] + "<br/>Priority: " + data[i]['priority'] + "</small>";
          }          
          ul.appendChild(li)

          var cb = document.getElementById(id);
          cb.addEventListener('click', () => {
            console.log(cb.checked);
            let url = 'http://localhost:3001/api/updateCheck' + '?tagId=' + data[i]['hID'] + '&tagId2=' + data[i]['dID'] + '&tagId3=' + cb.checked;
            fetch(url).then(function(response){
              return response.text();
            }).then(function(data){
              if(data == '1'){
                console.log('UPDATED');
              }
            }).catch(function(error){
              console.error();
            })
          })
        }
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

function DailyCatChanged(){
  var cat = document.getElementById("dailyCategories");
  getHabitInstances(cat.value, 'Daily');
}

function WeeklyCatChanged(){
  var cat = document.getElementById("weeklyCategories");
  getHabitInstances(cat.value, 'Weekly');
}

function MonthlyCatChanged(){
  var cat = document.getElementById("monthlyCategories");
  getHabitInstances(cat.value, 'Monthly');
}

function addDate(habit){
  var d = new Date();
  let date = d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear();

  let url = 'http://localhost:3001/api/addDate' + '?tagId=' + date;

  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    let dID = data;
    addHabitInstance(habit, dID, false);
  }).catch(function(error){
    console.error();
  })
}

function addHabitInstance(habit, dId, checked){
  let uid = localStorage.getItem('currentuserID');
  let url = 'http://localhost:3001/api/addHabitInstance' + '?tagId=' + habit + '&tagId2=' + dId + '&tagId3=' + checked + '&tagId4=' + uid;

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

function addHabit(habit, des, prio, cat){
  let uid = localStorage.getItem('currentuserID');
  let url = 'http://localhost:3001/api/addHabit' + '?tagId=' + uid + '&tagId2=' + habit + '&tagId3=' + des + '&tagId4=' + prio + '&tagId5=' + cat;

  fetch(url).then(function(response){
    return response.text();
  }).then(function(data){
    if(data == 1){
      console.log('OK');
      //Check if entry needs to be added to date table
      addDate(habit);
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

function addHabitDaily(habit, des, prio, cat){
  addHabit(habit, des, prio, cat);
  var ul = document.getElementById("dailyHabitList");
  var li = document.createElement("li");
  li.innerHTML = li.innerHTML = habit + "<br/><input class='' type='checkbox' value=''></input>" + "<br/><small><b>Description:<b/> " + des + "<br/>Priority: " + prio + "</small>";
  ul.appendChild(li)
}

function addHabitWeekly(habit, des, prio, cat){
  addHabit(habit, des, prio, cat);
  var ul = document.getElementById("weeklyHabitList");
  var li = document.createElement("li");
  li.innerHTML = habit + "<br/><input class='' type='checkbox' value=''></input>" + "<br/><small><b>Description:<b/> " + des + "<br/>Priority: " + prio + "</small>";
  ul.appendChild(li)
}

function addHabitMonthly(habit, des, prio, cat){
  addHabit(habit, des, prio, cat);
  var ul = document.getElementById("monthlyHabitList");
  var li = document.createElement("li");
  li.innerHTML = habit + "<br/><input class='' type='checkbox' value=''></input>" + "<br/><small><b>Description:<b/> " + des + "<br/>Priority: " + prio + "</small>";
  ul.appendChild(li)
}

  class App extends Component {
    render()
    {
        return (
          <div>
            <div class="topnav">
              <a class="active" href="homepage">Home</a>
              <a href="stats">Stats</a>
              <a href="/">Sign Out</a>
            </div>
            <div class="container" align="center">
              <div class="row">
                <div class="col-sm-12">
                  <h1>HabiTracker Homepage: Habits for {date}</h1>
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
                      <select id="dailyCategories" class="form-control" onChange={() => DailyCatChanged()}>
                        <option value="" disabled selected>Select Category</option>
                      </select>
                      <br/>
                    </div>
                    <div class="col-sm-2">
                    <div class="col-sm-8 d-flex justify-content-center align-items-center">
                      <Popup id="popup4" trigger={<button class="btn btn-primary btn-sm" id="dailyHabit">Add Habit</button>} modal>
                      {close => (
                      <div>
                        <input placeholder="Habit Name" type="text" id="habitDname" name="category"></input>
                        <br/>
                        <br/>
                        <input placeholder="Short Description" type="text" id="habitDdes" name="category"></input>
                        <br/>
                        <br/>
                        <input placeholder="Priority (Enter 1, 2, or 3)" type="text" id="habitDprio" name="category"></input>
                        <br/>
                        <br/>
                        <button class="btn btn-primary" onClick={() => addHabitDaily(document.getElementById("habitDname").value, document.getElementById("habitDdes").value, document.getElementById("habitDprio").value, document.getElementById("dailyCategories").value)}>Submit</button>
                      </div>
                    )}
                    </Popup>
                    </div>
                    </div>
                  </div>
                    <div class="row">
                      <div class="col-sm-3">
                      </div>
                        <div class="col-lg-5">
                          <ul style={{fontSize: "25px"}} id="dailyHabitList">

                          </ul>
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
                      <select id="weeklyCategories" class="form-control" onChange={() => WeeklyCatChanged()}>
                        <option value="" disabled selected>Select Category</option>
                      </select>
                    </div>
                    <div class="col-sm-2">
                      <div class="col-sm-8 d-flex justify-content-center align-items-center">
                          <Popup id="popup4" trigger={<button class="btn btn-primary btn-sm" id="weeklyHabit">Add Habit</button>} modal>
                          {close => (
                          <div>
                            <input placeholder="Habit Name" type="text" id="habitDname2" name="category"></input>
                            <br/>
                            <br/>
                            <input placeholder="Short Description" type="text" id="habitDdes2" name="category"></input>
                            <br/>
                            <br/>
                            <input placeholder="Priority (Enter 1, 2, or 3)" type="text" id="habitDprio2" name="category"></input>
                            <br/>
                            <br/>
                            <button class="btn btn-primary" onClick={() => addHabitWeekly(document.getElementById("habitDname2").value, document.getElementById("habitDdes2").value, document.getElementById("habitDprio2").value, document.getElementById("weeklyCategories").value)}>Submit</button>
                          </div>
                        )}
                        </Popup>
                        </div>
                    </div>

                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                    </div>
                      <div class="col-lg-5">
                        <ul style={{fontSize: "25px"}} id="weeklyHabitList">

                        </ul>
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
                      <select id="monthlyCategories" class="form-control" onChange={() => MonthlyCatChanged()}>
                        <option value="" disabled selected>Select Category</option>
                      </select>
                    </div>
                    <div class="col-sm-2">
                      <div class="col-sm-8 d-flex justify-content-center align-items-center">
                        <Popup id="popup4" trigger={<button class="btn btn-primary btn-sm" id="monthlyHabit">Add Habit</button>} modal>
                        {close => (
                        <div>
                          <input placeholder="Habit Name" type="text" id="habitDname3" name="category"></input>
                          <br/>
                          <br/>
                          <input placeholder="Short Description" type="text" id="habitDdes3" name="category"></input>
                          <br/>
                          <br/>
                          <input placeholder="Priority (Enter 1, 2, or 3)" type="text" id="habitDprio3" name="category"></input>
                          <br/>
                          <br/>
                          <button class="btn btn-primary" onClick={() => addHabitMonthly(document.getElementById("habitDname3").value, document.getElementById("habitDdes3").value, document.getElementById("habitDprio3").value, document.getElementById("monthlyCategories").value)}>Submit</button>
                        </div>
                      )}
                      </Popup>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3">
                    </div>
                      <div class="col-lg-5">
                        <ul style={{fontSize: "25px"}} id="monthlyHabitList">

                        </ul>
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
