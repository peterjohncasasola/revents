import { AppRoutes } from "@/app/router/AppRoutes"
import type { AppEvent } from "@/types/event"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Divider,
  Form,
  Header,
  Segment,
  TextArea
} from "semantic-ui-react"
import { actions } from "../eventSlice"
import { useAppSelector } from "@/app/store"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { Controller, useForm } from "react-hook-form"
import { categoryOptions } from "./categoryOptions"
import { toast } from "react-toastify"
import { useFirestore } from "@/app/hooks/useFirestore"
import { useEffect } from "react"
import LoadingComponent from "@/app/layout/LoadingComponent"
import { selectById } from "@/app/store/createGenericSlice"

export default function EventForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { status } = useAppSelector((state) => state.events)
  const selectedEvent = useAppSelector((state) =>
    selectById<AppEvent>(id!)(state.events)
  )
  const { loadDocument, updateDocument, createDocument } =
    useFirestore("events")

  useEffect(() => {
    if (!id) {
      return
    }
    const loadEvent = async () => {
      await loadDocument(id, actions)
    }

    loadEvent()
  }, [id, loadDocument])

  const initialValues: AppEvent = {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
    attendees: [],
    hostedBy: "",
    hostPhotoURL: ""
  }

  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting }
  } = useForm<AppEvent>({
    defaultValues: initialValues,
    mode: "onTouched"
  })

  // Reset form when selectedEvent changes
  useEffect(() => {
    if (selectedEvent) {
      reset(selectedEvent)
    }
  }, [selectedEvent, reset])

  const formTitle = id ? "Update Event" : "Create New Event"

  async function onSubmit(data: AppEvent) {
    try {
      if (!selectedEvent) {
        // Create new event
        const newEvent = {
          ...data,
          id: uuidv4(),
          hostedBy: "Bob",
          attendees: [],
          hostPhotoURL: ""
        }

        const eventRef = await createEvent(newEvent)
        if (eventRef) {
          navigate(AppRoutes.EventDetails(eventRef.id))
        }
      } else {
        // Update existing event
        await updateEvent({ ...selectedEvent, ...data })
        navigate(AppRoutes.EventDetails(id))
      }
    } catch (error: any) {
      toast.error(`${error.message}`)
    }
  }

  async function updateEvent(data: AppEvent) {
    if (!data) return
    await updateDocument(data.id, data)
  }

  async function createEvent(data: AppEvent) {
    if (!data) return
    const eventRef = await createDocument(data)
    return eventRef
  }

  const handleCancel = () => {
    navigate(AppRoutes.Events)
  }

  if (status === "loading") return <LoadingComponent />

  return (
    <Segment clearing>
      <Header content={formTitle} />
      <Divider />

      <Form onSubmit={handleFormSubmit(onSubmit)}>
        <Header sub content="Event Details" color="teal" />
        <Form.Input
          fluid
          placeholder="Event Title"
          {...register("title", { required: "Title is required" })}
          error={errors.title && errors.title.message}
        />
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          defaultValue={selectedEvent?.category || ""}
          render={({ field }) => (
            <Form.Select
              placeholder="Category"
              {...field}
              onChange={(_, data) =>
                field.onChange(data.value, { shouldValidate: true })
              }
              options={categoryOptions}
              error={errors.category && errors.category.message}
            />
          )}
        />

        <Form.Field
          control={TextArea}
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
          error={errors.description && errors.description.message}
          style={{ resize: "none" }}
          rows={6}
        />
        <Header sub content="Event Location Details" color="teal" />
        <Form.Input
          fluid
          placeholder="City"
          {...register("city", { required: "City is required" })}
          error={errors.city && errors.city.message}
        />
        <Form.Input
          fluid
          placeholder="Venue"
          {...register("venue", { required: "Venue is required" })}
          error={errors.venue && errors.venue.message}
        />
        <Form.Input
          fluid
          type="date"
          placeholder="Date"
          {...register("date", { required: "Date is required" })}
          error={errors.date && errors.date.message}
        />

        <Button
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          icon="send"
          floated="right"
          positive
          content="Submit"
        />
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={handleCancel}
          floated="right"
          icon="cancel"
          negative
          content="Cancel"
        />
      </Form>
    </Segment>
  )
}
