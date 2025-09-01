import { useCallback, useEffect, useRef } from "react"
import { useAppDispatch } from "@/app/store"
import type { GenericActions } from "@/app/store/createGenericSlice"
import { collection, onSnapshot, type DocumentData } from "firebase/firestore"
import { db } from "@/config/firebase"

type ListenerState = {
  name?: string
  unsubscribe: () => void
}

export const useFirestore = <T>(path: string) => {
  const listenersRef = useRef<ListenerState[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      listenersRef.current.forEach((listener) => listener.unsubscribe())
    }
  }, [])

  const loadCollection = useCallback(
    (actions: GenericActions<T>) => {
      dispatch(actions.setLoading())

      const query = collection(db, path)

      const unsubscribe = onSnapshot(
        query,
        (snapshot) => {
          const data: DocumentData[] = []
          if (snapshot.empty) {
            dispatch(actions.setData([] as unknown as T))
            return
          }

          snapshot.docs.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
          })
          dispatch(actions.setData(data as unknown as T))
        },
        (error: any) => {
          dispatch(actions.setError(error))
        }
      )

      listenersRef.current.push({
        name: path,
        unsubscribe
      })
    },
    [dispatch, path]
  )

  return { loadCollection }
}
