import { Container, Menu, MenuItem, Button } from "semantic-ui-react"


type Props = {
  onCreateEvent: (value: boolean) => void;
}

function NavBar({ onCreateEvent }: Props) {

  function handleOpenForm() {
    onCreateEvent(true);
  }

  return (
    <Menu inverted={true} fixed="top">
        <Container>
            <MenuItem header>
            <img src="/logo.png" alt="logo" />
            Re-events
            </MenuItem>
            <MenuItem name="Events" />
            <MenuItem>
                <Button 
                  onClick={handleOpenForm} 
                  floated="right" 
                  positive={true} 
                  inverted={true} 
                  content="Create Event" 
                />
            </MenuItem>
            <MenuItem position="right">
                <Button basic inverted content="Login" />
                <Button basic inverted content="Register" style={{ marginLeft: '0.5em' }} />
            </MenuItem>
        </Container>
    </Menu>
  )
}
export default NavBar