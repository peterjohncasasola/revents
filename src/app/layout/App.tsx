import { Container } from 'semantic-ui-react'
import NavBar from './nav/NavBar'
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '@/features/events/home/HomePage';
import { AppRoutes } from '../router/AppRoutes';

function App() {
  const location = useLocation();
  return (
   <>
    {location.pathname === AppRoutes.Home ? <HomePage /> : (
      <>
        <NavBar />
        <Container className='main'>
          {location.pathname === AppRoutes.Home ? <HomePage /> : <Outlet />}
        </Container>
      </>
    )}
   </>
  )
}
  
export default App
