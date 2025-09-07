import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { toast } from "react-toastify"
import { AppRoutes } from "@/app/router/AppRoutes"
import type { AppEvent } from "@/types/event"
import { useAppSelector } from "@/app/store"
import { selectById } from "@/app/store/createGenericSlice"
import { actions } from "@/features/events/eventSlice"
import { useFirestore } from "@/app/hooks/useFirestore"

export function useEventForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { status } = useAppSelector((state) => state.events)
  const selectedEvent = useAppSelector((state) =>
    id ? selectById<AppEvent>(id)(state.events) : undefined
  )
  const { loadDocument, updateDocument, createDocument } =
    useFirestore("events")

  // Load document if editing
  useEffect(() => {
    if (id) loadDocument(id, actions)
  }, [id, loadDocument])

  const handleCancel = () => navigate(AppRoutes.Events)

  const isEditing = Boolean(id && selectedEvent)
  const formTitle = isEditing ? "Update Event" : "Create New Event"

  const handleSubmit = async (data: AppEvent) => {
    try {
      if (id && selectedEvent) {
        // update event
        await updateDocument(id, { ...selectedEvent, ...data })
        navigate(AppRoutes.EventDetails(id))
      } else {
        // create event
        const newEvent: AppEvent = {
          ...data,
          id: uuidv4(),
          hostedBy: "Bob",
          attendees: [],
          hostPhotoURL: ""
        }
        const eventRef = await createDocument(newEvent)
        if (eventRef) navigate(AppRoutes.EventDetails(eventRef.id))
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    }
  }

  return {
    id,
    status,
    isEditing,
    selectedEvent,
    handleCancel,
    formTitle,
    handleSubmit
  }
}
