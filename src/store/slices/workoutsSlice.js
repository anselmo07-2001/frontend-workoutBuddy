import { createSlice } from "@reduxjs/toolkit";
import { deleteWorkouts, addWorkouts, fetchWorkouts } from "../index"

const workoutsSlice = createSlice({
    name: "workouts",
    initialState: {
        data: [],
        isLoading: false,
        error: null,

        errorAddingWorkouts: null,
        isLoadingAddingWorkouts: false,
    },
    reducers: {
        removeWorkoutsInStore(state, action) {
            return {...state, data: []}
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchWorkouts.pending, (state,action) => {
            state.isLoading = true
        }),
        builder.addCase(fetchWorkouts.fulfilled, (state,action) => {
            state.isLoading = false;
            state.data = action.payload
        }),
        builder.addCase(fetchWorkouts.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.error
        })


        builder.addCase(addWorkouts.pending, (state,action) => {
            state.isLoadingAddingWorkouts = true
        }),
        builder.addCase(addWorkouts.fulfilled, (state,action) => {
            state.isLoadingAddingWorkouts = false;
            state.data.push(action.payload)
        }),
        builder.addCase(addWorkouts.rejected, (state,action) => {
            state.isLoadingAddingWorkouts= false;
            state.errorAddingWorkouts = action.payload
        })


        builder.addCase(deleteWorkouts.pending, (state,action) => {
            state.isLoading = true
        }),
        builder.addCase(deleteWorkouts.fulfilled, (state,action) => {
            state.isLoading = false;
            const index = state.data.findIndex((workout) => workout._id === action.payload)
            state.data.splice(index, 1)
        }),
        builder.addCase(deleteWorkouts.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.error
        })
    }
})


export const { removeWorkoutsInStore } = workoutsSlice.actions
export default workoutsSlice