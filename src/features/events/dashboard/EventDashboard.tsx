import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../form/EventForm";
import type { AppEvent } from "types/event";
import { useEffect, useState } from "react";
import { sampleData } from "api/sampleData";

type Props = {
  isFormOpen: boolean
  setIsFormOpen: (isOpen: boolean) => void
  selectedEvent: AppEvent | null
  onSelectEvent: (event: AppEvent | null) => void
}

export default function EventDashboard({ isFormOpen, setIsFormOpen, selectedEvent, onSelectEvent }: Props) {
  const [events, setEvents] = useState<AppEvent[]>([]);  

  useEffect(() => {
    setEvents(sampleData);
  }, []);

  function addEvent(event: AppEvent) {
    setEvents((events) => [...events, event]);
    setIsFormOpen(false);
  }

  function deleteEvent(event: AppEvent) {
    setEvents((events) => events.filter((e) => e.id !== event.id));
    onSelectEvent(null);
  }

  function updateEvent(updatedEvent: AppEvent) {
    setEvents((events) =>
      events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
    onSelectEvent(null);
    setIsFormOpen(false);
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} onSelectEvent={onSelectEvent} onRemoveEvent={deleteEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        {isFormOpen && (
          <EventForm
            addEvent={addEvent}
            updateEvent={updateEvent}
            selectedEvent={selectedEvent}
            setIsFormOpen={setIsFormOpen}
            key={selectedEvent ? selectedEvent.id : 0}
          />
        )}
    </Grid.Column>
    </Grid>
  )
}