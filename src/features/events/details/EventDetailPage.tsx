import { Grid } from "semantic-ui-react";
import EventDetailChat from "./EventDetailChat";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSidebar from "./EventDetailSidebar";
import { useParams } from "react-router-dom";
import { selectEventById } from "../eventSlice";
import { useAppSelector } from "@/app/store";
  
export default function EventDetailPage() {
  const {id} = useParams();
  const event = useAppSelector(selectEventById(id));

  if (!event) return <div>Event not found</div>

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfo event={event} />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar />
      </Grid.Column>
    </Grid>
  )
}