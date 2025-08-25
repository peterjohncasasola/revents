import { NavLink } from "react-router"
import { Container, Menu, MenuItem, Button } from "semantic-ui-react"
import SignedOutMenu from "./SignedOutMenu"
import SignedInMenu from "./SignedInMenu"
import { useAppSelector } from "@/app/store"
import { AppRoutes } from "@/app/router/AppRoutes"

function NavBar() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  return (
    <Menu inverted={true} fixed="top">
      <Container>
        <MenuItem header>
          <img src="/logo.png" alt="logo" style={{ marginRight: "10px" }} />
          Re-vents
        </MenuItem>
        <MenuItem name="Events" as={NavLink} to={AppRoutes.Events} />
        <MenuItem>
          <Button
            as={NavLink}
            to={AppRoutes.CreateEvent}
            floated="right"
            positive={true}
            inverted={true}
            content="Create Event"
          />
        </MenuItem>
        {isAuthenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  )
}
export default NavBar