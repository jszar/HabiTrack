import React, {Component} from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import homepage from './homepage.js'
import logo from './logo.svg';
//import './signup.css';

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
                let url = 'http://localhost:3001/api/signup' + '?tagId=' + this.state.name + '&tagId2=' + this.state.pass;
                localStorage.setItem('currentuser',this.state.name);

                fetch(url).then(function(response){
                    return response.text();
                }).then(function(data){
                    if(data == '1'){
                        window.location = 'http://localhost:3000/homepage';
                    }else{
                        localStorage.setItem('currentuser','');
                    }
                }).catch(function(error){
                    console.error();
                })
            }
        }
    }
    render()
    {
        return (
            <div align="center">
                <h1>HabiTracker</h1>
                <br/>
                <br/>
                <h1>Add User</h1>
                <form action="">
                    <label for="hname"></label>
                    <input type="text" placeholder="Username" id="uname" name="uname" value={this.state.name} onChange=
                        {this.updateName}></input><br/><br/>
                    <label for="password"></label>
                    <input type="password" placeholder="Password" id="password" name="password" value={this.state.pass} onChange=
                        {this.updatePass}></input><br/><br/>
                    <label for="conpassword"></label>
                    <input type="password" placeholder="Confirm Password" id="conpassword" name="conpassword" value={this.state.conpass} onChange=
                        {this.updateConpass}></input><br/><br/>
                    <br/>
                    <button class="btn btn-primary" onClick={(e) => {this.createUser(e)}}>Submit</button>
                </form>
                <br/>
                <a href='http://localhost:3000/'>Already have an account? Login here</a>
                <h3 style={{color: "red"}} >{this.state.alert}</h3>
            </div>
        );
    }
}

export default App;
