import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Canvas  from './Pages/Canvas.tsx'
import LandingPage from './LandingPage.tsx'
import SignUp from './components/SignUp.tsx'
import Login from './components/LogIn.tsx'
import ErrorHandle from './ErrorHandle.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element:<LandingPage />,
    errorElement:<ErrorHandle />
  },
  {
  path: '/canvas',
  element: <Canvas />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <Login />
  }

])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>
)
