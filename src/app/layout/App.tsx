import { Container } from 'semantic-ui-react'
import EventDashboard from 'features/events/dashboard/EventDashboard'
import NavBar from './nav/NavBar'
import { useState } from 'react';
import type { AppEvent } from '@/types/event';

function App() {


  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  
  function handleCreateFormOpen() {
    setSelectedEvent(null);
    setIsFormOpen(true);
  }
  function handleSelectEvent(event: AppEvent) {
    setSelectedEvent(event);
    setIsFormOpen(true);
  }
  return (
    <>
      <NavBar onCreateEvent={handleCreateFormOpen} />
      <Container className='main'>
        <EventDashboard 
          isFormOpen={isFormOpen} 
          setIsFormOpen={setIsFormOpen}
          onSelectEvent={handleSelectEvent}
          selectedEvent={selectedEvent}
        />
      </Container>
    </>
  )
}
  
export default App
