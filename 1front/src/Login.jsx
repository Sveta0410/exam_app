import React, {useState} from "react"

export const Login = () => {
    const [fio, setFio] = useState("")
    const [pass, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-box">
                <label htmlFor="fio">ФИО </label>
                <input type="text" placeholder="Иванов Иван Иванович" id="fio" name="fio"/>
            </div>
            <div className="input-box">
                <label htmlFor="password">Пароль </label>
                <input type="password" id="password" name="password"/>

                <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" id="password" name="password"/>
            </div>
            <button> Войти </button>
            <div className="register-link">
                <p>  <a href="#">Создать нового пользователя</a></p>
            </div>

        </form>
        )
    }