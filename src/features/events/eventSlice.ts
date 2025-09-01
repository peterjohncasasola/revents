import type { RootState } from "@/app/store"
import {
  createGenericSlice,
  type GenericActions,
  type GenericState
} from "@/app/store/createGenericSlice"
import type { AppEvent } from "@/types/event"


type State = {
  data: AppEvent[]
}

const initialState: State = {
  data: []
}

const eventSlice = createGenericSlice({
  name: "events",
  initialState: initialState as GenericState<AppEvent[]>,
  reducers: {
    setEvents: (state, { payload }) => {
      state.data = payload
    },
  }
})

export const selectEventById = (id: string | undefined) => (state: RootState) =>
  state.events.data.find((event) => event.id === id)  

//Actions
export const actions = eventSlice.actions as GenericActions<AppEvent[]>
export default eventSlice
