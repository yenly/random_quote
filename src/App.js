import React, { Component } from 'react';
import './App.css';
import Quote from './components/quote';
import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quotes: {},
      quoteID: 1,
      quoteHistory: []
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('quotes');
    const quotesRef = rootRef.child(this.state.quoteID);
    quotesRef.on('value', snap => {
      this.setState({
        quotes: snap.val()
      });
    });
  }

  getNewQuote() {

  }

  render() {
    const tweetText = `http://twitter.com/home?status=\"${this.state.quotes.quote}\" by ${this.state.quotes.author}`;

    return (
      <div className="app">
        <h1>Random Quote Machine</h1>
        <p className="app-intro">Here's a random quote from my favorites list. I hope you find it as thought provoking as I do.</p>
        <Quote
          words={this.state.quotes.quote}
          author={this.state.quotes.author} />
        <div className="quote-panel-control">
          <a href={tweetText}><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></a>
          <button>New Quote</button>
        </div>

      </div>
    );
  }
}

export default App;
