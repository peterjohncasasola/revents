// src/app/hooks/useSocialLogin.ts
import { useFirestore } from "@/app/hooks/useFirestore"
import { useAppDispatch } from "@/app/store"
import { closeModal } from "@/common/modals/modalSlice"
import { auth } from "@/config/firebase"
import { Timestamp } from "firebase/firestore"
import { toast } from "react-toastify"
import {
  signInWithPopup,
  type AuthProvider
} from "firebase/auth"
import { FirestoreCollections } from "@/config/firestoreCollections"

export function useSocialAuth() {
  const { setDocument } = useFirestore(FirestoreCollections.UserProfiles)
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
