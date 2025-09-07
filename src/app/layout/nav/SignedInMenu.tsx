import { AppRoutes } from "@/app/router/AppRoutes"
import { useAppSelector } from "@/app/store"
import { auth } from "@/config/firebase"
import { signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Menu, Image, Dropdown } from "semantic-ui-react"

export default function SignedInMenu() {
  const { currentUser } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  if (!currentUser) return null


  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigate(AppRoutes.Home)
    } catch (error) {
      toast.error(`Something went wrong: ${error}`)
    }
  }

  return (
    <Menu.Item position="right"> 
      <Image avatar spaced="right" src={currentUser.photoUrl ?? '/user.png'} />
      <Dropdown pointing="top left" text={currentUser.email as string}>
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
