import React, { useState } from 'react';
/* eslint-disable react/button-has-type */
const Count = () => {
  // const handleIncrement = () => {
  //   console.info('aaa');
  // };

  // const handleDecrease = () => {};
  const [count, setCount] = useState(0);
  return (
    <div className="jumbotron text-center">
      <h1>Welcome to React + hooks</h1>
      <div className="center-block text-center">
        <h1>count: {count}</h1>
        <button
          className="btn btn-lg btn-primary"
          onClick={() => setCount(count - 1)}
        >
          decrease
        </button>
        <button
          className="btn btn-lg btn-primary"
          onClick={() => setCount(count + 1)}
        >
          increment
        </button>
      </div>
      <div>
        <input
          type="text"
          onChange={e => setCount(e.target.value)}
          placeholder="What needs to be done?"
          value={count}
        />
      </div>
    </div>
  );
};

export default Count;
