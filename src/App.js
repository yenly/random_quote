import React, { Component } from 'react';
import './App.css';
import Quote from './components/quote';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Random Quote</h2>
        </div>
        <p className="App-intro">
          <Quote />
        </p>
        <button>New Quote</button>
      </div>
    );
  }
}

export default App;
