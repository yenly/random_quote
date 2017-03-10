import React from 'react';

const Quote = (props) => {

  return (
    <div>
      <blockquote>
        {props.words}
      </blockquote>
      <small>~{props.author}</small>
    </div>
  );
};

export default Quote;
