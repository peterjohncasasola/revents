import { Container } from 'semantic-ui-react'
import NavBar from './nav/NavBar'
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '@/features/events/home/HomePage';
import { AppRoutes } from '../router/AppRoutes';
import ModalManager from '@/common/modals/ModalManager';
import { useAuthListener } from '@/app/hooks/useAuth'
function App() {
  const location = useLocation();
  useAuthListener();
  return (
   <>
    {location.pathname === AppRoutes.Home ? <HomePage /> : (
      <>
        <ModalManager />
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
