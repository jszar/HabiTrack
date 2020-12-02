import React, {Component} from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import homepage from './homepage.js'
import logo from './logo.svg';
//import './login.css';

  class App extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            pass: '',
            alert: ''
        };
        this.updateName = this.updateName.bind(this);
        this.updatePass = this.updatePass.bind(this);
        this.createUser = this.createUser.bind(this);
    }
    updateName(e) {
        this.setState({name: e.target.value});
    }
    updatePass(e) {
        this.setState({pass: e.target.value});
    }
    createUser = (e) => {
        e.preventDefault();
        if (this.state.name == "" || this.state.pass == "")
        {
            this.setState({alert: "You've forgotten to fill a form out. Please do that."});
            //let user = 'franky';
            //let url = 'http://localhost:3001/api/test' + '?tagId=' + user;
            //fetch(url).then(response => response.text()).then(data => console.log(data))
            //window.location = 'http://localhost:3000/homepage'
        }else
        {  
            let url = 'http://localhost:3001/api/login' + '?tagId=' + this.state.name + '&tagId2=' + this.state.pass;
            fetch(url).then(function(response){
                return response.text();
            }).then(function(data){
                if(data == '1'){
                    window.location = 'http://localhost:3000/homepage';
                }else{
                    //this.setState({alert: "Username or password was entered incorrectly. Please try again"});
                }
            }).catch(function(error){
                console.error();
            })
        }
    }
    render()
    {
        return (
            <div>
                <h1>HabiTracker</h1>
                <br/>
                <h1>Login</h1>
                <form action="">
                    <label for="hname">User name: </label>
                    <input type="text" id="uname" name="uname" value={this.state.name} onChange=
                        {this.updateName}></input><br/><br/>
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="password" value={this.state.pass} onChange=
                        {this.updatePass}></input><br/><br/>
                    <br/>
                    <button onClick={(e) => {this.createUser(e)}}>Submit</button>
                </form>
                <br/>
                <a href='http://localhost:3000/signup'>Don't have an account? Make one</a>
                <h3 style={{color: "red"}} >{this.state.alert}</h3>
            </div> 
        );
    }
}

export default App;