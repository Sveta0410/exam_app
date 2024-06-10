import React, {useState} from "react"

export const Login = () => {
    const [fio, setFio] = useState('')
    const [pass, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-box">
                <label for="fio">ФИО </label>
                <input type="text" placeholder="Иванов Иван Иванович" id="fio" name="fio"/>
            </div>
            <div className="input-box">
                <label for="password">Пароль </label>
                <input type="password" placeholder="*****" id="password" name="password"/>

                <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="*****" id="password" name="password"/>
            </div>
            <button> Войти </button>
            <div className="register-link">
                <p> Создать нового пользователя: <a href="#">Register</a></p>
            </div>

        </form>
        )
    }