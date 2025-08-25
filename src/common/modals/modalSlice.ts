import { createSlice } from "@reduxjs/toolkit"

type State = {
  isOpen: boolean
  type: string | null
  data: any
}

const initialState: State = {
  isOpen: false,
  type: null,
  data: null
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true
      state.type = payload.type
      state.data = payload.data
    },
    closeModal: (state) => {
      state.isOpen = false
      state.data = null
      state.type = null
    }
  }
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice
