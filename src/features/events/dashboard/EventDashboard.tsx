import { Grid } from "semantic-ui-react"
import EventList from "./EventList"
import { useAppSelector } from "@/app/store"
import { useEffect } from "react"
import LoadingComponent from "@/app/layout/LoadingComponent"
import { actions } from "../eventSlice"
import { useFirestore } from "@/app/hooks/useFirestore"

export default function EventDashboard() {
    const { data : events, status } = useAppSelector((state) => state.events)
    const { loadCollection } = useFirestore('events')

    useEffect(() => {
      loadCollection(actions)
    }, [loadCollection])

    if (status === 'loading') return <LoadingComponent />

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}></Grid.Column>
      </Grid>
    )
}