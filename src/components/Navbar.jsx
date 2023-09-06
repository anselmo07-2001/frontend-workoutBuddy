import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/slices/authToken"
import { removeWorkoutsInStore } from "../store"

const Navbar = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.authToken)

    
    const handleLogout = () => {
        dispatch(logout())
        dispatch(removeWorkoutsInStore())
        localStorage.removeItem("user")
    }

    
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Buddy</h1>
                </Link>
                <nav>
                    { 
                        auth.data && auth.data.email ?                
                            <div>
                                <span>{auth.data.email}</span>
                                <button onClick={handleLogout}>Log out</button>
                            </div>
                                :   
                            <div>          
                                <Link to="/login">Log in</Link>
                                <Link to="/signup">Sign up</Link>
                            </div>
                    }                  
                </nav>
            </div>
        </header>
    )
}

export default Navbar