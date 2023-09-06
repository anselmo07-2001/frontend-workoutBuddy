import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addWorkouts } from "../store/thunk/addWorkouts"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const WorkoutForm = () => {
	const [title, setTitle] = useState("")
	const [load, setLoad] = useState("")
	const [reps, setReps] = useState("")
	const [err, setErr] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const dispatch = useDispatch()
	const userAuth = useSelector(state => state.authToken)
	
	const handleSubmit = async(e) => {
		e.preventDefault()
		setIsLoading(true)
		const workout = {title, load, reps}

		if (!userAuth.data) {
			setErr({
				error: "You must be logged in",
				errFields: []
			})
			return
		}

		try {
			await dispatch(addWorkouts({workout, ...userAuth})).unwrap()
			setTitle("")
			setLoad("")
			setReps("")
			setErr(null)
		}
		catch(err) {
			setErr(err)
		}
    	
    	setIsLoading(false)
		
	}


	
	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a new workout:</h3>
			<label>Exercise Title</label>
			<input type="text" onChange={(e) => setTitle(e.target.value)}
			       value={title} placeholder="Exercise Name"
				   className={err?.errFields.includes("title") ? "error" : ""}
				   />
					
			<label>Loads:</label>			
			<input type="number" onChange={(e) => setLoad(e.target.value)} 
			       value={load} placeholder="Loads"
				   className={err?.errFields.includes("load") ? "error" : ""}
			/>
		
			<label>Repetitions:</label>
			<input type="number" onChange={(e) => setReps(e.target.value)} 
				   value={reps} placeholder="Repetitions"
				   className={err?.errFields.includes("reps") ? "error" : ""}
			/>
			
			<button disabled={isLoading}>
				{ isLoading ? <AiOutlineLoading3Quarters className="rotate"/> : "Add a workout" }
			</button>
			{err?.error ? <div className="error">{err?.error}</div> : ""}
		</form>
	)
}

export default WorkoutForm