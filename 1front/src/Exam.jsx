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
   const [resToShow1, setResToShow1] = useState([])
   const [resToShow2, setResToShow2] = useState([])
   const numAns = 0; //считаем число верных ответов

    function WriteQuestion(props) {
        const {questions} = props

        const tableBlock = (<>
            <Row justify="space-around">
            <Col span={11}>
              <Table
                columns={columns}
                dataSource={resToShow1}
                pagination={false}
                size="small"
              />
            </Col>
            <Col span={11}>
              <Table
                columns={columns}
                dataSource={resToShow2}
                pagination={false}
                size="small"
              />
            </Col>
          </Row></>
        )
        console.log('questions', questions);


        if (questions.length !== 0 && questionIndex < 20){
            if (resToShow.length === 0){
                for (let i = 0; i < questionsForExam.length; i++) {
                    resToShow.push({key: i, question: questionsForExam[i].id, answer: null, rightanswer: questionsForExam[i].rightanswer});
                }

                setResToShow1(resToShow.slice(0, resToShow.length / 2));
                setResToShow2(resToShow.slice(resToShow.length / 2));
            }

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
        else{return <>{tableBlock}<p>Результат - {countCorrect} баллов из 20</p></>}
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