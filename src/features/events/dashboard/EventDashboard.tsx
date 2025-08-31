import { Grid } from "semantic-ui-react"
import EventList from "./EventList"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { useEffect, useState } from "react"
import {
  collection,
  onSnapshot,
  query
} from "firebase/firestore"
import { db } from "@/config/firebase"
import type { AppEvent } from "@/types/event"
import { setEvents } from "../eventSlice"
import LoadingComponent from "@/app/layout/LoadingComponent"

export default function EventDashboard() {
  const {events} = useAppSelector((state) => state.events)
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const q = query(collection(db, "events"))
    const unsubscribe = onSnapshot(q, {
      next: (querySnapshot) => {
        const eventDocs: AppEvent[] = []
        querySnapshot.forEach((doc) => {
          eventDocs.push({ id: doc.id, ...doc.data() } as AppEvent)
        })
        
        dispatch(setEvents(eventDocs))
        setIsLoading(false)
      },
      error: (err) => {
        console.error("Error fetching events: ", err)
        setIsLoading(false)
      },
      complete: () => {
        console.log("Event fetching complete")
        setIsLoading(false)
      }
    })

    return () => unsubscribe()

  }, [dispatch])

  if (isLoading) return <LoadingComponent />

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  )
}