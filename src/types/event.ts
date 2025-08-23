export type AppEvent = {
    id: string
    title: string
    category: string
    description: string
    date: string
    city: string
    venue: string
    hostedBy: string
    hostPhotoURL: string
    attendees: Attendee[]
}

export type Attendee = {
    id: string
    name: string
    photoURL: string
}