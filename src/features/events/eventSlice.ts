import type { RootState } from "@/app/store"
import type { AppEvent } from "@/types/event"
import { createSlice } from "@reduxjs/toolkit"

type State = {
  events: AppEvent[]
}

const initialState: State = {
  events: []
}

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: { 
    createEvent: ({ events }, { payload }) => {
      events.push(payload)
    },

    setEvents: (state, { payload }) => {
      state.events = payload
    },

    deleteEvent: ({ events }, { payload }) => {
      const index = events.findIndex(
        (event: AppEvent) => event.id === payload.id
      )
      events.splice(index, 1)
    },

    updateEvent: ({ events }, { payload }) => {
      const index = events.findIndex(
        (event: AppEvent) => event.id === payload.id
      )
      events[index] = payload
    }
  }
})

export const selectEventById = (id: string | undefined) => (state: RootState) =>
  state.events.events.find((event) => event.id === id)

export const { createEvent, deleteEvent, updateEvent, setEvents } =
  eventSlice.actions
export default eventSlice
