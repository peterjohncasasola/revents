import type { AuthProvider } from "firebase/auth"
import type { SemanticCOLORS, SemanticICONS } from "semantic-ui-react"

export type ProviderName = "facebook" | "google" | "github"

export interface ProviderConfig {
  name: ProviderName
  provider: AuthProvider
  color: SemanticCOLORS
  icon: SemanticICONS
  label: string
}
