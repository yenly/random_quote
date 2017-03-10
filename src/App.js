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
    return (
      <div className="App">
        <Quote
          words={this.state.quotes.quote}
          author={this.state.quotes.author} />
      </div>
    );
  }
}

export default App;
