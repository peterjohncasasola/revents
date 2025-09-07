import LoginForm from "@/features/auth/LoginForm"
import { useAppSelector } from "@/app/store"
import RegisterForm from "@/features/auth/RegisterForm"

export default function ModalManager() {
    const modalLookup = {LoginForm, RegisterForm}

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