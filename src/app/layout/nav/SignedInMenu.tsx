import { AppRoutes } from "@/app/router/AppRoutes";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";

type Props = {
  setAuthenticated: (value: boolean) => void;
}

export default function SignedInMenu({ setAuthenticated }: Props) {

  const navigate = useNavigate();

  const handleSignOut = () => {
    setAuthenticated(false);
    navigate(AppRoutes.Home);
  }

  return (
    <Menu.Item position="right">
        <Image avatar spaced="right" src="/user.png" />
        <Dropdown pointing='top left' text='Bob'>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={AppRoutes.CreateEvent} text='Create Event' icon='plus' />
            <Dropdown.Item text='My profile' icon='user' />
            <Dropdown.Item text='Signout' icon='power' onClick={handleSignOut} />
          </Dropdown.Menu>
        </Dropdown>
    </Menu.Item>
  )
}