import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <h1>HabiTracker</h1>
      <br/>
      <h1>Add User</h1>
      <form action="">
        <label for="hname">User name: </label>
        <input type="text" id="uname" name="uname"></input><br/><br/>
        <label for="password">Password: </label>
        <input type="text" id="password" name="password"></input><br/><br/>
        <label for="conpassword">Confirm Password: </label>
        <input type="text" id="conpassword" name="conpassword"></input><br/><br/>
        <br/>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default App;
