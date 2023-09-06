import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const fetchWorkouts = createAsyncThunk("workouts/fetch", async (userAuth) => {
    const response = await axios.get("https://workout-buddy-api-4x4d.onrender.com/api/workouts", {
        headers: {
            'Authorization': `Bearer ${userAuth.data.token}`
        }
    })
    return response.data
})

export { fetchWorkouts }