import React from 'react';

const Controls = ({ handleClick }) =>
  <div>
    <button onClick={() => handleClick('first')}>First</button>
    <button onClick={() => handleClick('previous')}>Previous</button>
    <button onClick={() => handleClick('random')}>Random</button>
    <button onClick={() => handleClick('next')}>Next</button>
    <button onClick={() => handleClick('last')}>Last</button>
  </div>


export default Controls;
