import {useUserSession} from './globalState'
import {useNavigate, Outlet} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {supabase} from './googleAuth'

//____________ Get access token from _________ 
function ProtectedRoutes(){
    let {userSession, setUserSession} = useUserSession((state)=> state)
    let [hasAccess, setHasAccess] = useState<Boolean>(false)
    let token = userSession.accessToken

    const navigate = useNavigate()


    useEffect(()=>{
        axios.interceptors.response.use(
            response => response,
            async error =>{
                if (error.response?.status === 401){
                    // const response = await axios.post('http://localhost:3000/auth/refresh')
                    // console.log(typeof response.data)
                    // setUserSession({accessToken: response.data})
                    // console.log(error.config.headers)

                    const {data} = await supabase.auth.refreshSession()
                    if(!data.session) return Promise.reject(error)
                    error.config.headers['Authorization'] = `Bearer ${data.session.access_token}`
                    return axios(error.config) //  where error.config is the previous req
                }
                console.log(error)
                return Promise.reject(error)
            }

        )
    }, [])

    async function validateToken(token: string | undefined){
        try{
            const header = {headers:{Authorization: `Bearer ${token}`}}
            const response = await axios.get('/auth/me', header)
            console.log(response)
            setHasAccess(true)
            return
            }
        catch(error){
                console.log("line 54" + error)
                navigate('/signup', {replace:true})
            }
    }

   

    useEffect(()=>{
        if(token){
            validateToken(token)
            return
        }
        
        const {data} = supabase.auth.onAuthStateChange(async (event, session)=>{
            console.log(event)
            if(session?.access_token){
                setUserSession({accessToken: session.access_token})
                validateToken(session.access_token)
            }
            else{
                validateToken(token)
            }
        })

        return () => data.subscription.unsubscribe()
    },[])


 

    return(
    <>
        { hasAccess?  <Outlet /> : <div></div>}
     </>
    )
}

export default ProtectedRoutes