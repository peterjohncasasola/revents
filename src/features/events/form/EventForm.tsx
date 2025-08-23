import { useState, type ChangeEvent } from "react";
import { Button, Form, Header, Input, Segment, TextArea } from "semantic-ui-react";
import { createId } from '@paralleldrive/cuid2';
import type { AppEvent } from "@/types/event";

type Props = {
  setIsFormOpen: (value: boolean) => void
  addEvent: (event: AppEvent) => void
  selectedEvent: AppEvent | null
  updateEvent: (event: AppEvent) => void
}

export default function EventForm({ setIsFormOpen, addEvent, selectedEvent, updateEvent }: Props) {

    const initialValues = selectedEvent ?? { 
        id: '',
        title: '',
        category: '',   
        description: '',
        date: '',
        city: '',
        venue: '',
        attendees: []
    };

    const formTitle = selectedEvent ? 'Update Event' : 'Create New Event';

    const [event, setEvent] = useState(initialValues);

    function handleSubmit() {
        if (!selectedEvent) {
            addEvent({...event, id: createId(), hostedBy: 'bob', attendees: [], hostPhotoURL: ''})
        }
        else {
            // Update existing event
            updateEvent({
                ...event, id: selectedEvent.id,
                hostedBy: selectedEvent.hostedBy || "bob",
                hostPhotoURL: selectedEvent.hostPhotoURL || "",
            });
        }
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setEvent((values) => ({ ...values, [name]: value }));
    }

    return (
        <Segment clearing>
            <Header content={formTitle} />
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <Input placeholder='Event Title' name='title' value={event.title} onChange={handleInputChange} type="text"/>
                </Form.Field>
                <Form.Field>
                    <Input placeholder='Category' name='category' value={event.category} onChange={handleInputChange} type="text"/>
                </Form.Field>
                <Form.Field>
                    <TextArea placeholder='Description' name='description' value={event.description} onChange={handleInputChange} style={{ resize: "none" }} rows={6} />
                </Form.Field>
                <Form.Field>
                    <Input placeholder='City' name='city' value={event.city} onChange={handleInputChange} type="text"/>
                </Form.Field>
                <Form.Field>
                    <Input placeholder='Venue' name='venue' value={event.venue} onChange={handleInputChange} type="text"/>
                </Form.Field>
                <Form.Field>
                    <Input placeholder='Date' name='date' value={event.date} onChange={handleInputChange} type="date"/>
                </Form.Field>

                <Button type="submit" floated="right" positive content='Submit' />
                <Button type="button" onClick={() => setIsFormOpen(false)} floated="right" negative content='Cancel' />
            </Form>
        </Segment>
    )
}

