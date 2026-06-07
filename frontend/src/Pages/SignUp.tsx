import {Link, useNavigate} from 'react-router-dom'
import {useUserSession} from '../FrontendAuth/globalState'
import {useState} from 'react'
import {supabase} from '../FrontendAuth/googleAuth'
import axios from 'axios'

export default function SignUp(){
    const {setUserSession} = useUserSession((state)=>state)
    const [validEmail, setValidEmail] = useState<Boolean>(false)
    const [loading, setLoading] = useState<Boolean>(false)
    const navigate = useNavigate()



    async function signInWithGoogle(){
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'https://frontendhanddraw.vercel.app/dashboard',
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                }
            }
        })
    }


    function realTimeInput(e: any){
        const value = e.target.value
        if (!value) {
            e.target.style.borderColor = 'black'
            return
        }

        const atIndex = value.indexOf('@')
        const hasValidAt = atIndex > 0
        const dotIndex = value.indexOf('.') // skip @ and at least one char after it
        const hasValidDot = dotIndex > atIndex + 1
        const hasAfterDot = dotIndex !== -1 && dotIndex < value.length - 1

        if (hasValidAt && hasValidDot && hasAfterDot) {
            e.target.style.borderColor = 'green'
            setValidEmail(true)
        } else {
            e.target.style.borderColor = 'red'
            
        }
    }
    

    async function createUser(e: any){
        e.preventDefault()
        if(validEmail){
            setLoading(true)
            const formData = new FormData(e.currentTarget)
            const formValues = Object.fromEntries(formData)
            console.log(formValues)
            createNewUser(formValues)
        }
    }


    async function createNewUser(formValues: object){
            try{
                console.log(formValues)
                const response = await axios.post('/signup', formValues, {withCredentials:true})
                const data = response.data
                console.log(data.accessToken)
                await supabase.auth.setSession({
                    access_token: data.accessToken,
                    refresh_token: data.refreshToken
                })
                setUserSession({accessToken: data.accessToken})
                console.log('heres navigate')
                navigate('/dashboard')       
            }

            catch(error){
                console.log(error) 
            }
        }


    return(
        <div className='min-h-screen w-full flex items-center justify-center bg-[#0a0a0a]'>

            <div className='flex flex-col gap-6 p-10 w-full max-w-md bg-[#111111] border border-[#1f1f1f] rounded-lg'>
                <header className='flex flex-col gap-1'>
                    <h1 className='text-xl font-semibold text-[#d0d0d0]'>Create Account</h1>
                    <h2 className='text-sm text-[#555555]'>Start drawing with your hands</h2>
                </header>

                <form onSubmit={(e) => { createUser(e) }} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='email' className='text-xs font-medium text-[#888888]'>Email</label>
                        <input onChange={(e) => { realTimeInput(e) }} autoComplete='off' type='text' name='email' id='email' placeholder='you@example.com' className='w-full px-4 py-2.5 outline-none text-sm bg-[#0a0a0a] border border-[#2a2a2a] rounded-[5px] text-[#d0d0d0]' />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label htmlFor='password' className='text-xs font-medium text-[#888888]'>Password</label>
                        <input type='password' name='password' id='password' placeholder='••••••••' className='w-full px-4 py-2.5 outline-none text-sm bg-[#0a0a0a] border border-[#2a2a2a] rounded-[5px] text-[#d0d0d0]' />
                    </div>
                    {(loading && validEmail) 
                        ? <div className='w-full py-2.5 mt-1 bg-[#d0d0d0] rounded-[5px] flex items-center justify-center'>
                            <div className='w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin'></div>
                          </div>
                        : <button className='w-full py-2.5 font-medium cursor-pointer mt-1 text-sm bg-[#d0d0d0] text-[#0a0a0a] border-none rounded-[5px]'>
                            Sign Up
                          </button>
                    }
                </form>

                <button type = 'button' onClick = {signInWithGoogle} className='w-full py-2.5 text-sm font-medium text-[#d0d0d0] bg-transparent border border-[#2a2a2a] rounded-[5px] cursor-pointer'> 
                    Continue with Google </button>

                <div className='text-center text-sm text-[#555555]'>
                    <p>Already have an account? <Link to='/login' className='font-medium text-[#d0d0d0]'>Log In</Link></p>
                </div>
            </div>

        </div>
    )
}