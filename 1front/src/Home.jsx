import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button} from 'antd';

export const Home = () =>{
    return (
        <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/exam">Exam</Link>
            </li>
          </ul>
        </nav>

        <Button className="home_button" type="link" href="/login" style={{ marginTop: 16 }} >
                Начать экзамен
         </Button>
         <p></p>
          <Button className="home_button" type="link" href="/exam" style={{ marginTop: 16 }} >
                Тренировка
         </Button>
      </div>
        </>
)}
