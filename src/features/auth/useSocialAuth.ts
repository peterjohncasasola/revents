// src/app/hooks/useSocialLogin.ts
import { useFirestore } from "@/app/hooks/useFirestore"
import { useAppDispatch } from "@/app/store"
import { closeModal } from "@/common/modals/modalSlice"
import { auth } from "@/config/firebase"
import { Timestamp } from "firebase/firestore"
import { toast } from "react-toastify"
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  type AuthProvider
} from "firebase/auth"
import type { ProviderConfig } from "@/types/socialAuth"


export const providers: ProviderConfig[] = [
  {
    name: "facebook",
    provider: new FacebookAuthProvider(),
    color: "blue",
    icon: "facebook",
    label: "Facebook"
  },
  {
    name: "google",
    provider: new GoogleAuthProvider(),
    color: "red",
    icon: "google",
    label: "Google"
  },
  {
    name: "github",
    provider: new GithubAuthProvider(),
    color: "black",
    icon: "github",
    label: "Github"
  }
]
export function useSocialAuth() {
  const { setDocument } = useFirestore("userProfiles")
  const dispatch = useAppDispatch()

  const loginWithProvider = async (provider: AuthProvider) => {
    try {
      const result = await signInWithPopup(auth, provider)
      const { user } = result
      const { metadata } = user
      const isNewUser = metadata.creationTime === metadata.lastSignInTime

      if (isNewUser) {
        await setDocument(user.uid, {
          displayName: user.displayName,
          email: user.email,
          isAdmin: false,
          userId: user.uid,
          photoURL: user.photoURL,
          createdAt: Timestamp.now()
        })
      }

      dispatch(closeModal())
      return { user, isNewUser }
    } catch (error: any) {
      toast.error(error.message)
      throw error
    }
  }

  return { loginWithProvider }
}
