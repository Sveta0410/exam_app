import { useState, useEffect } from 'react'
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

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

  function WriteAns(props) {
        const questions = props.questions;
      if (questionsForExam.answer4 == null){
            return <p>questionsForExam.answer4 is null</p>;
        }
       return <p>questionsForExam.answer4 </p>;
  }

  return (
    <>
    <RouterProvider router={router} />
      <div className="App">
      </div>
    </>
  )
}

export default App;
