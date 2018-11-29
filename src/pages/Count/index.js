import React from 'react';
import PropTypes from 'prop-types';
import Intent from '../../intent/Counter-intent';
/* eslint-disable react/button-has-type */
const Count = ({ counter }) => {
  const handleIncrement = () => {
    console.info(Intent);
    Intent.addCounter();
  };

  const handleDecrease = () => {
    Intent.decCounter();
  };
  return (
    <div className="jumbotron text-center">
      <h1>Welcome to React + RxJS</h1>
      <div className="center-block text-center">
        <h1>counter: {counter}</h1>
        <button className="btn btn-lg btn-primary" onClick={handleDecrease}>
          decrease
        </button>
        <button className="btn btn-lg btn-primary" onClick={handleIncrement}>
          increment
        </button>
      </div>
    </div>
  );
};
Count.propTypes = {
  counter: PropTypes.number,
};
Count.defaultProps = {
  counter: 0,
};

export default Count;
