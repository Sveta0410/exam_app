import React, {useState} from "react"
import { Link } from "react-router-dom";

export const Login = () => {
    const [fio, setFio] = useState("")
    const [pass, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fio);
        }

    return (
        <><form onSubmit={handleSubmit}>
            <div className="input-box">
                <label htmlFor="fio">ФИО </label>
                <input type="text" onChange={(e)=>setFio(e.target.value)} placeholder="Иванов Иван Иванович" id="fio" name="fio"/>
            </div>
            <div className="input-box">
                <label htmlFor="password">Пароль </label>
                <input value={pass} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password"/>
            </div>
            <button> Войти </button>
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