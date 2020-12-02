import React, {Component} from 'react';
import './topnav.css'
//import './App.css';

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
                <div class="col-sm-12">
                  <h1>Daily</h1>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default App;
