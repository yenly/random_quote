import React from 'react';

const Quote = (props) => {

  return (
    <div className="quote-panel">
      <blockquote>
        {props.words}
      </blockquote>
      <small className="quote-author">~{props.author}</small>
    </div>
  );
};

export default Quote;
