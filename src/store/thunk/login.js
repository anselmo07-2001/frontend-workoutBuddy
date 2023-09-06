import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const login = createAsyncThunk("login/user", async (userAuthData, { rejectWithValue }) => {
   try {
        const response  = await axios.post(`https://workout-buddy-api-4x4d.onrender.com/api/user/login`, userAuthData)
        localStorage.setItem("user", JSON.stringify(response.data))
    
        const userDataResponse = {}
        userDataResponse.token = response.data.token
        userDataResponse.email = response.data.user.email

        return userDataResponse
   }
  catch(err) {
        console.log(err.response.data)
        return rejectWithValue(err.response.data.error)
  }

})

export { login }
