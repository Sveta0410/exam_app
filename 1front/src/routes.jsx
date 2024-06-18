import { createBrowserRouter } from "react-router-dom"
import { Login } from "./Login"
import { Exam } from "./Exam"


export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/test_exam", element: <Exam /> },
])
