import React, { useCallback } from 'react';
import ReactDOM from 'react-dom/client';

export function App() {
  const handleClick = useCallback(() => {
    console.log('button1')
  }, []);

  return <div>
    <p>this is App</p>
    <button onClick={handleClick}>
      click
    </button>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App/>)
