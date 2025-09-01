import { Grid } from "semantic-ui-react"
import EventDetailChat from "./EventDetailChat"
import EventDetailHeader from "./EventDetailHeader"
import EventDetailInfo from "./EventDetailInfo"
import EventDetailSidebar from "./EventDetailSidebar"
import { useParams } from "react-router-dom"
import LoadingComponent from "@/app/layout/LoadingComponent"
import { useFirestore } from "@/app/hooks/useFirestore"
import { actions } from "../eventSlice"
import { useEffect } from "react"
import { useAppSelector } from "@/app/store"
import type { AppEvent } from "@/types/event"
import { selectById } from "@/app/store/createGenericSlice"

export default function EventDetailPage() {
  const { id } = useParams()
  const key: string = "events"
  const { status } = useAppSelector((state) => state.events)
  const event = useAppSelector((state) => selectById<AppEvent>(id!)(state.events))
  const { loadDocument } = useFirestore(key)

  useEffect(() => {
    if (id) {
      loadDocument(id, actions)
    }
  }, [loadDocument, id])

  if (status === "loading") return <LoadingComponent />

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
