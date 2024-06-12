import React, {useState, useEffect} from "react"
import { Input, Radio, Space, Button } from 'antd';
import axios from "axios";


export const Exam = () => {
  const [value, setValue] = useState(null);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);

    setValue(e.target.value);
    if (e.target.value === questionsForExam[questionIndex].rightanswer){
        console.log('правильно');
        }
//     setQuestionIndex((questionIndex) => questionIndex + 1)
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

   const [questionIndex, setQuestionIndex] = useState(0)
      const [questionCheck, setQuestionCheck] = useState([])
//       const [ansBlock, setAnsBlock] = useState(null)
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
       if (questions.length !== 0 && questionIndex < 20){
//         toggleDisabledNextQ()
           const questionBlock = (<p>{questions[questionIndex].exam_tb} </p>)
//            setAnsBlock(<p>sdvb dkiik</p>)
        const buttonsBlock = (<><Button type="primary" onClick={toggleDisabled} style={{ marginTop: 16 }} disabled={buttonDisabled}>
        подтвердить ответ
      </Button>
      <Button type="primary" onClick={toggleDisabledNextQ} style={{ marginTop: 16 }} disabled={!buttonDisabled}>
        следующий вопрос
      </Button></>)

//        return <p>{questions}</p>
// console.log('questions.answer3', questions.answer3);
       if (questions[questionIndex].answer3 == null){
           return <>{questionBlock} <Radio.Group onChange={onChange} value={value} disabled={disabled}>
           <Space direction="vertical">
        <Radio value={1}>{questions[questionIndex].answer1} </Radio>
        <Radio value={2}>{questions[questionIndex].answer2} </Radio>
         </Space>
         </Radio.Group>{buttonsBlock}</>;
       }
        if (questions[questionIndex].answer4 == null){
           return  <> {questionBlock}
            <Radio.Group onChange={onChange} value={value} disabled={disabled}>
               <Space direction="vertical">

        <Radio value={1}>{questions[questionIndex].answer1}</Radio>
        <Radio value={2}>{questions[questionIndex].answer2}</Radio>
        <Radio value={3}>{questions[questionIndex].answer3}</Radio>
         </Space>
         </Radio.Group>{buttonsBlock}</>;
       }
        else if (questions[questionIndex].answer5 == null){
           return <>{questionBlock}<p>questions.answer5 is null</p></>;
       }
        return <p>cjkckd</p>;
    }}
}
// fetchQuestions()
// console.log('questionsForExam', questionsForExam);
// setQuestionsForExam(fetchQuestions());
// questionsForExam = fetchQuestions()
// fetchQuestions()
// fetchQuestions().then(WriteQuestion())
  const [disabled, setDisabled] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const toggleDisabled = () => {
      if (value !== null){
    setDisabled(!disabled);
    setButtonDisabled(true)}
  };

  const toggleDisabledNextQ = () => {
    setDisabled(false);
    setButtonDisabled(false)
     setQuestionIndex((questionIndex) => questionIndex + 1)
     setValue(null);
  };
  return (
      <>
{/*        <p>{questionsForExam.data}</p> */}

{/*       <div>{questionsForExam.map(questionsForExam => questionsForExam.answer1)}</div> */}
{/*       {questionsForExam.map(questionsForExam => <div>{questionsForExam.exam_tb}</div>)} */}
     <WriteQuestion questions={questionsForExam} />
{/*     <Radio.Group onChange={onChange} value={value}> */}
{/*       <Space direction="vertical"> */}

{/*         <Radio value={1}>Option A</Radio> */}
{/*         <Radio value={2}>Option B</Radio> */}
{/*         <Radio value={3}>Option C</Radio> */}
{/*       </Space> */}
{/*     </Radio.Group> */}
   <p>--------------</p>
 <>
      <Radio  disabled={disabled}>
        Disabled
      </Radio>
      <Radio  disabled={disabled}>
        Disabled
      </Radio>
      <br />
      <Button type="primary" onClick={toggleDisabled} style={{ marginTop: 16 }} disabled={buttonDisabled}>
        подтвердить ответ
      </Button>
      <Button type="primary" onClick={() => setQuestionIndex((questionIndex) => questionIndex + 1)} style={{ marginTop: 16 }} disabled={!buttonDisabled}>
        следующий вопрос
      </Button>
    </>
  <p>---------</p>
    <button onClick={() => setQuestionIndex((questionIndex) => questionIndex + 1)}>
          подтвердить ответ {questionIndex}
    </button>
       <p></p>
    <button onClick={() => setQuestionIndex((questionIndex) => questionIndex + 1)}>
          index is {questionIndex}
    </button>
    </>
  );
}