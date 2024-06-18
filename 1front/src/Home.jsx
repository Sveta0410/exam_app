import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Input, Radio, Space, Button, Alert, message, Table, Row, Col } from 'antd';

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

        <Button className="home_button" type="link" href="/exam" style={{ marginTop: 16 }} >
                Начать экзамен
              </Button>
{/*  <Link to="/exam"> */}
{/*      <button type="button"> */}
{/*           Начать экзамен */}
{/*      </button> */}
{/*  </Link> */}
      </div>

        </>

        )}