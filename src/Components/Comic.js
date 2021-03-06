import React from 'react';

const imgStyle = {
  border: '4px solid white',
  borderRadius: '3px',
};

const Comic = ({ comicURL, title, comicNumber, alt }) => (
  <div>
    <h3>
      xkcd #{comicNumber}: {title}
    </h3>
    <img
      src={comicURL}
      alt="there should be a comic here"
      style={imgStyle}
      title={alt}
    />
  </div>
);

export default Comic;
