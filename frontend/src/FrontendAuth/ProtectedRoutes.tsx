import {useUserSession} from './globalState'
import {useNavigate, Outlet} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

//____________ Get access token from _________ 
function ProtectedRoutes(){
    let {userSession, setUserSession} = useUserSession((state)=> state)
    let accessToken = userSession.accessToken
    let [hasAccess, setHasAccess] = useState<Boolean>(false)

    console.log('protected routes access token: '+ userSession.accessToken)

    const navigate = useNavigate()

    axios.interceptors.response.use(
        response => response,
        async error =>{
            if (error.response?.status === 401){
                const response = await axios.post('http://localhost:3000/auth/refresh')
                console.log(typeof response.data)
                setUserSession({accessToken: response.data})
                console.log(error.config.headers)
                error.config.headers['Authorization'] = `Bearer ${response.data}`
                return axios(error.config) //  where error.config is the previous req
            }
            return Promise.reject(error)
        }

    )

    useEffect(()=>{
    async function validateToken(): Promise<void>{
            try{
                const header = {headers:{Authorization: `Bearer ${accessToken}`}}
                const response = await axios.get('http://localhost:3000/auth/me', header)
                console.log(response)
                setHasAccess(true)
                // response has user info, can remove this entirely perhaps
                }
            catch(error){
                navigate('/login', {replace:true})
                console.log(error)
            }
        }   
        validateToken()
        },[])

    return(
    <>
        { hasAccess?  <Outlet /> : <div></div>}
     </>
    )
}

export default ProtectedRoutes