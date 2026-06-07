import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


import ProtectedRoutes from './FrontendAuth/ProtectedRoutes'
import Canvas from './Pages/Canvas'
import LandingPage from './Pages/LandingPage'
import SignUp from './Pages/SignUp'
import Login from './Pages/LogIn'
import ErrorHandle from './ErrorHandle'
import Dashboard from './Pages/Dashboard'
import './index.css'
import axios from "axios"

axios.defaults.withCredentials = true
// axios.defaults.baseURL = import.meta.env.VITE_API_URL


  

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path:'/dashboard',
        element:<Dashboard/>,
        errorElement:<ErrorHandle />

      },
      {
        path: '/canvas/:id',
        element: <Canvas />,
        errorElement:<ErrorHandle />

      }
    ]
  },
  {
    path: '/',
    element:<LandingPage />,
    errorElement:<ErrorHandle />
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement:<ErrorHandle />

  },
  {
    path: '/login',
    element: <Login />,
    errorElement:<ErrorHandle />

  },

])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>
)
