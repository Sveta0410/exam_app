import React, {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import { Button,  Select, Form, Input, Typography  } from 'antd';
const { Title } = Typography;
import axios from "axios";

export const Login = () => {
    const [fio, setFio] = useState('')
    const [pass, setPassword] = useState('')
    const [error, setError] = useState('')
    const [allFIO, setAllFIO] = useState([])

    const navigate = useNavigate()

    const validateForm = () => {
        setError("")
        if (!pass || !fio ){
            return false;
            }
        return true;
        }

    async function fetchFIO() {
        const all_fio = await axios({
            method: "get",
            url: "http://127.0.0.1:8000/get_all_users_fio",
        }).then(res =>  res.data);
        for (var i=0; i < all_fio.length; i++){
            all_fio[i] = {value: all_fio[i]["fio"], label: all_fio[i]["fio"]}
        }
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
            if (response.ok) {
                const data = await response.json()
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

    useEffect(() => {
        fetchFIO()
    }, []);

    return (
        <>
        <Title align="center">Вход</Title>
        <center><Form
            align="center"
            name="basic"
            style={{
              maxWidth: 500,
            }}
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
                onChange={(e)=>setFio(e)}
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

            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={sendLoginInfo} >
                Начать экзамен
              </Button>
            </Form.Item>
        </Form>
        {error && <p style={{color:'red'}}>{error}</p>}</center>
        <Button  type="link" href="/" style={{ marginTop: 16 }} >
                Назад
        </Button>
        </>
        )
    }