import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppSelector } from "@/app/store";


export default function EventDashboard() {

  const {events} = useAppSelector((state) => state.events);
  
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