import eventSlice from "@/features/events/eventSlice"
import testSlice  from "@/features/events/scratch/testSlice"
import { configureStore } from "@reduxjs/toolkit"
import modalSlice from "@/common/modals/modalSlice"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"   
import authSlice from "@/features/auth/authSlice"
export const store = configureStore({
    reducer: {
        // Define your reducers here
        test: testSlice.reducer,
        modal: modalSlice.reducer,
        auth: authSlice.reducer,
        events: eventSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector