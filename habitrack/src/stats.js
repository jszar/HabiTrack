import React, {Component} from 'react';
import './topnav.css'
var user = localStorage.getItem('currentuser');
//import './App.css';

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
                  <h3>STATS FOR: {user}</h3>
            </div>
        );
    }
}

export default App;
