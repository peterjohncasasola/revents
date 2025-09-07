import { useState } from "react"
import { toast } from "react-toastify"
import { Button, Icon } from "semantic-ui-react"
import { useSocialAuth } from "./useSocialAuth"
import {
  providers,
  type ProviderName,
  type ProviderConfig
} from "./authProviders"

type Props = {
  isSignup?: boolean
}

export default function SocialAuth({ isSignup }: Props) {
  const [loadingProvider, setLoadingProvider] = useState<ProviderName | null>(
    null
  )
  const { loginWithProvider } = useSocialAuth()
  const label = isSignup ? "Signup" : "Signin"

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
