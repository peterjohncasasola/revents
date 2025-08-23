import type { AppEvent } from "types/event";
import EventListItem from "./EventListItem"

type Props = {
  events: AppEvent[]
  onSelectEvent: (event: AppEvent) => void
  onRemoveEvent: (event: AppEvent) => void
}

export default function EventList({events, onSelectEvent, onRemoveEvent}: Props) {
  return (
    <>
        {events.map((event: AppEvent) => (    
          <EventListItem key={event.id} event={event} onSelectEvent={onSelectEvent} onRemoveEvent={onRemoveEvent} />
        ))}
    </>
  )
}
