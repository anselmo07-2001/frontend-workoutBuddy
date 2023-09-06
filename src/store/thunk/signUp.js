import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const signUp = createAsyncThunk("signup/user", async (userAuthData, { rejectWithValue }) => {
   try {
        const response  = await axios.post(`https://workout-buddy-api-4x4d.onrender.com/api/user/signup`, userAuthData)
        localStorage.setItem("user", JSON.stringify(response.data))
        return response.data
   }
  catch(err) {
        return rejectWithValue(err.response.data.error)
  }

})

export { signUp }