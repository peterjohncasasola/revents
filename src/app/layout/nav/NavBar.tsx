import { NavLink } from "react-router";
import { Container, Menu, MenuItem, Button } from "semantic-ui-react"
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import { useState } from "react";
import { AppRoutes } from "@/app/router/AppRoutes";


function NavBar() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Menu inverted={true} fixed="top">
        <Container>
            <MenuItem header>
            <img src="/logo.png" alt="logo" style={{ marginRight: "10px" }}/>
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
            {
              isAuthenticated ? <SignedInMenu setAuthenticated={setIsAuthenticated} /> 
              : <SignedOutMenu setAuthenticated={setIsAuthenticated} />
            }
        </Container>
    </Menu>
  )
}
export default NavBar