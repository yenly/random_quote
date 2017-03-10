import React, { Component } from 'react';
import './App.css';
import Quote from './components/quote';
import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quotes: {}
    };
  }

  componentDidMount() {
    const key = 1;
    const rootRef = firebase.database().ref().child('quotes');
    const quotesRef = rootRef.child(key);
    quotesRef.on('value', snap => {
      this.setState({
        quotes: snap.val()
      });
    });
  }

  render() {
    console.log(this.state.quotes)
    return (
      <div className="App">
        <Quote />
        {this.state.quotes.quote} {this.state.quotes.author}
      </div>
    );
  }
}

export default App;
