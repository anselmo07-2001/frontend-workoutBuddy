import { useState, useEffect } from "react" 
import { useDispatch, useSelector } from "react-redux"
import { clearError, login, initialLogin } from "../store"
import axios from "axios"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = () => {
    const dispatch = useDispatch()
    const { isLoading, error} = useSelector(state => state.authToken)
    const [email, setEmail] = useState("anselmo1@gmail.com")
    const [password, setPassword] = useState("Test123456")
    const [isLoadingAutoLogin, setIsLoadingAutoLogin] = useState(false)
    

    useEffect(() => {
        dispatch(clearError())
        const userAuth = JSON.parse(localStorage.getItem("user"))

        if (!userAuth) return
        setIsLoadingAutoLogin(true)
        const { token } = userAuth
        
        const autoLogin = async() => {
            try {
                //verify the token 
                const { data } = await axios.post("https://workout-buddy-api-4x4d.onrender.com/api/user/autoLogin", { token })
                dispatch(initialLogin(data))
            }
            catch(err) {
                localStorage.clear()
            }

            setIsLoadingAutoLogin(false)
        }

        autoLogin()
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(login({email,password}))
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Email: </label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <label>Password: </label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button disabled={isLoading || isLoadingAutoLogin}>
                {isLoading || isLoadingAutoLogin ? <AiOutlineLoading3Quarters className="rotate"/> : "Log in"}
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login