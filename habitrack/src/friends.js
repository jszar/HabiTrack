import React, {Component} from 'react';
import './topnav.css'
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
              <a class="active" href="friends">Friends</a>
              <a href="/">Sign Out</a>
            </div>
                <h1>Friends Page</h1>
                  <p>so lonely :(</p>
            </div>
        );
    }
}

export default App;
