import { selectEventById, setEvents } from "@/features/events/eventSlice"
import { useAppSelector } from "@/app/store"
import { db } from "@/config/firebase"
import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

export const useEvent = (id: string | undefined) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const unsubscribe = onSnapshot(doc(db, "events", id), {
      next: (docSnapshot) => {
        if (!docSnapshot.exists()) {
          setLoading(false)
          return
        }
        dispatch(setEvents([docSnapshot.data()]))
        setLoading(false)
      },
      error: (error) => {
        console.error("Error fetching event:", error)
        toast.error(error.message)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [id, dispatch])

  const event = useAppSelector(selectEventById(id))
  return { event, loading }
}

