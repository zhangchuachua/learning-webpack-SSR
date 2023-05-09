import { useCallback } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

export default function App() {
  const { message } = useLoaderData();
  const handleClick = useCallback(() => {
    console.log('button1')
  }, []);

  return <div>
    <p className="font-500">{message}</p>
    <button onClick={handleClick} className="b-none px-1em py-0.5em text-16px transition hover:bg-sky hover:c-#fff">
      click
    </button>
    <div>
      <p>router out let</p>
      <Outlet/>
    </div>
  </div>
}