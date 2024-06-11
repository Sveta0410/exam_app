import React, {useState, useEffect} from "react"
import { Input, Radio, Space } from 'antd';
import axios from "axios";


export const Exam = () => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
    const [questionsForExam, setQuestionsForExam] = useState([])
  const fetchQuestions = () => {
      axios.get('http://127.0.0.1:8000/r').then(r => {
        console.log('r', r)

        const questionsForExam = r.data
        console.log('questionsForExam', questionsForExam)
//         const listQuestions = [
//             getItem('список вопросов', 'g1', null,
//             questionsForExam.map(c=>{
//                 return {label: c.exam_tb, key: c.rightanswer}
//                 })
//             )
//             ]
        setQuestionsForExam(questionsForExam)

      })
  }

  useEffect(() => {
      fetchQuestions()
  }, []);

   function WriteQuestion(props) {
       const questions = props.questions;
       console.log('questions', questions[0].answer1)

       const q = [];
       const id = [];
       const ans0 = [];
       const ans1 = [];
       const ans2 = [];
       const ans3 = [];
       const ans4 = [];
       const ans5 = [];
       const ans6 = [];
       const ans7 = [];
       const ans8 = [];
       const ans9 = [];
       const r_ans = [];

       questions.map(q => questions.exam_tb)
       questions.map(id => questions.id)
       questions.map(ans0 => questions.answer0)
       questions.map(ans1 => questions.answer1)
       questions.map(ans2 => questions.answer2)
       questions.map(ans3 => questions.answer3)
       questions.map(ans4 => questions.answer4)
       questions.map(ans5 => questions.answer5)
       questions.map(ans6 => questions.answer6)
       questions.map(ans7 => questions.answer7)
       questions.map(ans8 => questions.answer8)
       questions.map(ans9 => questions.answer9)
       questions.map(r_ans => questions.rightanswer)

//        const [answers, setAnswers] = useState([])
       const numAns = 0;
       return <p>{questions.data0}</p>
       if (questions.answer3 == null){
           return <p>questions.answer3 is null</p>;
       }
        else if (questions.answer4 == null){
           return <p>questions.answer4 is null</p>;
       }
        else if (questions.answer5 == null){
           return <p>questions.answer5 is null</p>;
       }
        return <p>questions.answer4 </p>;
    }


  return (
      <>
      <p>{questionsForExam.data0}</p>

{/*       <div>{questionsForExam.map(questionsForExam => questionsForExam.answer1)}</div> */}
{/*       {questionsForExam.map(questionsForExam => <div>{questionsForExam.exam_tb}</div>)} */}
      <WriteQuestion questions={questionsForExam} />
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={1}>Option A</Radio>
        <Radio value={2}>Option B</Radio>
        <Radio value={3}>Option C</Radio>
      </Space>
    </Radio.Group>
    </>
  );
}