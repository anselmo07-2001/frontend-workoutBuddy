import { configureStore } from "@reduxjs/toolkit";
import authToken from "./slices/authToken"
import workoutsSlice from "./slices/workoutsSlice";

export const store = configureStore({
    reducer: {
        authToken: authToken.reducer,
        workouts: workoutsSlice.reducer
    },
})

window.store = store


// store is the central point of importing related to redu
export * from "./slices/authToken"
export * from "./slices/workoutsSlice"

export * from "./thunk/fetchWorkouts"
export * from "./thunk/deleteWorkout"
export * from "./thunk/addWorkouts"
export * from "./thunk/signUp"
export * from "./thunk/login"
