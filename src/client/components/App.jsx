import { useCallback } from "react";

export default function App() {
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