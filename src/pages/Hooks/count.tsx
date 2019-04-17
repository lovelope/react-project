import React, { useState } from 'react';

const Counter = function Counter(): React.ReactElement {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={(): void => setCount(count + 1)}>
        add count
      </button>
    </div>
  );
};

export default Counter;
