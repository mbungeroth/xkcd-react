import React from 'react';

const Controls = ({ onFirstClick }) =>
  <div>
    <button onClick={onFirstClick}>First</button>
    <button>Previous</button>
    <button>Random</button>
    <button>Next</button>
    <button>Last</button>
  </div>


export default Controls;
