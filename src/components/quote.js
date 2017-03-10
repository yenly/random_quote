import React from 'react';

const quote = {
  quote: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.",
  author: "Rumi"
}

const Quote = () => {
  return (
    <div>
      {quote.quote} ~{quote.author}
    </div>
  );
};

export default Quote;
