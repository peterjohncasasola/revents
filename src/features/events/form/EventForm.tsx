import type { AppEvent } from "@/types/event"
import {
  Button,
  Divider,
  Form,
  Header,
  Segment,
  TextArea
} from "semantic-ui-react"
import { Controller, useForm } from "react-hook-form"
import { categoryOptions } from "./categoryOptions"
import { useEffect, useMemo } from "react"
import LoadingComponent from "@/app/layout/LoadingComponent"
import { useEventForm } from "./useEventForm"

export default function EventForm() {
  const {
    status,
    formTitle,
    selectedEvent,
    handleCancel,
    isSaving,
    handleCancelToggle,
    handleSubmit
  } = useEventForm()

  const initialValues: AppEvent = useMemo(
    () => ({
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
    }),
    []
  )

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

  if (status === "loading") return <LoadingComponent />

  return (
    <Segment clearing>
      <Header content={formTitle} />
      <Divider />

      <Form onSubmit={handleFormSubmit(handleSubmit)}>
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

        {selectedEvent && (
          <Button
            type="button"
            floated="left"
            loading={isSaving}
            color={selectedEvent.isCancelled ? "green" : "red"}
            onClick={() => handleCancelToggle(selectedEvent)}
            content={
              selectedEvent.isCancelled ? "Reactivate event" : "Cancel event"
            }
          />
        )}

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
