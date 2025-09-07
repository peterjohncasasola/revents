import type { AppUser } from "@/types/user"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { User } from "firebase/auth"

type State = {
  isAuthenticated: boolean
  currentUser: AppUser | null
}

const initialState: State = {
  isAuthenticated: false,
  currentUser: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: {
      reducer: (state, { payload }: PayloadAction<AppUser>) => {
        state.isAuthenticated = true
        state.currentUser = payload
      },
      prepare: (user: User) => {
        const mappedUser: AppUser = {
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid,
          displayName: user.displayName,
          providerId: user.providerData[0]?.providerId
        }
        return { payload: mappedUser }
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