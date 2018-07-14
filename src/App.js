import React, { Component } from 'react';
import './App.css';
import Controls from './Components/Controls';
import Comic from './Components/Comic';


class App extends Component {
  render() {
    return (
      <div>
        <h1>xkcd comics</h1>
        <Controls />
        <Comic />
      </div>
    );
  }
}

export default App;
