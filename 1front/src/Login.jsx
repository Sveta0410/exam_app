import React, {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import { Button, message, Select, Form, Input, Typography  } from 'antd';
const { Title } = Typography;
import axios from "axios";

export const Login = () => {
    const [fio, setFio] = useState('')
    const [pass, setPassword] = useState('')
    const [error, setError] = useState('')
    const [allFIO, setAllFIO] = useState([])


    const navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage();

    const validateForm = () => {
        setError("")
        if (!pass || !fio ){
            return false;
            }
        return true;
        }

const onChange = (value) => {
    setFio(value)
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};
//     const sendLoginInfo = () => {
//         setDisabled(false);
//         setButtonDisabled(false)
//         setQuestionIndex((questionIndex) => questionIndex + 1)
//         setValue(null);
//         setAnsBlock(<p></p>)
//     };

    async function fetchFIO() {
        const all_fio = await axios({
            method: "get",
            url: "http://127.0.0.1:8000/get_all_users_fio",
        }).then(res =>  res.data);
        console.log("all_fio", all_fio);
        for (var i=0; i < all_fio.length; i++){
            all_fio[i] = {value: all_fio[i]["fio"], label: all_fio[i]["fio"]}
        }
        console.log("all_fio", all_fio);
        setAllFIO(all_fio);
    }


    async function sendLoginInfo() {
        if (!validateForm()) return;

        const formDetails = new URLSearchParams();
        formDetails.append('username', fio);
        formDetails.append('password', pass);
        try { const response = await fetch("http://127.0.0.1:8000/login/", {
            method: "POST",
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: formDetails,
            });
            console.log("erivgierjnvgibjfrtbiwe4bft", response);
            if (response.ok) {
                const data = await response.json()
                console.log("data", data);
                localStorage.setItem('token', data.access_token);
                navigate('/exam')

            } else {
                 const errorData = await response.json()
                 console.log("errorData", errorData);
                 setError("Неверный пароль или фио")
            }
        }catch (error){
            setError("ошибка")
        }
    }

const onFinish = (values) => {
    setPassword(values.password)
    setFio(values.fio)
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

    useEffect(() => {
        fetchFIO()
    }, []);

    return (
        <>
        <Title align="center">Вход</Title>
        <center><Form
        align="center"
    name="basic"
//     labelCol={{
//       span: 10,
//     }}
//     wrapperCol={{
//       span: 15,
//     }}
    style={{
      maxWidth: 500,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="ФИО"
      name="fio"
      rules={[
        {
          required: true,
          message: 'Введите ФИО',
        },
      ]}
    >
    <Select
    showSearch
    placeholder="Иванов Иван Иванович"
    optionFilterProp="label"
    onChange={onChange}
    onSearch={onSearch}
    options={allFIO}
  />
    </Form.Item>

    <Form.Item
      label="Пароль"
      name="password"
      rules={[
        {
          required: true,
          message: 'Введите пароль',
        },
      ]}
    >
      <Input.Password onChange={(e)=>setPassword(e.target.value)}/>
    </Form.Item>

    <Form.Item
//       wrapperCol={{
//         offset: 8,
//         span: 16,
//       }}
    >
      <Button type="primary" htmlType="submit" onClick={sendLoginInfo} >
        Начать экзамен
      </Button>
    </Form.Item>
  </Form></center>

            <center>{error && <p style={{color:'red'}}>{error}</p>}</center>
            <Button  type="link" href="/" style={{ marginTop: 16 }} >
                    Назад
            </Button>
            </>
        )
    }