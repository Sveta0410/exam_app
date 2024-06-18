import { createBrowserRouter } from "react-router-dom"
import { Home } from "./Home"
import { Login } from "./Login"
import { Exam } from "./Exam"


export const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/exam", element: <Exam /> },
])
