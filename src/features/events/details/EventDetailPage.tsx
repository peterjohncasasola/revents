import { Grid } from "semantic-ui-react"
import EventDetailChat from "./EventDetailChat"
import EventDetailHeader from "./EventDetailHeader"
import EventDetailInfo from "./EventDetailInfo"
import EventDetailSidebar from "./EventDetailSidebar"
import { useParams } from "react-router-dom"
import LoadingComponent from "@/app/layout/LoadingComponent"
import { useEvent } from "@/app/hooks/useEvent"

export default function EventDetailPage() {
  const { id } = useParams()
  const { event, loading } = useEvent(id)

  if (loading) return <LoadingComponent />

  if (!id || !event) return <div>Event not found</div>

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
