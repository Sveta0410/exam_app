import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom";
import { Button, message } from 'antd';
import axios from "axios";

export const Login = () => {
    const [fio, setFio] = useState('')
    const [pass, setPassword] = useState('')

    const navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage();

    const validateForm = () => {

        if (!fio || !pass){

            return false;
            }
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
        const response = await fetch("http://127.0.0.1:8000/login/", {
            method: "POST",

            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
             },
            body: formDetails,
        });
        console.log("erivgierjnvgibjfrtbiwe4bft", response);
        if (response.ok) {
            const data = await response.json()
            localStorage.setItem('token', data.access_token);
            navigate('/exam')

            }

    }
    return (
        <><form>
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
                Войти
            </Button>
            <div className="register-link">
                <p>  <a href="#">Создать нового пользователя</a></p>
            </div>

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