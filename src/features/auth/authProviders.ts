import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  type AuthProvider
} from "firebase/auth"

import {
  type SemanticCOLORS,
  type SemanticICONS
} from "semantic-ui-react"

export type ProviderName = "facebook" | "google" | "github"

export interface ProviderConfig {
  name: ProviderName
  provider: AuthProvider
  color: SemanticCOLORS
  icon: SemanticICONS
  label: string
  link: string
}


export const providers: ProviderConfig[] = [
  {
    name: "facebook",
    provider: new FacebookAuthProvider(),
    color: "blue",
    icon: "facebook",
    link: 'https://facebook.com',
    label: "Facebook"
  },
  {
    name: "google",
    provider: new GoogleAuthProvider(),
    color: "red",
    icon: "google",
    link: 'https://google.com',
    label: "Google"
  },
  {
    name: "github",
    provider: new GithubAuthProvider(),
    color: "black",
    icon: "github",
    link: 'https://github.com',
    label: "Github"
  }
]