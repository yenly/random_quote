import React, { Component } from 'react';
import './App.css';
import Quote from './components/quote';
import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quotes: {},
      quoteID: this.getRandomInt(16),
      quote: {},
      quoteHistory: []
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('quotes');
    // const quotesRef = rootRef.child(this.state.quoteID);
    rootRef.on('value', snap => {
      this.setState({
        quotes: snap.val(),
      });
      this.getQuote();
    });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * (max));
  }

  getQuote() {
    const newQuoteId = this.getRandomInt(this.state.quotes.length);
    this.setState({
      quoteID: newQuoteId,
      quote: this.state.quotes[this.state.quoteID]
    });
  }

  render() {
    const tweetText = `http://twitter.com/home?status=${this.state.quote.quote} by ${this.state.quote.author}`;

    return (
      <div className="app">
        <h1>Random Quote Machine</h1>
        <p className="app-intro">Here's a random quote from my favorites collection. I hope you find it as thought provoking as I do.</p>
        <Quote
          words={this.state.quote.quote}
          author={this.state.quote.author} />
        <div className="quote-panel-control">
          <a href={tweetText}><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></a>
          <button>New Quote</button>
        </div>

      </div>
    );
  }
}

export default App;
