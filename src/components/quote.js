import React from 'react';

const Quote = ({words, author}) => {

  return (
    <div className="quote-panel">
      <blockquote>
        {words}
      </blockquote>
      <small className="quote-author">~{author}</small>
    </div>
  );
};

export default Quote;
