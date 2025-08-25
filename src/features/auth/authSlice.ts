import type { User } from "@/types/user"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type State = {
    isAuthenticated: boolean
    currentUser: User | null
}

const initialState: State = {
    isAuthenticated: false,
    currentUser: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, {payload}) => {
            state.isAuthenticated = true
            state.currentUser = {
                ...payload,
                photoUrl: payload.photoUrl ?? '/user.png'
            }
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.currentUser = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice