import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <h1>HabiTracker</h1>
      <br/>
      <h1>Add Habit</h1>
      <form action="">
        <label for="hname">Habit name: </label>
        <input type="text" id="hname" name="hname"></input><br/><br/>
        <label for="desc">Description: </label>
        <input type="text" id="desc" name="desc"></input><br/><br/>
        <label for="priority">Choose Priotiy: </label>
        <input list="priority"></input>
        <datalist id="priority">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
        </datalist>
        <br/><br/>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default App;
