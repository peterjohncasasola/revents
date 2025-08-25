import { AppRoutes } from "@/app/router/AppRoutes";
import type { AppEvent } from "@/types/event";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  Form,
  Header,
  Segment,
  TextArea,
} from "semantic-ui-react";
import { selectEventById } from "../eventSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useParams } from "react-router-dom";
import { createEvent, updateEvent } from "../eventSlice";
import { v4 as uuidv4 } from 'uuid';
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { categoryOptions } from "./categoryOptions";

export default function EventForm() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const selectedEvent = useAppSelector(selectEventById(id));
  const navigate = useNavigate();

  const initialValues = {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
    attendees: [],
    hostedBy: "",
    hostPhotoURL: "",
  };

  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AppEvent>({
    defaultValues: selectedEvent ?? initialValues,
    mode: "onTouched",
  });

  const formTitle = id ? "Update Event" : "Create New Event";

  const onSubmit = (data: FieldValues) => {
    const eventId = id ?? uuidv4();
    if (!id) {
      // Create new event
      dispatch(
        createEvent({
          ...data,
          id: eventId,
          hostedBy: "Bob",
          attendees: [],
          hostPhotoURL: "",
        })
      );
    } else {
      // Update existing event
      dispatch(updateEvent({ ...selectedEvent, ...data }));
    }

    navigate(AppRoutes.EventDetails(eventId));
  };

  const handleCancel = () => {
    navigate(AppRoutes.Events);
  };

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
              onChange={(_, data) => field.onChange(data.value, { shouldValidate: true })}
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
  );
}
