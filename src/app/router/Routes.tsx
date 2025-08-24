import { createBrowserRouter } from "react-router-dom"
import App from "../layout/App"
import EventDashboard from "@/features/events/dashboard/EventDashboard"
import EventDetailPage from "@/features/events/details/EventDetailPage"
import HomePage from "@/features/events/home/HomePage"
import EventForm from "@/features/events/form/EventForm"
import { AppRoutes } from "./AppRoutes"
import Scratch from "@/features/events/scratch/Scratch"

export const router = createBrowserRouter([
    {
        path: AppRoutes.Index,
        element: <App />,
        children: [
            {
                path: AppRoutes.Events,
                element: <EventDashboard />,
            },
            {
                path: AppRoutes.EventDetails(),
                element: <EventDetailPage />,
            },
            {
                path: AppRoutes.CreateEvent,
                element: <EventForm />,
            },
            {
                path: AppRoutes.ManageEvent(),
                element: <EventForm />,
            },
            {
                path: AppRoutes.Scratch,
                element: <Scratch />,
            },
            {
                path: AppRoutes.Home,
                element: <HomePage />,
            },
        ]
    }
])