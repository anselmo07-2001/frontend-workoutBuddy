import { createSlice } from "@reduxjs/toolkit"
import { signUp, login } from "../index"


const authToken = createSlice({
    name:"authToken",
    initialState: {
        data: null,
        isLoading: false,
        error: null
    },
    reducers: {
        initialLogin(state, action) {
            return {...state, data: action.payload}
        },
        logout() {
            return {}
        },
        clearError(state) {
            return {...state, error: null}
        }
    },
    extraReducers(builder) {
        builder.addCase(signUp.pending, (state,action) => {
            state.isLoading = true
        }),
        builder.addCase(signUp.fulfilled, (state,action) => {
            state.isLoading = false
            state.error = null
            state.data = action.payload
        }),
        builder.addCase(signUp.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload
        })


        builder.addCase(login.pending, (state,action) => {
            state.isLoading = true
        }),
        builder.addCase(login.fulfilled, (state,action) => {
            state.isLoading = false;
            state.error = null
            state.data = action.payload
        }),
        builder.addCase(login.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    }

})


export const { logout, clearError, initialLogin } = authToken.actions
export default authToken