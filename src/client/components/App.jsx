import { useCallback } from "react";
import HelloWorld from "./HelloWorld/HelloWorld";

export default function App() {
  const handleClick = useCallback(() => {
    console.log('button1')
  }, []);

  return <div>
    <p className="font-500">this is App</p>
    <button onClick={handleClick} className="b-none px-1em py-0.5em text-16px transition hover:bg-sky hover:c-#fff">
      click
    </button>
    <HelloWorld/>
  </div>
}