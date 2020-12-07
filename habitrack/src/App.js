import React, {Component} from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import signup from './signup.js'
import login from './login.js'
import homepage from './homepage.js'
import stats from './stats.js'
import './App.css';

  class App extends Component {
    render()
    {
        return (
           <Router>
           <div className="container">
             <Route exact path='/' component={login}/>
             <Route path='/signup' component={signup}/>
             <Route path='/homepage' component={homepage}/>
             <Route path='/stats' component={stats}/>
           </div>
            </Router>
        );
    }
}

export default App;
