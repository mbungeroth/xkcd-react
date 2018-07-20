import React from 'react';

const disabledStyle = {
  color: 'white',
  backgroundColor: '#c485c3',
  borderColor: 'gray',
};

const Controls = ({ handleClick, isNewest, isFirst }) => (
  <div>
    {isFirst ? (
      <div style={{ display: 'inline-block' }}>
        <button style={disabledStyle}>First</button>
        <button style={disabledStyle}>Previous</button>
      </div>
    ) : (
      <div style={{ display: 'inline-block' }}>
        <button onClick={() => handleClick('first')}>First</button>
        <button onClick={() => handleClick('previous')}>Previous</button>
      </div>
    )}
    <button onClick={() => handleClick('random')}>Random</button>
    {isNewest ? (
      <div style={{ display: 'inline-block' }}>
        <button style={disabledStyle}>Next</button>
        <button style={disabledStyle}>Last</button>
      </div>
    ) : (
      <div style={{ display: 'inline-block' }}>
        <button onClick={() => handleClick('next')}>Next</button>
        <button onClick={() => handleClick('last')}>Last</button>
      </div>
    )}
  </div>
);

export default Controls;
