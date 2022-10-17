import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: { user: null },
    reducers: {
        setCredentials: (state, action) => {
            const { userData} = action.payload
            state.user = userData

            console.log(userData)
        },
      
    },
})

export const { setCredentials } = loginSlice.actions

export default loginSlice.reducer
