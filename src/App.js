import React, { Component } from 'react';
import './App.css';
import Quote from './components/quote';
import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quotes: {},
      quote: {},
      quoteHistory: []
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
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
    let newQuoteId = this.getRandomInt(this.state.quotes.length);
    // if(!this.state.quoteHistory.includes(newQuoteId)) {
    //   console.log(this.state.quoteHistory, newQuoteId, "add" )
    // }
    if (newQuoteId !== this.state.quoteID) {
      this.setState({
        quoteID: newQuoteId,
        quoteLen: this.state.quotes.length
      });
      this.setState({
        quote: this.state.quotes[this.state.quoteID]
      });
      // this.addToQuoteHistory(this.state.quoteID);
    } else {
      newQuoteId = this.getRandomInt(this.state.quotes.length);
      console.log("Same quote ID as current!");
    }
  }

  // addToQuoteHistory(num) {
  //   let newArray = this.state.quoteHistory.slice();
  //   newArray.push(num);
  //   this.setState({
  //     quoteHistory: newArray
  //   });
  // }

  onFormSubmit(event) {
    event.preventDefault();
    this.getQuote();
  }

  render() {
    // console.log("inside render", this.state.quoteHistory);

    const tweetText = `http://twitter.com/home?status=${this.state.quote.quote} by ${this.state.quote.author}`;

    return (
      <div className="app">
        <form onSubmit={this.onFormSubmit}>
          <h1>Random Quote Machine</h1>
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
