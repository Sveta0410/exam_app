import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Login} from "./Login"
import {Register} from "./Register"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
          <Login/>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
