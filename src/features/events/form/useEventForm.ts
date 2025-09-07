import { useEffect, useState } from "react"
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
  const defaultErrorMessage = "An unexpected error occurred"
  const navigate = useNavigate()
  const { status, errors } = useAppSelector((state) => state.events)
  const selectedEvent = useAppSelector((state) =>
    id ? selectById<AppEvent>(id)(state.events) : undefined
  )
  const { loadDocument, updateDocument, createDocument } =
    useFirestore("events")

  // Load document if editing
  useEffect(() => {
    if (id) loadDocument(id, actions)
  }, [id, loadDocument])

  useEffect(() => {
    if (errors) {
      toast.error(typeof errors === "string" ? errors : errors.message)
    }
  }, [errors])

  const handleCancel = () => navigate(-1)

  const isEditing = Boolean(id && selectedEvent)
  const [isSaving, setIsSaving] = useState(false)
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
      toast.error(error.message || defaultErrorMessage)
    }
  }

  const handleCancelToggle = async (event: AppEvent) => {
    try {
      setIsSaving(true)
      await updateDocument(event.id, { isCancelled: !event.isCancelled })
      const message = event.isCancelled ? "reactivated" : "cancelled"
      toast.success(`Event has been ${message} successfully`)
    } catch (error: any) {
      toast.error(error.message || defaultErrorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  return {
    id,
    status,
    isEditing,
    selectedEvent,
    handleCancel,
    isSaving,
    formTitle,
    handleCancelToggle,
    handleSubmit
  }
}
