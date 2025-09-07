export const AppRoutes = {
  Home: "/home",
  Index: "/",
  Events: "/events",
  Scratch: "/scratch",
  Account: '/account',
  ManageEvent: (id: string = ":id") => `/events/manage/${id}`,
  EventDetails: (id: string = ":id") => `/events/${id}`,
  CreateEvent: "/events/create",
} as const;