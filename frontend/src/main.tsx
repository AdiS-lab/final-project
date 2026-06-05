import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Canvas from './Pages/Canvas'
import LandingPage from './Pages/LandingPage'
import SignUp from './Pages/SignUp'
import Login from './Pages/LogIn'
import ErrorHandle from './ErrorHandle'
import Dashboard from './Pages/Dashboard'
import './index.css'
import axios from "axios"

axios.defaults.withCredentials = true

const router = createBrowserRouter([
  {
    path: '/',
    element:<LandingPage />,
    errorElement:<ErrorHandle />
  },
  {
  path: '/canvas/:id',
  element: <Canvas />,
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  }

])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>
)
