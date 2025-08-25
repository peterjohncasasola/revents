import TestModal from "@/features/events/scratch/TestModal"
import { useAppSelector } from "@/app/store"

export default function ModalManager() {
    const modalLookup = {TestModal}

    const { type, data, isOpen } = useAppSelector((state) => state.modal)

    let renderedModal = null
    if (isOpen && type) {
        const ModalComponent = (modalLookup as any)[type];
        renderedModal = <ModalComponent data={data} />
    }

  
    return (
        <span>
           {renderedModal}
        </span>
    )
}   