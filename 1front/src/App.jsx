// import React from 'react';
// import { Button } from 'antd';
//
// const App = () => (
//   <div className="App">
//     <Button type="primary">Button</Button>
//   </div>
// );
//
// export default App;
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import {Login} from "./Login"
import {Register} from "./Register"
import {Exam} from "./Exam"
import axios from "axios";

function App() {
  const [count, setCount] = useState(0)

  const fetchQuestions = () => {
      axios.get('http://127.0.0.1:8000/r').then(r => {
        console.log('r', r)
      })
  }

  useEffect(() => {
      fetchQuestions()
  }, []);
  return (
    <>
    <Login/>
    <Exam/>
      <div className="App">

        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App;
