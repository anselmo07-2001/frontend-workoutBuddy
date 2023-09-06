import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Home from "../src/pages/Home"
import SignupForm from "../src/pages/Signup"
import LoginForm from "../src/pages/Login"
import Navbar from "./components/Navbar"



function App() {
  const userAuth = useSelector(state => state.authToken)

  return (
    <>
       <BrowserRouter>
           <Navbar/>
           <div className="pages">
              <Routes>
                  <Route path="/"
                         element={userAuth.data ? <Home/> : <Navigate to="/login"/>}
                  />
                  <Route path="/login"
                         element={!userAuth.data ? <LoginForm/> : <Navigate to="/"/>}
                  />
                  <Route path="/signup"
                         element={!userAuth.data ? <SignupForm/> : <Navigate to="/"/>}
                  />
              </Routes>
           </div>
       </BrowserRouter>
    </>
  )
}

export default App
