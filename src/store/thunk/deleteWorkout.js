import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const deleteWorkouts = createAsyncThunk("workouts/delete", async (workout) => {
   await axios.delete(`https://workout-buddy-api-4x4d.onrender.com/api/workouts/${workout._id}`, {
        headers: {
            "Authorization": `Bearer ${workout.userAuthToken}`
        }
    })

    return workout._id
})

export { deleteWorkouts }