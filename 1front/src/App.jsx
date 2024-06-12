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
// import reactLogo from './assets/react.svg'

import './App.css'
import {Login} from "./Login"
import {Register} from "./Register"
import {Exam} from "./Exam"
import axios from "axios";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function App() {
  const [count, setCount] = useState(0)

  const [questionsForExam, setQuestionsForExam] = useState([])
  const fetchQuestions = () => {
      axios.get('http://127.0.0.1:8000/r').then(r => {
        console.log('r', r)

        const questionsForExam = r.data
        const listQuestions = [
            getItem('список вопросов', 'g1', null,
            questionsForExam.map(c=>{
                return {label: c.exam_tb, key: c.rightanswer}
                })
            )
            ]
        setQuestionsForExam(questionsForExam)

      })
  }

//   useEffect(() => {
//       fetchQuestions()
//   }, []);

  function WriteAns(props) {
//       questionsForExam.map(questionsForExam => <div>{questionsForExam.exam_tb}</div>
        const questions = props.questions;
      if (questionsForExam.answer4 == null){
            return <p>questionsForExam.answer4 is null</p>;
        }
       return <p>questionsForExam.answer4 </p>;
  }


  return (
    <>
    <Login/>
    <Exam/>

      <div className="App">
{/*            тут была штука которая выводит все вопросы */}
{/*           {questionsForExam.map(questionsForExam => <div>{questionsForExam.exam_tb}</div>)} */}
{/*          <WriteAns questions={questionsForExam} /> */}

      </div>
    </>
  )
}

export default App;
