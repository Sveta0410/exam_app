import React, {useState, useEffect} from "react"
import { Input, Radio, Space } from 'antd';
import axios from "axios";


export const Exam = () => {
  const [value, setValue] = useState(null);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

async function fetchQuestions() {
  const questionsForExam = await axios({
    method: "get",
    url: "http://127.0.0.1:8000/r",
  }).then(res =>  res.data);
  console.log("erivgierjnvgibjfrtbiwe4bft", questionsForExam);
  setQuestionsForExam(questionsForExam);


// const result = Object.values(questionsForExam);
// console.log("result",  Object.values(questionsForExam[0]));
// console.log("result",  questionsForExam[0]);
//   questionsForExam.map(c=>{
//                 return {label: c.exam_tb, key: c.rightanswer}
//                 })
//   console.log("1у434к54", questionsForExam);
//   setQuestionsForExam(questionsForExam)
//           const listQuestions = [
//             getItem('список вопросов', 'q', null,
//             questionsForExam.map(c=>{
//                 return {label: c.exam_tb, key: c.rightanswer}
//                 })
//             )
//             ]
//         console.log('listQuestions', listQuestions)
//   return questionsForExam
//   setQuestionsForExam(result)
}
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
//   const fetchQuestions = () => {
//        axios.get('http://127.0.0.1:8000/r').then(r => {
//         console.log('r', r)
//
//         const questionsForExam = r.data
//         console.log('questionsForExam', questionsForExam)
// //         const listQuestions = [
// //             getItem('список вопросов', 'q', null,
// //             questionsForExam.map(c=>{
// //                 return {label: c.exam_tb, key: c.rightanswer}
// //                 })
// //             )
// //             ]
// //         console.log('listQuestions', listQuestions)
//         setQuestionsForExam(questionsForExam)
//
//       }).catch(({response}) => {
//
//                     console.log(questionsForExam);
//                 }).finally(() => {
//                     console.log("i should go second");
//                     setQuestionsForExam(questionsForExam)
//                 });
//   }
//
//   useEffect(() => {
//       fetchQuestions()
//   }, []);
  useEffect(() => {
      fetchQuestions()
  }, []);
function WriteQuestion(props) {


//        const questions = props.questions;
       const {questions} = props
//        console.log(questions.answer1);
       console.log('questions', questions);
       console.log(typeof questions);
       console.log('questions.length', questions.length);
       if (Array.isArray(questions) ){
           console.log('questions!', questions);
//        console.log('questionsa1', questions[0].answer1);



       const numAns = 0;
       if (questions.length !== 0){
//        return <p>{questions}</p>
// console.log('questions.answer3', questions.answer3);
       if (questions[0].answer3 == null){
           return        <Radio.Group onChange={onChange} value={value}>
           <Space direction="vertical">

        <Radio value={1}>{questions[0].answer1}</Radio>
        <Radio value={2}>{questions[0].answer2}</Radio>
         </Space>
         </Radio.Group>;
       }
        if (questions[0].answer4 == null){
           return  <> <p>{questions[0].exam_tb} </p>
            <Radio.Group onChange={onChange} value={value}>
               <Space direction="vertical">

        <Radio value={1}>{questions[0].answer1}</Radio>
        <Radio value={2}>{questions[0].answer2}</Radio>
        <Radio value={3}>{questions[0].answer3}</Radio>
         </Space>
         </Radio.Group></>;
       }
        else if (questions[0].answer5 == null){
           return <p>questions.answer5 is null</p>;
       }
        return <p>questions.answer4 </p>;
    }}
}
// fetchQuestions()
// console.log('questionsForExam', questionsForExam);
// setQuestionsForExam(fetchQuestions());
// questionsForExam = fetchQuestions()
// fetchQuestions()
// fetchQuestions().then(WriteQuestion())
  return (
      <>
{/*        <p>{questionsForExam.data}</p> */}

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