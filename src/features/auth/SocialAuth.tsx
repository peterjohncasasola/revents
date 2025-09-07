import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  type AuthProvider
} from "firebase/auth"
import { useState } from "react"
import { toast } from "react-toastify"
import {
  Button,
  Icon,
  type SemanticCOLORS,
  type SemanticICONS
} from "semantic-ui-react"
import { useSocialAuth } from "./useSocialAuth"

type ProviderName = "facebook" | "google" | "github"

type Props = {
  isSignup?: boolean
}

interface ProviderConfig {
  name: ProviderName
  provider: AuthProvider
  color: SemanticCOLORS
  icon: SemanticICONS
  label: string
}


const providers: ProviderConfig[] = [
  {
    name: "facebook",
    provider: new FacebookAuthProvider(),
    color: "blue",
    icon: "facebook",
    label: "Facebook"
  },
  {
    name: "google",
    provider: new GoogleAuthProvider(),
    color: "red",
    icon: "google",
    label: "Google"
  },
  {
    name: "github",
    provider: new GithubAuthProvider(),
    color: "black",
    icon: "github",
    label: "Github"
  }
]


export default function SocialAuth(props: Props) {
  const [loadingProvider, setLoadingProvider] = useState<ProviderName | null>(
    null
  )
  const { loginWithProvider } = useSocialAuth()
  const { isSignup } = props;
  const label = isSignup ? 'Signup' : 'Signin'

  async function handleSocialAuth(providerConfig: ProviderConfig) {
    setLoadingProvider(providerConfig.name)

    try {
      const { user, isNewUser } = await loginWithProvider(
        providerConfig.provider
      )

      if (isNewUser) {
        toast.success(
          `Welcome ${
            user.displayName || "User"
          }! Your account has been created 🎉`
        )
      } else {
        toast.success(`Welcome back ${user.displayName || "User"} 👋`)
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Something went wrong")
    } finally {
      setLoadingProvider(null)
    }
  }

  return (
    <>
      {providers.map((config) => (
        <Button
          key={config.name}
          fluid
          color={config.color}
          type="button"
          loading={loadingProvider === config.name}
          style={{ marginTop: ".5em" }}
          onClick={() => handleSocialAuth(config)}
        >
          <Icon name={config.icon} /> {label} with {config.label}
        </Button>
      ))}
    </>
  )
}
