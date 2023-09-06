import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signUp, clearError } from "../store"
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const Signup = () => {
    const dispatch = useDispatch()
    const { isLoading, error} = useSelector(state => state.authToken)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        dispatch(clearError())
    },[])



    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) return
        dispatch(signUp({email,password}))
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <label>Email: </label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <label>Password: </label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button disabled={isLoading}>{ isLoading ? <AiOutlineLoading3Quarters className="rotate"/> : "Sign up"}</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup