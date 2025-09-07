import { useAppDispatch } from "@/app/store"
import { openModal } from "@/common/modals/modalSlice"
import { Button, MenuItem } from "semantic-ui-react"

export default function SignedOutMenu() {
  const dispatch = useAppDispatch()

  const handleShowLogin = () => {
    dispatch(openModal({ type: "LoginForm" }))
  }

  return (
    <MenuItem position="right">
      <Button basic inverted content="Login" onClick={handleShowLogin} />
      <Button
        basic
        inverted
        content="Register"
        style={{ marginLeft: "0.5em" }}
        onClick={() => dispatch(openModal({ type: "RegisterForm" }))}
      />
    </MenuItem>
  )
}
