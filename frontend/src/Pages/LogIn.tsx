import {Link} from 'react-router-dom'
import axios from 'axios'
import {useEffect} from 'react'



export default function Login(){
    // two issuse: 1. can't see cookies 2. running into some recursive loop
    let accessToken = sessionStorage.getItem('accessToken')
    console.log(accessToken)


    function realTimeInput(e: any){
        const value = e.target.value
        if (!value) {
            e.target.style.borderColor = '#1b1b2f'
            return
        }

        const atIndex = value.indexOf('@')
        const hasValidAt = atIndex > 0
        const dotIndex = value.indexOf('.') // skip @ and at least one char after it
        const hasValidDot = dotIndex > atIndex + 1
        const hasAfterDot = dotIndex !== -1 && dotIndex < value.length - 1

        if (hasValidAt && hasValidDot && hasAfterDot) {
            e.target.style.borderColor = 'green'
        } else {
            e.target.style.borderColor = 'red'
        }
    }
    axios.interceptors.response.use(
        response => response,
        async error =>{
            if (error.response?.status === 401){
                const newToken: string = await axios.post('http://localhost:3000/auth/refresh', {}, {headers:{withCredentials:true}})
                accessToken = newToken
                error.config.headers = {headers: {Authorization: `Bearer ${accessToken}`}}
                return axios(error.config) //  where error.config is the previous req
            }
            return Promise.reject(error)
        }

    )

    // set up interceptor
    useEffect(()=>{
        async function validateToken(): Promise<void>{
            try{
                const header = {headers:{Authorization: `Bearer ${accessToken}`}}
                const response = await axios.get('http://localhost:3000/auth/me', header)
                window.open('/dashboard', '_self')
                console.log(response.data)
                //push to dashboard 
                }
            catch(error){
                
                console.log(error)
            }
        }   
        validateToken()
    },[])


    async function logIn(e:any){
        e.preventDefault()
        try{
            console.log('made it')
            const formData = new FormData(e.currentTarget)
            const sendData = Object.fromEntries(formData)

            const response = await axios.post('http://localhost:3000/login', sendData)
            const data = response.data
            accessToken = data.accessToken
            
            window.open('/dashboard', '_self')              
        }
        catch(error: any){
            console.log(error.response.data)
        }
    }   

    
    return(
        <div className='min-h-screen w-full flex items-center justify-center' style={{ background: '#0a0a0a' }}>

            <div className='flex flex-col gap-6 p-10 w-full max-w-md' style={{
                background: '#111111',
                border: '1px solid #1f1f1f',
                borderRadius: '8px',
            }}>
                <header className='flex flex-col gap-1'>
                    <h1 className='text-xl font-semibold' style={{ color: '#d0d0d0' }}>Welcome Back</h1>
                    <h2 className='text-sm' style={{ color: '#555555' }}>Log in to continue drawing</h2>
                </header>

                <form onSubmit={(e) => { logIn(e) }} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='email' className='text-xs font-medium' style={{ color: '#888888' }}>Email</label>
                        <input onFocus={(e) => { realTimeInput(e) }} name='email' id='email' type='text' placeholder='you@example.com' className='w-full px-4 py-2.5 outline-none text-sm' style={{
                            background: '#0a0a0a',
                            border: '1px solid #2a2a2a',
                            borderRadius: '5px',
                            color: '#d0d0d0',
                        }} />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='password' className='text-xs font-medium' style={{ color: '#888888' }}>Password</label>
                        <input name='password' id='password' type='password' placeholder='••••••••' className='w-full px-4 py-2.5 outline-none text-sm' style={{
                            background: '#0a0a0a',
                            border: '1px solid #2a2a2a',
                            borderRadius: '5px',
                            color: '#d0d0d0',
                        }} />
                    </div>
                    <button type='submit' className='w-full py-2.5 font-medium cursor-pointer mt-1 text-sm' style={{
                        background: '#d0d0d0',
                        color: '#0a0a0a',
                        border: 'none',
                        borderRadius: '5px',
                    }}>
                        Sign In
                    </button>
                </form>

                <div className='text-center text-sm' style={{ color: '#555555' }}>
                    <p>Don't have an account? <Link to='/signup' className='font-medium' style={{ color: '#d0d0d0' }}>Sign Up</Link></p>
                </div>
            </div>

        </div>
    )
}