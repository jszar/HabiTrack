import React, {Component} from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import signup from './signup.js'
import login from './login.js'
import homepage from './homepage.js'
import friends from './friends.js'
import './App.css';

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
            window.location = 'http://localhost:3000/homepage'
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
           <Router>
           <div className="container">
             <Route exact path='/' component={login}/>
             <Route path='/signup' component={signup}/>
             <Route path='/homepage' component={homepage}/>
             <Route path='/friends' component={friends}/>
           </div>
            </Router>
        );
    }
}

export default App;
