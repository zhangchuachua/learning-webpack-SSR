import React from 'react';
import ReactDOM from 'react-dom/client';

export function App() {
  return <div>
    <p>this is App</p>
    <button onClick={() => {
      console.log('app button')
    }}>
      click
    </button>
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App/>)
