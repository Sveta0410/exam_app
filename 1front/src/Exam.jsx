import React, {useState, useEffect} from "react"
import { Input, Radio, Space, Button, Alert, message, Table, Row, Col } from 'antd';
import axios from "axios";


export const Exam = () => {
    const [value, setValue] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const columns = [
        {
        title: '№',
        dataIndex: 'key',
        width: 15,
      },
      {
        title: 'id вопроса',
        dataIndex: 'question',
        width: 100,
      },
      {
        title: 'Ответ пользователя',
        dataIndex: 'answer',
        width: 150,
      },
        {
        title: 'Правильный ответ',
        dataIndex: 'rightanswer',

      }]


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
   const [resToShow, setResToShow] = useState([])
//    const [resToShow1, setResToShow1] = useState([])
//    const [resToShow2, setResToShow2] = useState([])
//    const numAns = 0; //считаем число верных ответов
   const [first, setFirst] = useState(0)
const tableBlock = (<>
            <Table
                columns={columns}
                dataSource={resToShow}
                pagination={false}
                size="small"
              /></>
        )
        if (resToShow.length === 0){
        for (let i = 0; i < questionsForExam.length; i++) {
                    resToShow.push({key: i+1, question: questionsForExam[i].id, answer: null, rightanswer: questionsForExam[i].rightanswer});
                }
            }
    function WriteQuestion(props) {
        const {questions} = props
        console.log('questions', questions);

        if (questions.length !== 0 && questionIndex < questions.length){
//             if (resToShow.length === 0 && first === 0){
//                 setFirst(1)
//                 for (let i = 0; i < questions.length; i++) {
//                     resToShow.push({key: i+1, question: questions[i].id, answer: null, rightanswer: questions[i].rightanswer});
//                 }
//
//             }
            console.log(resToShow)
            const questionBlock = (<><p>Вопрос №{questionIndex+1}</p><h3>{questions[questionIndex].exam_tb} </h3></>)
            const buttonsBlock = (<><p></p>
               <Button type="primary" onClick={toggleDisabledCheck} style={{ marginTop: 16 }} disabled={buttonDisabled}>
                подтвердить ответ
              </Button>
              <Button type="primary" onClick={toggleDisabledNextQ} style={{ marginTop: 16 }} disabled={!buttonDisabled}>
                следующий вопрос
              </Button></>
            )
           if (questions[questionIndex].answer3 == null){
               return <>{contextHolder}{questionBlock}
               <Radio.Group name = "my_radio" onChange={onChange} value={value} disabled={disabled} >
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
        else if (questions.length !== 0){
            const numProt = 123;
            const fio = "Иванов Иван Иванович"
            const data_to_send = {
                    num_prot: numProt,
                    fio: fio,
                    result: countCorrect/questions.length*5,
                    res_to_show: resToShow
                    }
            console.log("data_to_send", data_to_send);
            sendQuestions(data_to_send)
//             const res1 = await axios({
//                 method: "post",
//                 url: "http://127.0.0.1:8000/write_res",
//                 data = data_to_send
//             }).then(res =>  res.data);
//             console.log("erivgierjnvgibjfrtbiwe4bft", res1);
//             setQuestionsForExam(questionsForExam);

            return <>
                <h3>Протокол № {numProt}</h3>
                <h4>Выполнил - {fio}</h4>
                {tableBlock}
                <p>Оценка - {countCorrect/questions.length*5}. ({countCorrect} из {questions.length})</p>
                <p>Дата прохождения тестирования - {new Date().toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year:"numeric" })}</p></>}
    }
    async function sendQuestions(data_to_send) {
            const res1 = await axios({
                method: "post",
                url: "http://127.0.0.1:8000/write_res",
                data: {num_prot: data_to_send.num_prot,
                    fio: data_to_send.fio,
                    result: data_to_send.result,
                    res_to_show: data_to_send.res_to_show}
            }).then(res =>  res);
            console.log("res1", res1);
    }
    const [disabled, setDisabled] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const toggleDisabledCheck = () => {
        if (value !== null){
            setDisabled(!disabled);
            setButtonDisabled(true)
            resToShow[questionIndex].answer = value;
            const key = `answer${questionsForExam[questionIndex].rightanswer}`
            if (value === questionsForExam[questionIndex].rightanswer){
                const my_info = `${questionsForExam[questionIndex].rightanswer}. ${questionsForExam[questionIndex][key]}`
                setAnsBlock(<Alert
                    message="Верно"
                    description={my_info}
                    type="success"
                    showIcon
                />)
                setCountCorrect((countCorrect) => countCorrect + 1)
            }
            else {
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
