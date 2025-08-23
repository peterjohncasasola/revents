import { Grid } from "semantic-ui-react";
import EventDetailChat from "./EventDetailChat";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailSidebar from "./EventDetailSidebar";

export default function EventDetailPage() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader />
        <EventDetailInfo />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar />
      </Grid.Column>
    </Grid>
  )
}