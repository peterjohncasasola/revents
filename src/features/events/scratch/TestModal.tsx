import { useAppSelector } from "@/app/store"
import ModalWrapper from "@/common/modals/modalWrapper"

export default function TestModal() {
  const { data } = useAppSelector((state) => state.modal)

  return (
    <ModalWrapper header={"Testing Modal"}>
      <div>{data}</div>
    </ModalWrapper>
  )
}
