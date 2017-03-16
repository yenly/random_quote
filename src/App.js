import React, { Component } from 'react';
import './App.css';
import Quote from './components/quote';
import * as firebase from 'firebase';
import { Jumbotron, Button } from 'react-bootstrap';


class App extends Component {
  constructor() {
    super();
    this.state = {
      quotes: {},
      quoteID: 0,
      quote: {}
      // quoteHistory: [],
      // showModal: false
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.close = this.close.bind(this);
    // this.open = this.open.bind(this);
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

  // close() {
  //   this.setState({ showModal: false });
  // }
  //
  // open() {
  //   this.setState({ showModal: true });
  // }

  render() {
    // console.log("inside render", this.state.quoteHistory);

    const tweetText = `http://twitter.com/home?status=${this.state.quote.quote} by ${this.state.quote.author}`;

    return (
      <div className="app">
        <form onSubmit={this.onFormSubmit}>
          <h1>Random Quote</h1>
          {/* <p className="app-intro">Here's a random quote from my favorites collection. I hope you find it as thought provoking as I do.</p> */}

          <Jumbotron>
            <Quote
              words={this.state.quote.quote}
              author={this.state.quote.author} />
          </Jumbotron>

          <div className="quote-panel-control">
            <a href={tweetText} target="_blank"><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></a>

            {/* <Button onClick={this.open}><i className="fa fa-twitter fa-lg" aria-hidden="true"></i></Button> */}
            <Button bsStyle="default" type="submit">
              New Quote
            </Button>
          </div>
        </form>

        {/* <Modal show={this.state.showModal} onHide={this.close} >
          <Modal.Header closeButton>
            <Modal.Title>Tweet This Quote</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{tweetText}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    );
  }
}

export default App;
