import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/config/firebase"
import { login, logout } from "@/features/auth/authSlice"
import { useAppDispatch } from "@/app/store"
import { useEffect } from "react"
export const useAuthListener = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) dispatch(login(user))
      else dispatch(logout())
    })
    return unsubscribe
  }, [dispatch])
}
