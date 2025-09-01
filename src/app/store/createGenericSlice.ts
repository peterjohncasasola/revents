import type {
    ActionCreatorWithOptionalPayload,
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  ActionCreatorWithPreparedPayload,
} from "@reduxjs/toolkit"
import {
  type SliceCaseReducers,
  type ValidateSliceCaseReducers,
  createSlice,
  type PayloadAction
} from "@reduxjs/toolkit"

export type GenericState<T> = {
  data: T
  status: "loading" | "succeeded" | "failed" | "idle"
  errors: any
}

export const createGenericSlice = <
  T,
  Reducers extends SliceCaseReducers<GenericState<T>>
>({
  name = "",
  initialState,
  reducers
}: {
  name: string
  initialState: GenericState<T>
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      setLoading(state) {
        state.status = "loading"
      },
      setData(state: GenericState<T>, action: PayloadAction<T>) {
        state.data = action.payload
        state.status = "succeeded"
      },
      setError: (state, action) => {
        state.errors = action.payload
        state.status = "failed"
      },
      reset(state) {
        state.data = initialState.data as typeof state.data
        state.status = "idle"
        state.errors = undefined
      },
      ...reducers
    }
  })
}

export const selectById =
  <T extends { id: string | number }>(id: string | number) =>
  (state: GenericState<T[]>) =>
    state.data.find((item) => item.id === id)


export type GenericActions<T> = {
  setError: ActionCreatorWithOptionalPayload<any, string>
  setLoading: ActionCreatorWithoutPayload<string>
  reset: ActionCreatorWithoutPayload<any>
  setData:
    | ActionCreatorWithPayload<T, string>
    | ActionCreatorWithPreparedPayload<any, T, string, never, never>
}
