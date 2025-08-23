import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import type { AppEvent } from "types/event";
import { useEffect, useState } from "react";
import { sampleData } from "api/sampleData";


export default function EventDashboard() {
  const [events, setEvents] = useState<AppEvent[]>([]);  

  useEffect(() => {
    setEvents(sampleData);
  }, []);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
    </Grid.Column>
    </Grid>
  )
}