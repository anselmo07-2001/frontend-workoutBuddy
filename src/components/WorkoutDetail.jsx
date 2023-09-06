import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useDispatch, useSelector } from "react-redux"
import { deleteWorkouts } from "../store"
import { AiOutlineDelete } from "react-icons/ai";

const WorkoutDetail = ({workout}) => {
	const dispatch = useDispatch()
	const userAuth = useSelector(state => state.authToken)
	
	const handleDelete = async () => {
		if (userAuth.data) {
			dispatch(deleteWorkouts({
				_id: workout._id,
				userAuthToken: userAuth.data.token
			}))
		}
	}

	return (
		<div className="workout-details">
			<h4>{workout.title}</h4>
			<p><strong>Load (kg): </strong>{workout.load}</p>
			<p><strong>Reps: </strong>{workout.reps}</p>
			<p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
			<span onClick={handleDelete}><AiOutlineDelete/></span>
		</div>
	)
}

export default WorkoutDetail