import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button} from 'antd';

export const Home = () =>{
    localStorage.removeItem('token');
     const handleButtonClick = () => {
    localStorage.setItem('token', 'test'); // Устанавливаем значение токена при нажатии на кнопку
  };
    return (
        <>
      <div>
        <Button className="home_button" type="link" href="/login" style={{ marginTop: 16 }} >
                Экзамен
         </Button>
         <p></p>
          <Button className="home_button" onClick={handleButtonClick} type="link" href="/exam" style={{ marginTop: 16 }} >
                Тренировка
         </Button>
      </div>
        </>
)}
