import { createBrowserRouter } from "react-router-dom"
import { Login } from "Login.jsx"
import { Exam } from "Exam.jsx"


export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/test_exam", element: <Exam /> },
])
