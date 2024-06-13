import React, {useState, useEffect} from "react"
import { Input, Radio, Space, Button, Alert, message  } from 'antd';
import axios from "axios";


export const Exam = () => {
  const [value, setValue] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
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

  useEffect(() => {
      fetchQuestions()
  }, []);

   const [questionIndex, setQuestionIndex] = useState(0)
   const [countCorrect, setCountCorrect] = useState(0)
      const [questionCheck, setQuestionCheck] = useState([])

      const [ansBlock, setAnsBlock] = useState(null)
function WriteQuestion(props) {



       const {questions} = props
       console.log('questions', questions);
       console.log(typeof questions);
       console.log('questions.length', questions.length);
       if (Array.isArray(questions) ){

       const numAns = 0;
       if (questions.length !== 0 && questionIndex < 20){
           const questionBlock = (<><p>Вопрос №{questionIndex+1}</p><h3>{questions[questionIndex].exam_tb} </h3></>)
        const buttonsBlock = (<><p></p><Button type="primary" onClick={toggleDisabledCheck} style={{ marginTop: 16 }} disabled={buttonDisabled}>
        подтвердить ответ
      </Button>
      <Button type="primary" onClick={toggleDisabledNextQ} style={{ marginTop: 16 }} disabled={!buttonDisabled}>
        следующий вопрос
      </Button></>)


       if (questions[questionIndex].answer3 == null){
           return <>{contextHolder}{questionBlock} <Radio.Group name = "my_radio" onChange={onChange} value={value} disabled={disabled} >
           <Space direction="vertical">
        <Radio value={1}>1.  {questions[questionIndex].answer1}  </Radio><p></p>
        <Radio value={2}>2.  {questions[questionIndex].answer2} </Radio><p></p>
         </Space>
         </Radio.Group>{buttonsBlock}{ansBlock}</>;
       }
        else if (questions[questionIndex].answer4 == null){
           return  <> {contextHolder}{questionBlock}
            <Radio.Group name = "my_radio" onChange={onChange} value={value} disabled={disabled}>
               <Space direction="vertical">

        <Radio value={1}>1.  {questions[questionIndex].answer1}</Radio><p></p>
        <Radio value={2}>2.  {questions[questionIndex].answer2}</Radio><p></p>
        <Radio value={3}>3.  {questions[questionIndex].answer3}</Radio><p></p>
         </Space>
         </Radio.Group>{buttonsBlock}{ansBlock}</>;
       }
        else if (questions[questionIndex].answer5 == null){
           return  <> {contextHolder}{questionBlock}
            <Radio.Group name = "my_radio" onChange={onChange} value={value} disabled={disabled}>
               <Space direction="vertical">

        <Radio value={1}>1.  {questions[questionIndex].answer1}</Radio><p></p>
        <Radio value={2}>2.  {questions[questionIndex].answer2}</Radio><p></p>
        <Radio value={3}>3.  {questions[questionIndex].answer3}</Radio><p></p>
        <Radio value={4}>4.  {questions[questionIndex].answer4}</Radio><p></p>
         </Space>
         </Radio.Group>{buttonsBlock}{ansBlock}</>;
       }
        else if (questions[questionIndex].answer6 == null){
           return  <> {contextHolder}{questionBlock}
            <Radio.Group name = "my_radio" onChange={onChange} value={value} disabled={disabled}>
               <Space direction="vertical">

        <Radio value={1}>1.  {questions[questionIndex].answer1}</Radio><p></p>
        <Radio value={2}>2.  {questions[questionIndex].answer2}</Radio><p></p>
        <Radio value={3}>3.  {questions[questionIndex].answer3}</Radio><p></p>
        <Radio value={4}>4.  {questions[questionIndex].answer4}</Radio><p></p>
        <Radio value={5}>5.  {questions[questionIndex].answer5}</Radio><p></p>
         </Space>
         </Radio.Group>{buttonsBlock}{ansBlock}</>;
       }
   else if (questions[questionIndex].answer7 == null){
           return  <> {contextHolder}{questionBlock}
            <Radio.Group name = "my_radio" onChange={onChange} value={value} disabled={disabled}>
               <Space direction="vertical">

        <Radio value={1}>1.  {questions[questionIndex].answer1}</Radio><p></p>
        <Radio value={2}>2.  {questions[questionIndex].answer2}</Radio><p></p>
        <Radio value={3}>3.  {questions[questionIndex].answer3}</Radio><p></p>
        <Radio value={4}>4.  {questions[questionIndex].answer4}</Radio><p></p>
        <Radio value={5}>5.  {questions[questionIndex].answer5}</Radio><p></p>
        <Radio value={6}>6.  {questions[questionIndex].answer6}</Radio><p></p>
         </Space>
         </Radio.Group>{buttonsBlock}{ansBlock}</>;
       }
   else if (questions[questionIndex].answer8 == null){
           return  <> {contextHolder}{questionBlock}
            <Radio.Group name = "my_radio" onChange={onChange} value={value} disabled={disabled}>
               <Space direction="vertical">

        <Radio value={1}>1.  {questions[questionIndex].answer1}</Radio><p></p>
        <Radio value={2}>2.  {questions[questionIndex].answer2}</Radio><p></p>
        <Radio value={3}>3.  {questions[questionIndex].answer3}</Radio><p></p>
        <Radio value={4}>4.  {questions[questionIndex].answer4}</Radio><p></p>
        <Radio value={5}>5.  {questions[questionIndex].answer5}</Radio><p></p>
        <Radio value={6}>6.  {questions[questionIndex].answer6}</Radio><p></p>
        <Radio value={7}>7.  {questions[questionIndex].answer7}</Radio><p></p>
         </Space>
         </Radio.Group>{buttonsBlock}{ansBlock}</>;
       }
   else if (questions[questionIndex].answer9 == null){
           return  <> {contextHolder}{questionBlock}
            <Radio.Group name = "my_radio" onChange={onChange} value={value} disabled={disabled}>
               <Space direction="vertical">

        <Radio value={1}>1.  {questions[questionIndex].answer1}</Radio><p></p>
        <Radio value={2}>2.  {questions[questionIndex].answer2}</Radio><p></p>
        <Radio value={3}>3.  {questions[questionIndex].answer3}</Radio><p></p>
        <Radio value={4}>4.  {questions[questionIndex].answer4}</Radio><p></p>
        <Radio value={5}>5.  {questions[questionIndex].answer5}</Radio><p></p>
        <Radio value={6}>6.  {questions[questionIndex].answer6}</Radio><p></p>
        <Radio value={7}>7.  {questions[questionIndex].answer7}</Radio><p></p>
        <Radio value={8}>8.  {questions[questionIndex].answer8}</Radio><p></p>
         </Space>
         </Radio.Group>{buttonsBlock}{ansBlock}</>;
       }

        return  <> {contextHolder}{questionBlock}
            <Radio.Group name = "my_radio" onChange={onChange} value={value} disabled={disabled}>
               <Space direction="vertical">

        <Radio value={1}>1.  {questions[questionIndex].answer1}</Radio><p></p>
        <Radio value={2}>2.  {questions[questionIndex].answer2}</Radio><p></p>
        <Radio value={3}>3.  {questions[questionIndex].answer3}</Radio><p></p>
        <Radio value={4}>4.  {questions[questionIndex].answer4}</Radio><p></p>
        <Radio value={5}>5.  {questions[questionIndex].answer5}</Radio><p></p>
        <Radio value={6}>6.  {questions[questionIndex].answer6}</Radio><p></p>
        <Radio value={7}>7.  {questions[questionIndex].answer7}</Radio><p></p>
        <Radio value={8}>8.  {questions[questionIndex].answer8}</Radio><p></p>
        <Radio value={9}>9.  {questions[questionIndex].answer9}</Radio><p></p>
         </Space>
         </Radio.Group>{buttonsBlock}{ansBlock}</>;
    }
    else{return <p>Результат - {countCorrect} баллов из 20</p>}
}
}

  const [disabled, setDisabled] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const toggleDisabledCheck = () => {
      if (value !== null){
            setDisabled(!disabled);
            setButtonDisabled(true)
            if (value === questionsForExam[questionIndex].rightanswer){
                setAnsBlock(<Alert
              message="Верно"
              description="Можете перейти к следующему вопросу"
              type="success"
              showIcon
            />)
            setCountCorrect((countCorrect) => countCorrect + 1)
//                 console.log('AAAAAAAAAAAAAAAAAAA');
                }
            else {
                const key = `answer${questionsForExam[questionIndex].rightanswer}`
                const my_info = `Правильный ответ: ${questionsForExam[questionIndex].rightanswer}. ${questionsForExam[questionIndex][key]} `
                setAnsBlock(<Alert
              message="Неверно"
              description={my_info}
              type="error"
              showIcon
            />)}
    }
    else {messageApi.info('Пожалуйста, выберите один из вариантов ответа');}
  };

  const toggleDisabledNextQ = () => {
    setDisabled(false);
    setButtonDisabled(false)
     setQuestionIndex((questionIndex) => questionIndex + 1)
     setValue(null);
     setAnsBlock(<p></p>)
  };
  return (
      <>

     <WriteQuestion questions={questionsForExam} />

    </>
  );
}