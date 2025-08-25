import { useAppDispatch, useAppSelector } from "@/app/store"
import { type ReactNode } from "react"
import { closeModal } from "./modalSlice"
import {
  Modal,
  ModalContent,
  ModalHeader,
  type ModalProps
} from "semantic-ui-react"

type Props = {
  children: ReactNode
  header?: string
} & ModalProps

export default function ModalWrapper({ children, header, ...props }: Props) {
  const { isOpen } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <Modal open={isOpen} onClose={handleClose} size={props.size}>
      {header && <ModalHeader>{header}</ModalHeader>}
      <ModalContent>{children}</ModalContent>
    </Modal>
  )
}
