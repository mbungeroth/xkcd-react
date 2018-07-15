import React from 'react';

const Comic = ({ comicURL, title, comicNumber }) =>
  <div>
    <h3>xkcd #{comicNumber}: {title}</h3>
    <img src={comicURL} alt="there should be a comic here"/>
  </div>

export default Comic;
