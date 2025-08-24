import { AppRoutes } from "@/app/router/AppRoutes";
import type { AppEvent } from "@/types/event";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Header,
  Input,
  Segment,
  TextArea,
} from "semantic-ui-react";
import { selectEventById } from "../eventSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useParams } from "react-router-dom";
import { createEvent, updateEvent } from "../eventSlice";
import { createId } from "@paralleldrive/cuid2";

export default function EventForm() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const selectedEvent = useAppSelector(selectEventById(id));
  const initialValues: AppEvent = selectedEvent ?? {
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

  const formTitle = initialValues.id ? "Update Event" : "Create New Event";
  const action = initialValues.id ? "Update" : "Create";

  const [event, setEvent] = useState(initialValues);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const eventId = id ?? createId();
    if (action === "Create") {
      // Create new event
      dispatch(
        createEvent({
          ...event,
          id: eventId,
          hostedBy: "Bob",
          attendees: [],
          hostPhotoURL: "",
        })
      );
    } else {
      // Update existing event
      dispatch(updateEvent({ ...selectedEvent, ...event }));
    }

    navigate(AppRoutes.EventDetails(eventId));
  };

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setEvent((values) => ({ ...values, [name]: value }));
  }

  const handleCancel = () => {
    setEvent(initialValues);
    navigate(AppRoutes.Events);
  };

  return (
    <Segment clearing>
      <Header content={formTitle} />
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Input
            placeholder="Event Title"
            name="title"
            value={event.title}
            onChange={handleInputChange}
            type="text"
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder="Category"
            name="category"
            value={event.category}
            onChange={handleInputChange}
            type="text"
          />
        </Form.Field>
        <Form.Field>
          <TextArea
            placeholder="Description"
            name="description"
            value={event.description}
            onChange={handleInputChange}
            style={{ resize: "none" }}
            rows={6}
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder="City"
            name="city"
            value={event.city}
            onChange={handleInputChange}
            type="text"
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder="Venue"
            name="venue"
            value={event.venue}
            onChange={handleInputChange}
            type="text"
          />
        </Form.Field>
        <Form.Field>
          <Input
            placeholder="Date"
            name="date"
            value={event.date}
            onChange={handleInputChange}
            type="date"
          />
        </Form.Field>

        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          type="button"
          onClick={handleCancel}
          floated="right"
          negative
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
