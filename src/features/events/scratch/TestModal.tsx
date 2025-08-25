import { useAppSelector } from "@/app/store"
import ModalWrapper from "@/common/modals/ModalWrapper"

export default function TestModal() {
  const { data } = useAppSelector((state) => state.modal)

  return (
    <ModalWrapper header={"Testing Modal"}>
      <div>{data}</div>
    </ModalWrapper>
  )
}
