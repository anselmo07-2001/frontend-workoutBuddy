import { useEffect } from "react"
import { Skeleton } from "@mui/material"
import WorkoutDetail from "../components/WorkoutDetail"
import WorkoutForm from "../components/WorkoutForm"
import { useDispatch, useSelector } from "react-redux"
import { fetchWorkouts } from "../store"


const createSkeleton = (number) => {
	let skeleton = []
	for (let i = 0; i <= number; i++) {
		skeleton.push(<Skeleton key={i} variant="rectangular" animation="wave" height={"7rem"} sx={{marginBottom: "1.5rem"}}/>)
	}

	return skeleton
}



const Home = () => {
	const dispatch = useDispatch()
    const {data, isLoading, error}  = useSelector(state => state.workouts)
	const userAuth = useSelector(state => state.authToken)


	useEffect(() => {
		if (userAuth.data) {
			dispatch(fetchWorkouts(userAuth))
		}
	},[userAuth])


	let content;
	if (isLoading) {
		content = createSkeleton(3)
	}

	if (error) {
		content = <p>Something went wrong</p>
	}

	if (!isLoading && data) {
		content = data.map(workout => <WorkoutDetail workout={workout} key={workout._id}/>)
	}


    return (
	    <div className="home">
		   <div className="workouts">
			    { content }
			</div>
			<WorkoutForm/>
		</div>
	)
}

export default Home