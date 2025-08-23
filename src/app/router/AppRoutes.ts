export const AppRoutes = {
  Home: "/",
  Index: "/",
  Events: "/events",
  EventDetails: (id: string = ":id") => `/events/${id}`,
  CreateEvent: "/events/create",
} as const;