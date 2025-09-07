import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/config/firebase"
import { login, logout } from "@/features/auth/authSlice"
import { useAppDispatch } from "@/app/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AppRoutes } from "@/app/router/AppRoutes"
export const useAuthListener = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user))
        navigate(AppRoutes.Events)
      } else {
        dispatch(logout())
        navigate(AppRoutes.Home)
      }
    })
    return unsubscribe
  }, [dispatch])
}
