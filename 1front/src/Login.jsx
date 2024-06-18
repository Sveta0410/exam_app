import React, {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import { Button, message } from 'antd';
import axios from "axios";

export const Login = () => {
    const [fio, setFio] = useState('')
    const [pass, setPassword] = useState('')
    const [error, setError] = useState('')


    const navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage();

    const validateForm = () => {
        if (!pass && !fio ){
            setError("Введите ФИО и пароль")
            return false;
            }
        else if (!pass){
            setError("Введите пароль")
            return false;
            }
        else if (!fio ){
            setError("Введите ФИО")
            return false;
            }
        setError("")
        return true;
        }


//     const sendLoginInfo = () => {
//         setDisabled(false);
//         setButtonDisabled(false)
//         setQuestionIndex((questionIndex) => questionIndex + 1)
//         setValue(null);
//         setAnsBlock(<p></p>)
//     };

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
//              return  messageApi.info('Пожалуйста, выберите один из вариантов ответа')

             }
         }catch (error){
             setError("ошибка")
             }
    }

// const aa = () => {
//
//     }
    return (
        <>
        <p></p>
        <center><h2>Вход</h2></center>
        <form className="form_login">
            <div className="input-box">
                <label htmlFor="fio">ФИО </label>
                <input type="text" onChange={(e)=>setFio(e.target.value)} placeholder="Иванов Иван Иванович" id="fio" name="fio"/>
            </div>
            <div className="input-box">
                <label htmlFor="password">Пароль </label>
                <input value={pass} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password"/>
            </div>
{/*             <button> Войти </button> */}
            <Button type="primary" onClick={sendLoginInfo} style={{ marginTop: 16 }} >
                Начать экзамен
            </Button>

            {error && <p style={{color:'red'}}>{error}</p>}

{/*             <div className="register-link"> */}
{/*                 <p>  <a href="#">Создать нового пользователя</a></p> */}
{/*             </div> */}

        </form>
{/*         <br /> */}
{/*         <ul> */}
{/*                 <li> */}
{/*                     Endpoint to route to Home component */}
{/*                     <Link to="/">Home</Link> */}
{/*                 </li> */}
{/*                 <li> */}
{/*                     Endpoint to route to About component */}
{/*                     <Link to="/exam">exam</Link> */}
{/*                 </li> */}

{/*             </ul> */}
            </>
        )
    }