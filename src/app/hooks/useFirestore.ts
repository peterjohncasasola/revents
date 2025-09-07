import { useCallback, useEffect, useRef } from "react"
import { useAppDispatch } from "@/app/store"
import type { GenericActions } from "@/app/store/createGenericSlice"
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  type DocumentData
} from "firebase/firestore"
import { db } from "@/config/firebase"
import { toast } from "react-toastify"

type ListenerState = {
  name?: string
  unsubscribe: () => void
}

export const useFirestore = <T extends DocumentData>(path: string) => {
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

  const loadDocument = useCallback(
    (id: string, actions: GenericActions<T>) => {
      dispatch(actions.setLoading())

      if (!id) return

      const query = doc(db, path, id)

      const unsubscribe = onSnapshot(
        query,
        (snapshot) => {
          const data: DocumentData[] = []
          if (!snapshot.exists()) {
            dispatch(actions.setError("Document does not exist"))
            return
          }

          data.push({ id: snapshot.id, ...snapshot.data() })
          dispatch(actions.setData(data as unknown as T))
        },
        (error: any) => {
          dispatch(actions.setError(error))
        }
      )

      listenersRef.current.push({
        name: `${path}/${id}`,
        unsubscribe
      })
    },
    [dispatch, path]
  )

  const createDocument = async (data: T) => {
    try {
      const ref = doc(db, path, data.id)
      await setDoc(ref, data)
      return ref
    } catch (error) {
      toast.error(`Error creating document: ${(error as Error).message}`)
    }
  }

  const updateDocument = async (id: string, data: T) => {
    try {
      const ref = doc(db, path, id)
      return await updateDoc(ref, { ...data })
    } catch (error: any) {
      toast.error(`Error updating document: ${(error as Error).message}`)
    }
  }

  const deleteDocument = async (id: string) => {
    try {
      const ref = doc(db, path, id)
      return await deleteDoc(ref)
    } catch (error: any) {
      toast.error(`Error deleting document: ${(error as Error).message}`)
    }
  }

  const setDocument = async (id: string, data: any) => {
    try {
      const ref = doc(db, path, id)
      await setDoc(ref, data)
      return ref
    } catch (error) {
      console.warn(error)
      toast.error(`Error: ${(error as Error).message}`)
    }
  }

  return {
    loadCollection,
    loadDocument,
    createDocument,
    updateDocument,
    setDocument,
    deleteDocument
  }
}
