import { AppRoutes } from "@/app/router/AppRoutes";
import { useNavigate } from "react-router-dom";
import { Button, MenuItem } from "semantic-ui-react";

type Props = {
  setAuthenticated: (value: boolean) => void;
}

export default function SignedOutMenu({ setAuthenticated }: Props) {
  
  const navigate = useNavigate();

  const handleSignIn = () => {
    setAuthenticated(true);
    navigate(AppRoutes.Events);
  }

  return (
    <MenuItem position="right">
        <Button basic inverted content="Login" onClick={handleSignIn} />
        <Button basic inverted content="Register" style={{ marginLeft: '0.5em' }} />
    </MenuItem>
  )
}