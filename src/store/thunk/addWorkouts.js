import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const addWorkouts = createAsyncThunk("workouts/add", async ({workout, data}, {rejectWithValue}) => {    
    try {
        const response = await axios.post("https://workout-buddy-api-4x4d.onrender.com/api/workouts", workout,
                         {
                            headers: {
                                'Authorization': `Bearer ${data.token}`
                            }
                         })

        return response.data
    }
    catch(err) {
        return rejectWithValue(err.response.data)
    }
})

export { addWorkouts }