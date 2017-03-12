import React, { Component } from 'react';
import './App.css';
import Quote from './components/quote';
import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quotes: {},
      quoteID: 0,
      quote: {},
      quoteHistory: []
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {

    const rootRef = firebase.database().ref().child('quotes');
    rootRef.on('value', snap => {
      this.setState({
        quotes: snap.val(),
      });
      this.getQuoteId();
    });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * (max));
  }

  getQuoteId() {
    let newQuoteId = this.getRandomInt(this.state.quotes.length);
    if (newQuoteId !== this.state.quoteID) {
      // console.log("newQuoteId: ", newQuoteId);
      this.setQuote(newQuoteId);
      // this.addToQuoteHistory(newQuoteId);
    } else {
      this.getQuoteId();
    }
  }

  setQuote(quoteId) {
    this.setState({
      quote: this.state.quotes[quoteId]
    });
  }

  // addToQuoteHistory(num) {
  //   let newArray = this.state.quoteHistory.slice();
  //   newArray.push(num);
  //   this.setState({
  //     quoteHistory: newArray
  //   });
  //   console.log(this.state.quoteHistory);
  // }

  onFormSubmit(event) {
    event.preventDefault();
    this.getQuoteId();
  }

  render() {
    // console.log("inside render", this.state.quoteHistory);

    const tweetText = `http://twitter.com/home?status=${this.state.quote.quote} by ${this.state.quote.author}`;

    return (
      <div className="app">
        <form onSubmit={this.onFormSubmit}>
          <h1>Random Quote</h1>
          <p className="app-intro">Here's a random quote from my favorites collection. I hope you find it as thought provoking as I do.</p>
          <Quote
            words={this.state.quote.quote}
            author={this.state.quote.author} />
          <div className="quote-panel-control">
            <a href={tweetText}><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></a>
            <button type="submit">New Quote</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
