import React, {Component} from 'react';
import './topnav.css'
import './modal.css'
import Popup from "reactjs-popup";
var user = localStorage.getItem('currentuser');
//import './App.css';

function addCategoryDaily(category){
  var x = document.getElementById("dailyCategories")
  var option = document.createElement("option");
  option.value = category;
  option.text = category
  console.log(category);
  x.add(option);
}
function addCategoryWeekly(category){
  var x = document.getElementById("weeklyCategories")
  var option = document.createElement("option");
  option.value = category;
  option.text = category
  console.log(category);
  x.add(option);
}

function addCategoryMonthly(category){
  var x = document.getElementById("monthlyCategories")
  var option = document.createElement("option");
  option.value = category;
  option.text = category
  console.log(category);
  x.add(option);
}

  class App extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            pass: '',
            conpass: '',
            alert: ''
        };
        this.updateName = this.updateName.bind(this);
        this.updatePass = this.updatePass.bind(this);
        this.updateConpass = this.updateConpass.bind(this);
        this.createUser = this.createUser.bind(this);
    }
    updateName(e) {
        this.setState({name: e.target.value});
    }
    updatePass(e) {
        this.setState({pass: e.target.value});
    }
    updateConpass(e) {
        this.setState({conpass: e.target.value});
    }
    createUser = (e) => {
        e.preventDefault();
        console.log(this.state.name, this.state.pass, this.state.conpass);
        if (this.state.name == "" || this.state.pass == "" || this.state.conpass == "")
        {
            this.setState({alert: "You've forgotten to fill a form out. Please do that."});
            let user = 'franky';
            let url = 'http://localhost:3001/api/test' + '?tagId=' + user;
            fetch(url).then(response => response.text()).then(data => console.log(data))
        }
        else if (this.state.pass != this.state.conpass)
        {
            this.setState({alert: "Your passwords don't match. Please reconfirm your password"});
        }
        else
        {
            if ((this.state.pass).length < 8)
            {
                this.setState({alert: "Password too short. Please have a password of at least 8 characters."});
            }
            else
            {
                this.setState({alert: "Password successfully confirmed!"});

            }
        }
    }
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
                        <option value="temp">Temp</option>
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
                        <option value="temp">Temp</option>
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
                        <option value="temp">Temp</option>
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
