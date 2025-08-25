import { AppRoutes } from "@/app/router/AppRoutes"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { logout } from "@/features/auth/authSlice"
import { Link, useNavigate } from "react-router-dom"
import { Menu, Image, Dropdown } from "semantic-ui-react"

export default function SignedInMenu() {
  const { currentUser } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  if (!currentUser) return null

  const navigate = useNavigate()

  const handleSignOut = () => {
    dispatch(logout())
    navigate(AppRoutes.Home)
  }

  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src="/user.png" />
      <Dropdown pointing="top left" text={currentUser.email}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to={AppRoutes.CreateEvent}
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item text="My profile" icon="user" />
          <Dropdown.Item text="Signout" icon="power" onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}
